import Contributor from "../models/ContributorModel";
import connection from "./DbConnection";

function getContributor(req, res){
    const userId = req.body.id;
    try {
        return Contributor.getUser(userId)
    } catch (error) {
        console.log(error)
    }
}

function loginContributor(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const query = 'SELECT id_contributor, password FROM contributor WHERE email = ?';





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

function logoutContributor(req, res){
    req.session.destroy()
    res.redirect('/home')
}