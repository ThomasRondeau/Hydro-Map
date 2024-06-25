import { loginContributorCall, getContributor } from "../services/ContributorServices.js";
export async function loginContributor(req, res, next) {
    // Voir si pas plus rapide de juste faire un requete pour récupérer le mot de passe puis seulement faire un get
    try {
        res.json(await loginContributorCall(req.body));
    }
    catch (error) {
        res.json("Error while trying to log contributor", error.message);
        next(error);
    }
}
export async function getContributorCall(req, res, next) {
    try {
        res.json(await getContributor(req.body.email));
    }
    catch (error) {
        res.json("Error while trying to log contributor", error.message);
        next(error);
    }
}
export function logoutContributor(req, res, next) {
    req.session.destroy();
    res.redirect('/home');
    next();
}
//# sourceMappingURL=ContributorController.js.map