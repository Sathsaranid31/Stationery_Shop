import { Box, Button, Checkbox, FormLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { addProduct, editProduct } from '../../api-helpers/api-helpers';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../api-helpers/api-helpers';
import { useNavigate } from 'react-router-dom';
 const labelProps = {
    mt:1,
    mb:1,
 };

const AddProduct = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id);
    const [inputs, setInputs] = useState({
      name: "",
      price: "",
      posterUrl: "", 
      featured: false,
    });
useEffect(()=>{
  if(id){

    getProductDetails(id)
        .then((res)=>{
          console.log(res)
          setInputs({
            name: res.product.name,
            price: res.product.price,
            posterUrl: res.product.posterUrl, 
            featured: false,
          })
        })
        .catch((err) => console.log(err));
  }
},[])

   

      const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))};
        const handleSubmit = (e) => {
            e.preventDefault();
            if(id){
              editProduct(inputs,id)
              navigate("/products")
            }else{
              addProduct(inputs)
              navigate("/products")

            }
            console.log(inputs);
          };
     return (
    <div>
        <form onSubmit={handleSubmit}>
            <Box 
            width={"50%"}
            padding={10}
            margin="auto"
            display={"flex"}
            flexDirection="column"
            boxShadow={"10px 10px 20px #ccc"}
            >
             <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            
            {id ? "Edit " : "Add New "} Product
          </Typography>
          <FormLabel sx={labelProps}>Name</FormLabel>
          <TextField
            value={inputs.name}
            onChange={handleChange}
            name="name"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Price</FormLabel>
          <TextField
            value={inputs.price}
            onChange={handleChange}
            name="price"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Featured</FormLabel>
          <Checkbox
            name="fetaured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevSate) => ({
                ...prevSate,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          />
           <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            {id ? "Edit " : "Add New "} Product
          </Button>
            </Box>
        </form>
    </div>
  );
};

export default AddProduct;