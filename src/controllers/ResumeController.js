const { where } = require('sequelize')
const {Resume, ResumeVersionControl, EducationDetails, Awards, Courses, ExperienceDetails, ExperienceNotes, Skills, ProjectDetails, ProjectNotes, Honors, HonorNotes,Leadership, LeadershipNotes, User} = require('../models')

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
                professionalSummary: req.body.professionalSummary,
                templaterType: req.body.templaterType,
                jobDescription: req.body.jobDescription,
                jobTitle: req.body.jobTitle,
                matchScore: req.body.matchScore
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

                req.body.leadershipDetails.forEach( async leader => {
                  const leadership = await Leadership.create({
                    ResumeVersionControlId: resumeVersionControl.id,
                    orgName: leader.orgName,
                    leadershipPosition: leader.leadershipPosition,
                    startDate : leader.startDate ,
                    endDate: leader.endDate
                  })
                  if(leadership){
                    console.log("Leadership Added.")
                    leader.leadershipNotes.forEach(async leaderNote => {
                      const leadershipNote = await LeadershipNotes.create({
                        description: leaderNote,
                        LeadershipId: leadership.id
                      })
                    });
                  }
                });

                req.body.honorDetails.forEach( async honorEle => {
                  const honor = await Honors.create({
                    ResumeVersionControlId: resumeVersionControl.id,
                    name: honorEle.name,
                    honorOrg: honorEle.honorOrg,
                    startDate : honorEle.startDate,
                    endDate: honorEle.endDate
                  })
                  if(honor){
                    console.log("Honor Added.")
                    honorEle.honorNotes.forEach(async honorNoteEle => {
                      const honorNote = await HonorNotes.create({
                        description: honorNoteEle,
                        HonorId: honor.id
                      })
                    });
                  }
                });

                req.body.projectDetails.forEach( async element10 => {
                  const project = await ProjectDetails.create({
                    ResumeVersionControlId: resumeVersionControl.id,
                    orgName: element10.orgName,
                    projectName: element10.projectName,
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
  
  async getUserResumes (req, res){
    try {
      var resume = await Resume.findAll({
        attributes: ['id', 'resumeTitle', 'UserId'],
        include: [
          {
            model: ResumeVersionControl,
            include: [
              {model: EducationDetails, include: [{model: Awards}, {model:Courses}]},
              {model: ExperienceDetails, include: [{model: ExperienceNotes}]},
              {model: ProjectDetails, include: [{model: ProjectNotes}]},
              {model: Honors, include: [{model: HonorNotes}]},
              {model: Leadership, include: [{model: LeadershipNotes}]},
              {model: Skills}
            ]
          }
        ],
        where: {
          UserId: req.params.id
        },
        order: [
          ['id', 'DESC'],
        ]
      })

      res.send(resume)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Some issue occured while getting resume.'
      })
    }
  },

  async deleteResumeVersion (req, res) {
    console.log("\n\n\n\n\n")
    try {
      var resumeOId;
      const resumeVerControl = await ResumeVersionControl.findOne({
        where: { id: req.params.id }
      })
      console.log("resumeVersionControl" + resumeVerControl)

      const resumeVersionControl = await ResumeVersionControl.destroy({
        where: { id: req.params.id}
      })

      await EducationDetails.destroy({
        where: { ResumeVersionControlId: null}
      })
      await ExperienceDetails.destroy({
        where: { ResumeVersionControlId: null}
      })
      await ProjectDetails.destroy({
        where: { ResumeVersionControlId: null}
      })
      await Honors.destroy({
        where: { ResumeVersionControlId: null}
      })
      await Leadership.destroy({
        where: { ResumeVersionControlId: null}
      })
      await Skills.destroy({
        where: { ResumeVersionControlId: null}
      })
      
      await Awards.destroy({
        where: { EducationDetailId : null}
      })
      await Courses.destroy({
        where: { EducationDetailId : null}
      })
      await ExperienceNotes.destroy({
        where: { ExperienceDetailId : null}
      })
      await ProjectNotes.destroy({
        where: { ProjectDetailId : null}
      })
      await HonorNotes.destroy({
        where: { HonorId : null}
      })
      await LeadershipNotes.destroy({
        where: { LeadershipId : null}
      })


      if(resumeVerControl != null){
        console.log("find resume")

        resumeId = resumeVerControl.dataValues.ResumeId
        const resumevers = await ResumeVersionControl.findAll({
          where: {ResumeId: resumeId}
        })
            
        console.log("1: "+resumevers)
            
        if(resumevers == null || (resumevers != null && resumevers.length < 1)){
          console.log(resumevers)
          const resumed = await Resume.destroy({
            where: { id: resumeId}
          })
          if(resumed != null){
            console.log("Deleted resume")
            res.send({status: "Success", deletedResume: resumeVersionControl})
          }
          else{
            console.log("Deleted resume")
            res.send({status: "Success", deletedResume: resumeVersionControl})
          }
              
        }else{
          console.log("Deleted resume")
          res.send({status: "Success", deletedResume: resumeVersionControl})
        }
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete resume: ' + err
      })
    }
  },

  async saveResumeVersion (req, res) {
    try {
        console.log(JSON.stringify(req.body))
        var resumeversions = await ResumeVersionControl.findOne({
          attributes: ['version'],
          where: {
            ResumeId: req.body.resumeID
          },
          order: [
            ['version', 'DESC'],
          ]
        })
        if(resumeversions != null){
            const resumeVersionControl = await ResumeVersionControl.create({
                resumeTitle: req.body.resumeTitle,
                ResumeId: req.body.resumeID,
                fullName: req.body.fullName,
                version: resumeversions.dataValues.version + 1,
                location: req.body.location,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                professionalSummary: req.body.professionalSummary,
                templaterType: req.body.templaterType,
                jobDescription: req.body.jobDescription,
                jobTitle: req.body.jobTitle,
                matchScore: req.body.matchScore
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

                req.body.leadershipDetails.forEach( async leader => {
                  const leadership = await Leadership.create({
                    ResumeVersionControlId: resumeVersionControl.id,
                    orgName: leader.orgName,
                    leadershipPosition: leader.leadershipPosition,
                    startDate : leader.startDate ,
                    endDate: leader.endDate
                  })
                  if(leadership){
                    console.log("Leadership Added.")
                    leader.leadershipNotes.forEach(async leaderNote => {
                      const leadershipNote = await LeadershipNotes.create({
                        description: leaderNote,
                        LeadershipId: leadership.id
                      })
                    });
                  }
                });

                req.body.honorDetails.forEach( async honorEle => {
                  const honor = await Honors.create({
                    ResumeVersionControlId: resumeVersionControl.id,
                    name: honorEle.name,
                    honorOrg: honorEle.honorOrg,
                    startDate : honorEle.startDate,
                    endDate: honorEle.endDate
                  })
                  if(honor){
                    console.log("Honor Added.")
                    honorEle.honorNotes.forEach(async honorNoteEle => {
                      const honorNote = await HonorNotes.create({
                        description: honorNoteEle,
                        HonorId: honor.id
                      })
                    });
                  }
                });

                req.body.projectDetails.forEach( async element10 => {
                  const project = await ProjectDetails.create({
                    ResumeVersionControlId: resumeVersionControl.id,
                    orgName: element10.orgName,
                    projectName: element10.projectName,
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
                  data:resumeversions.toJSON()
                })
            }
        }
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Some issue occured while saving story.'
      })
    }
  },
  
  async saveResumeComments (req, res) {
    try {
      const resume = await ResumeVersionControl.findOne({
        where: { id: req.params.id}
      })
      if(resume != null){
        console.log("found User")
        resume.comments = req.body.comments
        
        console.log("set resume comments")
        await resume.save()
        console.log("Update resume comments")
        res.send({status: "Success", updatedResume: resume})
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to update resume comments: ' + err
      })
    }
  },
}
