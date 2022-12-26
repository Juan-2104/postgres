const dotenv = require('dotenv');
dotenv.config();
const logger = require('../../utils/bei-logger');
const beiConfigs = require('../../data/config.json')
// Configuración del pool de conexiones.
const pool = require('./connection-pool')

function GetFilter(filter) {
    return filter?`where ${filter}`:''
}

module.exports =  async function DeleteHandler(req, reply) {
    try {
        logger.debug(`Entrando al GET de la tabla`)
        logger.debug(`Conectando a la base de datos`)
        const dbclient = await pool.connect()
        req.query._id = `_id = '${req.params._id}'`
        let results = await dbclient.query(`DELETE from ${beiConfigs.table} ${GetFilter(req.query.filter)}`)
        logger.debug(`Ejecución de la consulta, EXITOSA. Filas ELIMINADAS: ${results.rowCount}`)
        dbclient.release()
        reply.code(200)
        reply.send({status: 'OK', action: 'delete',eliminated_rows: results.rowCount})
    } catch (error) {
        logger.error(`GetHandler::Ocurrio un error al intentar la operación:: ${error.message}`)
        reply.code(500)
        reply.send({
            errorMessage: error.message
        })
    }
}
