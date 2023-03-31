const { Router } = require("express");
const pool = require("../db");
const router = Router();
const {
  getDbTime,
  getAllCategories,
  getACategorie,
  createACategorie,
  deleteACategorie,
  updateACategorie,
  getAllProductsLots,
  createProduct,
  createLot,
  deleteProduct,
  updateProduct,
  updateLote,
} = require("../controllers/store.controllers");

//Get Time prueba DB now()
router.get("/time", getDbTime);

//Ruta por defecto raiz.
router.get("/", (req, res) => {
  res.send("Hello World");
});

//Devuelve todas las categorias
router.get("/store/categories", getAllCategories);

//Devuelve una categoria en base al id. Esta en construccion
router.get("/store/categories/1", getACategorie);

//Creamos una categoria
router.post("/store/categories/create", createACategorie);

//Borramos una categoria
router.delete("/store/categories/delete/:id", deleteACategorie);

//Actualizamos una categoria
router.put("/store/categories/update/:id", updateACategorie);

//Devuelve todos los productos
router.get("/store/products", getAllProductsLots);
//Devuelve un producto
//router.get('/store/products/1', getProduct)
//Creamos un producto
router.post("/store/products", createProduct);
//creamos un lote
router.post("/store/products/createLot", createLot);
//Borramos un producto
router.delete("/store/products/delete/:id/:nameProduct", deleteProduct);
//Actualizamos un producto
router.put("/store/products/update/:id", updateProduct);
//Actualizamos un lote
router.put("/store/products/updateLot/:id",updateLote);

module.exports = router;
