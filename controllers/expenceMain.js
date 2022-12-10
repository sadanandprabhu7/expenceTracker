const { where } = require("sequelize");
const Expence = require("../model/expenceMain");
const Urls = require("../model/url");
const User = require("../model/user_model");
const AWS = require("aws-sdk");
const env = require("dotenv");
env.config();

exports.addDetails = async (req, res, next) => {
  const expence = req.body.expence;
  const description = req.body.description;
  const category = req.body.category;
  const data = await Expence.create({
    expence: expence,
    description: description,
    category: category,
    userId: req.user.id,
  });
  res.status(201).json({ newUserDetails: data });
};

exports.showDeails = (req, res) => {
  const page = +req.query.page || 1;

  const ITEMS_PER_PAGE = +req.header("limit") || 4;
  //console.log(req.header("itemPage"));
  let totalItems;

  Expence.count({ where: { userId: req.user.id } })
    .then((total) => {
      totalItems = total;
      return req.user.getExpences({
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
        userId: req.user.id,
      });
    })
    .then((expences) => {
      res.json({
        expences: expences,
        ispre: req.user.ispremiumuser,
        name: req.user.name,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPriviousPage: page > 1,
        nextPage: page + 1,
        previosPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => console.log(err));
};

// req.user
//   .getExpences()
//   //Expence.findAll({ where: { userId: req.user.id } })
//   .then((data) => {
//     res.json({
//       newUserDetails: data,
//       ispre: req.user.ispremiumuser,
//       name: req.user.name,
//     });
//   });

exports.deleteDeails = (req, res, next) => {
  const prodId = req.params.id;
  Expence.findByPk(prodId)
    .then((user) => {
      return user.destroy({ where: { userId: req.user.id } });
    })
    .then(() => {
      console.log("product destroyed");
      res.status(200).json({ msg: "successfully deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.downloadExpence = async (req, res) => {
  const expence = await req.user.getExpences();
  const strigyfyExpences = JSON.stringify(expence);
  const userId = req.user.id;
  const filename = `Expence${userId}/${new Date()}.txt`;
  const filrUrl = await uploadToS3(strigyfyExpences, filename);
  Urls.create({ url: filrUrl, userId: req.user.id });
  res.status(200).json({ data: filrUrl, success: true });
};

function uploadToS3(data, filename) {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IM_USER_SECRET = process.env.IM_USER_SECRET;

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IM_USER_SECRET,
  });

  let params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        reject(err);
      } else {
        resolve(s3response.Location);
      }
    });
  });
}

exports.allDownload = async (req, res, next) => {
  const urls = await req.user.getUrls();
  res.json({ data: urls });
};
