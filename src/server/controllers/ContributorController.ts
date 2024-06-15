import Contributor from "../models/ContributorModel.js";
import {loginContributorCall, getContributor} from "../services/ContributorServices.js"

export async function loginContributor(req:any, res:any, next:any){
  // Voir si pas plus rapide de juste faire un requete pour récupérer le mot de passe puis seulement faire un get
  try {
    res.json(await loginContributorCall(req.body)) 
  } catch (error:any) {
    res.json("Error while trying to log contributor", error.message)
    next(error)
  }
}

export async function getContributorCall(req:any, res:any, next:any){
  try {
    res.json(await getContributor(req.body.email)) 
  } catch (error:any) {
    res.json("Error while trying to log contributor", error.message)
    next(error)
  }
}
export function logoutContributor(req:any, res:any, next:any){
  req.session.destroy();
  res.redirect('/home');
  next();
}
