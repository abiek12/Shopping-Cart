var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let products = [
    {
      name: "iphone 15 pro",
      catogary: "Smartphone",
      description:
        "iPhone 15 Pro: Aerospace-grade titanium, matte-glass back, 6.1 Super Retina XDR 120Hz display, A17 Pro chip, 7-lens Pro Camera, customizable action button.",
      image: "/images/i phone 15 pro.jpg",
    },
    {
      name: "Samsung s23 ultra",
      catogary: "Smartphone",
      description:
        "Galaxy S23 Ultra: Night Mode, 200MP camera, smooth videos with stabilization, S Pen for writing/drawing, S Pen remote for selfies/photos.",
      image: "/images/samsung s23 ultra.jpg",
    },
    {
      name: "Apple Earbud pro",
      catogary: "Earbuds",
      description:
        "Active noise cancellation, transparency mode, sweat/water-resistant, Adaptive EQ, easy Apple setup, Siri access, 24+ hrs battery with wireless case.",
      image: "/images/apple earbuds.jpg",
    },
    {
      name: "Mi Power Bank",
      catogary: "Power Bank",
      description:
        "Triple port output, dual input (Micro-USB/USB-C, 6.9-hour charge time), 12-layer chip protection, smart power management, 6-month domestic warranty.",
      image: "/images/Mi power bank.jpg",
    },
  ];
  res.render("index", { title: "Express", products,admin:false });
});

module.exports = router;
