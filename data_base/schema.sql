DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departamento(
  id INT NOT NULL AUTO_INCREMENT,
  depto VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  rol VARCHAR(30),
  sueldo DECIMAL,
  departamento_id INT,
  FOREIGN KEY (departamento_id)
  REFERENCES departamento(id)
  ON DELETE SET NULL
);

CREATE TABLE empleado(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    primer_nombre VARCHAR(30),
    apellido VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    FOREIGN KEY (manager_id)
    REFERENCES empleado(id)
    ON DELETE SET NULL
);


