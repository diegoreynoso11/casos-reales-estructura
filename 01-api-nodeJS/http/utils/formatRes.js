export class FormatRes {
  constructor (res) {
    this.res = res
  }

  // creo el send que es la base de las demás funciones de respuesta
  send (status, data, headers = { 'Content-Type': 'application/json; charset=utf-8' }) {
    this.res.writeHead(status, headers)
    return this.res.end(JSON.stringify(data))
  }

  // success envía a send como status 200 y como data = data
  success (data) {
    return this.send(200, data)
  }

  created (data) {
    return this.send(201, data)
  }

  badRequest (message = 'Solicitud incorrecta') {
    return this.send(400, { error: message })
  }

  notFound (message = 'No encontrado') {
    return this.send(404, { error: message })
  }

  serverError (message = 'Error interno del servidor') {
    return this.send(500, { error: message })
  }

  notFoundRoute () {
    this.res.writeHead(404, { 'Content-Type': 'text/html' })
    return this.res.end('<h1>404 - Página no encontrada</h1>')
  }
}
