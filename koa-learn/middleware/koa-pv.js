// 中间件，统计访问信息
// ctx，是上下文，保存着请求和响应的信息

/*
function pv(ctx){
    console.log("middle - pv :",ctx.path);
}

module.exports = function(){
    return async function(ctx,next){
        pv(ctx);
        await next();
    }
}
*/

module.exports = async function (ctx,next){
    console.log("middle - pv :",ctx.path);
    await next();
};