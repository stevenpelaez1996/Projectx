document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-agenda');
    const horaInput = document.getElementById('hora');
    const fechaInput = document.getElementById('fecha');
    
    // Simulación de horarios ocupados
    const entregasOcupadas = {
        '2024-08-20': ['09:00', '10:00', '14:00'],
        '2024-08-21': ['12:00', '15:00']
    };
    
    // Rango de horas disponibles
    const horarioInicio = "09:00";
    const horarioFin = "20:00";

    fechaInput.addEventListener('change', () => {
        actualizarHorariosDisponibles();
    });

    function actualizarHorariosDisponibles() {
        const fechaSeleccionada = fechaInput.value;
        horaInput.innerHTML = ''; // Limpiamos las opciones previas

        if (fechaSeleccionada) {
            const horariosOcupados = entregasOcupadas[fechaSeleccionada] || [];
            for (let i = parseInt(horarioInicio.split(':')[0]); i < parseInt(horarioFin.split(':')[0]); i++) {
                const hora = i < 10 ? `0${i}:00` : `${i}:00`;
                if (!horariosOcupados.includes(hora)) {
                    const option = document.createElement('option');
                    option.value = hora;
                    option.textContent = hora;
                    horaInput.appendChild(option);
                }
            }
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const horaSeleccionada = horaInput.value;
        alert(`Entrega programada para el ${fechaInput.value} a las ${horaSeleccionada}`);
    });

    actualizarHorariosDisponibles(); // Inicializa los horarios cuando se carga la página
});
document.addEventListener('DOMContentLoaded', () => {
    const calendario = document.getElementById('calendario-semanal');

    // Simulación de horarios ocupados
    const entregasOcupadas = {
        '2024-08-20': ['09:30-10:10', '10:50-11:30', '12:50-13:30'],
        '2024-08-21': ['10:10-10:50', '13:30-14:00']
    };

    // Días y horas de la semana
    const dias = ['Hora', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const horas = ['09:00-09:30 CARGA VILLALBA','09:30-10:10', '10:10-10:50', '10:50-11:30', '11:30-12:10', '12:10-12:50', '12:50-13:30', '13:30-14:00 CARGA MAJADAHONDA', '14:00-15:00 DESCANSO', '15:00-15:40', '15:40-16:30', '16:30-17:10','17:10-17:40', '17:40-18:30','18:30-19:10','19:10-19:50','19:50-20:00 CIERRE DEL DIA Y PREPARACION DIA SIGUIENTE'];

    // Generar encabezado del calendario
    dias.forEach(dia => {
        const div = document.createElement('div');
        div.textContent = dia;
        div.className = 'header';
        calendario.appendChild(div);
    });

    // Generar calendario
    horas.forEach(hora => {
        // Columna de las horas
        const horaDiv = document.createElement('div');
        horaDiv.textContent = hora;
        calendario.appendChild(horaDiv);

        // Generar las columnas para cada día
        for (let i = 1; i <= 7; i++) {
            const fecha = `2024-08-${19 + i}`; // Simulamos una semana
            const div = document.createElement('div');

            if (entregasOcupadas[fecha] && entregasOcupadas[fecha].includes(hora)) {
                div.className = 'occupied';
            } else {
                div.className = 'available';
            }

            // Hacer los horarios clicables
            div.addEventListener('click', () => {
                if (div.className === 'available') {
                    alert(`Has seleccionado el ${dias[i]} a las ${hora}`);
                    // Aquí puedes enlazar la selección al formulario
                }
            });

            calendario.appendChild(div);
        }
    });
});
