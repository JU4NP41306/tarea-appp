class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.completa = false;
    }

    toggleEstado() {
        this.completa = !this.completa;
    }
}

class GestorDeTareas {
    constructor() {
        this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        this.renderizarTareas();
    }

    agregarTarea(nombre) {
        if (nombre.trim() === '') return alert('La tarea no puede estar vacía');
        const nuevaTarea = new Tarea(nombre);
        this.tareas.push(nuevaTarea);
        this.actualizarLocalStorage();
        this.renderizarTareas();
    }

    eliminarTarea(index) {
        this.tareas.splice(index, 1);
        this.actualizarLocalStorage();
        this.renderizarTareas();
    }

    editarTarea(index, nuevoNombre) {
        if (nuevoNombre.trim() === '') return alert('El nombre de la tarea no puede estar vacío');
        this.tareas[index].nombre = nuevoNombre;
        this.actualizarLocalStorage();
        this.renderizarTareas();
    }

    actualizarLocalStorage() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }

    renderizarTareas() {
        const lista = document.getElementById('taskList');
        lista.innerHTML = '';
        this.tareas.forEach((tarea, index) => {
            const li = document.createElement('li');
            li.textContent = tarea.nombre;
            
            const btnEditar = document.createElement('button');
            btnEditar.textContent = '       Editar';
            btnEditar.onclick = () => {
                const nuevoNombre = prompt('Editar tarea:', tarea.nombre);
                if (nuevoNombre) this.editarTarea(index, nuevoNombre);
            };
            
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = '     Eliminar';
            btnEliminar.onclick = () => this.eliminarTarea(index);
            
            li.appendChild(btnEditar);
            li.appendChild(btnEliminar);
            lista.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gestor = new GestorDeTareas();
    document.getElementById('addTask').addEventListener('click', () => {
        const nombre = document.getElementById('taskName').value;
        gestor.agregarTarea(nombre);
        document.getElementById('taskName').value = '';
    });
});
