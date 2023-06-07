let estudiantes = [
    { codigo: '001', nombre: 'Estudiante 1' },
    { codigo: '002', nombre: 'Estudiante 2' },
    { codigo: '003', nombre: 'Estudiante 3' }
  ];

  let actividades = [
    { id: 1, nombre: 'Actividad 1', nota: 5 },
    { id: 2, nombre: 'Actividad 2', nota: 4.5 },
    { id: 3, nombre: 'Actividad 3', nota: 5 }
  ];

  let indexActividadSeleccionada = -1;
  let indexEstudianteSeleccionado = -1;

  function mostrarMensaje(promedio) {
    let mensaje =
      promedio >= 3 ? 'Felicitaciones aprobó' : 'Lo sentimos vuelva a intentar';
    document.getElementById('mensajeNota').innerText = mensaje;
  }

  function mostrarActividades() {
    let filas = '';
    let sumatoria = 0;
    for (let index in actividades) {
      let actividad = actividades[index];
      filas += '<tr>';
      filas += '  <td>' + actividad.id + '</td>';
      filas += '  <td>' + actividad.nombre + '</td>';
      filas += '  <td>' + actividad.nota + '</td>';
      filas += '  <td>';
      filas +=
        '      <button onclick="modificarActividad(' + index + ')">Modificar</button>';
      filas +=
        '      <button onclick="eliminarActividad(' + index + ')">Eliminar</button>';
      filas += '  </td>';
      filas += '</tr>';
      sumatoria += parseFloat(actividad.nota);
    }
    let promedio = sumatoria / actividades.length;
    document.getElementById('promediosTb')
      .getElementsByTagName('tbody')[0]
      .innerHTML = filas;
    document.getElementById('promedioText').innerText = 'Su promedio es: ' + promedio;
    mostrarMensaje(promedio);
  }

  function mostrarNotas(index) {
    let estudiante = estudiantes[index];
    let notas = '';
    for (let index in actividades) {
      let actividad = actividades[index];
      notas += '<tr>';
      notas += '  <td>' + actividad.nombre + '</td>';
      notas += '  <td>' + actividad.nota + '</td>';
      notas += '</tr>';
    }
    let notasModal = document.getElementById('notasModal');
    notasModal.querySelector('.estudiante-nombre').innerText = estudiante.nombre;
    notasModal.querySelector('tbody').innerHTML = notas;
    notasModal.classList.remove('close-modal');
  }

  function closeModal(modalId) {
    document.getElementById(modalId).classList.add('close-modal');
  }

  function openModal(modalId) {
    document.getElementById(modalId).classList.remove('close-modal');
  }

  function mostrarEstudiantes() {
    let filas = '';
    for (let index in estudiantes) {
      let estudiante = estudiantes[index];
      filas += '<tr>';
      filas += '  <td>' + estudiante.codigo + '</td>';
      filas += '  <td>' + estudiante.nombre + '</td>';
      filas += '  <td>';
      filas +=
        '      <button onclick="mostrarNotas(' + index + ')">Notas</button>';
      filas +=
        '      <button onclick="modificarEstudiante(' +
        index +
        ')">Modificar</button>';
      filas +=
        '      <button onclick="eliminarEstudiante(' +
        index +
        ')">Eliminar</button>';
      filas += '  </td>';
      filas += '</tr>';
    }
    document.getElementById('estudiantesTb')
      .getElementsByTagName('tbody')[0]
      .innerHTML = filas;
  }

  mostrarActividades();

  mostrarEstudiantes();

  document.getElementById('crearBtn').addEventListener('click', () => {
    indexActividadSeleccionada = -1;
    document.getElementById('actividad').value = '';
    document.getElementById('nota').value = '';
    document.getElementById('formActividad').reset();
    document.getElementById('formularioModal').classList.remove('close-modal');
    document.getElementById('tituloModal').innerText = 'Registrar actividad';
  });

  document.getElementById('cerrarModal').addEventListener('click', () => {
    document.getElementById('formularioModal').classList.add('close-modal');
  });

  document.getElementById('aceptarModal').addEventListener('click', () => {
    let formulario = document.forms['formActividad'];
    let actividad = formulario['actividad'].value;
    let nota = formulario['nota'].value;
    if (indexActividadSeleccionada === -1) {
      // Crear
      let id = actividades.length + 1;
      actividades.push({
        id: id,
        nombre: actividad,
        nota: nota
      });
    } else {
      // Modificar
      actividades[indexActividadSeleccionada].nombre = actividad;
      actividades[indexActividadSeleccionada].nota = nota;
    }
    mostrarActividades();
    document.getElementById('formularioModal').classList.add('close-modal');
  });

  function modificarActividad(posicionArray) {
    indexActividadSeleccionada = posicionArray;
    document.getElementById('formularioModal').classList.remove('close-modal');
    document.getElementById('tituloModal').innerText = 'Modificar actividad';
    let actividad = actividades[posicionArray];
    document.getElementById('actividad').value = actividad.nombre;
    document.getElementById('nota').value = actividad.nota;
  }

  function eliminarActividad(index) {
    actividades.splice(index, 1);
    mostrarActividades();
  }

  mostrarEstudiantes();

  document.getElementById('crearEstudianteBtn').addEventListener('click', () => {
    indexEstudianteSeleccionado = -1;
    document.getElementById('codigo').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('formEstudiante').reset();
    document.getElementById('formulEstudiante').classList.remove('close-modal');
    document.getElementById('tituloModalEstudiante').innerText = 'Registrar Estudiante';
  });

  document.getElementById('cerrarModalEstudiante').addEventListener('click', () => {
    document.getElementById('formulEstudiante').classList.add('close-modal');
  });

  document.getElementById('aceptarModalEstudiante').addEventListener('click', () => {
    let formulario = document.forms['formEstudiante'];
    let codigo = formulario['codigo'].value;
    let nombre = formulario['nombre'].value;
    if (indexEstudianteSeleccionado === -1) {
      // Crear nuevo estudiante
      let id = estudiantes.length + 1;
      estudiantes.push({
        codigo: codigo,
        nombre: nombre
      });
    } else {
      // Modificar estudiante existente
      estudiantes[indexEstudianteSeleccionado].codigo = codigo;
      estudiantes[indexEstudianteSeleccionado].nombre = nombre;
    }
    mostrarEstudiantes();
    document.getElementById('formulEstudiante').classList.add('close-modal');
  });

  function modificarEstudiante(posicionArray) {
    indexEstudianteSeleccionado = posicionArray;
    document.getElementById('formulEstudiante').classList.remove('close-modal');
    document.getElementById('tituloModalEstudiante').innerText = 'Modificar estudiante';
    let estudiante = estudiantes[posicionArray];
    document.getElementById('codigo').value = estudiante.codigo;
    document.getElementById('nombre').value = estudiante.nombre;
  }

  function eliminarEstudiante(index) {
    estudiantes.splice(index, 1);
    mostrarEstudiantes();
  }