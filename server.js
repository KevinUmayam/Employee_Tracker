const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "PWforsql123!!",
    database: "empInfo_db",
  },
  console.log(`Connected to the empInfo_db database.`)
);
const start = () => {
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
};

function viewDepartments() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    inquirer.prompt([
      {
        type: "list",
        Message: "select option",
        name: "choices",
        choices: ["main menu", "quit"],
      },
    ]);
  }).then((answer) => {
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
    inquirer.prompt([
      {
        type: "list",
        Message: "select option",
        name: "choices",
        choices: ["main menu", "quit"],
      },
    ]);
  }).then((answer) => {
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
    inquirer.prompt([
      {
        type: "list",
        Message: "select option",
        name: "choices",
        choices: ["main menu", "quit"],
      },
    ]);
  }).then((answer) => {
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

function quit() {
  console.log("Goodbye!");
  process.exit();
}
