import express from 'express';
import Customer from '../models/Customer.js';

const router = express.Router();

// GET all customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new customer
router.post('/customers', async (req, res) => {
  try {
    const { name, email, phoneNumber, occupation, role } = req.body;
    const newCustomer = new Customer({
      name,
      email,
      phoneNumber,
      occupation,
      role,
    });
    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
