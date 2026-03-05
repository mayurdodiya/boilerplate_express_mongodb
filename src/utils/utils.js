const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config/config');

module.exports = {
    create: async (model, data, additional = undefined) => {
        return model.create(data, additional || undefined)
    },
    update: async (model, query, data, additional = undefined) => {
        return model.update(data, query, additional || undefined)
    },
    delete: async (model, query, additional = undefined) => {
        return model.destroy(query, additional || undefined)
    },
    get: async (model, query, additional = undefined) => {
        return model.findOne(query, additional || undefined)
    },
    getAll: async (model, query) => {
        return model.findAll({ ...query })
    },
    rawQuery: async (model, query, options) => {
        return model.findAll(query, options)
    },
    getById: async (model, id) => {
        return model.findByPk(id)
    },
    getAndCountAll: async (model, query, limit, offset) => {
        return model.findAndCountAll({ ...query, limit, offset })
    },
    generateHashPassword: async (myPassword, salt) => {
        return await bcrypt.hashSync(myPassword, salt)
    },
    passwordCompare: async (myPassword, hash, additional = undefined) => {
        return await bcrypt.compareSync(myPassword, hash, additional || undefined)
    },
    generateToken: (user_id, role_id) => {
        let token = jwt.sign({ user_id: user_id, role_id: role_id }, config.JWT_SECRET, { expiresIn: config.EXPIRES_IN });
        return token;
    },
    decodeToken: ({ token }) => {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        return decoded;
    },
    getPagination: (page, size) => {
        const limit = size ? +size : 10;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    },
    getPagingData: (alldata, page, limit) => {
        const { count: totalItems, rows: data } = alldata;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, data, totalPages, currentPage };
    },
};
