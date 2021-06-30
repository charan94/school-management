/**
 * @file index.ts
 * @author K Sai Charan
*/

import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as path from 'path';
import routes from './routes';
import { config } from 'dotenv';
import { init } from './init-db';

config();

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_DOMAIN_NAME
        ? `${process.env.FRONTEND_DOMAIN_NAME}`
        : '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    allowedHeaders: ['Authorization', 'Content-Type', 'responsetype'],
    exposedHeaders: ['Authorization', 'Content-Type', 'responsetype'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.disable('x-powered-by');

init();

app.use('/', routes);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Express server has started on port ${PORT}.`);
});
