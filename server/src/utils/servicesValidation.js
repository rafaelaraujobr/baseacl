class Validation {
    static validateEmail(value, msg) {
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value.match(mailformat)) throw msg;
    }

    static validateCPF(cpf, msg) {
        let sum, rest;
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length != 11 || /^(\d)\1{10}$/.test(cpf)) throw msg;
        sum = 0;
        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        rest = (sum * 10) % 11;
        if ((rest == 10) || (rest == 11)) rest = 0;
        if (rest != parseInt(cpf.substring(9, 10))) throw msg;
        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        rest = (sum * 10) % 11;
        if ((rest == 10) || (rest == 11)) rest = 0;
        if (rest != parseInt(cpf.substring(10, 11))) throw msg;
    }

    static existsOrError(value, msg) {
        if (!value) throw msg;
        if (Array.isArray(value) && value.length === 0) throw msg;
        if (typeof value == "string" && !value.trim()) throw msg;
    }

    static notExistsOrError(value, msg) {
        try {
            Validation.existsOrError(value, msg);
        } catch (msg) {
            return;
        }
        throw msg;
    }

    static equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg;
    }
}
module.exports = Validation;