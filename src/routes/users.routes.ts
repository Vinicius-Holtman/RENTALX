import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController"
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";


const usersRoutes = Router();

const createUserController = new CreateUserController()
const updatedUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post("/", createUserController.handle)

usersRoutes.patch("/avatar", updatedUserAvatarController.handle)

export { usersRoutes }