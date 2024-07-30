module.exports = (sequelize, DataTypes) =>
    sequelize.define('ProjectDetails', {
        orgName: DataTypes.STRING,
        location: DataTypes.STRING,
        startDate: DataTypes.STRING,
        endDate: DataTypes.STRING,
        projectName: DataTypes.STRING
    })