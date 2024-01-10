var express = require("express");
var router = express.Router();
var productHelpers = require("../helpers/product-helpers");

/* GET product listing. */
router.get("/", function (req, res, next) {
  productHelpers.getAllProducts((products) => {
    console.log(products);
    res.render("../views/admin/view-products.ejs", { admin: true, products });
  });
});

//GET add products
router.get("/add-product", (req, res) => {
  res.render("../views/admin/add-product.ejs", { admin: true });
});

//POST add products
router.post("/add-product", (req, res) => {
  productHelpers.addProduct(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/product-images/" + id + ".jpg", (err, done) => {
      if (!err) {
        res.render("../views/admin/add-product.ejs");
      } else {
        console.error(err);
      }
    });
    console.log("Successfully Added.");
    res.render("../views/admin/add-product.ejs", { admin: true });
  });
});

//GET Delete products
router.get("/delete-product/:id", (req, res) => {
  let productId = req.params.id;
  productHelpers.deleteProduct(productId,(response)=>{
    console.log(response);
    res.redirect("/admin")
  })
});

module.exports = router;
