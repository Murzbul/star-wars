import Router from 'koa-router';
import PeopleKoaController from '../Controllers/PeopleKoaController';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/people'
};

const PeopleKoaRouter: Router = new Router(routerOpts);

PeopleKoaRouter.post('/', PeopleKoaController.save);
PeopleKoaRouter.get('/', PeopleKoaController.list);
PeopleKoaRouter.get('/:id', PeopleKoaController.show);

export default PeopleKoaRouter;
