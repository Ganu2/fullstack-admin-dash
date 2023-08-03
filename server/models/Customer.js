// models/Customer.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;