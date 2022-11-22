import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe"

interface IRequest {
  token: string;
  password: string;
}


@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UserTokensRepository")
    private usersTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    )

    if(!userToken){
      throw new AppError("Token invalid!")
    }

    if (this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow()
    )) {
      throw new AppError("Token expired!")
    }

    const user = await this.usersRepository.findById(userToken.id)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUserUseCase }
