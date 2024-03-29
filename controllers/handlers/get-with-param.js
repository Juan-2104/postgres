const dotenv = require('dotenv');
dotenv.config();
const logger = require('../../utils/bei-logger');
const beiConfigs = require('../../data/config.json')
const {ValidaAPIKey, NotAuthorizedError} = require('../../utils/secutils');
// Configuración del pool de conexiones.
const pool = require('./connection-pool')

function GetFields(fields){
    return fields?fields:'*'
}

function GetFilter(filter) {
    return filter?`where ${filter}`:''
}

module.exports =  async function GetWithParamsHandler(req, reply) {
    try {
        await ValidaAPIKey(req)
        logger.debug(`Entrando al GET de la tabla`)
        logger.debug(`Conectando a la base de datos`)
        logger.debug(`ID Solicitado: ${req.params['_id']}`)
        const dbclient = await pool.connect()
        // req.query.filter = `${beiConfigs.identifier} = '${req.params._id}'`
        let consulta = `select ${GetFields(req.query.fields)} from ${req.routeConfig.dbschema}.${req.routeConfig.table}  where ${req.routeConfig.identifier} = $1`
        logger.debug(`Consulta de insercion ${consulta}`)
        let results = await dbclient.query(consulta, [req.params[req.routeConfig.identifier]])
        logger.debug(`Ejecución de la consulta, EXITOSA. Filas obtenidas: ${results.rowCount}`)
        dbclient.release()
        reply.code(200)
        reply.send(results.rows)
    } catch (error) {
        logger.error(`GetHandler::Ocurrio un error al intentar la operación:: ${error.message}`)
        reply.code(error.status?error.status:500)
        reply.send({
            errorMessage: error.message
        })
    }
}
