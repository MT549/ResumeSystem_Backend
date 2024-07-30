module.exports = (sequelize, DataTypes) =>
    sequelize.define('Leadership', {
        orgName: DataTypes.STRING,
        startDate: DataTypes.STRING,
        endDate: DataTypes.STRING,
        leadershipPosition: DataTypes.STRING
    })