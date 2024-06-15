import Contributor from "../models/ContributorModel.js";
import connection from "./DbConnection.js";


export async function loginContributorCall(body:any){
    const email = body.email;
    const password = body.password;
    const query = 'SELECT id_contributor, password FROM contributor WHERE email = ?';

    const results = await new Promise<any>((resolve, reject) => {
    connection.query(query, [email], function(err, results) {
        if (err) {
        reject(err);
        } else {
        resolve(results);
        }
    });
    });
    return results;

}

export async function getContributor(email:String){
    const query = `SELECT * FROM client WHERE email = ?`;

    const results = await new Promise<any>((resolve, reject) => {
        connection.query(query, [email], function(err, results) {
            if (err) {
            reject(err);
            } else {
            resolve(results);
            }
        });
    });
    if (results.lenght > 0) {
      return results[0];
  } else {
      return undefined;
  }
}




/*


import { Request, Response } from 'express';


async function getContributor(req: Request, res: Response) { // Est ce qu'il ne faudrait pas utiliser le modèle contributor à la place ? 
  const userId = req.body.id;
  const query = `SELECT * FROM client WHERE id = ?`;

  try {
    const results = await new Promise<any>((resolve, reject) => {
      connection.query(query, [userId], function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    //req.session.contributor = Contributor();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function loginContributor(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const query = 'SELECT id_contributor, password FROM contributor WHERE email = ?';

  try {
    const results = await new Promise<any>((resolve, reject) => {
      connection.query(query, [email], function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }



  var lancement = Contributor.loginUser(email, password, (error_id, boolean, result) =>{

    console.log('error_id : ', error_id)
    if(boolean){
      req.session.typeOfUser = "client"
      req.session.userId = result
      res.redirect('/accueil')
    }else{
      res.send("Identifiant et/ou mot de passe incorrects")
    }
  })
}

*/