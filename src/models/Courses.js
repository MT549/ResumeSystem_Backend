module.exports = (sequelize, DataTypes) =>
    sequelize.define('Courses', {
        description: DataTypes.STRING
    })