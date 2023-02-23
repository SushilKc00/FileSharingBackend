const multiplefile = require("../schema/multiplefileschema");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const uploadFile = async (req, res) => {
  try {
    const file = req.files.img;
    const token = req.headers.authorization;
    let userDetails;
    if (!file.length) {
      const imgName = `${Date.now()}-${file.name}`;
      let imgDetails = {
        imgName,
        format: file.mimetype,
      };
      file.mv("./uploads/" + imgName);
      if (token) {
        const user = await jwt.verify(token, process.env.KEY);
        userDetails = await multiplefile.create({
          filename: imgDetails,
          uuid: uuid(),
          username: user.username,
        });
      } else {
        userDetails = await multiplefile.create({
          filename: imgDetails,
          uuid: uuid(),
        });
      }
      const link = `${process.env.LINK}/${userDetails.uuid}`;
      if (token) {
        const mytoken = await jwt.sign(
          { uuid: userDetails.uuid },
          process.env.KEY
        );
        res.json({ success: true, link, token: mytoken });
      } else {
        res.json({ success: true, link });
      }
    } else {
      let imgArr = [];
      for (var i = 0; i < file.length; i++) {
        const imgName = `${Date.now()}-${file[i].name}`;
        file[i].mv("./uploads/" + imgName);
        const imgDetails = {
          imgName,
          format: file[i].mimetype,
        };
        imgArr.push(imgDetails);
      }
      if (token) {
        const user = await jwt.verify(token, process.env.KEY);
        userDetails = await multiplefile.create({
          filename: imgArr,
          uuid: uuid(),
          username: user.username,
        });
      } else {
        userDetails = await multiplefile.create({
          filename: imgArr,
          uuid: uuid(),
        });
      }
      const link = `${process.env.LINK}/${userDetails.uuid}`;
      if (token) {
        const mytoken = await jwt.sign(
          { uuid: userDetails.uuid },
          process.env.KEY
        );
        res.json({ success: true, link, token: mytoken });
      } else {
        res.json({ success: true, link });
      }
    }
  } catch (error) {
    res.json({ message: "error", success: false });
  }
};

const getAllImages = async (req, res) => {
  const file = await multiplefile.findOne({
    uuid: req.params.uuid,
  });
  res.json({ success: true, file });
};
const downloadImage = async (req, res) => {
  const downloadPic = `./uploads/${req.params.uuid}`;
  res.download(downloadPic);
};

const userFileDelete = async (req, res) => {
  try {
    const isUser = await multiplefile.find({ username: req.body.username });
    if (isUser.length > 0) {
      isUser.forEach((element) => {
        for (ele of element.filename) {
          fs.unlink(`./uploads/${ele.imgName}`, (err) => {});
        }
      });
      await multiplefile.deleteMany({ username: req.body.username });
      res.json({ success: true, message: "Files Deleted" });
    } else {
      res.json({ success: false, message: "sorry you not loggined" });
    }
  } catch (error) {
    res.json({ success: false, message: "error" });
  }
};
module.exports = {
  uploadFile,
  getAllImages,
  downloadImage,
  userFileDelete,
};
