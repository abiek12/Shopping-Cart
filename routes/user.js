var express = require("express");
var router = express.Router();
var productHelpers = require("../helpers/product-helpers");
var userHelpers = require("../helpers/user-helpers");
const auth = require("../middlewares/auth");

/* GET home page. */
router.get("/", function (req, res) {
  let user = req.session.user;
  productHelpers.getAllProducts((products) => {
    res.render("../views/user/view-products.ejs", {
      products,
      admin: false,
      user,
    });
  });
});

/* GET signup page. */
router.get("/signup", (req, res) => {
  res.render("../views/user/signup.ejs");
});

/* POST signup page. */
router.post("/signup", (req, res) => {
  userHelpers.doSignup(req.body).then((id) => {
    req.session.loggedIn = true;
    req.session.user = id;
    res.redirect("/login");
  });
});

/* GET login page. */
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("../views/user/login.ejs", {
      admin: false,
      loggedInErr: req.session.loggedInErr,
    });
    req.session.loggedInErr = null;
  }
});

/* POST login page. */
router.post("/login", (req, res) => {
  userHelpers
    .doLogin(req.body)
    .then((response) => {
      if (response.status) {
        req.session.loggedIn = true;
        req.session.user = response.user;
        res.redirect("/");
      } else {
        req.session.loggedInErr = "Invalid email or password !";
        res.redirect("/login");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

/* GET logout page. */
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

/* GET product page. */
router.get("/cart", auth, (req, res) => {
  let user = req.session.user;
  res.render("../views/user/cart.ejs", { user });
});

module.exports = router;
