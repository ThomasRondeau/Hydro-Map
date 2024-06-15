import InterestPoint from "../models/InterestPointModel.js";
import PCH from "../models/PCHModel.js";
import csvParser from 'csv-parser';
import fs from 'fs';
import position from "../models/positionModel.js";
import Contributor from "../models/ContributorModel.js";

export function getPointsFromCsv():InterestPoint[]{
    const filePath = '../DataStationPotentiel15mLargeur.csv';
    const rows: string[] = [];
    const points:InterestPoint[] = [];

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row: any) => rows.push(row))
        .on('end', () => {
        console.log('CSV file successfully processed');
        })
        .on('error', (err) => {
        console.error('Error processing CSV file:', err);
        });
    
    for(const row of rows){
        let parsed:string[] = row.split(",");
        let pos:position = new position(Number(parsed[1]) , Number(parsed[2]));
        let point:InterestPoint = new InterestPoint(pos, 0, "A new point where we can install power")
        points.push(point);
    }
    return points;
}