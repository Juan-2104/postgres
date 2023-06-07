const dotenv = require('dotenv');
dotenv.config();
const logger = require('../../utils/bei-logger');
const beiConfigs = require('../../data/config.json')
// Configuración del pool de conexiones.
const pool = require('./connection-pool');
const { serializeValues } = require('../../utils/json-eval');

function GetFields(row) {
    let pairs = Object.keys(row).map( (key, idx) => {
        return  `${key} = $${idx + 1}`
    })
    return pairs.join(', ')
}

function GetFilter(filter) {
    return filter?`where ${filter}`:''
}

module.exports =  async function PutHandler(req, reply) {
    try {
        logger.debug(`Entrando al PUT de la tabla`)
        logger.debug(`Conectando a la base de datos`)
        const dbclient = await pool.connect()
        // req.query.filter = `${beiConfigs.identifier} = '${req.params._id}'`
        let consulta = `UPDATE ${req.routeConfig.table} SET ${GetFields(req.body)} where ${req.routeConfig.identifier} = '${req.params._id}'`
        logger.debug(`Consulta de insercion ${consulta}`)
        let values = serializeValues(req)
        logger.debug(`Valores de actualización ${values}`)
        let result = await dbclient.query({text: consulta, values: values})
        dbclient.release()
        reply.code(200)
        reply.send({status: 'OK', action: 'update'})
    } catch (error) {
        logger.error(`PostHandler::Ocurrio un error al intentar la operación:: ${error.message}`)
        reply.code(500)
        reply.send({
            errorMessage: error.message
        })
    }
}
