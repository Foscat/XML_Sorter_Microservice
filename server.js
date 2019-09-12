// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./app/routes")
const app = express();
const PORT = process.env.PORT || 3001;

// Use express
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

// // Have express use static assets
if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// Have express use routes
app.use(routes);

// const xmlFetchService = "https://young-tundra-61907.herokuapp.com";

// getFile = async (fileString, responseSender) => {
//     console.log("**TCL: getFile -> fileString**", fileString);

//     fetch(`${xmlFetchService}/${fileString}`).then(res => {
//             return res.text();
//     })
//     .then(returnString => {
//         // console.log("**TCL: getFile -> returnString**", returnString);
//         let convertedFile = converter.xml2js(returnString, {compact: true, spaces: 4});

//         try{
//             if(fileString === "sb31038"){
//                 BullStep_Parser(convertedFile).then(sortedInfo=>{
//                     return responseSender.status(202).send(sortedInfo);
//                 })
//             }
//             if(fileString === "sb35034"){
//                 BullStepRef_Parser(convertedFile).then(sortedInfo=>{
//                     return responseSender.status(202).send(sortedInfo);
//                 })
//             }
//             if(fileString === "sb42073"){
//                 BullStepNote_Parser(convertedFile).then(sortedInfo=>{
//                     return responseSender.status(202).send(sortedInfo);
//                 });
//             }
//             else{
//                 DynamicBulletinParser(convertedFile).then(sortedInfo=>{
//                     return responseSender.status(202).send(sortedInfo);
//                 })
//             }
//         }
//         catch{
//             // responseSender.status(404).send({problem: "The file name you send is was not reconized", attemptedFile: returnString});
//             console.log("Catch function hit");
//             // return "";
//         }

//     });
// }

// app.get("/getXml/:fileString", (req,res) => {
//     // console.log("TCL: req.params", req.params);

//     let fileString = req.params.fileString;
//     // console.log("TCL: fileString", fileString)

//     try{
//         getFile(fileString, res)
//     }
//     catch(err){
//         throw(console.error({
//             header: "You hit an error",
//             message: err.message,
//             stack: err.stack
//         }))
//     }

// })

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Connect to MongoDB
// To make custom data base just put the name you want for the db where 'mern_template' is.
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/mern_template",
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

// Use express to start server
app.listen(PORT, () => console.log("Server listening on: http://localhost:" + PORT));
