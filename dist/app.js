import express from 'express';
import session from 'express-session';
import * as dotenv from 'dotenv';
const app = express();
app.use(express.json());
app.use(session({
    secret: 'hsfqifnqlifnvvnazpnea',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
dotenv.config();
app.listen(3000, () => {
    console.log(`Serveur démarré sur le port 3000`);
});
//# sourceMappingURL=app.js.map