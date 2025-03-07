// ci spostiamo i dati in cima
const connection = require('../data/db')


//FUNCTION -> inseriamo le funzioni delle operazioni crud e la loro logica dandogli i nomi delle stesse operazione
// index
function index(req, res) {
    // prepariamo la query
    const postSql = `
        SELECT *
        FROM posts
    `;

    // eseguiamo la query
    connection.query(postSql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })
}

// show
function show(req, res) {
    const id = req.params.id
};

// store
function store(req, res) {
    // res.send('crea un nuovo post');
    console.log(req.body);

    // creiamo un nuovo id per il runtime
    const newId = postsData[postsData.length - 1].id + 1;
    // creiamo un nuovo oggetto
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
        pubblicato: req.body.pubblicato,
    };
    postsData.push(newPost);
    // controlliamo
    console.log(postsData);
    // Restituisco lo stato
    res.status(201);
    // restituisco l'oggetto
    res.json(newPost);

};

// update
function update(req, res) {
    // res.send(`aggiorna il post ${req.params.id}`);
    console.log(req.body);
    // recuperiamo il parametro dinamico dell'id e convertiamolo in numero salvandolo in variabile
    const id = parseInt(req.params.id);

    // utilizziamo il metodo find per identificare e farci restituire l'elemento corrispondente
    const post = postsData.find(post => post.id === id);

    // controlliamo se esiste il post
    if (!post) {
        res.status(404)
        res.json({
            error: "Not Found",
            message: "Elemento non trovato"
        })
    };

    //Aggiorniamo i post con il file ricevuto nel body della richiesta
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;
    post.pubblicato = req.body.pubblicato;



    // controlliamo la lista aggiornata
    console.log(postsData);
    // Restituiamo l'oggetto appena aggiornato
    res.json(post);
};

// modify
function modify(req, res) {
    // res.send(`aggiorna il post ${req.params.id}`);
    console.log(req.body);

    // recuperiamo il parametro dinamico dell'id e convertiamolo in numero salvandolo in variabile
    const id = parseInt(req.params.id);

    // utilizziamo il metodo find per identificare e farci restituire l'elemento corrispondente
    const post = postsData.find(post => post.id === id);

    // controlliamo se esiste il post
    if (!post) {
        res.status(404)
        res.json({
            error: "Not Found",
            message: "Elemento non trovato"
        });
    };

    //Aggiorniamo i post con il file ricevuto nel body della richiesta con condizione di uscita
    req.body.title ? post.title = req.body.title : post.title = post.title
    req.body.content ? post.content = req.body.content : post.content = post.content
    req.body.image ? post.image = req.body.image : post.image = post.image
    req.body.tags ? post.tags = req.body.tags : post.tags = post.tags
    req.body.pubblicato ? post.pubblicato = req.body.pubblicato : post.pubblicato = post.pubblicato


    // controlliamo la lista aggiornata
    console.log(postsData);
    // Restituiamo l'oggetto appena aggiornato
    res.json(post);
};

// destroy
function destroy(req, res) {
    // res.send(`elimina il post ${req.params.id}`);

    // recuperiamo il parametro dinamico dell'id e convertiamolo in numero salvandolo in variabile
    const id = parseInt(req.params.id);

    // utilizziamo il metodo find per identificare e farci restituire l'elemento corrispondente
    const post = postsData.find(post => post.id === id);

    //Risoluzione undefined
    if (!post) {
        // ritorno lo stato di errore 404
        res.status(404)
        return res.json({
            error: 'not found',
            message: 'il post non è esistente',
            help: "verifica se l'id è corretto"
        });
    };


    //se trova l'elemento rimuovilo dall'array di oggetti
    postsData.splice(postsData.indexOf(post), 1);

    // mostrami l'array aggiornato
    console.log(postsData);

    //Restituiamo al Client che è stato effettuato tutto con successo
    res.sendStatus(204); //204 ok, nessun contenuto

};

module.exports = { index, show, store, update, modify, destroy };