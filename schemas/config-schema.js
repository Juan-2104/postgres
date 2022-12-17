



const FieldConfSchema = {
    type: 'object',
    properties: {
        id: { type: 'int' },
        name: { type: 'string' },
        description: { type: 'string' },
        is_auto: { type: 'integer' },
        is_key: { type: 'integer' },
        is_viewable: { type: 'integer' },
        table_id: { type: 'string' }
    }
}

const MetaDataSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', },
        name: { type: 'string' },
        description: { type: 'string' },
        xposer_server: { type: 'string' },
        serial_number: { type: 'string' }
    }
}

const TableConfSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        table: { type: 'string' },
        description: { type: 'string' },
        database: { type: 'string' },
        host: { type: 'string' },
        port: { type: 'integer' },
        user: { type: 'string' },
        password: { type: 'string' },
        // fields: {
        //     type: 'array',
        //     items:  FieldConfSchema
        // },
        metadata: MetaDataSchema
    },
    required: [
        'table',
        'database',
        'host',
        'port',
        'user',
        'password',
        // 'fields',
        'metadata'
    ]
}

const GetListConfigSchema = {
    schema: {
        description: 'Obtener listado de configuraciones para este tipo especifico de integración',
        tags: ['BEI-Configuration','config'],
    }
}

const DeleteConfigSchema = {
    schema: {
        description: 'Eliminación de una configuración específica para este tipo especifico de integración',
        tags: ['BEI-Configuration','config'],
        params: {
            type: 'object',
            properties: {
                idconf: { type: 'string' }
            }
        }
    }
}

const PostConfigSchema = {
    schema: {
        description: 'Creación de objetos de configuración para este tipo específico de integración',
        tags: ['BEI-Configuration','config'],
        body: TableConfSchema,
    }
}

const PutConfigSchema = {
    schema: {
        description: 'Actualización de objetos de configuración para este tipo específico de integración',
        tags: ['BEI-Configuration','config'],
        params: {
            type: 'object',
            properties: {
                idconf: {
                    type: 'string',
                    description: 'ID de configuración'
                }
            }
        },
        body: TableConfSchema
    }

}

module.exports = {
    GetListConfigSchema,
    PostConfigSchema,
    PutConfigSchema,
    DeleteConfigSchema
}