CREATE DATABASE product_master;
USE product_master;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255)
);
-- codificación para que no haya problemas con caracteres especiales
SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;
SET COLLATION_CONNECTION = 'utf8mb4_unicode_ci';

INSERT INTO products (name, description) VALUES
('Camiseta Básica', 'Camiseta de algodón 100% en varios colores disponibles.'),
('Zapatos Deportivos', 'Calzado cómodo y ligero para correr o caminar.'),
('Mochila Escolar', 'Mochila con múltiples compartimentos y diseño ergonómico.'),
('Auriculares Inalámbricos', 'Auriculares Bluetooth con cancelación de ruido.'),
('Botella Térmica', 'Botella de acero inoxidable que mantiene la temperatura durante horas.')