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

app.get('/clientes/:id', (req, res)=>{
    const id = req.params.id
    db.query('SELECT * FROM tb_clientes WHERE id_cliente=?', [id],
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

app.delete('/chamado/:id_chamado', (req, res)=>{
    const id_chamado = req.params.id_chamado
    db.query('DELETE FROM tb_chamados WHERE id_chamado=?',
              [id_chamado], (erro, resultado)=>{
            if(erro){return res.json({msg:"Falha ao deletar!"+erro.message})}
            if(resultado.length == 0){return res.json({msg:"Nada alterado"})}
            return res.json({msg:"Deletado com sucesso!"})
    })
})
app.delete('/cliente/:id_cliente', (req, res)=>{
    const id_cliente = req.params.id_cliente
    db.query('DELETE FROM tb_clientes WHERE id_cliente=?',
              [id_cliente], (erro, resultado)=>{
            if(erro){return res.json({msg:"Falha ao deletar!"+erro.message})}
            if(resultado.length == 0){return res.json({msg:"Nada alterado"})}
            return res.json({msg:"Deletado com sucesso!"})
    })
})
app.delete('/chamado/:id_chamado', (req, res)=>{
    const id_chamado = req.params.id_chamado
    db.query('DELETE FROM tb_chamados WHERE id_chamado=?',
              [id_chamado], (erro, resultado)=>{
            if(erro){return res.json({msg:"Falha ao deletar!"+erro.message})}
            if(resultado.length == 0){return res.json({msg:"Nada alterado"})}
            return res.json({msg:"Deletado com sucesso!"})
    })
})

app.put('/chamado',(req,res)=>{
      const {assunto, descricao, fk_id_cliente, prioridade, id_chamado}
      = req.body
      db.query(`UPDATE tb_chamados SET assunto=?, descricao=?,
              fk_id_cliente=?, prioridade=? WHERE id_chamado=?`,
              [assunto, descricao, fk_id_cliente, prioridade, id_chamado],
              (erro, resultado)=>{
                   if(erro){return res.json({msg:"Falha ao atualizar!"+erro.message})}
                   return res.json({msg:"Atualizado com sucesso!"})
              })
})








app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
});