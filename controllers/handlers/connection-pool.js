const dotenv = require('dotenv');
dotenv.config();
const logger = require('../../utils/bei-logger');
const beiConfigs = require('../../data/config.json')
// Configuración de la conexion de POSTGRES
const { Pool } = require('pg');
const { DecryptData } = require('../../utils/crypto-utils');

// Configuración del pool de conexiones.
module.exports = new Pool({
    user: beiConfigs.user,
    password: DecryptData( beiConfigs.password, beiConfigs.securedKey),
    database: beiConfigs.database,
    host: beiConfigs.host,
    port: beiConfigs.port
})