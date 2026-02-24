const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

/**
 * POST /items
 * Create a new item
 */
router.post("/", async (req, res, next) => {
  try {
    const { name, quantity } = req.body || {};
    if (!name) return res.status(400).json({ success: false, message: "name is required" });

    const item = await Item.create({ name, quantity });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /items
 * Get all items
 */
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /items/:id
 * Get one item by id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /items/:id
 * Update item (name/quantity)
 */
router.put("/:id", async (req, res, next) => {
  try {
    const updates = {};
    if (req.body?.name !== undefined) updates.name = req.body.name;
    if (req.body?.quantity !== undefined) updates.quantity = req.body.quantity;

    const item = await Item.findByIdAndUpdate(req.params.id, updates, {
      new: true,        // return updated doc
      runValidators: true, // apply schema validators
    });

    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /items/:id
 * Delete item
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, message: "Item deleted", data: item });
  } catch (err) {
    next(err);
  }
});

module.exports = router;