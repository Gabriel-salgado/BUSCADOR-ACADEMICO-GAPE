const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let bd = [{
        pregunta: "¿Cuál es la ubicación exacta del bloque de informática?",
        respuesta: "Carrera 6 No. 77-305 Bloque 33 Ciudadela Universitaria – Montería, Córdoba"
    },
   
    {
        pregunta: "¿Cuál es la duración del la carrera de licenciatura en informática?",
        respuesta: "Duración estimada: 10 semestres"
    },
    {
        pregunta: "¿Cuál es el E-mail del programa de Licenciatura en Informática?",
        respuesta: "dptoinformatica@correo.unicordoba.edu.co "
    },
   
    {
        pregunta: "¿Esta acredita el programa de licenciatura en informática?",
        respuesta: "Si, cuenta con su Registro Calificado: Resolución número 03065 del 11 de marzo de 2015"
    },
    {
        pregunta: "¿Cuál es la metodología que implementa el programa de licenciatura en informática para dar sus clases?",
        respuesta: "Metodología: Presencial"
    },
    {
        pregunta: "¿Cuál es número total de créditos otorgados por la carrera de licenciatura en informática?",
        respuesta: "Número de créditos académicos: 165"
    },
    {
        pregunta: "¿Qué nivel de formación otorga el programa de licenciatura en informática?",
        respuesta: "Nivel de formación: Profesional Universitario"
    },
    {
        pregunta: "¿Cuál es el numero teléfono para comunicarse con el departamento de informática?",
        respuesta: "Teléfono: 781-80-05"
    },
   
];

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    socket.on('chat message', (msg) => {
        console.log("nuevo usuario")
        for (let i = 0; i < bd.length; i++) {
            if (bd[i].pregunta == msg) {
                msg = bd[i].respuesta
            }
        }

        io.emit('chat message', msg);
    });
});

http.listen(port, () => {
    console.log('listening on *:' + port);
});