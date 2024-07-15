const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize,Sequelize.DataTypes)
    db[model.name] = model
  })


  db.sequelize = sequelize
  db.Sequelize = Sequelize
  
  db.User.hasMany(db.Session)
  db.Session.belongsTo(db.User)
  //db.User.hasMany(db.EducationDetails)
  //db.EducationDetails.belongsTo(db.User)
  //db.User.hasMany(db.ExperienceDetails)
  //db.ExperienceDetails.belongsTo(db.User)
  //db.User.hasMany(db.Skills)
  //db.Skills.belongsTo(db.User)
  db.User.hasMany(db.Resume)
  db.Resume.belongsTo(db.User)

  db.Resume.hasMany(db.ResumeVersionControl)
  db.ResumeVersionControl.belongsTo(db.Resume)

  db.ResumeVersionControl.hasMany(db.EducationDetails)
  db.EducationDetails.belongsTo(db.ResumeVersionControl)
  db.ResumeVersionControl.hasMany(db.ExperienceDetails)
  db.ExperienceDetails.belongsTo(db.ResumeVersionControl)
  db.ResumeVersionControl.hasMany(db.Skills)
  db.Skills.belongsTo(db.ResumeVersionControl)
  db.ResumeVersionControl.hasMany(db.ProjectDetails)
  db.ProjectDetails.belongsTo(db.ResumeVersionControl)

  db.EducationDetails.hasMany(db.Awards)
  db.Awards.belongsTo(db.EducationDetails)
  db.EducationDetails.hasMany(db.Courses)
  db.Courses.belongsTo(db.EducationDetails)

  db.ExperienceDetails.hasMany(db.ExperienceNotes)
  db.ExperienceNotes.belongsTo(db.ExperienceDetails)

  db.ProjectDetails.hasMany(db.ProjectNotes)
  db.ProjectNotes.belongsTo(db.ProjectDetails)

  module.exports = db