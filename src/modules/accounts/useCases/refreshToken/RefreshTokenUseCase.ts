import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub;

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!")
    }

    await this.userTokensRepository.deleteById(userToken.id)

    const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    })

    await this.userTokensRepository.create({
      user_id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    })

    const newToken = sign({ email }, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    })

    return {
      refresh_token,
      token: newToken
    };
  }
}

export { RefreshTokenUseCase }