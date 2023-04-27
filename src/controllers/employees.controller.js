import {pool} from '../db.js';

export const getEmployees = async (req, res) => {
    const [rows] = await pool.query(`SELECT * FROM employees;`);
    res.json(rows);
}

export const getEmployeeByID = async (req, res) => {
    
    const [row] = await comprobeEmployeeID(req.params.id);
    (row.length == 0) ? res.status(404).send('No se encontró el ID indicado') : res.send(row);
}

export const createEmployees = async (req, res) => {
    const {name, salary} = req.body;
    const [rows] = await pool.query(`INSERT INTO employees(emp__name, emp__salary) VALUES('${name}', ${salary});`);
    res.send({
        id: rows.insertId,
        name,
        salary
    });
}

export const updateEmployees = async (req, res) => {
    const [row] = await comprobeEmployeeID(req.params.id);
    const {name, salary} = req.body;
 
    if(row.length == 0){
        res.send('No se encontró el ID indicado');
    }else if(name != undefined && salary != undefined){
        await pool.query(`UPDATE employees SET emp__name="${name}", emp__salary=${salary} WHERE emp__ID= ${row[0].emp__ID};`);
        res.send('Nombre y salario actualizados correctamente');
    }else if(name != undefined){
        await pool.query(`UPDATE employees SET emp__name="${name}" WHERE emp__ID= ${row[0].emp__ID};`);
        res.send('Nombre actualizado correctamente');
    }else if(salary != undefined){
        await pool.query(`UPDATE employees SET emp__salary=${salary} WHERE emp__ID= ${row[0].emp__ID};`);
        res.send('Salario actualizado correctamente');
    }
}

export const deleteEmployees = async(req, res) => {
    const [row] = await comprobeEmployeeID(req.params.id);

    if(row.length == 0){
        res.status(404).send('No se encontró el ID indicado para eliminar');
    }else{
        await pool.query(`DELETE FROM employees WHERE emp__ID = ${req.params.id};`)
        res.send('Eliminado correctamente');
    }
}

function comprobeEmployeeID(id){
    return pool.query(`SELECT * FROM employees WHERE emp__ID = '${id}';`);
}





