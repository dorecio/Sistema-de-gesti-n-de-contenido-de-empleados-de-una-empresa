const inquirer = require('inquirer');
// const { validateString } = require('./validation/validate');
// Importar y requerir mysql2
const mysql = require('mysql2');
require('console.table')

// Conectar a la base de datos
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Nombre de usuario de MySQL
        user: 'root',
        // TODO: Agregar contraseña de MySQL
        password: 'administrador',
        database: 'employees_db'
    },
    console.log(`Connected to the empleados_db database.`)
);
let listado = [];


const menu = [
    {
        type: 'list',
        message: 'Qué deseas hacer ?',
        name: 'opcMenu',
        choices: [
            'Desplegar lista de empleados',
            'Agregar empleado',
            'Cambiar rol de empleado',
            'Desplegar lista de roles',
            'Agregar Rol',
            'Desplegar lista de departamentos',
            'Agregar departamento',
            'Salir'
        ]
    },
];



/*const opcCambioRol = [
    {
        type: 'input',
        message: '¿Cuál es el nombre del empleado al que deseas cambiar el rol ? ',
        name: 'employeeNameChange_role',
    },
    {
        type: 'input',
        message: '¿Cuál es el apellido del empleado al que deseas cambiar el rol ? ',
        name: 'employeeLastNameChange_role',
    },
    {
        type: 'input',
        message: '¿Cuál rol deseas asignar al empleado seleccionado ? ',
        name: 'new_role',
    },
];

const opcAgregaRol = [
    {
        type: 'input',
        message: '¿Cuál es el nombre del rol ? ',
        name: 'rol_name'
    },
    {
        type: 'number',
        message: '¿Cuál es el salario del nuevo rol ? ',
        name: 'salary'
    },
    {
        type: 'list',
        message: '¿A cuál departamento pertenece el nuevo rol ? ',
        name: 'departmentNew_rol',
        choices: [
            // TRAER LISTADO DE DEPARTAMENTOS DE LA BASE DE DATOS
        ]
    },
];

const opcAgregaDepto = [
    {
        type: 'input',
        message: '¿Cuál es el nombre del departamento ? ',
        name: 'new-depto'
    },
];
*/

function agregaEmpleado() {

    db.query('SELECT * FROM role', function (err, resultados) {
        if (err) throw err;
        const listaDeRols = resultados.map(({ rol, id }) => ({
            name: `${rol}`,
            value: id
        }))

        db.query('SELECT * FROM empleado', function (err, resultados) {
            if (err) throw err;
            const listaDeEmpleados = resultados.map(({ primer_nombre, apellido, id }) => ({
                name: `${primer_nombre} ${apellido}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'input',
                    message: '¿Cuál es el nombre del empleado ? ',
                    name: 'primer_nombre'
                },
                {
                    type: 'input',
                    message: '¿Cuál es el apellido del empleado? ',
                    name: 'apellido'
                },
                {
                    type: 'list',
                    message: 'Cuál es el rol del empleado ? ',
                    name: 'role_id',
                    choices: listaDeRols
                    // TRAER LISTADO DE ROLES DE LA BASE DE DATOS

                },
                {
                    type: 'list',
                    message: '¿Quién será su gerente ? ',
                    name: 'manager_id',
                    choices: listaDeEmpleados
                },
            ]).then((respuestas) => {
                console.table(respuestas);
                
                db.query(`INSERT INTO empleado (primer_nombre,apellido,role_id, manager_id) VALUES (${respuestas.primer_nombre}, ${respuestas.apellido}, ${respuestas.role_id}, ${respuestas.manager_id})`)
            }).then(() => menuInit()).catch();
        })
    });


}

/*function cambiarRol() {
    /*  db.query('SELECT primer_nombre AS nombre, apellido AS apellidos FROM empleado', function (err, results) {
          if (err) throw err;
    // console.log(results);
    inquirer.prompt(opcCambioRol).then((opcCambioRolData) => {
        db.query('UPDATE empleado SET rol_id = opcCambioRolData.new_role WHERE primer_nombre = opcCambioRolData.employeeNameChange_role AND apellido = opcCambioRolData.employeeLastNameChange_role', function (err, results) {
            if (err) throw err
            else console.log(results);
            //  CAMBIAR ROL DE EMPLEADO EN LA BASE DE DATOS
        }).then(() => menuInit())



    });
}

function despliega(dato) {
    if (dato === 'roles') {
        //DESPLEGAR ROLES DE DB
        db.query('SELECT rol,depto,sueldo FROM role JOIN departamento ON rol.departamento_id = departamento.id', function (err, results) {
            if (err) throw err;
            console.table(results);
            menuInit()
        });
    } else if (dato === 'deptos') {
        //DESPLIEGA DEPARTAMENTOS DE DB
        db.query('SELECT id,depto FROM departamento', function (err, results) {
            if (err) throw err;
            console.table(results);
            menuInit()
        });

    } else {   
        db.query('SELECT * FROM empleado', function (err, results) {
            if (err) throw err;
            console.table(results);
            menuInit()
        });
   }
}

function agregarRol() {
    inquirer.prompt(opcAgregaRol).then((opcAgregaRolData) => {
        db.query('INSERT INTO rol(rolNombre,sueldo,departamento_id) VALUES("opcAgregaRolData.rol_name","opcAgregaRolData.salary","opcAgregaRolData.departmentNew_rol")');
        //  AGREGAR ROL EN LA BASE DE DATOS
    }).then(() => menuInit());
}

function agregarDepto() {
    inquirer.prompt(opcAgregaDepto).then((opcAgregaDeptoData) => {
        db.query('INSERT INTO departamento(depto) VALUES("opcAgregaDeptoData.new- depto")');
        //  AGREGAR DEPARTAMENTO EN LA BASE DE DATOS
    }).then(() => menuInit());
}
*/

// TODO: Crear una función para inicializar la aplicación
const init = () => {
    console.clear();
    console.log('==================================================',);
    console.log('                  Employee Manager                ',);
    console.log('==================================================',);
    menuInit()
}

function menuInit() {
    inquirer.prompt(menu).then((menuOpc) => {
        switch (menuOpc.opcMenu) {
            case 'Desplegar lista de empleados':
                despliega('empleados');
                break;
            case 'Agregar empleado':
                agregaEmpleado();
                break;
            case 'Cambiar rol de empleado': console.log("SI ENTRA");
                cambiarRol();
                break;
            case 'Desplegar lista de roles':
                despliega('roles');
                break;
            case 'Agregar Rol':
                agregarRol();
                break;
            case 'Desplegar lista de departamentos':
                despliega('deptos');
                break;
            case 'Agregar departamento':
                agregarDepto();
                break;
            case 'Salir':
                break;
            default:
                break;
        }
    });
}




// Llamada de función para inicializar la aplicación
init();



// db.query('SELECT employee.id, firs_name, last_name,department_id FROM employee', function (err, results) {
//     console.table(results);
// });

// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(PORT, () => {
//     console.log(`Aplicación escuchando a http://localhost: ${PORT}`);
// });