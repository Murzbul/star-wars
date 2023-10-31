import Router from 'koa-router';
import FilmKoaController from '../Controllers/FilmKoaController';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/films'
};

const FilmKoaRouter: Router = new Router(routerOpts);

FilmKoaRouter.get('/', FilmKoaController.list);
FilmKoaRouter.get('/:id', FilmKoaController.show);

export default FilmKoaRouter;
