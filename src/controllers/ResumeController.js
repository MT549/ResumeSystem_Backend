const { where } = require('sequelize')
const {Resume, ResumeVersionControl, EducationDetails, Awards, Courses, ExperienceDetails, ExperienceNotes, Skills, ProjectDetails, ProjectNotes} = require('../models')

module.exports = {
  async saveResume (req, res) {
    try {
        console.log(JSON.stringify(req.body))

        const resume = await Resume.create({
            resumeTitle: req.body.resumeTitle,
            UserId: req.body.UserID
        })

        if(resume){
            console.log("resume Create.")
            const resumeVersionControl = await ResumeVersionControl.create({
                resumeTitle: req.body.resumeTitle,
                ResumeId: resume.id,
                fullName: req.body.fullName,
                version: 1,
                location: req.body.location,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                websiteURL: req.body.websiteURL,
                professionalSummary: req.body.professionalSummary,
                templaterType: req.body.templaterType
            })
            if(resumeVersionControl){
                console.log("Resume Version control Create.")
                req.body.educationDetails.forEach( async element => {
                  const education = await EducationDetails.create({
                    instituteName: element.instituteName,
                    ResumeVersionControlId: resumeVersionControl.id,
                    degree: element.degree,
                    location: element.location,
                    startDate : element.startDate ,
                    endDate: element.endDate,
                    gpa: element.gpa,
                  })