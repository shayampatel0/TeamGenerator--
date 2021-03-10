const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//Both are empty arrays to populate from user input
const idNumber = [];
const teamMems = [];


function teamInfo() {

    //here the manager is the captain of the team 

    //first of three function(1st--manager)
    createCaptain();
    function createCaptain() {
        console.log("Add the Captain");
        inquirer.prompt([
            {
                type: "input",
                name: "captain",
                message: "What is your manager's name?"
                //validate input
            },
            {
                type: "input",
                name: "captainId",
                message: "What is your manager's id?",
            },
            {
                type: "input",
                name: "captainEmail",
                message: "What is your manager's email?",
            },
            {
                type: "input",
                name: "captainOfficeNumber",
                message: "What is your manager's office number?",
            }
        ]).then(responses => {
            const captain = new Manager(responses.captain, responses.captainId, responses.captainEmail, responses.captainOfficeNumber);
            console.log(captain);
            teamMems.push(captain)
            idNumber.push(responses.captainId);
            buildTeam()
        });
    }

    //second of three function(2nd--engineer)
    function createEngineer() {
        console.log("Adding Engineer");
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your name?"
                //validate input
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your id?",
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your email?",
            },
            {
                type: "input",
                name: "enggithub",
                message: "What is your Github account?",
            }
        ]).then(responses => {
            const engineer = new Engineer(responses.engineerName, responses.engineerId, responses.engineerEmail, responses.enggithub);
            console.log(engineer);
            teamMems.push(engineer);
            idNumber.push(responses.engineerId);
            buildTeam()
        });
    }

    //three of three function(3rd--engineer)
    function createIntern() {
        console.log("Adding Intern!");
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your name?"
                //validate input
            },
            {
                type: "input",
                name: "internId",
                message: "What is your id?",
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your email?",
            },
            {
                type: "input",
                name: "internAlumni",
                message: "What is your school name?",
            }
        ]).then(responses => {
            const intern = new Intern(responses.internName, responses.internId, responses.internEmail, responses.internAlumni);
            console.log(intern);
            teamMems.push(intern);
            idNumber.push(responses.internId)
            buildTeam()
        }).catch(error => console.log(error)
        );

        function createOutputFile() {
            fs.writeFileSync(outputPath, render(teamMems), "utf-8")
        }
    }
    function buildTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "addMembers",
                message: "What type of team member would you like to add?",
                choices: ["Engineer", "Intern", "All members added"]
            }

        ]).then(roleChoice => {
            if (roleChoice.addMembers === "Engineer") {
                createEngineer();

            } else if (roleChoice.addMembers === "Intern") {
                createIntern()

            } else {
                fs.writeFileSync(outputPath, render(teamMems), "utf-8")
            }
        })
    }
}

teamInfo()
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.


