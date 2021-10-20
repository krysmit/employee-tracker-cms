INSERT INTO department (dept_name)
VALUES("Store Manager"), ("Assistant Manager"), ("Shop Technician"), ("Sales Specialist");
       
INSERT INTO roles(title, salary, department_id)
VALUES('Store Manager', 75000, 1), ('Assistant Manager', 60000, 2), ('Sales Specialist', 40000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Ava', 'Lanche', 1, null), ('Sue', 'Flay', 2, 1), ('Ella', 'Vadar', 3, 2);