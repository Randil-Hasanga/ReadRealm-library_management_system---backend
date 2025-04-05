import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASS as string, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
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
