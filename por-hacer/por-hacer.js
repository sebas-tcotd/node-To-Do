const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];
const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    saveDB();

    return porHacer;
}

const saveDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar :(', err);
        else return console.log('Datos guardados en: data.json');
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = () => {
    cargarDB();

    console.log("=========== POR HACER ==========".green);

    for (let tareas of listadoPorHacer) {
        console.log(tareas.descripcion);
        console.log('Estado:', tareas.completado);
        console.log("================================".green);
    }
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        saveDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if(index >= 0) {
        listadoPorHacer.splice(index, 1);
        saveDB();
        return `La tarea "${descripcion}" fue eliminada exitosamente.`.green;
    } else {
        return `No se pudo eliminar lo solicitado.\nProbablemente escribió mal la descripción o esta no existe.`.red;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
