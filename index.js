const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// algoritmo de luhn
const validarCedula = (cedula) => {
    let numero = cedula.substring(0, cedula.length - 1);
    numero = numero.split('').reverse().join('');
    let digito = cedula.substring(cedula.length - 1, cedula.length);
    let digito_suma = 0;
    let total = 0;
    for(let i = 0; i < numero.length; i++) {
        if(i % 2 == 0) {
            let aux = Number(numero[i]) * 2;
            if(aux >= 10) aux -= 9;
            digito_suma += aux;
        } else {
            digito_suma += Number(numero[i]);
        }
    }
    total = digito_suma * 9;
    total = total % 10;
    if(total != digito) {
        return false;
    } else {
        return true;
    }
}
// agregar una cabecera el servidor
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}
);


app.get("/modulo10", (req, res) => {
    
    const modulo10 = "Hola Mundo";

    res.send(modulo10);


});

app.post("/comprobar", (req, res) => {
    const modulo10 = req.body.cedula;
    
    res.send(modulo10.cedula = validarCedula(`${modulo10}`));
});

const puerto = 3000;
console.log(`Estoy escuchando conexciones por el puerto ${puerto}`);
app.listen(puerto);