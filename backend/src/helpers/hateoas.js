const HATEOAS = (table, req) => {
  const results = table.map(item => {
    return {
      id: item.id,
      nombre: item.nombre,
      categoria: item.categoria,
      metal: item.metal,
      precio: item.precio,
      stock: item.stock,
      href: `${req.protocol}://${req.get("host")}${req.originalUrl}/${item.id}`,
      method: 'GET'
    }
  });

  const total = table.length;
  const dataWithHATEOAS = {
    results,
    total,
  }
  return dataWithHATEOAS
}

export default HATEOAS
