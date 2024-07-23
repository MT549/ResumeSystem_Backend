module.exports = (sequelize, DataTypes) =>
    sequelize.define('ResumeVersionControl', {
        resumeTitle: DataTypes.STRING,
        fullName: DataTypes.STRING,
        location: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        email: DataTypes.STRING,
        professionalSummary: DataTypes.TEXT,
        templaterType: DataTypes.STRING,
        version: DataTypes.INTEGER,
    })