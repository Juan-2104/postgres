var crypto = require('crypto')
const resizedIV = Buffer.allocUnsafe(16);
const iv = crypto.createHash('sha256').update('myHashedIV').digest();

function EncryptData( text,key ) {
    const derivedKey = crypto.createHash('sha256').update(key).digest();
    const cipher = crypto.createCipheriv('aes256', derivedKey, resizedIV);
    let salida = cipher.update(text, 'utf-8', 'base64')
    salida+=cipher.final('base64')
    return salida
}

function DecryptData( text, key) {
    const derivedKey = crypto.createHash('sha256').update(key).digest();
    const decipher = crypto.createDecipheriv('aes256', derivedKey, resizedIV);
    let salida = decipher.update(text, 'base64', 'utf-8')
    salida+=decipher.final('utf-8')
    return salida
}

module.exports = {
    EncryptData,
    DecryptData
}