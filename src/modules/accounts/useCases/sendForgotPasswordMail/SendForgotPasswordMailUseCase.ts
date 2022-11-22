import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";
import { v4 as uuidV4 } from "uuid"

class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User does not exists!")
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3)

    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    })

    await this.mailProvider.sendMail(email, "Recuperação de senha", `O link para o reset é ${token}`)
  }
}

export { SendForgotPasswordMailUseCase }
