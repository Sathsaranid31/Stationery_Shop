import React, { useEffect, useState } from 'react';
import { AppBar, Autocomplete, TextField, Tabs, Tab, Toolbar, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/system";
import { getAllProducts } from "../api-helpers/api-helpers";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [value, setValue] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then((data) => setProducts(data.products))
            .catch((err) => console.log(err));
    }, []);
    const logout = (isAdmin) => {
        dispatch(isAdmin ? adminActions.logout() : userActions.logout());
    };
    const handleChange = (e, val) => {

        const product = products.find((p) => p.name === val);
        console.log(product);
        if (isUserLoggedIn) {
            navigate(`/order/${product._id}`);
        }
    };
    return (
        <AppBar position="sticky" sx={{ bgcolor: "#F08080" }}>
            <Toolbar>
                <Box width={"20%"}>
                    <IconButton LinkComponent={Link} to="/" >
                        <HomeIcon />
                    </IconButton>

                </Box>
                <Box width={"30%"} margin="auto">
                    <Autocomplete
                        onChange={handleChange}
                        freeSolo
                        options={products && products.map((option) => option.name)}
                        renderInput={(params) => (
                            <TextField
                                sx={{ input: { color: "white" } }}
                                variant="standard"
                                {...params}
                                placeholder="Search products"
                                
                            />
                        )}
                    />
                </Box>
                <Box display={"flex"}>
                    <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e, val) => setValue(val)}>

                        <Tab LinkComponent={Link} to="/products" label="Products" />
                        {!isAdminLoggedIn && !isUserLoggedIn && (
                            <>
                                <Tab LinkComponent={Link} to="/admin" label="Admin" />
                                <Tab LinkComponent={Link} to="/auth" label="Auth" />
                            </>
                        )}
                        {isUserLoggedIn && (
                            <>
                                <Tab LinkComponent={Link} to="/user" label="Profile" />
                                <Tab
                                    onClick={() => logout(false)}
                                    LinkComponent={Link} to="/"
                                    label="Logout"
                                />
                            </>
                        )}
                        {isAdminLoggedIn && (
                            <>
                                <Tab LinkComponent={Link} to="/add" label="Add Product" />
                                <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
                                <Tab
                                    onClick={() => logout(true)}
                                    LinkComponent={Link} to="/"
                                    label="Logout"
                                />
                            </>
                        )}

                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    )
};

export default Header;