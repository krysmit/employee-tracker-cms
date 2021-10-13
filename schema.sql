DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
  id INT NOT NULL,
  course_title VARCHAR(30) NOT NULL,
  course_description TEXT NOT NULL,
  active BOOLEAN NOT NULL,
);

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id: INT PRIMARY KEY
    name: VARSHAR(30)
)

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id: INT PRIMARY KEY
    title: VARCHAR(30)
    salary: DECIMAL
    department_id: INT
)

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id: INT PRIMARY KEY
    first_name: VARCHAR(30)
    last_name: VARCHAR(30)
    role_id: INT
    manager_id: INT
    /*if no entry in manager_id, NULL should show
)