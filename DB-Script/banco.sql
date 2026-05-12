-- -----------------------------------------------------
-- Schema ecomercio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecomercio` DEFAULT CHARACTER SET utf8;

-- -----------------------------------------------------
-- Schema PFS1_106888
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `PFS1_106888` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `ecomercio`;

-- -----------------------------------------------------
-- Table `ecomercio`.`Perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecomercio`.`Perfil` (
  `per_id`   INT         NOT NULL AUTO_INCREMENT,
  `per_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`per_id`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecomercio`.`Endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecomercio`.`Endereco` (
  `end_id`     INT         NOT NULL AUTO_INCREMENT,
  `end_cidade` VARCHAR(70) NOT NULL,
  `end_rua`    VARCHAR(70) NOT NULL,
  `end_numero` INT         NOT NULL,
  `end_bairro` VARCHAR(70) NOT NULL,
  `end_cep`    VARCHAR(10) NOT NULL,
  `end_uf`     CHAR(2) NOT NULL, 
  `end_complemento` VARCHAR(100) NULL,
  PRIMARY KEY (`end_id`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecomercio`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecomercio`.`Usuario` (
  `usu_id`        INT          NOT NULL AUTO_INCREMENT,
  `usu_nome`      VARCHAR(45)  NOT NULL,
  `usu_email`     VARCHAR(150) NOT NULL,
  `usu_senha`     VARCHAR(100)  NOT NULL,
  `usu_telefone`  VARCHAR(20)  NOT NULL,
  `usu_cpf`       VARCHAR(16)  NOT NULL,
  `Perfil_per_id`    INT       NOT NULL,
  `end_id` INT       NOT NULL,
  PRIMARY KEY (`usu_id`),
  UNIQUE INDEX `usu_telefone_UNIQUE` (`usu_telefone`),
  UNIQUE INDEX `usu_cpf_UNIQUE` (`usu_cpf`),
  UNIQUE INDEX `usu_email_UNIQUE` (`usu_email`),
  INDEX `fk_Usuario_Perfil1_idx` (`Perfil_per_id`),
  INDEX `fk_Usuario_Endereco1_idx` (`end_id`),
  CONSTRAINT `fk_Usuario_Perfil1`
    FOREIGN KEY (`Perfil_per_id`)
    REFERENCES `ecomercio`.`Perfil` (`per_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_Endereco1`
    FOREIGN KEY (`end_id`)
    REFERENCES `ecomercio`.`Endereco` (`end_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecomercio`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecomercio`.`Categoria` (
  `cat_id`   INT         NOT NULL AUTO_INCREMENT,
  `cat_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecomercio`.`Marca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecomercio`.`Marca` (
  `marca_id`   INT         NOT NULL AUTO_INCREMENT,
  `marca_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`marca_id`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecomercio`.`Produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecomercio`.`Produto` (
  `pro_id`    INT           NOT NULL AUTO_INCREMENT,
  `pro_nome`  VARCHAR(60)   NOT NULL,
  `pro_desc`  VARCHAR(75)   NOT NULL,
  `pro_image` VARCHAR(255)  NULL,
  `pro_preco` DECIMAL(10,2) NOT NULL,
  `pro_quantidade` INT NOT NULL,
  `cat_id` INT   NOT NULL,
  `marca_id`     INT   NOT NULL,
  PRIMARY KEY (`pro_id`),
  INDEX `fk_Produto_Categoria_idx` (`cat_id`),
  INDEX `fk_Produto_Marca1_idx` (`marca_id`),
  CONSTRAINT `fk_Produto_Categoria`
    FOREIGN KEY (`cat_id`)
    REFERENCES `ecomercio`.`Categoria` (`cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produto_Marca1`
    FOREIGN KEY (`marca_id`)
    REFERENCES `ecomercio`.`Marca` (`marca_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecomercio`.`Pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecomercio`.`Pedido` (
  `ped_id`          INT           NOT NULL AUTO_INCREMENT,
  `usu_id`          INT           NOT NULL,
  `end_id`          INT           NOT NULL,
  `ped_data`        DATETIME      NOT NULL,
  `ped_valorTotal`  DECIMAL(10,2) NOT NULL,
  `ped_status`      ENUM('PAGO','PENDENTE','ENVIADO','ENTREGUE','CANCELADO') DEFAULT 'PENDENTE',
  PRIMARY KEY (`ped_id`),
  INDEX `fk_Pedido_Usuario1_idx` (`usu_id`),
  INDEX `fk_Pedido_Endereco1_idx` (`end_id`),
  CONSTRAINT `fk_Pedido_Usuario1`
    FOREIGN KEY (`usu_id`)
    REFERENCES `ecomercio`.`Usuario` (`usu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pedido_Endereco1`
    FOREIGN KEY (`end_id`)
    REFERENCES `ecomercio`.`Endereco` (`end_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecomercio`.`Item_Produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecomercio`.`Item_Produto` (
  `iPro_id`           INT           NOT NULL AUTO_INCREMENT,
  `iProd_valorUnitario` DECIMAL(10,2) NOT NULL,
  `iProd_valorTotal`    DECIMAL(10,2) NOT NULL,
  `ped_id`     INT           NOT NULL,
  `pro_id`    INT           NOT NULL,
  `iProd_quantidade`  INT           NOT NULL,
  PRIMARY KEY (`iPro_id`),
  INDEX `fk_Item_Produto_Pedido1_idx` (`ped_id`),    
  INDEX `fk_Item_Produto_Produto1_idx` (`pro_id`),
  CONSTRAINT `fk_Item_Produto_Pedido1`
    FOREIGN KEY (`ped_id`)
    REFERENCES `ecomercio`.`Pedido` (`ped_id`),
  CONSTRAINT `fk_Item_Produto_Produto1`
    FOREIGN KEY (`pro_id`)
    REFERENCES `ecomercio`.`Produto` (`pro_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- =====================================================
USE `PFS1_106888`;
-- =====================================================

-- -----------------------------------------------------
-- Table `PFS1_106888`.`tb_categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PFS1_106888`.`tb_categoria` (
  `cat_id`   INT          NOT NULL AUTO_INCREMENT,
  `cat_nome` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 5
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `PFS1_106888`.`tb_marca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PFS1_106888`.`tb_marca` (
  `mar_id`   INT          NOT NULL AUTO_INCREMENT,
  `mar_nome` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`mar_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `PFS1_106888`.`tb_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PFS1_106888`.`tb_pedido` (
  `ped_id`         INT          NOT NULL AUTO_INCREMENT,
  `ped_data`       DATETIME     NULL DEFAULT NULL,
  `ped_valortotal` DECIMAL(8,2) NULL DEFAULT NULL,
  PRIMARY KEY (`ped_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 89
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `PFS1_106888`.`tb_produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PFS1_106888`.`tb_produto` (
  `prd_id`        INT           NOT NULL AUTO_INCREMENT,
  `prd_cod`       VARCHAR(50)   NULL DEFAULT NULL,
  `prd_nome`      VARCHAR(255)  NULL DEFAULT NULL,
  `prd_quantidade` INT          NULL DEFAULT NULL,
  `cat_id`        INT           NULL DEFAULT NULL,
  `mar_id`        INT           NULL DEFAULT NULL,
  `prd_valor`     DECIMAL(10,2) NULL DEFAULT NULL,
  `prd_imagem`    VARCHAR(50)   NULL DEFAULT NULL,
  PRIMARY KEY (`prd_id`),
  INDEX `fk_produto_marca` (`mar_id`),
  INDEX `fk_produto_categoria` (`cat_id`),
  CONSTRAINT `fk_produto_categoria`
    FOREIGN KEY (`cat_id`)
    REFERENCES `PFS1_106888`.`tb_categoria` (`cat_id`),
  CONSTRAINT `fk_produto_marca`
    FOREIGN KEY (`mar_id`)
    REFERENCES `PFS1_106888`.`tb_marca` (`mar_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 58
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `PFS1_106888`.`tb_pedidoitens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PFS1_106888`.`tb_pedidoitens` (
  `pit_id`           INT          NOT NULL AUTO_INCREMENT,
  `ped_id`           INT          NULL DEFAULT NULL,
  `prd_id`           INT          NULL DEFAULT NULL,
  `pit_quantidade`   INT          NULL DEFAULT NULL,
  `pit_valorunidade` DECIMAL(6,2) NULL DEFAULT NULL,
  `pit_valortotal`   DECIMAL(6,2) NULL DEFAULT NULL,
  PRIMARY KEY (`pit_id`),
  INDEX `fk_pedido_item` (`ped_id`),
  INDEX `fk_pedido_produto` (`prd_id`),
  CONSTRAINT `fk_pedido_item`
    FOREIGN KEY (`ped_id`)
    REFERENCES `PFS1_106888`.`tb_pedido` (`ped_id`),
  CONSTRAINT `fk_pedido_produto`
    FOREIGN KEY (`prd_id`)
    REFERENCES `PFS1_106888`.`tb_produto` (`prd_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 49
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `PFS1_106888`.`tb_perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PFS1_106888`.`tb_perfil` (
  `per_id`        INT          NOT NULL AUTO_INCREMENT,
  `per_descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`per_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `PFS1_106888`.`tb_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PFS1_106888`.`tb_usuario` (
  `usu_id`    INT          NOT NULL AUTO_INCREMENT,
  `usu_nome`  VARCHAR(200) NOT NULL,
  `usu_email` VARCHAR(100) NOT NULL,
  `usu_senha` VARCHAR(32)  NOT NULL,
  `usu_ativo` ENUM('S','N') NULL DEFAULT 'S',
  `per_id`    INT          NULL DEFAULT NULL,
  PRIMARY KEY (`usu_id`),
  INDEX `fk_usuario_perfil` (`per_id`),
  CONSTRAINT `fk_usuario_perfil`
    FOREIGN KEY (`per_id`)
    REFERENCES `PFS1_106888`.`tb_perfil` (`per_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 69
  DEFAULT CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;