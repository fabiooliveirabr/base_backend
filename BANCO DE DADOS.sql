# Criar um banco de dados
CREATE DATABASE base_revisao_saep;

# Selecione o Banco de Dados
USE base_revisao_saep;

# Criar a tabela de clientes
CREATE TABLE tb_clientes(
	id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

# Criar a tabela de chamados
CREATE TABLE tb_chamados(
	id_chamado INT PRIMARY KEY AUTO_INCREMENT,
    assunto VARCHAR(100) NOT NULL,
    descricao TEXT(500) NOT NULL,
    fk_id_cliente INT NOT NULL,
    prioridade ENUM('Alta','Média','Baixa') DEFAULT 'Média' NOT NULL
);

# Vincular a tabela de chamados com a de clientes
ALTER TABLE tb_chamados ADD CONSTRAINT rel_chamado_cliente
FOREIGN KEY (fk_id_cliente) REFERENCES tb_clientes(id_cliente);

# Dados de teste
INSERT INTO tb_clientes (nome, email) VALUES
('José Vinícius', 'josevinicius@email.com'),
('Kamila Vitória', 'kamilavitoria@email.com'),
('Davisson Cauê', 'davissonsantacruz@email.com');

INSERT INTO tb_chamados(assunto, descricao, fk_id_cliente, prioridade)
VALUES
('Emissão de Comprovante', 'Preciso do comprovante', 2, 'Alta'),
('Informações', 'Rastreio do pedido camisa Sta. Cruz', 3, 'Média'),
('Informações','Atraso na entrega da camisa do Sta. Cruz', 3, 'Alta'),
('Confirmação do pedido', 'Gostaria de pedir mais 2 camisas Sport', 1,'Baixa');

CREATE VIEW vw_tudo AS
SELECT * FROM tb_chamados INNER JOIN tb_clientes
ON tb_chamados.fk_id_cliente = tb_clientes.id_cliente;





















