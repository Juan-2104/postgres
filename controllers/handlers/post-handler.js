const dotenv = require('dotenv');
dotenv.config();
const logger = require('../../utils/bei-logger');
const beiConfigs = require('../../data/config.json')
const {ValidaAPIKey, NotAuthorizedError} = require('../../utils/secutils');
// Configuración del pool de conexiones.
const pool = require('./connection-pool');
const { isJson, serializeValues } = require('../../utils/json-eval');

function GetFields(row) {
    return Object.keys(row).join(', ')
}

function GetParams(row) {
    let values = Object.values(row)
    let strList = []
    for (let i = 0; i < values.length; i++) {
        strList.push(`$${i + 1}`)
    }
    return strList.join(', ')
}

module.exports = async function PostHandler(req, reply) {
    try {
        await ValidaAPIKey(req)
        logger.debug(`Entrando al POST de la tabla`)
        logger.debug(`Conectando a la base de datos`)
        const dbclient = await pool.connect()
        let consulta = `INSERT INTO ${req.routeConfig.dbschema}.${req.routeConfig.table} (${GetFields(req.body)}) VALUES (${GetParams(req.body)})`
        logger.debug(`Consulta de insercion ${consulta}`)
        let values = serializeValues(req)
        logger.debug(`Valores de insercion ${values}`)
        let result = await dbclient.query({text: consulta, values: values})
        dbclient.release()
        reply.code(200)
        reply.send({status: 'OK', action: 'insert'})
    } catch (error) {
        logger.error(`PostHandler::Ocurrio un error al intentar la operación:: ${error.message}`)
        reply.code(error.status?error.status:500)
        reply.send({
            errorMessage: error.message
        })
    }

}
