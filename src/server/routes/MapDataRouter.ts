import { Router } from "express";
import { } from "../controllers/MapDataController.js"; 

const mapDataRouter = Router();

mapDataRouter.post('/createPCH', createPCH);

mapDataRouter.post('/createInterestPoint', createInterestPoint);

mapDataRouter.put('/modifyPCH', modifyPCH);

mapDataRouter.put('/modifyInterstPoint', modifyInterestPoint);

mapDataRouter.delete('/deletePCH', deletePCH);

mapDataRouter.delete('/deleteInterstPoint', deleteInterestPoint);

export default mapDataRouter;