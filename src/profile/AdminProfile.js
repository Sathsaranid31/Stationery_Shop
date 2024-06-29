import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { getAdminById } from "../api-helpers/api-helpers";
const AdminProfile = () => {
  const [admin, setAdmim] = useState();
  const onResReceived = (res) => {
    setAdmim(res.admin);
  };
  useEffect(() => {
    getAdminById()
      .then(onResReceived)
      .catch((err) => console.log(err));
  }, []);
  console.log(admin);
  return (
    <Box width="100%" display={"flex"}>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        width="30%"
      >
        <PersonRoundedIcon sx={{ fontSize: "20rem" }} />
        <Typography
          padding={1}
          width="200px"
          textAlign={"center"}
          border="1px solid #ccc"
          borderRadius={10}
        >
          Email: {admin && admin.email}
        </Typography>
      </Box>
      <Box width="70%" display="flex" flexDirection={"column"}>
        <Typography
          variant="h3"
          fontFamily={"verdana"}
          textAlign="center"
          padding={2}
        >
          Added Products
        </Typography>

        <Box margin="auto" display="flex" flexDirection={"column"} width="80%">
          <List>
            {admin &&
              admin.addedProducts.map((product, index) => (
                <ListItem
                  sx={{
                    bgcolor: "#00d386",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                  }}
                  key={index}
                >
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Product: {product.name}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Price: {product.price}
                  </ListItemText>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminProfile;
