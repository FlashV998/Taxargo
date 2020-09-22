// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
const mongoose = require('mongoose');

// This section contains the properties of your model, mapped to your collection's properties.
// Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
const schema = mongoose.Schema({
  'created_at': Date,
  'hash': String,
  'orders': [{
    product_name: String,
    razorpay_payment_id: String,
    razorpay_order_id: String,
    razorpay_signature: String,
    _id: false,
  }],
  'payment': {
    orderSelected: String,
  },
  'salt': String,
  'updated_at': Date,
  'userPersonalData': [{
    fname: String,
    lname: String,
    flatno: String,
    premiseno: String,
    streetname: String,
    pincode: Number,
    localityname: String,
    townname: String,
    statename: String,
    mobileno: String,
    savefile1: [{
      file1Type: String,
    }],
  }],
  'username': String,
}, {
  timestamps: false,
});

module.exports = mongoose.model('users', schema, 'users');
