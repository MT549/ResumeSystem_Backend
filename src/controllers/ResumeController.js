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
                  if(education){
                    console.log("Education Added.")
                    console.log("element : " + JSON.stringify(element))
                    console.log("element : " + element.awards)
                    element.awards.forEach(async element1 => {
                      const award = await Awards.create({
                        description: element1,
                        EducationDetailId: education.id
                      })
                    });
                    element.courses.forEach(async element2 => {
                      const course = await Courses.create({
                        description: element2,
                        EducationDetailId: education.id
                      })
                    });
                  }
                });

                req.body.experienceDetails.forEach( async element3 => {
                  const experience = await ExperienceDetails.create({
                    ResumeVersionControlId: resumeVersionControl.id,
                    orgName: element3.orgName,
                    roleName: element3.roleName,
                    location: element3.location,
                    startDate : element3.startDate ,
                    endDate: element3.endDate
                  })
                  if(experience){
                    console.log("Education Added.")
                    element3.experienceNotes.forEach(async element4 => {
                      const experienceNote = await ExperienceNotes.create({
                        description: element4,
                        ExperienceDetailId: experience.id
                      })
                    });
                  }
                });

                req.body.projectDetails.forEach( async element10 => {
                  const project = await ProjectDetails.create({
                    ResumeVersionControlId: resumeVersionControl.id,
                    orgName: element10.orgName,
                    location: element10.location,
                    startDate : element10.startDate ,
                    endDate: element10.endDate
                  })
                  if(project){
                    console.log("Project Added.")
                    element10.projectNotes.forEach(async element4 => {
                      const projectNote = await ProjectNotes.create({
                        description: element4,
                        ProjectDetailId: project.id
                      })
                    });
                  }
                });

                req.body.skills.forEach( async element5 => {
                  const skill = await Skills.create({
                    ResumeVersionControlId: resumeVersionControl.id,
                    Name : element5.name ,
                    level : element5.level 
                  })
                });

                res.send({
                  status:"OK",
                  data:resume.toJSON()
                })
            }
        }
        else{
            console.log(err)
            res.status(400).send({
                error: 'Some issue occured while saving story.'
            })
        }
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Some issue occured while saving story.'
      })
    }
  },
}
