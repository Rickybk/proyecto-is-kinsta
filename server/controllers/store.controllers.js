const pool = require("../db");

const getDbTime = async (req,res) =>{
  const result = await pool.query("SELECT now()");
  console.log(result);
  res.json(result.rows);
}

const getAllCategories = async (req, res) => {
  const result = await pool.query("SELECT * FROM categorias");
  console.log(result);
  res.json(result.rows);
};

const getACategorie = async (req, res) => {
  const result = await pool.query("SELECT * FROM categorias");
  console.log(result);
  res.json(result.rows[0]);
};

const createACategorie = async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO categorias (nombre_categoria) VALUES ($1)",
      [name]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log("El nombre de la categoria ya existe!");
    res.json({ error: error.message });
  }
};

const deleteACategorie = (req, res) => {

  const id = req.params.id;
  pool.query('DELETE FROM categorias WHERE id_categoria = $1', [id], (error, result1) => {
    if (error) {
      return res.status(500).send('Error eliminando categoria: ' + error);
    }
    return res.status(200).send(`Eliminado ${result1.rowCount} categoria`);
  });
  //  res.json(result.rows[0]);

  //res.send("Borramos una categoria");
};

const updateACategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_categorie } = req.body;
    const newCategorie = await pool.query(
      "UPDATE categorias SET nombre_categoria = $1 WHERE id_categoria = $2 RETURNING *",
      [name_categorie, id]
    );

    if (newCategorie.rows.length === 0)
      return res.status(404).json({ message: "Categoria no encontrada" });

    return res.json(newCategorie.rows[0]);
  } catch (error) {
    console.log("Algo salio mal en la categoria");
    res.json({ error: error.message });
  }

  //res.send("Actualizamos una categoria");
};
/*PRODUCTOS*/

const getAllProductsLots = async (req, res) => {
  try{
  const result = await pool.query("SELECT DISTINCT ON (productos.nombre_producto) productos.*, lotes.* FROM productos JOIN lotes ON productos.id_producto = lotes.id_producto");

  console.log(result);

  res.json(result.rows);
  } catch (err) {
   console.error(err);
   res.status(500).send("Error obteniendo los producto");
  }
};
const getProduct = async (req, res) => {
  const idProduct = req.params.id;
  try {
    const resultProduct = await pool.query("SELECT * FROM productos WHERE id_producto = $1", [idProduct]);
    res.json(resultProduct.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obteniendo el producto");
  }
};
const getLots = async (req, res)=>{
  const idProduct = req.params.id;
  try { 
 const result = await pool.query("SELECT * FROM lotes WHERE id_producto = $1", [idProduct]);
 res.json(result.rows);
  }catch (err) {
    console.error(err);
    res.status(500).send("Error obteniendo lotes");}
}
const createProduct = async (req, res) => {
  try {
    const { nombreProducto, cantidad, costoUnitario, precio, fechaCaducidad, descripcion } =
      req.body;

    const newProduct = await pool.query(
      "INSERT INTO productos (nombre_producto, costo_unitario, precio_unitario, id_categoria, descripcion) VALUES ($1, $2, $3, 2, $4) RETURNING *",
      [nombreProducto, costoUnitario, precio, descripcion]
    );

    const idPro = (await pool.query("SELECT id_producto FROM productos WHERE nombre_producto = $1", [
      nombreProducto,
    ])).rows[0].id_producto;

    const newLot = await pool.query(
      "INSERT INTO lotes (id_producto, cantidad, fecha_caducidad) VALUES ($1, $2, $3) RETURNING *",
      [idPro, cantidad, fechaCaducidad]
    );

    return res.status(200).send(`Añadidos ${newProduct.rowCount} registros de productos y ${newLot.rowCount} registros de lotes`);
  } catch (error) {
    console.log("El producto ya existe!");
    return res.status(500).send('Error añadiendo producto: ' + error);
  }
};

const createLot = async (req, res) => {
  try {
    const idProduct = req.params.id;
    const {
      cantidad, 
      fechaCaducidad
    } = req.body;
    const newLot = await pool.query(
      "INSERT INTO lotes ( id_producto, cantidad, fecha_caducidad) VALUES($1, $2, $3) RETURNING *",
      [idProduct, cantidad,fechaCaducidad]
    );

    res.json({ message: "El lote ha sido creado exitosamente", lot: newLot.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear el lote. Intente nuevamente más tarde." });
  }
};

const deleteProduct = async (req, res) => {

  const id = req.params.id;
  const nameProducto = req.params.nameProduct;
  pool.query('DELETE FROM lotes WHERE id_producto = $1', [id], (error, result1) => {
    if (error) {
      return res.status(500).send('Error eliminando lote: ' + error);
    }
    pool.query('DELETE FROM productos WHERE nombre_producto = $1', [nameProducto], (error, result2) => {
      if (error) {
        return res.status(500).send('Error eliminando de producto: ' + error);
      }
      return res.status(200).send(`Eliminados ${result1.rowCount} registros de lotes y ${result2.rowCount} registros de productos`);
    });
  });
  //  res.json(result.rows[0]);

};

const deleteLot = async (req, res) => {
  const idLot = req.params.id;
  try {
    const result1 = await pool.query('DELETE FROM lotes WHERE id_lote = $1', [idLot]);
    return res.status(200).send(`Eliminados ${result1.rowCount} registros de lotes`);
  } catch (error) {
    return res.status(500).send('Error eliminando lote: ' + error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_producto, costo_unitario, precio_unitario, id_category, descripcion } = req.body;
    const newProduct = await pool.query(
      "UPDATE productos SET nombre_producto = $1, costo_unitario = $2, precio_unitario = $3, id_categoria = $4, descripcion = $5 WHERE id_producto = $6 RETURNING *",
      [nombre_producto, costo_unitario, precio_unitario, id_category, descripcion, id]
    );

    if (newProduct.rows.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    return res.json(newProduct.rows[0]);
  } catch (error) {
    console.log("Algo salio mal");
    res.json({ error: error.message });
  }

};

const updateLote = async (req, res) => {
  try {
    const { idLote } = req.params;
    const {idProducto} = req.params;
    const {
      cantidad,
      fecha_caducidad,
    } = req.body;
    const newProduct = await pool.query(
      "UPDATE lotes SET cantidad = $1, fecha_caducidad = $2 WHERE id_lote = $3 AND id_producto = $4 RETURNING *",
      [cantidad, fecha_caducidad, idLote, idProducto]
    );

    if (newProduct.rows.length === 0)
      return res.status(404).json({ message: "Lote no encontrado" });

    return res.json(newProduct.rows[0]);
  } catch (error) {
    console.log("Algo salio mal");
    res.json({ error: error.message });
  }
};



module.exports = {
  getAllCategories,
  getACategorie,
  createACategorie,
  deleteACategorie,
  updateACategorie,
  getAllProductsLots,
  getProduct,
  getLots,
  createProduct,
  createLot,
  deleteProduct,
  deleteLot,
  updateProduct,
  updateLote,
  getDbTime
};
