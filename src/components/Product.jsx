import React, { useState, useEffect } from "react";
import { fetchProducts, fetchInventory } from "../api";
import Customer from "./Customer";
import {
  Modal,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invId, setInvId] = useState(0);
  const [show, setShow] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleClick = (productId) => {
    const getInventory = async () => {
      try {
        const data = await fetchInventory();
        const productInventory = data.data.find(
          (item) => item.productId === productId
        );
        if (productInventory) {
          setShow(true);
          setInvId(productInventory.inventoryId);
        }
      } catch (err) {
        setError("Failed to fetch inventory");
      }
    };

    getInventory();
  };

  const imageMap = {
    1: "images/ac.jpg",
    2: "images/lapy.jpg",
    3: "images/phone.jpg",
    4: "images/stabliser.jpeg",
    5: "images/milk.jpg",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {products.data && products.data.length > 0 ? (
        products.data.map((p) => (
          <Card key={p.productId} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={imageMap[p.productId] || "/static/images/default.png"}
              alt={p.productName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {p.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {p.productDescription}
              </Typography>
              <Typography variant="body2" color="text.primary">
              ₹{p.productPrice}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClick(p.productId)}
              >
                ADD
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No products found.</p>
      )}
      <Modal
        open={show}
        onClose={() => setShow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Customer invId={invId} />
        </Box>
      </Modal>
    </div>
  );
}

export default Products;
