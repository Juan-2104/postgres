const dotenv = require('dotenv');
dotenv.config();
const logger = require('../../utils/bei-logger');
const beiConfigs = require('../../data/config.json')
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
        logger.debug(`Entrando al GET de la tabla`)
        logger.debug(`Conectando a la base de datos`)
        const dbclient = await pool.connect()
        req.query._id = `_id = '${req.params._id}'`
        let results = await dbclient.query(`select ${GetFields(req.query.fields)} from ${beiConfigs.table} ${GetFilter(req.query.filter)}`)
        logger.debug(`Ejecución de la consulta, EXITOSA. Filas obtenidas: ${results.rowCount}`)
        dbclient.release()
        reply.code(200)
        reply.send(results.rows)
    } catch (error) {
        logger.error(`GetHandler::Ocurrio un error al intentar la operación:: ${error.message}`)
        reply.code(500)
        reply.send({
            errorMessage: error.message
        })
    }
}
