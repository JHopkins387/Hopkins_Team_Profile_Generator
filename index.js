const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/generate-page');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const { rejects } = require('assert');

let employees = [];

const promptUser = (userArr) => {
    if (!userArr) {
        userArr = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the team member?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name here.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'ID',
            message: 'Please enter ID of the employee',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('Please enter a ID number.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employee email address?',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter a email.');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'jobTitle',
            message: 'What is the title of this employee member?',
            choices: ['Manager', 'Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'officeNum',
            message: 'What is the number of their office?',
            validate: officeNumInput => {
                if (officeNumInput) {
                    return true;
                } else {
                    console.log('Please enter a office number.');
                    return false;
                }
            },
            when: ({ jobTitle }) => {
                if (jobTitle === 'Manager') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is their Github username?',
            validate: githubName => {
                if (githubName) {
                    return true;
                } else {
                    console.log('Please enter their Github username.');
                    return false;
                }
            },
            when: ({ jobTitle }) => {
                if (jobTitle === 'Engineer') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the school their are associated with?',
            validate: schoolInput => {
                if (schoolInput) {
                    return true;
                } else {
                    console.log('Please enter a school.');
                    return false;
                }
            },
            when: ({ jobTitle }) => {
                if (jobTitle === 'Intern') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'addTeammate',
            message: 'Would you like to add another team member?'
        }
    ])
        .then(data => {
            //push data to array.
            userArr.push(data);

            //if addTeammate was selected by user, run promptUser() again passing in the userArr.
            if (data.addTeammate) {
                return promptUser(userArr);
            } else {
                createTeam(userArr);
            }
        })
}

let createTeam = function (userArr) {
    for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].jobTitle === 'Manager') {
            employees.push(new Manager(userArr[i].name, userArr[i].ID, userArr[i].email, userArr[i].officeNum));
            // console.log(employees);
        } if (userArr[i].jobTitle === 'Engineer') {
            employees.push(new Engineer(userArr[i].name, userArr[i].ID, userArr[i].email, userArr[i].github));
        } if (userArr[i].jobTitle === 'Intern') {
            employees.push(new Intern(userArr[i].name, userArr[i].ID, userArr[i].email, userArr[i].school));
        }
    }

    // console.log(employees);
    let html = generatePage(employees);
    fs.writeFile('./dist/index.html', html, function (err) {
        if (err) {
            reject(err);
            return;
        }
    })
}

promptUser()




