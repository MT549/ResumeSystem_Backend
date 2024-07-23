module.exports = (sequelize, DataTypes) =>
    sequelize.define('Honors', {
        name: DataTypes.STRING,
        honorOrg: DataTypes.STRING,
        startDate: DataTypes.STRING,
        endDate: DataTypes.STRING
    })