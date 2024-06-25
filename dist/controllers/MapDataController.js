import { getPointsFromCsv, getPowerUnitsFromcsv } from "../services/MapDataServices.js";
export async function getInterestPoints(req, res, next) {
    try {
        let json = JSON.stringify(await getPointsFromCsv());
        res.json(json);
    }
    catch (error) {
        console.error("Error while sending Interest points", error.message);
        next(error);
    }
}
export async function getPowerUnits(req, res, next) {
    try {
        let json = JSON.stringify(await getPowerUnitsFromcsv());
        res.json(json);
    }
    catch (error) {
        console.error("Error while sending Power Units", error.message);
        next(error);
    }
}
/*
export async function createPCH(req, res, next){
    try {
        res.json(await service.createPCH()) // Passer un modele en paramètre
    } catch (error) {
        console.error("Error while creating new PCH", error.message)
        next(error);
    }
}

export async function createInterestPoint(req,res, next){
    try {
        res.json(await service.createInterestPoint()) // Passer un modele en paramètre
    } catch (error) {
        console.error("Error while creating new Interest Point", error.message)
        next(error);
    }
}

export async function deletePCH(req, res, next){
    try {
        res.json(await service.deletePCH())
    } catch (error) {
        console.error("Error while deleting PCH", error.message)
        next(error);
    }
}

export async function deleteInterestPoint(req, res, next){
    try {
        res.json(await service.deleteInterestPoint())
    } catch (error) {
        console.error("Error while deleting Interest Point", error.message)
        next(error);
    }
}
    */ 
//# sourceMappingURL=MapDataController.js.map