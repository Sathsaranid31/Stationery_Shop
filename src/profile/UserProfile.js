import React, { Fragment, useEffect, useState } from 'react';
import { deleteOrder, getUserDetails, getUserOrder } from '../api-helpers/api-helpers';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const UserProfile = () => {
    const [orders, setOrders] = useState();
    const [user,setUser] = useState();
    useEffect(() => {
            getUserOrder()
            .then((res) => setOrders(res.orders))
            .catch((err) => console.log(err));

            getUserDetails()
            .then((res)=>setUser(res.user))
            .catch((err)=>console.log(err));
    },[]);
    const handleDelete = (id) => {
        deleteOrder(id)
            .then((res) => {
              setOrders(res)
              window.location.reload()

            })
              
            .catch((err) => console.log(err));
    };
  return (
    <Box width={"100%"} display="flex">
       
        <Fragment>
          {" "}
          {user && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
        >
            <AccountCircleIcon sx={{fontSize: "10rem", textAlign:"center", ml: 3}} />
            <Typography 
            padding={1} 
            width={"auto"} 
            textAlign={"center"} 
            border={"1px solid #ccc"} 
            borderRadius={6} >
               Name: {user.name}
            </Typography>
            <Typography 
            mt={1}
            padding={1} 
            width={"auto"} 
            textAlign={"center"} 
            border={"1px solid #ccc"} 
            borderRadius={6} >
               Email: {user.email}
            </Typography>
                  </Box>
          )}
          { orders && 
           
          (
        <Box width={"70%"} display="flex" flexDirection={"column"} >
          <Typography 
          variant="h3" 
          fontFamily={"verdana"} 
          textAlign={"center"}
          padding={2}
           >
              Orders
          </Typography>
          <Box 
          margin={"auto"} 
          display="flex" 
          flexDirection={"column"} 
          width="80%" 
          >
            <List>
              {orders.map((order, index) => (
                  <ListItem 
                  sx={{
                    bgcolor: "#6C3483",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                  }} >
                    <ListItemText sx={{margin: 1, width:"auto",textAlign:"left"}}
                     >Product: {order.productname}
                     </ListItemText>
                     <IconButton onClick={()=>handleDelete(order._id)} color="error" >
                      <DeleteForeverIcon />
                     </IconButton>
                  </ListItem>
              ))}
            </List>
          </Box>
        </Box>
          )}
        </Fragment>
       
          
        
        
    </Box>
  );
};

export default UserProfile;