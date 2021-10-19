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
                    createDepartment();
                    break;
                case "Add a Role":
                    createRole();
                    break;
                case "Add an Employee":
                    createEmployee();
                    break;
                default:
                   // createHTML();
            }
        });
}

//viewing department option
function viewAllDepartments() {
    db.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        mapChoices();
    })
}
//viewing roles option
function viewAllRoles() {
    db.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        console.table(res);
        mapChoices();
    })
}
//viewing employee option
function viewAllEmployees() {
    db.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        mapChoices();
    })
}

//adding employee option
function createEmployee() {
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
        db.query(query, (err, res) => {
            if (err) throw err;
            const roles = [];
            const rolesNames = [];
            for (let i = 0; i < res.length; i++) {
                roles.push({
                    id: res[i].id,
                    title: res[i].title
                });
                rolesNames.push(res[i].title);
            } inquirer.prompt([

                {
                    type: "list",
                    name: "roles",
                    message: "Select the employee's role:",
                    choices: rolesNames
                }]).then(answer => {
                    const empRole = answer.roles;
                    let empRoleID;
                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].title === empRole) {
                            empRoleID = roles[i].id;
                        }
                    }
                    newEmployee.roleID = empRoleID;
                    const query = `
                    SELECT DISTINCT concat(IFNULL(manager.first_name, 'None'), " ", IFNULL(manager.last_name,'None')) AS full_name, manager.id
                    FROM employee 
                    LEFT JOIN employee AS manager ON manager.id = employee.manager_id;`;
                            db.query(query, (err, res) => {
                                if (err) throw err;
                                const managers = [];
                                const managerNames = [];
                                for (let i = 0; i < res.length; i++) {
                                    managerNames.push(res[i].full_name);
                                    managers.push({
                                        id: res[i].id,
                                        fullName: res[i].full_name
                                    });
                                }
        
                                inquirer
                                    .prompt([{
                                        type: "list",
                                        name: "mgrSelect",
                                        message: "Select Manager:",
                                        choices: managerNames
        
                                    },
        
                                    ]).then(function (res) {
                                        //get id of chosen manager
                                        const chosenManager = answer.mgrSelect;
                                        let chosenManagerID;
                                        for (let i = 0; i < managers.length; i++) {
                                            if (managers[i].fullName === chosenManager) {
                                                chosenManagerID = managers[i].id;
                                                break;
                                            }
                                        }
                                        const query = "INSERT INTO employee SET ?";
                                        db.query(query, {
                                            first_name: newEmployee.firstName,
                                            last_name: newEmployee.lastName,
                                            role_id: newEmployee.roleID || 0,
                                            manager_id: newEmployee.managerID || 0
                                        }, function (err, res) {
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                var action = `Employee ${newEmployee.firstName} ${newEmployee.lastName} added!`
                                                Menu(action);
                                            }
        
                                        })
                                    })
                            })
                        })
                })
            })
        }





module.exports = {
    viewAllDepartments, viewAllRoles, createEmployee, createEmployee
        }        