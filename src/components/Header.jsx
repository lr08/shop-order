import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Products from './Product';
import MyOrder from './MyOrder';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Router>
        <AppBar position="static">
          <Toolbar >
            <Typography variant="h6" component="div" >
              Shop & Order
            </Typography>
            <Button color="inherit" component={Link} to="/" style={{ marginLeft: '65vw' }}>Home</Button>
              <Button color="inherit" component={Link} to="/about" >About</Button>
              <Button color="inherit" component={Link} to="/contact" >Contact</Button>          </Toolbar>
        </AppBar>
        <div  style={{paddingTop:'50px'}}>
        <Routes>
          <Route path="/" element={<Products />} />
          {/* Define more routes as needed */}
          <Route path="/my-order" element={<MyOrder />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default Header;
