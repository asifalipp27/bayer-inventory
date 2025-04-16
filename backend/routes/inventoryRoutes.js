const express = require('express');
const { createInventoryItem, getAllInventoryItems, getInventoryItemById, updateInventoryItem, deleteInventoryItem } = require('../controllers/inventoryController');
const router = express.Router();

router.post('/add', createInventoryItem);
router.get('/getAll', getAllInventoryItems);
router.put('/update/:id', updateInventoryItem);
router.get('/get/:id', getInventoryItemById);

module.exports = router;
