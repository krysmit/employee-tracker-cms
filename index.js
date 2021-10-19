const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
require("dotenv").config();

const db = mysql.createConnection({
    host: "localhost", user: "root", password: process.env.DB_PASSWORD, database: process.env.DB_NAME
})

db.connect(function(err){
    if (err) throw err;
    mapChoices();
})

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
                    viewAllDepartments();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add a Department":
                    createEngineer();
                    break;
                case "Add a Role":
                    createIntern();
                    break;
                case "Add an Employee":
                    createEmployee();
                    break;
                default:
                    createHTML();
            }
        });
}

//viewing options
function viewAllDepartments() {
    db.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        mapChoices();
    })
}
function viewAllRoles() {
    db.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        mapChoices();
    })
}
function viewAllEmployees() {
    db.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        mapChoices();
    })
}

//adding options
function createEngineer() {
    const newEmp = {
        firstName: "",
        lastName: "",
        roleID: 0,
        managerID: 0
    };
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ]).then(res => {
        newEmp.firstName = res.first_name;
        newEmp.lastName = res.last_name;
        const query = `SELECT role.title, role.id FROM role;`;
})}