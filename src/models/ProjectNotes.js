module.exports = (sequelize, DataTypes) =>
    sequelize.define('ProjectNotes', {
        description: DataTypes.STRING
    })