const validateNum = (numero) => {
    if (typeof numero !== "number" || isNaN(numero) || numero < 0) {
        throw new Error("Se espera que el parámetro dado sea un número no negativo");
    }
    return numero;
}

const validateString = (string) => {
    if (typeof string !== "string" || !string.trim().length) {
        throw new Error("Se espera que el parametro dado sea un string no vacío");
    }
    return string;
} 
module.exports = {
    validateNum,
    validateString
}