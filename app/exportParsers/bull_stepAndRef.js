

/////////// Get service bulliten step info: works for sb35034 \\\\\\\\\\\\\\ 

var BullStepRef_Parser = async xmlObj => {

    var stepGroup = xmlObj.sb.lev1[1].steps.stepitem
    // console.log("TCL: stepGroup", stepGroup)
    var blockArray =[];
    for(var block = 0; block < stepGroup.length; block++){
        var stepInfo = {
            step: stepGroup[block].step.para._text[0],
            refrenceInfo: {
                collection: stepGroup[block].step.para.extxref._attributes.COLLECTION,
                book: stepGroup[block].step.para.extxref._attributes.BOOKNAME,
                where: stepGroup[block].step.para.extxref._text
            }
        }
        blockArray.push(stepInfo);
    }
    // console.log("BlockArray", blockArray);

    var bullitenObj = {
        title: xmlObj.sb.lev1[0].lev1title._text,
        generalInfo: xmlObj.sb.lev1[0].para._text,
        note: xmlObj.sb.lev1[0].note.para._text
    }
    // console.log("TCL: bullitenObj", bullitenObj)

    // Get all models this bulliten applies to
    const modelList= xmlObj.sb.modellist.model
    let modelArray = [];
    for(var model=0; model < modelList.length; model++){
        modelArray.push(modelList[model]._text);
    }
    // console.log("Model Array", modelArray);

    ///-----------------------------------\\\
    var fullBulliten= {
        header: bullitenObj,
        models: modelArray,
        info: blockArray
    }
    // console.log("TCL: fullBulliten", fullBulliten);

    return fullBulliten;
}

module.exports = BullStepRef_Parser;