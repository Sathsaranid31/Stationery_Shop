import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails, newOrder } from '../../api-helpers/api-helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Order = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState();
    const [inputs, setInputs] = useState({ name: "", address: "", contact: "" });
    const id = useParams().id;
    console.log(id);
    useEffect(() => {
        getProductDetails(id)
        .then((res)=>setProduct(res.product))
        .catch((err) => console.log(err));
    }, [id]);
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })
        );
    };
    const handleSubmit = (e) => {
            e.preventDefault();
            console.log(inputs);
            newOrder({...inputs, product: product._id,price:product.price,productname:product.name})
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
            navigate('/user')
            
    };
  return (
    <div>
        {product && <Fragment>
            <Typography 
                padding={3} 
                fontFamily="fantasy" 
                variant="h4" 
                textAlign={"center"}
                color={"red"}
                
                 >
                    Buy Now
                 </Typography>
                 <Box display={"flex"} justifyContent={"center"}  >
                    <Box 
                    display={"flex"} 
                    justifyContent={"column"} 
                    flexDirection="column" 
                    paddingTop={3}
                    width="50%"
                    marginRight={"auto"}
                    >
                        <img 
                        width="80%" 
                        height={"300px"} 
                        src={product.posterUrl} 
                        alt={product.name}
                        />
                        <Box width={"80%"} marginTop={3} padding={2} >
                            <Typography fontWeight={"bold"} paddingTop={2} >{product.name}</Typography>
                            <Typography  marginTop={1} >{product.price} </Typography>
                        </Box>
                    </Box>
                    <Box width={"50%"} paddingTop={3}>
                            <form onSubmit={handleSubmit}>
                                <Box padding={5} 
                                     margin={5}
                                     display={"flex"}
                                     flexDirection={"column"}
                                 >
                                        <FormLabel>Name</FormLabel>
                                        <TextField 
                                        value={inputs.name}
                                        onChange={handleChange}
                                        name="name" 
                                        type={""} 
                                        margin="normal" 
                                        variant="standard"
                                        />
                                        <FormLabel>Address</FormLabel>
                                        <TextField 
                                        name="address" 
                                        type={""}
                                        margin="normal" 
                                        variant="standard"
                                        value={inputs.address}
                                        onChange={handleChange}
                                        />
                                        <FormLabel>Contact No</FormLabel>
                                        <TextField 
                                        name="contact" 
                                        type={""} 
                                        margin="normal" 
                                        variant="standard"
                                        value={inputs.contact}
                                        onChange={handleChange}
                                        />
                                        <Button type="submit" sx={{mt:3}} >Buy</Button>
                                 </Box>
                            </form>
                    </Box>
                 </Box>
            </Fragment>}
    </div>
  );
};

export default Order;