const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

//read
// http://localhost:8080/
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

// create data // save data in mongodb
http://localhost:8080/create

app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "data save successfully", data: data });
});

//updata data
app.put("/update", async (req, res) => {
  const { _id, ...rest } = req.body;
  // console.log(rest)
  const data = await userModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "data is update", data: data });
});

//delete api
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });
  res.send({ success: true, message: "data is delete", data: data });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/curdoperation")
  .then(() => {
    console.log("connect to database");
    app.listen(PORT, () => console.log("server is running"));
  })
  .catch((err) => console.log(err));
