import Router from 'koa-router';
import StarshipKoaController from '../Controllers/StarshipKoaController';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/starships'
};

const StarshipKoaRouter: Router = new Router(routerOpts);

StarshipKoaRouter.get('/', StarshipKoaController.list);
StarshipKoaRouter.get('/:id', StarshipKoaController.show);

export default StarshipKoaRouter;
