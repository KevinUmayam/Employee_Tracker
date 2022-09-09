DROP DATABASE IF EXISTS emp_info_db;
CREATE DATABASE emp_info_db;

USE emp_info_db;

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
--   roles_id INT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) ,
last_name VARCHAR(30),
roles_id INT NOT NULL,
manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);