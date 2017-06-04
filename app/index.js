const koaApp = new (require('koa'))();
const koaViews = require('koa-views');
const serve = require('koa-static');

const router = require('./router');
require('./views/handlebars');

koaApp
	.use(koaViews(__dirname + '/views', {
		extension: 'hbs',
		map: {hbs: 'handlebars'}
	}))
	.use(router.routes())
	.use(router.allowedMethods())
;

koaApp.use(serve(__dirname + '/../public'));

koaApp.listen(3000);

console.log("Listening on :3000");
