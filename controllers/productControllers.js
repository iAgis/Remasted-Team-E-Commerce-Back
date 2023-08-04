const { Product, Brand } = require("../models");
const { Op } = require("sequelize");
const slugify = require("slugify");

async function index(req, res) {
  const products = await Product.findAll({
    include: Brand,
  });
  if (!products) return res.status(404).json({ error: "Products not found" });
  res.json(products);
}

async function show(req, res) {
  const product = await Product.findOne({
    where: { slug: req.params.slug },
    include: Brand,
  });
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
}

async function store(req, res) {
  if (
    !req.body.name ||
    !req.body.price ||
    !req.body.image ||
    !req.body.description ||
    !req.body.brandId
  ) {
    res.status(406).json("No deben haber campos vacios");
  } else {
    const { name } = req.body;
    req.body.slug = slugify(name);
    const [product, created] = await Product.findOrCreate({
      where: {
        name: name,
      },
      defaults: req.body,
    });
    if (!created) {
      res.status(409).json("Producto ya existe");
    } else {
      res.json(product);
    }
  }
}

async function update(req, res) {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.featured = req.body.featured;
    await product.save();
    res.json(product);
  } else {
    res.status(404).json("Product does not exist");
  }
}

async function destroy(req, res) {
  const product = await Product.destroy({
    where: { id: req.params.id },
  });
  res.json(product);
}

module.exports = { index, show, store, update, destroy };
