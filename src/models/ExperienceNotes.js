module.exports = (sequelize, DataTypes) =>
    sequelize.define('ExperienceNotes', {
        description: DataTypes.STRING
    })