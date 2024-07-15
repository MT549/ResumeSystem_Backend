module.exports = (sequelize, DataTypes) =>
    sequelize.define('Resume', {
        resumeTitle: DataTypes.STRING,
        userEmail: DataTypes.STRING
    })