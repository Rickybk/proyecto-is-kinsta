const { Router } = require("express");
const router = Router();

const {
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
  uploadImg
} = require("../controllers/store.controllers");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/api/upload",uploadImg);

router.get("/time", getDbTime);

router.get("/store/categories", getAllCategories);

router.get("/store/categories/:id", getACategorie);

router.post("/store/categories", createACategorie);

router.delete("/store/categories/:id", deleteACategorie);

router.put("/store/categories/:id", updateACategorie);

router.get("/store/productsCategoria/:id", getProductOfCategorie);

router.get("/store/allproducts", getAllProducts);

router.get('/store/products/:idProduct', getProduct);

router.get('/store/products/lot/:idProduct', getBuy);

router.post("/store/products/:idCategory", createProduct);

router.post("/store/products/lot/:idProduct", createBuy);

router.delete("/store/products/:idProduct", deleteProduct);

router.delete("/store/products/lot/:idLot", deleteBuy);

router.put("/store/products/:idProduct", updateProduct);

router.put("/store/products/lot/:idLot/:idProduct", updateBuy);

module.exports = router;