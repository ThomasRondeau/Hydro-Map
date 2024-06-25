import { Router } from "express";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Importer controllers
const htmlPath = path.join(__dirname, '../front/html'); // To adapt
const viewsRouter = Router();
viewsRouter.get('/', (req, res) => {
    res.redirect('/home');
});
viewsRouter.get('/home', (req, res) => {
    res.sendFile('index.html', { root: htmlPath });
});
viewsRouter.get('/map', (req, res) => {
    res.sendFile('map.html', { root: htmlPath });
});
export default viewsRouter;
//# sourceMappingURL=ViewsRouter.js.map