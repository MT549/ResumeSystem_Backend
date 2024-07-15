module.exports = (sequelize, DataTypes) =>
    sequelize.define('EducationDetails', {
        instituteName: DataTypes.STRING,
        degree: DataTypes.STRING,
        location: DataTypes.STRING,
        startDate: DataTypes.STRING,
        endDate: DataTypes.STRING,
        gpa: DataTypes.STRING,
    })
  