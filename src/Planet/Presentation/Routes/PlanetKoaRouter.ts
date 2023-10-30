import Router from 'koa-router';
import PlanetKoaController from '../Controllers/PlanetKoaController';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/planets'
};

const PlanetKoaRouter: Router = new Router(routerOpts);

PlanetKoaRouter.post('/', PlanetKoaController.save);
PlanetKoaRouter.get('/', PlanetKoaController.list);
PlanetKoaRouter.get('/:id', PlanetKoaController.show);

export default PlanetKoaRouter;
