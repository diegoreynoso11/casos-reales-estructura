# Caso 01 - API REST con nodejs

Este es un proyecto básico de ejemplo para una **API REST** con:
- ✅ Rutas CRUD: `POST`, `GET`, `PUT`, `DELETE`
- ✅ Scripts para desarrollo
---

## 🧰 Requisitos

- Clona el repositorio
  ```bash
  git clone https://github.com/diegoreynoso11/casos-reales-estructura.git
- Dirigete al directiorio 
  ```bash
  cd 01-api-nodeJS
- `pnpm` (opcional):
  ```bash
  npm install -g pnpm
- Inicia el proyecto en modo MOCK(`json`)
  ```bash
  pnpm run dev-http

:warning: Para iniciar en modo db deberás tener instalado e iniciado `XAMPP` y `MySQL Workbench`   

- Iniciar el servidor MySQL desde XAMPP
Abre el panel de control de `XAMPP` e
Inicia el módulo MySQL haciendo clic en el botón Start.

- Crear la base de datos
Abre MySQL Workbench.
Conéctate al servidor local (localhost) con el usuario por defecto

Ejecuta el siguiente script para crear la base de datos y tabla que usará la API:
 ```bash 
 pnpm run init_db
  ```
- inicia el proyecto en modo DB
  ```bash
  pnpm run dev-http-db

## Endpoints disponibles
### Pagina de inicio
GET http://localhost:3000/

### Obtener todos los elementos
GET http://localhost:3000/get/all

### Obtener un elemento por ID
GET http://localhost:3000/get/id/1

### Obtener un elemento por nombre 
GET http://localhost:3000/get/name/{name}

### Crear un nuevo elemento
POST http://localhost:3000/product/add
```bash
Content-Type: application/json
{
  "name": {name},
  "description": {description}
}
```
### Editar un elemento existente
PUT http://localhost:3000/product/update/{id}
```bash
Content-Type: application/json
{
  "name": {name},
  "description": {description}
}
```
### Eliminar un elemento por ID
DELETE http://localhost:3000/product/delete/{id}