import { Router } from "express";
import { getInterestPoints, getPowerUnits } from "../controllers/MapDataController.js";
const mapDataRouter = Router();
mapDataRouter.get('/getInterestsPoints', getInterestPoints);
mapDataRouter.get('/getPowerUnits', getPowerUnits);
/*
mapDataRouter.post('/createPCH', createPCH);

mapDataRouter.post('/createInterestPoint', createInterestPoint);

mapDataRouter.put('/modifyPCH', modifyPCH);

mapDataRouter.put('/modifyInterstPoint', modifyInterestPoint);

mapDataRouter.delete('/deletePCH', deletePCH);

mapDataRouter.delete('/deleteInterstPoint', deleteInterestPoint);
*/
export default mapDataRouter;
//# sourceMappingURL=MapDataRouter.js.map