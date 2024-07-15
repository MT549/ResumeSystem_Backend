module.exports = (sequelize, DataTypes) =>
    sequelize.define('Skills', {
        Name: DataTypes.STRING,
        level: DataTypes.STRING
    })