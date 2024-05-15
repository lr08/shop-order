import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createCustomer, createCart, createOrder, GetOrder } from "../api"; // Assuming the function is exported from 'api.js'
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";

function CustomerForm(props) {
  const navigate = useNavigate();
  const [custId, setCustId] = useState(0);
  const [customerData, setCustomerData] = useState({
    customerEmail: "",
    customerName: "",
    customerBillingAddress: {
      doorNo: "",
      street: "",
      layout: "",
      city: "",
      pincode: "",
    },
    shippingAddress: {
      doorNo: "",
      street: "",
      layout: "",
      city: "",
      pincode: "",
    },
  });
  const [cartData, setCartData] = useState({
    inventoryId: props.invId,
    quantity: 1,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleAddressChange = (name, key, value) => {
    setCustomerData({
      ...customerData,
      [name]: {
        ...customerData[name],
        [key]: value,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdCustomer = await createCustomer(customerData);
      const customerId = createdCustomer.customerId;
      setCustId(customerId);
      await createCart(customerId, cartData);
      console.log("Customer and cart created successfully");
    } catch (error) {
      console.error("Error during customer and cart creation:", error);
    }
  };

  const handleOrder = async () => {
    try {
      const createdorder = await createOrder(custId);
      const orderBill = await GetOrder(custId);
      console.log("order successfully", createdorder);
      navigate('/my-order', { state: { orderDetails: orderBill } });
    } catch (error) {
      console.error("Error during order creation:", error);
    }
  };

  return (
    <div>
     <Container component="main" maxWidth="xs">
      <Typography variant="h5" component="h1" gutterBottom>
        Create Customer
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 1 }}>
          <TextField
            fullWidth
            size="small"  // Smaller input field size
            label="Customer Email"
            name="customerEmail"
            type="email"
            value={customerData.customerEmail}
            onChange={handleInputChange}
            margin="dense"
            variant="outlined"
          />
          <TextField
            fullWidth
            size="small"  // Smaller input field size
            label="Customer Name"
            name="customerName"
            type="text"
            value={customerData.customerName}
            onChange={handleInputChange}
            margin="dense"
            variant="outlined"
          />
        </Box>

        {['customerBillingAddress', 'shippingAddress'].map((addressType) => (
          <Box key={addressType} sx={{ mb: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              {addressType === 'customerBillingAddress' ? 'Billing Address' : 'Shipping Address'}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Door No"
                  value={customerData[addressType].doorNo}
                  onChange={(e) => handleAddressChange(addressType, 'doorNo', e.target.value)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Street"
                  value={customerData[addressType].street}
                  onChange={(e) => handleAddressChange(addressType, 'street', e.target.value)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Layout"
                  value={customerData[addressType].layout}
                  onChange={(e) => handleAddressChange(addressType, 'layout', e.target.value)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="City"
                  value={customerData[addressType].city}
                  onChange={(e) => handleAddressChange(addressType, 'city', e.target.value)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Pincode"
                  type="number"
                  value={customerData[addressType].pincode}
                  onChange={(e) => handleAddressChange(addressType, 'pincode', e.target.value)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
        ))}
        <Button type="submit" variant="contained" color="primary" sx={{ mr: 1, mb: 1 }}>
          Create Customer
        </Button>
        <Button type="button" variant="contained" color="secondary" onClick={handleOrder} sx={{ mb: 1 }}>
          Create Order
        </Button>
      </form>
    </Container>    </div>
  );
}

export default CustomerForm;
