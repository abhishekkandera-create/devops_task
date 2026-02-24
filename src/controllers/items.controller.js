const Item = require("../models/Item");

// POST /items
exports.createItem = async (req, res, next) => {
  try {
    const { name, quantity } = req.body || {};
    if (!name) return res.status(400).json({ success: false, message: "name is required" });

    const item = await Item.create({ name, quantity });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// GET /items
exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

// GET /items/:id
exports.getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// PUT /items/:id
exports.updateItem = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body?.name !== undefined) updates.name = req.body.name;
    if (req.body?.quantity !== undefined) updates.quantity = req.body.quantity;

    const item = await Item.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// DELETE /items/:id
exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, message: "Item deleted", data: item });
  } catch (err) {
    next(err);
  }
};