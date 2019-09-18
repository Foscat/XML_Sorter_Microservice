// This parser is built to take in any service bulliten and return a consistant output
DynamicBulletinParser = async xmlObj => {
    // console.log("TCL: xmlObj", xmlObj);

    let fileInfo = {
        steps: []
    }
    function StepObject(step, note, warning){
        this.step = step;
        this.note = note;
        this.warning = warning;
    };
    // let sampleStep = new StepObject("this is a step", "this is my note", "this is a warning");
    // console.log("**TCL: lev 1 keys**", xmlObj);
    try {
        for(let i=0; i < xmlObj.sb.lev1.length; i++){

            // Exclude info 
            if(xmlObj.sb.lev1[i].lev1title._text === "Warranty"|| xmlObj.sb.lev1[i].lev1title._text === "General Information"){
                console.log(`Skipped iteration because of lev title ${xmlObj.sb.lev1[i].lev1title._text}`);
                continue;
            }
            if(xmlObj.sb.lev1[i].lev1title._text === "General Safety Precautions"){
                console.log(`There are safety precautions here (iteration num:${i}, text:${xmlObj.sb.lev1[i].lev1title._text})`);
                fileInfo.steps.push(new StepObject(xmlObj.sb.lev1[i].lev1title._text, "there are no steps here", "just warnings"));
                // continue;
            }
            else{
                console.log(`There is someting differant here (iteration num:${i}, text:${xmlObj.sb.lev1[i].lev1title._text})`);
                fileInfo.steps.push(new StepObject(xmlObj.sb.lev1[i].lev1title._text, "Info", "potental step slot"));
                // console.log("Who der?", xmlObj.sb.lev1[i].steps.stepitem);

                if(xmlObj.sb.lev1[i].hasOwnProperty("steps")){
                    var stepArray = [];
                    var text; 
                    var trimmed;
                    for(var s=0; s < xmlObj.sb.lev1[i].steps.stepitem.length; s++){
                        // console.log("Got some text!", xmlObj.sb.lev1[i].steps.stepitem[s].step.para._text);
                
                        if(typeof xmlObj.sb.lev1[i].steps.stepitem[s].note  === typeof "string"){
                            text = xmlObj.sb.lev1[i].steps.stepitem[s].note.para._text;
                            trimmed = text.replace(/(\r\n|\n|\r)/g, ' ').trim();
                            stepArray.push(trimmed);
                        }
                        if(typeof xmlObj.sb.lev1[i].steps.stepitem[s].note  === typeof []){
                            text = xmlObj.sb.lev1[i].steps.stepitem[s].note.para._text[0].trim()+xmlObj.sb.lev1[i].steps.stepitem[s].note.para._text[1];
                            trimmed = text.replace(/(\r\n|\n|\r)/g, ' ').trim();
                            stepArray.push(trimmed);
                        }
                        if(typeof xmlObj.sb.lev1[i].steps.stepitem[s].step.para._text  === typeof "string"){
                            text = "Step: "+xmlObj.sb.lev1[i].steps.stepitem[s].step.para._text;
                            trimmed = text.replace(/(\r\n|\n|\r)/g, ' ').trim();
                            stepArray.push(trimmed);
                        }
                        if(typeof xmlObj.sb.lev1[i].steps.stepitem[s].step.para._text  === typeof []){
                            text = "Step: "+xmlObj.sb.lev1[i].steps.stepitem[s].step.para._text[0].trim()+xmlObj.sb.lev1[i].steps.stepitem[s].step.para._text[1];
                            trimmed = text.replace(/(\r\n|\n|\r)/g, ' ').trim();
                            stepArray.push(trimmed);
                        }
                    }

                    fileInfo.stepArray = stepArray;
                    
                }
                
            }

        }
    } catch (error) {
        console.log(error);
        fileInfo.steps.push(new StepObject("There was", "a error", "in the try"));
    }

    

    return fileInfo;
}

module.exports = DynamicBulletinParser;