import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductItem from './Products/ProductItem';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../api-helpers/api-helpers';
 

const HomePage = () => {
    const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);
  
  return  (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
        <Box margin={"auto"} width="80%" height={"50vh"} padding={2} > 
            <img src="https://img.lovepik.com/background/20211022/small/lovepik-simple-fresh-stationery-border-background-image_605820225.jpg"
             alt="Home"
             width={"100%"}
             height={"100%"}
             />
        </Box>
        <Box padding={5} margin={"auto"} >
            <Typography variant="h4" textAlign={"center"} sx={{color:"red"}} >
            Better Services and Selected Items on Choice
            </Typography>
        </Box>
        <Box 
         margin={"auto"}
         display="flex"
         width="80%"
         justifyContent={"center"}
         alignItems="center"
         flexWrap="wrap"
         marginLeft={20}
         >
            {products && 
            products.slice(0,4).map((product,index)=>(
            <ProductItem 
                id={product._id} 
                name={product.name} 
                price={product.price} 
                posterUrl={product.posterUrl} 
                key={index}
                admin={true}
                />
                ))}
             </Box>
             <Box display="flex" padding={5} margin="auto">
                <Button LinkComponent={Link} to="/products" variant="outlined" sx={{margin: "auto", color: "#F08080"}}>
                    View All products
                </Button>
             </Box>
    </Box>
  );
};

export default HomePage;