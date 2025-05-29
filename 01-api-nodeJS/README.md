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
- Inicia el proyecto 
  ```bash
  pnpm run dev-http

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
