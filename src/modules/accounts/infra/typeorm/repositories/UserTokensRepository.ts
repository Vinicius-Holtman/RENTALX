import { getRepository, Repository } from "typeorm"

import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO"
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository"
import { UserTokens } from "../entities/UserTokens"



class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }
 
  async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    })

    await this.repository.save(userToken)

    return userToken
  }
}

export { UserTokensRepository }