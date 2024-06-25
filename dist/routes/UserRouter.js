import { Router } from "express";
import { loginContributor, logoutContributor, getContributorCall } from "../controllers/ContributorController.js";
const userRouter = Router();
userRouter.post('/login_client', loginContributor);
userRouter.post('/logout', logoutContributor);
userRouter.post('/getprofile', getContributorCall);
export default userRouter;
//# sourceMappingURL=UserRouter.js.map