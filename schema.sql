DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
  id INT NOT NULL,
  course_title VARCHAR(30) NOT NULL,
  course_description TEXT NOT NULL,
  active BOOLEAN NOT NULL,
);

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id: INT AUTO_INCREMEMT PRIMARY KEY,
    name: VARSHAR(30) NOT NULL,
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id: INT AUTO_INCREMEMT PRIMARY KEY,
    title: VARCHAR(30) NOT NULL,
    salary: DECIMAL,
    department_id: INT NOT NULL,
    INDEX dept_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE,
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id: INT NOT NULL AUTO_INCREMEMT PRIMARY KEY,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id: INT NOT NULL,
    INDEX role_ind (role_id),
    manager_id: INT,
    INDEX man_ind (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL,
    /*if no entry in manager_id, NULL should show
);