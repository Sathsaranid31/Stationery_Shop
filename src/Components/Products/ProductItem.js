import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../../store';
import { deleteProductById } from '../../api-helpers/api-helpers';
const ProductItem = ({ name, price, posterUrl, id, admin }) => {
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  admin = isAdminLoggedIn;
  console.log(admin)

  async function deleteItem(id){
    deleteProductById(id)

    alert("Deleted Successfully")
    window.location.reload()
  }

  return (
    <Card
      sx={{
        margin: 2,
        width: 250,
        height: 320,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}>
      <img height={"50%"} width="100%" src={posterUrl} alt="{name}" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
      <CardActions>

      
        {admin ? <>
          <Button
            variant="contained"
            fullWidth
            LinkComponent={Link}
            to={`/edit/${id}`}
            sx={{ margin: "auto", bgcolor: "#F08080" }}
            size="small"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            fullWidth
            LinkComponent={Link}
            onClick={()=>{
              deleteItem(id)
            }}
            sx={{ margin: "auto", bgcolor: "#F08080" }}
            size="small"
          >
            Delete
          </Button>
        </> :   <Button
          variant="contained"
          fullWidth
          LinkComponent={Link}
          to={`/order/${id}`}
          sx={{ margin: "auto", bgcolor: "#F08080" }}
          size="small"
        >
          Buy
        </Button>}

      </CardActions>
    </Card>
  )
};

export default ProductItem;