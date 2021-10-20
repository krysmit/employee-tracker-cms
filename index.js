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
            name: "listchoices",
            message: "What would you like to do?",
            choices: [
                {name: "View All Departments", value: 1},
                {name: "View All Roles", value: 2},
                {name: "View All Employees", value: 3},
                {name: "Add a Department", value: 4},
                {name: "Add a Role", value: 5},
                {name: "Add an Employee", value: 6},
            ],
        }
    ])
        .then(({listchoices}) => {
            switch (listchoices) {
                case 1:
                    viewAllDepartments();
                    break;
                case 2:
                    viewAllRoles();
                    break;
                case 3:
                    viewAllEmployees();
                    break;
                case 4:
                    createDepartment();
                    break;
                case 5:
                    createRole();
                    break;
                case 6:
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
        console.table("List of Departments:", res);
        mapChoices();
    })
}
//viewing roles option
function viewAllRoles() {
    db.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        console.table("List of Roles:", res);
        mapChoices();
    })
}
//viewing employee option
function viewAllEmployees() {
    db.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table("List of Employees:", res);
        mapChoices();
    })
}

//adding department option
function createDepartment() {
    return inquirer.prompt(
        [
            {
                type: "input",
                name: "department",
                message: "Enter the department name:",
            }
        ]
    ).then(data => {
        db.query("INSERT INTO department SET ?", data, function(err, res) {
            if (err) throw err;
            mapChoices();
        });
    });
};

//adding role option
function createRole() {
    db.query("SELECT dept_name AS name, id AS value FROM department", function(err, res) {
        if(err)throw err;
        console.table(res);

        return inquirer.prompt(
            [
            {
                type: "input",
                name: "title",
                mesage: "Enter the role title:",
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the role's sallary:",
            },
            {
                type: "list",
                name: "department_id",
                message: "What department does this role exsist in?",
                choices: res
            },
            ]
        ).then(data => {
            db.query("INSERT INTO roles SET ?", data, function(err, res) {
                if (err) throw err;
                mapChoices();
            });
        });
    });
};

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
        const query = `SELECT roles.title, roles.id FROM roles;`;
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
    viewAllDepartments, viewAllRoles, createEmployee, createDepartment, createRole
        }        