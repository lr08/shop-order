import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Container, Box } from '@mui/material';

function MyOrder() {
  const location = useLocation();
  const { orderDetails } = location.state; // Retrieving the order details passed via state

  return (
        <Container>
          <Typography variant="h4" gutterBottom>Your Order Details</Typography>
    
          <Typography variant="h6" gutterBottom>Customer Information</Typography>
          <Typography variant="body1">Name: {orderDetails.customerName}</Typography>
          <Typography variant="body1">Email: {orderDetails.customerEmail}</Typography>
    
          <Typography variant="h6" gutterBottom>Billing Address</Typography>
          <Typography variant="body1">Door No: {orderDetails.customerBillingAddress.doorNo}</Typography>
          <Typography variant="body1">Street: {orderDetails.customerBillingAddress.street}</Typography>
          <Typography variant="body1">Layout: {orderDetails.customerBillingAddress.layout}</Typography>
          <Typography variant="body1">City: {orderDetails.customerBillingAddress.city}</Typography>
          <Typography variant="body1">Pincode: {orderDetails.customerBillingAddress.pincode}</Typography>
    
          <Typography variant="h6" gutterBottom>Products Ordered</Typography>
          {orderDetails.prodInfo.map((product, index) => (
            <Box key={index} sx={{ ml: 2 }}>
              <Typography variant="body2">Product Name: {product.productName}</Typography>
              <Typography variant="body2">Quantity: {product.quantity}</Typography>
              <Typography variant="body2">Price:  ₹{product.productPrice}</Typography>
            </Box>
          ))}
    
          <Typography variant="body1" gutterBottom>Total Amount:  ₹{orderDetails.totalAmount}</Typography>
        </Container>
  );
}

export default MyOrder;
