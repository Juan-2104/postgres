const dotenv = require('dotenv');
dotenv.config();
const logger = require('../../utils/bei-logger');
const beiConfigs = require('../../data/config.json')
// Configuración del pool de conexiones.
const pool = require('./connection-pool')

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
        logger.debug(`Entrando al POST de la tabla`)
        logger.debug(`Conectando a la base de datos`)
        const dbclient = await pool.connect()
        let consulta = `INSERT INTO ${beiConfigs.table} (${GetFields(req.body)}) VALUES (${GetParams(req.body)})`
        logger.debug(`Consulta de insercion ${consulta}`)
        logger.debug(`Valores de insercion ${Object.values(req.body)}`)
        let result = await dbclient.query({text: consulta, values: Object.values(req.body)})
        dbclient.release()
        reply.code(200)
        reply.send({status: 'OK', action: 'insert'})
    } catch (error) {
        logger.error(`PostHandler::Ocurrio un error al intentar la operación:: ${error.message}`)
        reply.code(500)
        reply.send({
            errorMessage: error.message
        })
    }

}
