import { Router } from "express";
import {} from "../controllers/ContributorController.js"

const userRouter = Router();

userRouter.post('/login_client', loginUser);

userRouter.post('/logout', logoutUser);

userRouter.post('/getprofile', getUser);

export default userRouter;