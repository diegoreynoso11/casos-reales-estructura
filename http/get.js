import fs from 'fs'
export async function getRoutes (req, res) {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    return res.end(`
          <h1>Api simple estructura - http</h1>
          <h2>/get/all para traer todos los items</h2> 
          <h2>/get/id/:id para traer solo un elemento por su ID.</h2>
          <h2>/get/name/:name para traer un elemento por su nombre.</h2>
          `)
  } else if (req.url === '/get/all') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    const data = fs.readFileSync('data/data.json', 'utf8')
    return res.end(data)
  } else if (req.url.startsWith('/get/id/')) {
    const id = req.url.split('/').pop()
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    const data = fs.readFileSync('data/data.json', 'utf8')
    const items = JSON.parse(data)
    const findItem = items.find(item => item.id === Number(id))
    return res.end(JSON.stringify(findItem || { error: 'Item not found' }))
  } else if (req.url.startsWith('/get/name/')) {
    const name = req.url.split('/').pop()
    const data = fs.readFileSync('data/data.json', 'utf8')
    const items = JSON.parse(data)
    const findedData = []
    items.forEach((i) => {
      const find = i.name.toLowerCase().includes(name.toLowerCase())
      if (!find) return
      findedData.push(i)
    })
    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(findedData.length > 0 ? findedData : { error: 'Producto no encontrado' }))
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    return res.end('<h1>pagina no encontrada 404</h1>')
  }
}
