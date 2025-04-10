import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const certificatePath = process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '..', 'certificates', 'DigiCertGlobalRootCA.crt')  // For production, it's in the root
    : path.join(__dirname, 'certificates', 'DigiCertGlobalRootCA.crt');  // For development, it's in src

const sslOptions = process.env.NODE_ENV === 'production' 
    ? { ca: fs.readFileSync(certificatePath) } 
    : {};

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASS as string, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        ssl: sslOptions
    }
});

(async () => {
    try {
        sequelize.sync({ alter: true }) // Creates table if not exists
            .then(() => console.log('Database synced successfully.'))
            .catch(err => console.error('Error syncing database:', err));
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


export default sequelize;
