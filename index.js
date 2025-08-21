const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sistema_gerenciamento_apartamentos'
});
db.connect(err => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conectado ao banco de dados!');
  });
  

// Rota GET para exibir o formulário de cadastro
app.get('/cadastro_ap', (req, res) => {
    res.sendFile(__dirname + '/cadastro_ap.html'); // Caminho absoluto para o arquivo
});

// Rota POST para enviar os dados do formulário ao banco de dados
app.post('/cadastro_ap', (req, res) => {
    console.log('Dados recebidos:', req.body);

    const bloco = req.body.bloco; // Nome do campo no formulário HTML
    const num_ap = req.body.num_ap; // Nome do campo no formulário HTML

    // Query para inserir os dados no banco de dados
    const query = 'INSERT INTO cadastro_ap (bloco, num_ap) VALUES (?, ?)';
    db.query(query, [bloco, num_ap], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco de dados:', err);
            res.status(500).send('Erro ao cadastrar apartamento.');
        } else {
            console.log('Apartamento cadastrado com sucesso:', result);
            res.redirect('/'); // Redireciona para a página inicial ou outra página
        }
    });
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});