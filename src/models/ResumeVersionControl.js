module.exports = (sequelize, DataTypes) =>
    sequelize.define('ResumeVersionControl', {
        resumeTitle: DataTypes.STRING,
        fullName: DataTypes.STRING,
        location: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        email: DataTypes.STRING,
        professionalSummary: DataTypes.TEXT,
        templaterType: DataTypes.STRING,
        jobDescription: DataTypes.TEXT,
        jobTitle: DataTypes.STRING,
        version: DataTypes.INTEGER,
        matchScore: DataTypes.TEXT,
    })
