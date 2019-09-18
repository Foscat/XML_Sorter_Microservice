// const xmlFetchService = "https://young-tundra-61907.herokuapp.com";
const converter = require("xml-js");
const fetch = require("node-fetch");

// Custom imports
const DynamicBulletinParser = require("../exportParsers/dynamic");

module.exports = {
    getFile: (req,res) => {
        let fileString = req.params.fileString;
        let responseSender = res;
        console.log("**TCL: getFile -> fileString**", fileString);
    
        fetch(`https://intense-refuge-46310.herokuapp.com/${fileString}`).then(res => {
            return res.text();
        })
        .then(returnString => {
            // console.log("**TCL: getFile -> returnString**", returnString);
            let convertedFile = converter.xml2js(returnString, {compact: true, spaces: 4});
    
            try{ 
                DynamicBulletinParser(convertedFile).then(sortedInfo=>{
                    return responseSender.status(202).send(sortedInfo);
                })
            }
            catch{
                // responseSender.status(404).send({problem: "The file name you send is was not reconized", attemptedFile: returnString});
                console.log("Catch function hit");
                return responseSender.status(500).send({error:"Something went wrong."});
            }
    
        });
    }
};