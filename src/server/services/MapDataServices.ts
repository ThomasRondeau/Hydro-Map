import InterestPoint from "../models/InterestPointModel.js";
import PCH from "../models/PCHModel.js";
import csvParser from 'csv-parser';
import fs from 'fs';
import position from "../models/positionModel.js";
import Contributor from "../models/ContributorModel.js";

export async function getPointsFromCsv(): Promise<InterestPoint[]> {
    const filePath = 'DataStationPotentiel15mLargeur.csv';
    const rows: any[] = [];
    const points: InterestPoint[] = [];
  
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row: any) => rows.push(row))
        .on('end', () => {
          console.log('CSV file successfully processed');
          for (const row of rows) {
            let pos:position = new position(Number(row.CoordXAval) , Number(row.CoordYAval));
            let point:InterestPoint = new InterestPoint(pos, 0, "A new point where we can install power")
            points.push(point);
          }
          resolve(points);
        })
        .on('error', (err) => {
          console.error('Error processing CSV file:', err);
          reject(err); 
        });
    });
}

export async function getPowerUnitsFromcsv(): Promise<PCH[]> {
  const filePath = 'merged.csv';
    const rows: any[] = [];
    const points: PCH[] = [];
  
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row: any) => rows.push(row))
        .on('end', () => {
          console.log('CSV file successfully processed');
          for (const row of rows) {
            let pos:position = new position(Number(row.longitude) , Number(row.latitude));
            let unit:PCH = new PCH(pos, row.nomInstallation, row.technologie, row.puisMaxInstallee, "Une petite centrale hydrauélectrique");
            points.push(unit);
          }
          resolve(points);
        })
        .on('error', (err) => {
          console.error('Error processing CSV file:', err);
          reject(err); 
        });
    });
}