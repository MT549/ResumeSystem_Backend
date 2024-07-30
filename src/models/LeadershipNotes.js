module.exports = (sequelize, DataTypes) =>
    sequelize.define('LeadershipNotes', {
        description: DataTypes.STRING
    })