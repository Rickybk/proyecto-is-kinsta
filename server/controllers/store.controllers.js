const pool = require("../db");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { createAndUploadFile } = require('../uploadImg');
const { auth } = require('../auth');

const uploadImg = (req, res, next) => {
  upload.single('image')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    }

    const file = req.file;

    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    console.log("Archivo recibido: ", file.originalname);
    const url = await createAndUploadFile(auth, req.file)
    res.json({ imgUrl: url });
  });
};

const getDbTime = async (req, res) => {
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
  const id = req.params.id;
  try {
    const { rows } = await pool.query("SELECT nombre_categoria FROM categorias WHERE id_categoria = $1", [id]);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obteniendo la categoria");
  }
};
const createACategorie = async (req, res) => {
  const { nombreCategoria } = req.body;
  try {
    const existingProduct = await pool.query(
      "SELECT COUNT(*) AS cantidad_encontrada FROM categorias WHERE nombre_categoria = $1",
      [nombreCategoria]
    );
    if (existingProduct.rows[0].cantidad_encontrada !== '0') {
      return res.status(200).json({ data: 1 });
    }
    const result = await pool.query(
      "INSERT INTO categorias (nombre_categoria) VALUES ($1)",
      [nombreCategoria]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log("Error añadiendo categoria");
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

};

const updateACategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreCategoria } = req.body;
    const existingProduct = await pool.query(
      "SELECT COUNT(*) AS cantidad_encontrada FROM categorias WHERE nombre_categoria = $1",
      [nombreCategoria]
    );
    if (existingProduct.rows[0].cantidad_encontrada !== '0') {
      return res.status(200).json({ data: 1 });
    }

    const newCategorie = await pool.query(
      "UPDATE categorias SET nombre_categoria = $1 WHERE id_categoria = $2",
      [nombreCategoria, id]
    );
    return res.json(newCategorie.rows[0]);
  } catch (error) {
    console.log("Error modificando categoria");
    res.json({ error: error.message });
  }

};

const getProductOfCategorie = async (req, res) => {
  const id = req.params.id;
  try {
    const { rows } = await pool.query(`
    SELECT DISTINCT id_producto, nombre_producto, precio_unitario, id_categoria, descripcion, total, imagen 
    FROM productos
    WHERE id_categoria = $1 
    ORDER BY nombre_producto ASC;`,
      [id]);
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send("Error obteniendo los productos");
  }
}



