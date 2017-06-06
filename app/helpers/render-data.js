const jwt = require('./jwt');

module.exports = async function (ctx, data = {}) {
    data.title = "Wlyda";
    if (ctx.cookies.get('user')) {
        data.user = jwt.decode(ctx.cookies.get('user'));
    }
    return data;
};
