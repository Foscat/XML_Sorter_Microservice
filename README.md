# XML_Sorter_Microservice
Microservice that parses XML files provides by another microservice. It returns a step array for use on the chat application.
It will also calculate the total step time for a operation when given the chat log data.


## How to use it

<pre><code>
// Names of files that contain steps
const filesWithSteps = [
    "sb3125", "sb31038", "sb32054", "sb35034","sb42073", "sb42077", "sb46056", "sb49040", 
    "sb4937", "sb54278", "sb54291", "sb54299", "sb54301", "sb54302", "sb54304", "sb54307", 
    "sb54308", "sb54310", "sb54312", "sb54313", "sb60158", "sb60161", "sb60162", 
    "sb60163", "sb60164", "sb60165", "sb72042", "sb83160"
];

// Phrases the user can say that will return step information
const accaptedCommands = [
    "replace crossmember", "rocker panel", "torque rod replacement",
    "tower bracket replacement", "filling procedure",
    "oil inspection", "air leak inspection", "change brakes", 
    "lever bearing removal", "DEF pressure connection",
    "DEF line ice expansion", "powernet worksheet", 
    "install camera", "telltale installation", "refrigerator circut",
    "relay light installation", "ESC inspection", "ESC repair", 
    "modify heated windsheild", "program ECU", 
    "complexity harness installation", "cabin drip shield", 
    "replace service jumper", "marker light gasket old",
    "mirror air leak", "nosebeam water leak", "add floor support",
    "marker light gasket new", "splash cover installation",
    "install vortex generator", "AC housing retrofit"
];

// Microservice endpoints
const parseFile = "https://sleepy-headland-90094.herokuapp.com/api/parseXml/";
const stepTime = "https://sleepy-headland-90094.herokuapp.com/api/stepCalculator";
const fileNum = "https://sleepy-headland-90094.herokuapp.com/api/getFileNum";

// Post conversation array to get step timestamps and differances
getTimes = () => {
    return axios.post(stepTime, stepArray);
}

// Use file name to get step info from xml files
getStepInfo = (fileName) => {
    return axios.get(`${parseFile}/${fileName}`);
}

// Use phrase from user to get a file that fits description
getFileNum = (command) => {
    return axios.post(fileNum, {fileType: "sb", description: command})
}

// Test how a user can say something and the microservice handles the rest
testTextCommand = (command) => {
    console.log("Input phrase:", command)
    getFileNum(command).then(res=>{
        console.log("File name from phrase:", res.data);
        getStepInfo(res.data).then(info=>{
            console.log("Step info from phrase:", info.data);
        });
    });
};

// Change index of acceptedCommands to input phrases and get instructions back related to it.
testTextCommand(accaptedCommands[12]);.
</pre></code>


### Dependencies 
#### These are part of the template that the service is built on
**Back End**
- Concurrently - Allows package JSON scripts to candle multiple commands
- Nodemon - For when you are in development any save will refresh server to give live update of changes
- Axios - For communicating with front end
- Express - For helping build a server and serving assests
- Mongoose - Helps with orm for mongodb
- Prop-types - Helps react with hanldeing props
- React - To let app work in a react environment
- If-env - Allows app to use env files

**Front End**
- Axios - For communicating with back end routes
- React - To let app work in a react environment
- React-bootstrap-sweetalert - For easy to use models
- React-dom - Needed for react to work with DOM
- React-router-dom - Needed for using a react component router
- React-scripts - Needed for react to work
- Reactstrap - Special components made just for react

