const sqlite3 = require('sqlite3')

// let confdb = new sqlite3.Database('../../data/configs.db')

async function GetListConfig(req,reply){
    try{
        req.body
        reply.code(200)
        reply.send({
            message: 'En construcción'
        })
    }catch(error) {
        reply.code(500)
        reply.send({
            errorMessage: error.message
        })
    }
}

async function PostConfig(req,reply){
    try{
        reply.code(200)
        reply.send({
            message: 'En construcción'
        })
    }catch(error) {
        reply.code(500)
        reply.send({
            errorMessage: error.message
        })
    }
}

async function PutConfig(req,reply){
    try{
        reply.code(200)
        reply.send({
            message: 'En construcción'
        })
    }catch(error) {
        reply.code(500)
        reply.send({
            errorMessage: error.message
        })
    }
}

async function DeleteConfig(req,reply){
    try{
        reply.code(200)
        reply.send({
            message: 'En construcción'
        })
    }catch(error) {
        reply.code(500)
        reply.send({
            errorMessage: error.message
        })
    }
}

module.exports = {
    GetListConfig,
    PostConfig,
    PutConfig,
    DeleteConfig
}