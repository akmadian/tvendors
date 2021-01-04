module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/tvendors'
    : '/',
    configureWebpack: {
        devServer: {
            headers: { "Access-Control-Allow-Origin": "*" }
        }
    }
}