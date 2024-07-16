module.exports = (sequelize, DataTypes) =>
    sequelize.define('Resume', {
        resumeTitle: DataTypes.STRING
    })