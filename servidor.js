const db = require('./conexao');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/prioridade_alta', (req, res)=>{
    const tipo = "Alta"
    db.query('SELECT * FROM vw_tudo WHERE prioridade=?', 
             [tipo], (erro, resultado)=>{
                if(erro){return res.json({msg:"Falha ao consultar!"+erro.message})}
                return res.json(resultado)
             })
})

app.get('/prioridade_media', (req, res)=>{
    const tipo = "Média"
    db.query('SELECT * FROM vw_tudo WHERE prioridade=?', 
             [tipo], (erro, resultado)=>{
                if(erro){return res.json({msg:"Falha ao consultar!"+erro.message})}
                return res.json(resultado)
             })
})

app.get('/prioridade_baixa', (req, res)=>{
    const tipo = "Baixa"
    db.query('SELECT * FROM vw_tudo WHERE prioridade=?', 
             [tipo], (erro, resultado)=>{
                if(erro){return res.json({msg:"Falha ao consultar!"+erro.message})}
                return res.json(resultado)
             })
})
app.get('/clientes', (req, res)=>{
    db.query('SELECT * FROM tb_clientes', 
              (erro, resultado)=>{
                if(erro){return res.json({msg:"Falha ao consultar!"+erro.message})}
                return res.json(resultado)
             })
})
app.post('/clientes', (req, res)=>{
    const {nome, email} = req.body
    db.query('INSERT INTO tb_clientes (nome, email) VALUES (?, ?)',
            [nome, email], (erro, resultado)=>{
                if(erro){return res.json({msg:"Falha ao cadastrar!"+erro.message})}
                return res.json({msg:"Cadastrado com sucesso!"})
            })
})

app.post('/chamados', (req, res)=>{
    const {assunto, descricao, fk_id_cliente, prioridade} = req.body
    db.query(`INSERT INTO tb_chamados 
             (assunto, descricao, fk_id_cliente, prioridade)
             VALUES (?, ?, ?, ?)`,
             [assunto, descricao, fk_id_cliente, prioridade],
            (erro, resultado)=>{
                if(erro){return res.json({msg:"Falha ao cadastrar!"+erro.message})}
                return res.json({msg:"Cadastrado com sucesso!"})
            })
})

app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
});