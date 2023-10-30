import Router from 'koa-router';
import ItemKoaController from '../Controllers/ItemKoaController';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/items'
};

const ItemKoaRouter: Router = new Router(routerOpts);

ItemKoaRouter.post('/', ItemKoaController.save);
ItemKoaRouter.get('/', ItemKoaController.list);
ItemKoaRouter.get('/:id', ItemKoaController.show);
ItemKoaRouter.put('/:id', ItemKoaController.update);
ItemKoaRouter.delete('/:id', ItemKoaController.remove);

export default ItemKoaRouter;
