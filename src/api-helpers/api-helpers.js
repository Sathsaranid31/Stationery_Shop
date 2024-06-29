import axios from "axios";

export const getAllProducts = async () => {
  const res = await axios
  .get("/product")
  .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  console.log(data)
  return data;
};

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
  .post(`/user/${signup ? "signup" : "login"}`, {
    name: signup? data.name : "",
    email: data.email,
    password: data.password
  })
  .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    return console.log("Unexpectyed Error occured");
  }

  const resData = await res.data;
  return resData;
};

export const sendAdminAuthRequst = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getProductDetails = async (id) => {
  const res = await axios.get(`/product/${id}`)
  .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const deleteProductById = async (id) => {
  const res = await axios.delete(`/product/${id}`)
  .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const newOrder = async (data) => {
  const res = await axios
    .post("/order", {
      product: data.product,
      name: data.name,
      productname: data.productname,
      address: data.address,
      contact: data.contact,
      price:data.price,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  console.log(resData)
  return resData;
};

export const getUserOrder = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/orders/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const deleteOrder = async (id) => {
  const res = await axios
  .delete(`/order/${id}`)
  .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`)
  .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};


export const addProduct = async (data) => {
  const res = await axios
    .post(
      "/product",
      { 
      product: data.product,
      name: data.name,
      posterUrl: data.posterUrl, 
      price:data.price, 
      admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};


export const editProduct = async (data,id) => {
  const res = await axios
    .put(
      "/product/"+id,
      { 
      product: data.product,
      name: data.name,
      posterUrl: data.posterUrl, 
      price:data.price, 
      admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};





export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};


