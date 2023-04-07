const { Router } = require("express");
const router = Router();

const {
  getAllCategories,
  getACategorie,
  createACategorie,
  deleteACategorie,
  updateACategorie,
  getAllProducts,
  getProduct,
  getLots,
  createProduct,
  createLot,
  deleteProduct,
  deleteLot,
  updateProduct,
  updateLote,
  getDbTime,
  uploadImg
} = require("../controllers/store.controllers");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/api/upload",uploadImg);

router.get("/time", getDbTime);

router.get("/store/categories", getAllCategories);

router.get("/store/categories/1", getACategorie);

router.post("/store/categories/create", createACategorie);

router.delete("/store/categories/delete/:id", deleteACategorie);

router.put("/store/categories/update/:id", updateACategorie);

router.get("/store/allproducts", getAllProducts);

router.get('/store/products/:idProduct', getProduct);

router.get('/store/products/lot/:idProduct', getLots);

router.post("/store/products", createProduct);

router.post("/store/products/lot/:idProduct", createLot);

router.delete("/store/products/:idProduct", deleteProduct);

router.delete("/store/products/lot/:idLot", deleteLot);

router.put("/store/products/:idProduct", updateProduct);

router.put("/store/products/lot/:idLot/:idProduct",updateLote);

module.exports = router;