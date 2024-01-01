// const express = require("express");
import express from "express"
const app = express();
const port = 5000;


app.get("/msg", (req, res) => res.json({ msg: "Hello world" }));

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});


// const db = require("./dbconnect");

// const userRoutes = require('./routes/userRoutes');
// const postRoutes = require('./routes/postRoutes')

// const cors = require('cors');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// app.use('/user', userRoutes);
// app.use('/posts', postRoutes)
