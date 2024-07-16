module.exports = (sequelize, DataTypes) =>
    sequelize.define('ExperienceDetails', {
        orgName: DataTypes.STRING,
        roleName: DataTypes.STRING,
        location: DataTypes.STRING,
        startDate: DataTypes.STRING,
        endDate: DataTypes.STRING
    })
  