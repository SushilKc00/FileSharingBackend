const multiplefile = require("../schema/multiplefileschema");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const uploadFile = async (req, res) => {
  try {
    const file = req.files.img;
    if (!file.length) {
      const imgName = `${Date.now()}-${file.name}`;
      let imgDetails = {
        imgName,
        format: file.mimetype,
      };
      file.mv("./uploads/" + imgName);
      const userDetails = await multiplefile.create({
        filename: imgDetails,
        uuid: uuid(),
      });
      const link = `${process.env.LINK}/${userDetails.uuid}`;
      res.json({ success: true, link });
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
      const userDetails = await multiplefile.create({
        filename: imgArr,
        uuid: uuid(),
      });
      const link = `${process.env.LINK}/${userDetails.uuid}`;
      res.json({ success: true, link });
    }
  } catch (error) {
    res.json({ message: error, success: false });
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
const deleteFile = async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    const userDetails = await jwt.verify(token, process.env.KEY);
    const data = await multiplefile.findOne({ uuid: userDetails.uuid });
    for (ele of data.filename) {
      fs.unlink(`./uploads/${ele.filename}`, (err) => {});
    }
    res.json({ success: true, message: "file Deleted" });
  } else {
    res.json({ success: false, message: "sorry you not logined" });
  }
};
module.exports = { uploadFile, getAllImages, downloadImage, deleteFile };
