import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Box,
  Paper,
  Autocomplete,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar"; // Updated import

import Header from "components/Header";

const Customer = () => {
  const theme = useTheme();

  const [customers, setCustomers] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    occupation: "",
    role: "",
  });
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const savedCustomers = localStorage.getItem("customers");
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const generateRandomId = () => {
    const idLength = 24; // Specify the desired length of the ID
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const customerId = generateRandomId(); // Generate the random ID

    const newCustomer = {
      id: customerId,
      name: customerDetails.name,
      email: customerDetails.email,
      phoneNumber: customerDetails.phoneNumber,
      occupation: customerDetails.occupation,
      role: customerDetails.role,
    };

    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);

    setCustomerDetails({
      name: "",
      email: "",
      phoneNumber: "",
      occupation: "",
      role: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      role: value,
    }));
  };

  const handleDeleteCustomer = () => {
    if (selectedCustomerId !== null && selectedCustomerId !== undefined) {
      const updatedCustomers = customers.filter(
        (customer) => customer.id !== selectedCustomerId
      );
      setCustomers(updatedCustomers);
      setSelectedCustomerId(null);
    }
  };

  const handleSearchChange = (event, value) => {
    setSearchValue(value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    { field: "occupation", headerName: "Occupation", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
  ];

  const rows = filteredCustomers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    occupation: customer.occupation,
    role: customer.role,
  }));

  return (
    <Box>
      <Header title="Customer List" subtitle="Entire list of customers" />
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              type="text"
              name="name"
              value={customerDetails.name}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={customerDetails.email}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              type="text"
              name="phoneNumber"
              value={customerDetails.phoneNumber}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Occupation"
              type="text"
              name="occupation"
              value={customerDetails.occupation}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={customerDetails.role}
                onChange={handleRoleChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" type="submit" fullWidth>
              Add Customer
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mt={2}>
        <Autocomplete
          options={customers}
          getOptionLabel={(customer) => customer.name}
          onChange={(event, value) =>
            setSelectedCustomerId(value ? value.id : null)
          }
          onInputChange={handleSearchChange}
          renderInput={(params) => (
            <TextField {...params} label="Search Customer" fullWidth />
          )}
        />
      </Box>
      <Box mt={2} height={400} width="100%">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(selection) =>
            setSelectedCustomerId(selection.selectionModel[0])
          }
          components={{
            Toolbar: DataGridCustomToolbar,
          }}
        />
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteCustomer}
          disabled={!selectedCustomerId}
        >
          Delete Selected Customer
        </Button>
      </Box>
    </Box>
  );
};

export default Customer;
