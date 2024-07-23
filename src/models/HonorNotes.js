module.exports = (sequelize, DataTypes) =>
    sequelize.define('HonorNotes', {
        description: DataTypes.STRING
    })