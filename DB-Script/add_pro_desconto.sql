-- =========================================================
-- Migração: campo de desconto do produto (em %)
-- Rode UMA vez no banco existente para habilitar as promoções.
--   mysql -u root ecomercio < DB-Script/add_pro_desconto.sql
-- =========================================================
USE ecomercio;

ALTER TABLE produto
    ADD COLUMN pro_desconto DECIMAL(5,2) NOT NULL DEFAULT 0 AFTER pro_preco;

-- -----------------------------------------------------------------
-- (Opcional) Amostra para ver o carrossel de promoções funcionando.
-- Descomente e ajuste os IDs para os produtos que você já cadastrou.
-- -----------------------------------------------------------------
-- UPDATE produto SET pro_desconto = 30 WHERE pro_id = 1;
-- UPDATE produto SET pro_desconto = 15 WHERE pro_id = 2;
-- UPDATE produto SET pro_desconto = 50 WHERE pro_id = 3;
1