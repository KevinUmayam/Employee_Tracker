USE business;



USE emp_info_db;

INSERT INTO departments(department_name)
VALUES 
("accounting"),
("finance"),
("sales"),
("marketing"),
("company");

INSERT INTO roles(role_title, 
                  role_salary, 
                  department_id)
VALUES("sales associate", 60000,3),
       ("finance agent", 70000,2),
       ("accountant", 70000,1),
       ("marketing agent", 75000,4);
       ("accounting manager", 100000,1);
       ("finance manager", 100000,2);
       ("sales manager", 100000,3);
       ("marketing manager", 100000,4);
         ("CEO", 1000000,5)
INSERT INTO employees(first_name, 
                      last_name, 
                      roles_id, 
                      manager_id)
VALUES ("kevin","umayam",1, 7),
       ("dru","sanchez",2, 6),
       ("michell","lopez",3, 5),
        ("brayan","meza",4, 8);
        ("allison","hugs",5, 9);
        ("ryan","reynolds",6, 9);
        ("harry","potter",7, 9);
        ("barack","obama",8, 9);
           ("darth","vader",8,null)