const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT p.id_producto, p.nombre_producto, p.precio_unitario, p.id_categoria, p.descripcion, p.total, p.imagen, l.cantidad, l.fecha_caducidad, l.costo_unitario FROM productos p, lotes l WHERE p.id_producto = l.id_producto ORDER BY p.nombre_producto ASC;");

    console.log(result);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obteniendo los productos");
  }
};
const getProduct = async (req, res) => {
  const idProduct = req.params.idProduct;
  try {
    const resultProduct = await pool.query("SELECT * FROM productos WHERE id_producto = $1", [idProduct]);
    res.json(resultProduct.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obteniendo el producto");
  }
};
const getBuy = async (req, res) => {
  const idProduct = req.params.idProduct;
  try {
    const result = await pool.query("SELECT id_lote, cantidad, fecha_caducidad, costo_unitario, costo_total FROM lotes WHERE id_producto = $1", [idProduct]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obteniendo compras");
  }
}
const createProduct = async (req, res) => {
  try {
    const { nombreProducto, precio, descripcion, image } =
      req.body;
    const { idCategory } = req.params;
    const existingProduct = await pool.query(
      "SELECT COUNT(*) AS cantidad_encontrada FROM productos WHERE nombre_producto = $1",
      [nombreProducto]
    );
    if (existingProduct.rows[0].cantidad_encontrada !== '0') {
      return res.status(200).json({ data: 1 });
    }
    const newProduct = await pool.query(
      "INSERT INTO productos (nombre_producto, precio_unitario, descripcion,total, imagen, id_categoria) VALUES ($1, $2, $3, 0, $4, $5)",
      [nombreProducto, precio, descripcion, image, idCategory]
    );
    return res.status(200).json(`Añadidos ${newProduct.rowCount} registros de productos`);
  } catch (error) {
    return res.status(500).json(`Error añadiendo producto: ${error.toString()} \n ${error.stack}`);
  }
};


const createBuy = async (req, res) => {
  try {
    const idProduct = req.params.idProduct;
    const {
      cantidad,
      fechaCaducidad,
      costo_unitario
    } = req.body;
    const totalCosto = parseFloat(costo_unitario) * parseInt(cantidad);
    const newLot = await pool.query(
      "INSERT INTO lotes (id_producto, cantidad, fecha_caducidad, costo_unitario, costo_total) VALUES ($1, $2, $3, $4, $5)",
      [idProduct, cantidad, fechaCaducidad, costo_unitario, totalCosto]
    );
    const cantTotal = (await pool.query("SELECT total FROM productos WHERE id_producto = $1", [
      idProduct
    ])).rows[0].total;
    const total = parseInt(cantidad) + parseInt(cantTotal);
    await pool.query("UPDATE productos SET total = $1 WHERE id_producto = $2", [total, idProduct]);

    res.json({ message: "El lote ha sido creado exitosamente", lot: newLot.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear el lote." });
  }
};
const deleteProduct = async (req, res) => {

  const id = req.params.idProduct;
  try {
    const result1 = await pool.query('DELETE FROM lotes WHERE id_producto = $1', [id]);
    const result2 = await pool.query('DELETE FROM productos WHERE id_producto = $1', [id]);
    return res.status(200).json({ message: `Eliminados ${result1.rowCount} registros de compras y ${result2.rowCount} registros de productos` });
  } catch (error) {
    return res.status(500).json({ message: 'Error eliminando producto: ' + error });
  }
};

const deleteBuy = async (req, res) => {
  const idLot = req.params.idLot;
  try {
    const cantidad = (await pool.query("SELECT cantidad FROM lotes WHERE id_lote = $1", [idLot])).rows[0].cantidad;
    const idProduct = (await pool.query("SELECT id_producto FROM lotes WHERE id_lote = $1", [idLot])).rows[0].id_producto;
    const total = (await pool.query("SELECT total FROM productos WHERE id_producto = $1", [
      idProduct
    ])).rows[0].total;
    const nuevoTotal = parseInt(total)-parseInt(cantidad);
    await pool.query("UPDATE productos SET total = $1 WHERE id_producto = $2", [nuevoTotal, idProduct]);
    const result1 = await pool.query('DELETE FROM lotes WHERE id_lote = $1', [idLot]);
    return res.status(200).send(`Eliminados ${result1.rowCount} registros de compras`);
  } catch (error) {
    return res.status(500).send('Error eliminando compras: ' + error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const { nombreProducto, precio, descripcion, imagen, idCategory } = req.body;
    //const { idCategory } = req.params;

    const existingProduct = await pool.query(
      "SELECT COUNT(*) AS cantidad_encontrada FROM productos WHERE nombre_producto = $1 AND id_producto <> $2",
      [nombreProducto, idProduct]
    );
    if (existingProduct.rows[0].cantidad_encontrada !== '0') {
      console.log("entre");
      return res.status(200).json({ data: 1 });
    }
    const newProduct = await pool.query(
      "UPDATE productos SET nombre_producto = $1, precio_unitario = $2, descripcion = $3, imagen = $4, id_categoria= $5  WHERE id_producto = $6 ",
      [nombreProducto, precio, descripcion, imagen, idCategory, idProduct]
    );

    if (newProduct.rowCount === 0)
      return res.status(404).json({ message: "OK" });

    return res.status(200).json({ message: `El producto con ID ${idProduct} ha sido actualizado correctamente` });
  } catch (error) {
    return res.status(500).json({ message: `Error actualizando producto: ${error.message}` });
  }
};

const updateBuy = async (req, res) => {
  try {
    const { idLot } = req.params;
    const {
      cantidad,
      fecha_caducidad,
      costo_total
    } = req.body;
    const idProduct = (await pool.query("SELECT id_producto FROM lotes WHERE id_lote = $1", [idLot])).rows[0].id_producto;
    const costoUnitario = parseFloat(costo_total) / parseInt(cantidad);
    const cantlot = (await pool.query("SELECT cantidad FROM lotes WHERE id_lote = $1", [
      idLot
    ])).rows[0].cantidad;

    const newLot = await pool.query(
      "UPDATE lotes SET cantidad = $1, fecha_caducidad = $2, costo_total = $3, costo_unitario = $4 WHERE id_lote = $5 AND id_producto = $6 ",
      [cantidad, fecha_caducidad, costo_total, costoUnitario, idLot, idProduct]
    );
    const cantTotal = (await pool.query("SELECT total FROM productos WHERE id_producto = $1", [
      idProduct
    ])).rows[0].total;
    const total = parseInt(cantTotal) - parseInt(cantlot) + parseInt(cantidad);
    await pool.query("UPDATE productos SET total = $1 WHERE id_producto = $2", [total, idProduct]);

    return res.json(newLot.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};
const getAllBuy = async (req, res) => {

  try {
    const getBuy = await pool.query("SELECT DISTINCT l.id_lote, p.nombre_producto, l.cantidad, l.fecha_caducidad, l.costo_unitario, l.costo_total FROM productos p, lotes l WHERE p.id_producto = l.id_producto ORDER BY nombre_producto ASC;");
    console.log(getBuy.rows);
    res.json(getBuy.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

};
module.exports = {
  getAllCategories,
  getACategorie,
  createACategorie,
  deleteACategorie,
  updateACategorie,
  getProductOfCategorie,
  getAllProducts,
  getProduct,
  getBuy,
  createProduct,
  createBuy,
  deleteProduct,
  deleteBuy,
  updateProduct,
  updateBuy,
  getDbTime,
  uploadImg,
  getAllBuy
};
