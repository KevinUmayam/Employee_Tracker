const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const logT = require("console.table");
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // TODO: Add MySQL password
  password: "PWforsql123!!",
  database: "emp_info_db",
  PORT: 3007,
});

db.connect(function (err) {
  if (err) throw err;
  console.log(`Connected to the emp_info_db database.`);
  start();
});

function start() {
  return inquirer
    .prompt([
      {
        type: "list",
        Message: "Select an option from main menu.",
        name: "choices",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "quit",
        ],
      },
    ])
    .then((answer) => {
      //switch statements to set call the correct prompt
      switch (answer.choices) {
        case "view all departments":
          viewDepartments();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "view all employees":
          viewEmployees();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployeeRole();
          break;
        case "quit":
          quit();
          break;
        default:
          console.log("no options selected");
      }
    });
}

function viewDepartments() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
  inquirer
    .prompt([
      {
        type: "list",
        Message: "select option",
        name: "choices",
        choices: ["main menu", "quit"],
      },
    ])
    .then((answer) => {
      switch (answer.choices) {
        case "main menu":
          start();
          break;
        case "quit":
          quit();
          break;
        default:
          console.log("no options selected");
      }
    });
}

function viewRoles() {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
  inquirer
    .prompt([
      {
        type: "list",
        Message: "select option",
        name: "choices",
        choices: ["main menu", "quit"],
      },
    ])
    .then((answer) => {
      switch (answer.choices) {
        case "main menu":
          start();
          break;
        case "quit":
          quit();
          break;
        default:
          console.log("no options selected");
      }
    });
}

function viewEmployees() {
  db.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
  inquirer
    .prompt([
      {
        type: "list",
        Message: "select option",
        name: "choices",
        choices: ["main menu", "quit"],
      },
    ])
    .then((answer) => {
      switch (answer.choices) {
        case "main menu":
          start();
          break;
        case "quit":
          quit();
          break;
        default:
          console.log("no options selected");
      }
    });
}

function addEmployee() {
  console.log("adding employee");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Add the employees first name",
        name: "firstN",
      },
      {
        type: "input",
        message: "Add the employees last name",
        name: "lastN",
      },
      {
        type: "number",
        message: "Add the employees role id",
        name: "roleID",
        //make sure they answer with num
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "number",
        message: "Add their managers id",
        name: "managerID",
        //make sure they answer with num
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.firstN, answer.lastN, answer.roleID, answer.managerID],
        function (err) {
          if (err) throw err;
          console.log(`department:${answer.roleTitle} has been added`);
          start();
        }
      );
    });
}

function addDepartment() {
  console.log("adding employee");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Add a new department",
        name: "newDepartment",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO departments VALUES (default,?)",
        [answer.newDepartment],
        function (err) {
          if (err) throw err;
          console.log(`department:${answer.newDepartment} has been added`);
          start();
        }
      );
    });
}

function addRole() {
  console.log("adding employee");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Add a role title",
        name: "roleTitle",
      },
      {
        type: "number",
        message: "Add the roles salary",
        name: "roleSalary",
        //make sure they answer with num
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "number",
        message: "Add the departments id",
        name: "departmentID",
        //make sure they answer with num
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO roles(role_title, role_salary, department_id) VALUES (?, ?, ?)",
        [answer.roleTitle, answer.roleSalary, answer.departmentID],
        function (err) {
          if (err) throw err;
          console.log(`department:${answer.roleTitle} has been added`);
          start();
        }
      );
    });
}

function updateEmployeeRole() {
  db.query("SELECT * FROM employees", function (err, emp) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          Message: "select employee you want to update",
          name: "empChoice",
          choices: function () {
            let choices = [];
            for (let i = 0; i < emp.length; i++) {
              choices.push(emp[i].last_name);
            }
            return choices;
          },
        },
      ])
      .then((answer) => {
        let empSelectected = answer.empChoice;
        db.query("SELECT * FROM employees", function (err, res) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "number",
                message: "Add the employees role id",
                name: "roleID",
                //make sure they answer with num
                validate: function (value) {
                  if (isNaN(value) === false) {
                    return true;
                  } else {
                    return false;
                  }
                },
              },
              {
                type: "number",
                message: "Add their managers id",
                name: "managerID",
                //make sure they answer with num
                validate: function (value) {
                  if (isNaN(value) === false) {
                    return true;
                  } else {
                    return false;
                  }
                },
              },
            ])
            .then(function (answer) {
              db.query(
                "UPDATE employees SET roles_id = ? , manager_id = ?  WHERE last_name = ?",
                [answer.roleID, answer.managerID, empSelectected],
                function (err) {
                  if (err) throw err;
                  console.log(`Employee updated`);
                  start();
                }
              );
            });
        });
      });
  });
}

function quit() {
  console.log("Goodbye");
  process.exit();
}
