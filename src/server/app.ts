import express from 'express';
import session from 'express-session';
import Contributor from "./models/ContributorModel.js";
import mapRouter from "./routes/MapDataRouter.js"
import userRouter from "./routes/UserRouter.js"
import viewsRouter from "./routes/ViewsRouter.js"

declare module 'express-session' {
    interface SessionData {
        contributor: Contributor;
        logged : boolean;
    }
}

const app = express();

app.use(express.json());

app.use(session({
    secret: 'hsfqifnqlifnvvnazpnea',
    resave: false,
    saveUninitialized: false,
    cookie : {maxAge : 1000 * 60 * 60 * 24}
}));

app.use("/", mapRouter);
app.use("/", userRouter);
app.use("/", viewsRouter);

app.listen(9000, () => {
  console.log(`Serveur démarré sur le port 9000`);
});