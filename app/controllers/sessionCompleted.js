// var sessionData = require('./sessionData');

//creates and returns obj of session data 
//takes in parameter of bot conversation
module.exports = {
  sessionCompleted: (req, res) => {
    let sessionArr= req.body;
    // console.log("TCL: sessionAr", sessionArr)

    let responseSender = res;
    let steps = [];
    let dateComp = '';

    //maps through bot conversation and stores steps and times in array "steps"
    sessionArr.map((x, i) =>{
      if(x.sessionAttributes){
        let currentStep = x.sessionAttributes.currentStep;
        if(currentStep != "-1"){
          if(!currentStep){
            currentStep = "completed"
            dateComp = x.datetime.split(',')[0];
          }
          else{
            currentStep = Number(currentStep) + 1;
          }
          let time = x.datetime.split(',')[1].trim();
          let obj = {
            step: currentStep,
            time: time
          }
          steps.push(obj)
        }
      }
    })
    //gets time of the first step and last step
    let firstStepTime = steps[0].time.split(/[: ]/);
    let lastStepTime = steps[steps.length-1].time.split(/[: ]/)
    //defines difference in hours from start to finish 
    let hourDiff = '00';
    //checks if the hours are different
    if(firstStepTime[0] != lastStepTime[0]){
      firstStepTime = Number(firstStepTime[0])
      lastStepTime = Number(lastStepTime[0])
      //gets difference in hours from start to finish
      hourDiff = lastStepTime - firstStepTime;
      console.log(hourDiff)
    }
    //gets difference in minutes from start to finish
    let minDiff = Number(lastStepTime[1]) - Number(firstStepTime[1]);
    minDiff = String(minDiff)
    if (minDiff.length < 2){
      minDiff = `0${minDiff}`
    }
    //gets difference in seconds from start to finish
    let secDiff = Number(lastStepTime[2]) - Number(firstStepTime[2]);
    secDiff = String(secDiff)
    if(secDiff.length < 2){
      secDiff = `0${secDiff}`
    }
    //creates string of total time taken on assignment
    let totalTime = `${hourDiff}:${minDiff}:${secDiff}` 

    //object created of useful session data
    let sessionCompObj = {
      dateComp: dateComp,
      steps: steps,
      totalTime: totalTime
    }
    console.log("TCL: sessionCompObj", sessionCompObj)

    return responseSender.status(202).send(sessionCompObj);
  }
}


// console.log(sessionCompleted(sessionData));