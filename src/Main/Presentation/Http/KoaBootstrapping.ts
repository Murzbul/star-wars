import { IApp, AppKoa } from '@digichanges/shared-experience';

import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import compress from 'koa-compress';

import ThrottleKoaMiddleware from '../Middleware/ThrottleKoaMiddleware';
import bodyParser from 'koa-bodyparser';
import IndexKoaRouter from '../Routers/IndexKoaRouter';
import PlanetKoaRouter from '../../../Planet/Presentation/Routes/PlanetKoaRouter';
import NotificationKoaHandler from '../../../Notification/Presentation/Handlers/NotificationKoaHandler';
import PeopleKoaRouter from '../../../People/Presentation/Routes/PeopleKoaRouter';

import { ErrorKoaHandler } from '../Middleware/ErrorKoaHandler';

import LoggerKoaMiddleware from '../Middleware/LoggerKoaMiddleware';
import RedirectRouteNotFoundKoaMiddleware from '../Middleware/RedirectRouteNotFoundKoaMiddleware';
import IExtendAppConfig from './IExtendAppConfig';
import StarshipKoaRouter from '../../../Starship/Presentation/Routes/StarshipKoaRouter';

const KoaBootstrapping = async(config: IExtendAppConfig) =>
{
    const app: IApp = new AppKoa(config);
    app.addMiddleware<Koa.Middleware>(cors({
        credentials: true,
        origin: (ctx) =>
        {
            const { env } = config;
            const validDomains = env === 'development' ? ['http://localhost:3000'] : ['https://domain.com'];

            if (validDomains.indexOf(ctx.request.header.origin) !== -1)
            {
                return ctx.request.header.origin;
            }

            return validDomains[0]; // we can't return void, so let's return one of the valid domains
        }
    }));
    app.addMiddleware<Koa.Middleware>(helmet());
    app.addMiddleware<Koa.Middleware>(bodyParser({
        jsonLimit: '5mb'
    }));
    app.addMiddleware<Koa.Middleware>(compress());
    app.addMiddleware<Koa.Middleware>(ErrorKoaHandler.handle);

    app.addMiddleware<Koa.Middleware>(LoggerKoaMiddleware);
    app.addMiddleware<Koa.Middleware>(ThrottleKoaMiddleware);

    app.addRouter<Router>(IndexKoaRouter);
    app.addRouter<Router>(PlanetKoaRouter);
    app.addRouter<Router>(PeopleKoaRouter);
    app.addRouter<Router>(StarshipKoaRouter);
    app.addRouter<Router>(NotificationKoaHandler);

    app.addMiddleware<Koa.Middleware>(RedirectRouteNotFoundKoaMiddleware);

    return app;
};

export default KoaBootstrapping;
