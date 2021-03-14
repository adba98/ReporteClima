const inquirer = require('inquirer');
require('colors');

const preguntas = [{
  type: 'list',
  name: 'opt',
  message: 'Que deseas hacer?',
  choices: [
    {
      value: 1,
      name: `${'1.'.cyan} Buscar lugar`
    }, {
      value: 2,
      name: `${'2.'.cyan} Ver historial`
    }, {
      value: 0,
      name: `${'3.'.cyan} Salir`
    }
  ]
}];

const inquireMenu = async () => {
  console.log('======================='.cyan);
  console.log(' Seleccione una opcion '.black.bgCyan);
  console.log('======================='.cyan);

  const { opt } = await inquirer.prompt(preguntas);
  return opt;
}

const pausa = async () => {
  console.log();
  const question = [{
    type: 'input',
    name: 'enter',
    message: `Presione : ${'ENTER'.cyan} para continuar`,
  }];
  await inquirer.prompt(question);
}

const leerInput = async (msn) => {
  const question = [{
    type: 'input',
    name: 'desc',
    message: msn,
    validate(value) {
      if (value.length === 0) {
        return 'Por favor ingrese un valor';
      }
      return true;
    }
  }];
  const { desc } = await inquirer.prompt(question);
  return desc;
}

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`.cyan;
    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`
    }
  });
  choices.unshift({
    value: '0',
    name: `${'0.'.cyan} Cancelar`
  })
  const preguntas = [{
    type: 'list',
    name: 'id',
    message: 'Seleccione lugar:',
    choices
  }];
  const { id } = await inquirer.prompt(preguntas);
  return id;
}

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.cyan;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    }
  });
  const pregunta = [{
    type: 'checkbox',
    name: 'ids',
    message: 'Seleccione',
    choices
  }];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
}

const confirmar = async (message = '') => {
  const preguntas = [{
    type: 'confirm',
    name: 'ok',
    message: message.red
  }];
  const { ok } = await inquirer.prompt(preguntas);
  return ok;
}


module.exports = {
  inquireMenu,
  pausa,
  leerInput,
  listarLugares,
  mostrarListadoCheckList,
  confirmar
}