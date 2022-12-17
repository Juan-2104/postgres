const { PostConfig, GetListConfig, PutConfig, DeleteConfig } = require("../controllers/config/configs");
const { PostAes256Crypto, PostAes256DeCrypto, PostHashMD5, PostHashSha256 } = require("../controllers/config/data-hashinhg");
const HealthCheck = require("../controllers/config/healthcheck-controller");
const { PostConfigSchema, PutConfigSchema, DeleteConfigSchema, GetListConfigSchema } = require("../schemas/config-schema");

module.exports = async function (fastify, options, done) {
    fastify.get('/health', HealthCheck);
    fastify.post('/sync/encrypt', PostAes256Crypto);
    fastify.post('/sync/decrypt', PostAes256DeCrypto);
    fastify.post('/checksum/md5', PostHashMD5);
    fastify.post('/checksum/sha256', PostHashSha256);
    // Servicios de configuración del BEI
    fastify.post('/config', PostConfigSchema, PostConfig);
    fastify.get('/config', GetListConfigSchema, GetListConfig);
    fastify.put('/config/:idconf', PutConfigSchema, PutConfig);
    fastify.delete('/config/:idconf', DeleteConfigSchema, DeleteConfig);
    done();
}