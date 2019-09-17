// const xmlFetchService = "https://young-tundra-61907.herokuapp.com";
const converter = require("xml-js");
const fetch = require("node-fetch");

// Custom imports
const BullStep_Parser = require("../exportParsers/bull_step");
const BullStepNote_Parser = require("../exportParsers/bull_stepAndNotes");
const BullStepRef_Parser = require("../exportParsers/bull_stepAndRef");
const DynamicBulletinParser = require("../exportParsers/dynamic");

module.exports = {
    getFile: (req,res) => {
        let fileString = req.params.fileString;
        let responseSender = res;
        console.log("**TCL: getFile -> fileString**", fileString);
    
        fetch(`https://young-tundra-61907.herokuapp.com/${fileString}`).then(res => {
            return res.text();
        })
        .then(returnString => {
            // console.log("**TCL: getFile -> returnString**", returnString);
            let convertedFile = converter.xml2js(returnString, {compact: true, spaces: 4});
    
            try{
                if(fileString === "sb31038"){
                    BullStep_Parser(convertedFile).then(sortedInfo=>{
                        return responseSender.status(202).send(sortedInfo);
                    })
                }
                if(fileString === "sb35034"){
                    BullStepRef_Parser(convertedFile).then(sortedInfo=>{
                        return responseSender.status(202).send(sortedInfo);
                    })
                }
                if(fileString === "sb42073"){
                    BullStepNote_Parser(convertedFile).then(sortedInfo=>{
                        return responseSender.status(202).send(sortedInfo);
                    });
                }
                else{
                    DynamicBulletinParser(convertedFile).then(sortedInfo=>{
                        return responseSender.status(202).send(sortedInfo);
                    })
                }
            }
            catch{
                // responseSender.status(404).send({problem: "The file name you send is was not reconized", attemptedFile: returnString});
                console.log("Catch function hit");
                // return "";
            }
    
        });
    }
};