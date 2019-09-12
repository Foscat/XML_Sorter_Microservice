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
    // try {
        for(let i=0; i < xmlObj.sb.lev1.length; i++){

            // Exclude info 
            if(xmlObj.sb.lev1[i].lev1title._text === "Warranty"|| xmlObj.sb.lev1[i].lev1title._text === "General Information"){
                console.log(`Skipped iteration because of lev title ${xmlObj.sb.lev1[i].lev1title._text}`);
                continue;
            }
            if(xmlObj.sb.lev1[i].lev1title._text === "General Safety Precautions"){
                console.log(`There are safety precautions here (iteration num:${i}, text:${xmlObj.sb.lev1[i].lev1title._text})`);
                fileInfo.steps.push(new StepObject(xmlObj.sb.lev1[i].lev1title._text, "in general info slot", "the title of the block"));
                // continue;
            }
            else{
                console.log(`There is someting differant here (iteration num:${i}, text:${xmlObj.sb.lev1[i].lev1title._text})`);
                fileInfo.steps.push(new StepObject(xmlObj.sb.lev1[i].lev1title._text, "Info", "for all other things"));
                
                // continue;
            }
            // fileInfo.steps.push(new StepObject("Doin", "ya", "mom!"));
        }
    // } catch (error) {
    //     console.log(error);
    //     fileInfo.steps.push(new StepObject("There was", "a error", "in the try"));
    // }

    

    return fileInfo;
}

module.exports = DynamicBulletinParser;