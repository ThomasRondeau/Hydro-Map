import app from './app.js';
import * as dotenv from 'dotenv';

dotenv.config();


app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});