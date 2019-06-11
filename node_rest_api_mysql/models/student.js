'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Students', {
        first: DataTypes.STRING,
        last: DataTypes.STRING,
        number: { type: DataTypes.STRING, allowNull: false, unique: true},
        lat: DataTypes.STRING,
        lng: DataTypes.STRING,
        status:{ type: DataTypes.STRING, allowNull: false},
        password: DataTypes.STRING,
        lecture: DataTypes.STRING,
        device: DataTypes.STRING
    });

    Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')) {
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if (err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if (err) TE(err.message, true);
            user.password = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass
        if (!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if (err) TE(err);

        if (!pass) TE('invalid password');

        return this;
    }

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer " + jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};