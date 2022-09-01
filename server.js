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
    password: "",
    database: "empInfo_db",
  },
  console.log(`Connected to the empInfo_db database.`)
);
const start = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        Message: "Please enter the interns name?",
        name: "choices",
        choices: [
          "view all departments",
          " view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((answer) => {
      //switch statements to set call the correct prompt
      switch (answer.choices) {
        case "view all departments":
          viewDepartments();
          break;
        case "add an engineer":
          //   engineerPrompt();
          break;
        case "add an intern":
          //   internPrompt();
          break;
        case "complete team":
          //   completeTeam();
          break;
        case "add an engineer":
          //   engineerPrompt();
          break;
        case "add an intern":
          //   internPrompt();
          break;
        case "complete team":
          //   completeTeam();
          break;
        default:
          console.log("no options selected");
      }
    });
};

viewDepartments();
