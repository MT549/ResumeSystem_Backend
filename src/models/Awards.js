module.exports = (sequelize, DataTypes) =>
    sequelize.define('Awards', {
        description: DataTypes.STRING
    })