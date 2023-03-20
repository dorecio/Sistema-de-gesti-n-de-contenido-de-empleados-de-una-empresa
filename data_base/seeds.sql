INSERT INTO departamento (depto)
VALUES ("Ventas"),
       ("Ingenieria"),
       ("Finanzas"),
       ("Legal");

INSERT INTO rol(rolNombre,sueldo,departamento_id)
VALUES ("Lider de ventas",100000,1),
       ("Vendedor",80000,1), 
       ("Lider de Ingeniería",150000,2),
       ("Ingeniero de Software",120000,2),
       ("Gerente de Contabilidad",160000,3),
       ("Contador",125000,3),
       ("Lider del equipo Legal",250000,4),
       ("Abogado",190000,4);
       
INSERT INTO empleado (primer_nombre,apellido,rol_id, manager_id) 
VALUES ("Alex","Mendez",1,null),
       ("Daniel","Silva",2,1),
       ("Alejandra","mtz",3,null),
       ("Verenice","Contreras",4,3);
       ("Ninguno","",0,null);
