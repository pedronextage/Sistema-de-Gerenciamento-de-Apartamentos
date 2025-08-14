const mysql = require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sistema_gerenciamento_apartamentos'
});
connection.connect(function(err) {
    if(err){
        console.error("Erro: ", err)
        return;
    }else {
        console.log("Conexão ok")
    }
});
module.exports = connection;

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
});

app.get('/cadastro_ap', (req, res)=> {
    res.sendFile(__dirname + '/cadastro_ap.html');
});
app.post('/cadastrar_apto', (req, res) => {
    const bloco = req.body.bloco;
    const number_ap = req.body.number_ap;

    const insert = 
            'INSERT INTO cadastro_ap (bloco, number_ap) VALUES (?, ?)';
    
    connection.query(insert, [bloco, number_ap], (err, results) => {
        if(err) {
            console.error("Erro ao cadastrar: ", err);
            res.status(500).send('Erro ao cadastrar apartamento');
        } else{
        console.log("Apartamento cadastrado com sucesso");
        res.redirect('/');
        }
    });
});



app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
    }
);