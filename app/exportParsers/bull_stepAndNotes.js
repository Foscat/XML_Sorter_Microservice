// const converter = require("xml-js");

//////////////// Steps, notes and model list:  works for sb42073 //////////////////////

var BullStepNote_Parser = async xmlObj => {


    var stepAndNotes= {
        steps:[],
        notes:[]
    };

    var list = xmlObj.sb.lev1[1].steps.stepitem;
    for(var i=0; i< list.length; i++){

        if(list[i].note){
            // console.log("note")
            stepAndNotes.notes.push(list[i].note.para._text)
        }

        if(list[i].step){

            // console.log("step")

            if(typeof list[i].step.para._text === typeof []){
                // console.log("step array")

                for(var ti=0; ti < list[i].step.para._text.length; ti++){

                    stepAndNotes.steps.push(list[i].step.para._text[ti]);

                }

                continue;
            }

            stepAndNotes.steps.push(list[i].step.para._text);
        }


    }
    // console.log("stepAndNotes", stepAndNotes);

    var bullitenObj = {
        title: xmlObj.sb.lev1[0].lev1title._text,
        generalInfo: []
    }
    for(var t=0; t < xmlObj.sb.lev1[0].para.length; t++){
        bullitenObj.generalInfo.push(xmlObj.sb.lev1[0].para[t]._text)
    }
    // console.log("TCL: bullitenObj", bullitenObj)

    // Get all models this bulliten applies to
    const modelList= xmlObj.sb.modellist.model
    let modelArray = [];
    for(var model=0; model < modelList.length; model++){
        modelArray.push(modelList[model]._text);
    }
    // console.log("Model Array", modelArray);

    var compleatedParse = {
        header: bullitenObj,
        models: modelArray,
        info: stepAndNotes
    };
    // console.log("TCL: compleatedParse", compleatedParse);
    return compleatedParse;
}

module.exports = BullStepNote_Parser;