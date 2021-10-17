const inquirer = require('inquirer');
const db = require('./db')
const mysql = require('mysql2');
require('console.table')

//direction for all chocies
// var menuDirections = {
//     "View All Departments": () => {
//         console.log('viewing departments');
//         viewAllDepartments();
//     },

//     "View All Roles": () => {
//         console.log('viewing all roles');
//         viewAllRoles();
//     },

//     "View All Employees": () => {
//         console.log('viewing all employees');
//         viewAllEmployees();
//     },
// //still need to add code for the 3 'add' options
// };


//first thing to come up when app is started
function mapChoices() {
    inquirer.prompt([
        {
            type: "list",
            name: "mapchoices",
            message: "What would you like to do?",
            choices: [
                {name: "View All Departments", value: 1},
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
            ],
        }
    ])
        .then(({mapchoices}) => {
            switch (mapchoices) {
                case 1:
                    createIntern();
                    break;
                case "View All Roles":
                    createEngineer();
                    break;
                case "View All Employees":
                    createIntern();
                    break;
                case "Add a Department":
                    createEngineer();
                    break;
                case "Add a Role":
                    createIntern();
                    break;
                case "Add an Employee":
                    createEngineer();
                    break;
                default:
                    createHTML();
            }
        });
}

