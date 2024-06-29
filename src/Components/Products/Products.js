import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../api-helpers/api-helpers';
import ProductItem from './ProductItem';
 

const Products = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#DE3163"}
        color="white"
        textAlign={"center"}
      >
        All Products
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
        {products &&
          products.map((product, index) => (
            
            <ProductItem
              key={index}
              id={product._id}
              posterUrl={product.posterUrl}
              price={product.price}
              name={product.name}
              admin={true}
            />
          ))}
      </Box>
    </Box>
  )
};

export default Products;