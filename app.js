//importiamo express
const express = require('express');
// Importiamo cors
const cors = require('cors');

// inizializziamo express e lo salviamo in variabile
const app = express();

// salviamo la porta del serve che vogliamo utilizzare
const port = 3000;

// importiamo router
const postsRouters = require('./router/postsRouter');

// importiamo i middleware 
const errorsHandler = require('./middlewares/errorsHandler_mws');
const endPointNotFound = require('./middlewares/notFound_mws')


// colleghiamo la cartella con i file statici
app.use(express.static('public'));
// registro il body parsers
app.use(express.json());

// Abilitiamo Cors
app.use(cors({
    origin: 'http://localhost:5173'
}));

// definiamo la prima rotta --> HOME
app.get('/', (req, res) => {
    res.send('benvenuti nella mia home')
});

// indichiamo ad express che esistono nuove rotte
app.use('/posts', postsRouters);

// registro l'endpoint notFound mws
app.use(endPointNotFound);

// registro l'errorshandler mws
app.use(errorsHandler);


// avviamo il server mettendolo in ascolto nella porta indicata
app.listen(port, () => {
    console.log(`la porta di utilizzo è ${port}`)
});
