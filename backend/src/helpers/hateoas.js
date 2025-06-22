const HATEOAS = async (table, req) => {
  const results = table.map(item => {
    return {
      id: item.id,
      nombre: item.nombre,
      categoria: item.categoria,
      metal: item.metal,
      precio: item.precio,
      stock: item.stock,
      href: `/api/v1/products/${item.id}`,
      method: 'GET'
    }
  }).slice(0, 10);
  const total = table.length;
  const dataWithHATEOAS = {
    results,
    total
  }
  return dataWithHATEOAS
}

export default HATEOAS
