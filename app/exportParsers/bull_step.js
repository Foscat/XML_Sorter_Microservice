
///////// Gets steps: works for sb31038 \\\\\\\\\\\\\\\

BullStep_Parser = async xmlObj => {
    // console.log("TCL: xmlObj", xmlObj)
    // console.log(xmlObj.sb.lev1[1].steps.stepitem);
    const stepItems = xmlObj.sb.lev1[1].steps.stepitem;
    let stepArray = [];
    for(var step=0; step < stepItems.length; step++){
        if(typeof stepItems[step].step.para._text === typeof ""){
            stepArray.push(stepItems[step].step.para._text.trim());
        }
        if(typeof stepItems[step].step.para._text === typeof []){
            // for(let it=0; it < stepItems[step].step.para._text.length; it++){
                stepArray.push(stepItems[step].step.para._text[0].trim());
            // }
        }
    }
    // console.log("TCL: stepArray", stepArray);

    return {stepArray};
}

module.exports = BullStep_Parser