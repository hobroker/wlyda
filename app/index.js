const app = new (require('koa'))();
const koaViews = require('koa-views');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

require('koa-validate')(app);
const router = require('./router');
require('./views/handlebars');
require('./helpers/db');

app
    .use(koaViews(__dirname + '/views', {
        extension: 'hbs',
        map: {hbs: 'handlebars'}
    }))
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
;

app.use(serve(__dirname + '/../public'));

app.listen(3001);

console.log("Listening on :3001");
