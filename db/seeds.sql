USE business;



USE emp_info_db;

INSERT INTO departments(department_name)
VALUES 
("accounting"),
("finance"),
("sales"),
("marketing");

INSERT INTO roles(role_title, 
                  role_salary, 
                  department_id)
VALUES("employee", 60000,1),
       ("employee", 50000,2),
       ("employee", 70000,3),
       ("employee", 75000,3);

INSERT INTO employees(first_name, 
                      last_name, 
                      roles_id, 
                      manager_id)
VALUES ("kevin","umayam",1, null),
       ("dru","sanchez",2, 1),
       ("michell","lopez",3,null),
        ("brayan","meza",4,null);

