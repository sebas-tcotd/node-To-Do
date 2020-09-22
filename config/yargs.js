const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
}

const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza una tarea como completada o no', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra la tarea especificada', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}