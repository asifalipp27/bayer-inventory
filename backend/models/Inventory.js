const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['Medicine', 'Equipments', 'Consumables', 'Utilities'],
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    threshold_quantity: {
      type: Number,
      required: true,
      min: 0
    },
    expiry_date: {
      type: Date
    },
    manufacturing_date: {
      type: Date
    },
    batch_no: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    created_by: {
      type: String,
      required: true
    },
    last_updated_by: {
      type: String
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Inventory', inventorySchema);