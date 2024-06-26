const AuthenticationController = require('./controllers/AuthenticationController')
const StoryController = require('./controllers/StoryController')
const ParameterController = require('./controllers/ParameterController')
const { authSessionRoute} = require('./controllers/sessionController')
var router = require("express").Router();

module.exports=(app) => {
    
    app.use("/", router)
}
