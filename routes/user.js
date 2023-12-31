var express = require("express");
var router = express.Router();
var productHelpers = require("../helpers/product-helpers");

/* GET home page. */
router.get("/", function (req, res, next) {
  productHelpers.getAllProducts((products) => {
    res.render("../views/user/view-products.ejs", { products, admin: false });
  });
});

module.exports = router;
