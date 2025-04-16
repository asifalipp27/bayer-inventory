const Inventory = require('../models/Inventory');

// Create Inventory Item
exports.createInventoryItem = async (req, res) => {
  try {
    const {
      name,
      type,
      quantity,
      threshold_quantity,
      expiry_date,
      manufacturing_date,
      batch_no,
      price,
      created_by,
      last_updated_by
    } = req.body;

    const newItem = new Inventory({
      name,
      type,
      quantity,
      threshold_quantity,
      expiry_date,
      manufacturing_date,
      batch_no,
      price,
      created_by,
      last_updated_by
    });

    await newItem.save();
    res.status(201).json({ message: 'Inventory item created successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Inventory Items
exports.getAllInventoryItems = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ created_at: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Inventory Item by ID
exports.getInventoryItemById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Inventory Item
exports.updateInventoryItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Inventory item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Inventory Item
exports.deleteInventoryItem = async (req, res) => {
  try {
    const deleted = await Inventory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
