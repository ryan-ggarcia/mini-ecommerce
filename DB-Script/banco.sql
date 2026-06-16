CREATE DATABASE IF NOT EXISTS ecomercio;
USE ecomercio;

-- =========================
-- TABELA CATEGORIA
-- =========================
CREATE TABLE categoria (
    cat_id INT AUTO_INCREMENT PRIMARY KEY,
    cat_nome VARCHAR(45) NOT NULL
);

-- =========================
-- TABELA ENDERECO
-- =========================
CREATE TABLE endereco (
    end_id INT AUTO_INCREMENT PRIMARY KEY,
    end_cidade VARCHAR(70) NOT NULL,
    end_rua VARCHAR(70) NOT NULL,
    end_numero INT NOT NULL,
    end_bairro VARCHAR(70) NOT NULL,
    end_cep VARCHAR(10) NOT NULL,
    end_uf CHAR(2) NOT NULL,
    end_complemento VARCHAR(100)
);

-- =========================
-- TABELA PERFIL
-- =========================
CREATE TABLE perfil (
    per_id INT AUTO_INCREMENT PRIMARY KEY,
    per_nome VARCHAR(45) NOT NULL
);

-- =========================
-- TABELA USUARIO
-- =========================
CREATE TABLE usuario (
    usu_id INT AUTO_INCREMENT PRIMARY KEY,
    usu_nome VARCHAR(45) NOT NULL,
    usu_email VARCHAR(150) NOT NULL UNIQUE,
    usu_senha VARCHAR(100) NOT NULL,
    usu_telefone VARCHAR(20) NOT NULL UNIQUE,
    usu_cpf VARCHAR(16) NOT NULL UNIQUE,
    usu_status ENUM('ATIVO', 'INATIVO') DEFAULT 'ATIVO',
    usu_data DATE NOT NULL,

    per_id INT NOT NULL,
    end_id INT NOT NULL,

    FOREIGN KEY (per_id) REFERENCES perfil(per_id),
    FOREIGN KEY (end_id) REFERENCES endereco(end_id)
);

-- =========================
-- TABELA PEDIDO
-- =========================
CREATE TABLE pedido (
    ped_id INT AUTO_INCREMENT PRIMARY KEY,
    ped_data DATETIME NOT NULL,
    ped_valorTotal DECIMAL(10,2) NOT NULL,
    ped_status ENUM('PAGO', 'PENDENTE', 'ENVIADO', 'ENTREGUE', 'CANCELADO') DEFAULT 'PENDENTE',

    usu_id INT NOT NULL,
    end_id INT NOT NULL,

    FOREIGN KEY (usu_id) REFERENCES usuario(usu_id),
    FOREIGN KEY (end_id) REFERENCES endereco(end_id)
);

-- =========================
-- TABELA MARCA
-- =========================
CREATE TABLE marca (
    marca_id INT AUTO_INCREMENT PRIMARY KEY,
    marca_nome VARCHAR(45) NOT NULL
);

-- =========================
-- TABELA PRODUTO
-- =========================
CREATE TABLE produto (
    pro_id INT AUTO_INCREMENT PRIMARY KEY,
    pro_nome VARCHAR(60) NOT NULL,
    pro_desc VARCHAR(75) NOT NULL,
    pro_image VARCHAR(255),
    pro_preco DECIMAL(10,2) NOT NULL,
    pro_desconto DECIMAL(5,2) NOT NULL DEFAULT 0,
    pro_quantidade INT NOT NULL,
    pro_validade DATE NOT NULL,
    pro_status ENUM('EM ESTOQUE','SEM ESTOQUE','SALDO') DEFAULT 'EM ESTOQUE',

    cat_id INT NOT NULL,
    marca_id INT NOT NULL,

    FOREIGN KEY (cat_id) REFERENCES categoria(cat_id),
    FOREIGN KEY (marca_id) REFERENCES marca(marca_id)
);

-- =========================
-- TABELA ITEM_PRODUTO
-- =========================
CREATE TABLE item_produto (
    iPro_id INT AUTO_INCREMENT PRIMARY KEY,
    iProd_valorUnitario DECIMAL(10,2) NOT NULL,
    iProd_valorTotal DECIMAL(10,2) NOT NULL,
    iProd_quantidade INT NOT NULL,

    ped_id INT NOT NULL,
    pro_id INT NOT NULL,

    FOREIGN KEY (ped_id) REFERENCES pedido(ped_id),
    FOREIGN KEY (pro_id) REFERENCES produto(pro_id)
);