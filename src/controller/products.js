exports.createProduct = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  res.json({
    message: "ini create produk",
    data: {
      nama: name,
      email: email,
    },
  });
};

exports.getAllProducts = (req, res) => {
  res.json({
    message: "ini getAll produk",
    data: {
      nama: "syarif",
      email: "syarif@gmail.com",
    },
  });
};
