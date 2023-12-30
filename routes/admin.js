var express = require("express");
var router = express.Router();
const productHelper = require("../helpers/product-helpers");

/* GET users listing. */
router.get("/", function (req, res, next) {
  let products = [
    {
      no: 1,
      name: "iphone 15 pro",
      category: "Smartphone",
      description:
        "iPhone 15 Pro: Aerospace-grade titanium, matte-glass back, 6.1 Super Retina XDR 120Hz display, A17 Pro chip, 7-lens Pro Camera, customizable action button.",
      image: "/images/i phone 15 pro.jpg",
      price: "120000 rp",
    },
    {
      no: 2,
      name: "Samsung s23 ultra",
      category: "Smartphone",
      description:
        "Galaxy S23 Ultra: Night Mode, 200MP camera, smooth videos with stabilization, S Pen for writing/drawing, S Pen remote for selfies/photos.",
      image: "/images/samsung s23 ultra.jpg",
      price: "120000 rp",
    },
    {
      no: 3,
      name: "Apple Earbud pro",
      category: "Earbuds",
      description:
        "Active noise cancellation, transparency mode, sweat/water-resistant, Adaptive EQ, easy Apple setup, Siri access, 24+ hrs battery with wireless case.",
      image: "/images/apple earbuds.jpg",
      price: "18000 rp",
    },
    {
      no: 4,
      name: "Mi Power Bank",
      category: "Power Bank",
      description:
        "Triple port output, dual input (Micro-USB/USB-C, 6.9-hour charge time), 12-layer chip protection, smart power management, 6-month domestic warranty.",
      image: "/images/Mi power bank.jpg",
      price: "2000 rp",
    },
  ];
  res.render("../views/admin/view-products.ejs", { admin: true, products });
});

router.get("/add-product", (req, res) => {
  res.render("../views/admin/add-product.ejs", { admin: true });
});

router.post("/add-product", (req, res) => {
  // console.log(req.body);
  // console.log(req.files.Image);
  productHelper.addProduct(req.body,(result)=>{
    console.log("Successfully Added.");
    res.render("../views/admin/add-product.ejs",{ admin: true })
  });
});

module.exports = router;
