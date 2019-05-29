
let proxyUrl = 'https://jcloud.fubangyun.com';
let proxyUrlPort = 'https://jcloud.fubangyun.com'
let adminproxyUrlPort = 'http://172.16.15.201:11199/'
let regionport = ':9901/'


module.exports = {
    '/app': {
        target: proxyUrlPort,
        changeOrigin: true,
    },
}
