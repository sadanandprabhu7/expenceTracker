const User = require("../model/user");
// const AWS = require("aws-sdk");
const env = require("dotenv");
env.config();

exports.addDetails = async (req, res, next) => {
  try {
    const { expence, description, category } = req.body;
    User.findById(req.user._id)
      .then((user) => {
        return req.user.addExpense(expence, description, category);
      })
      .then((result) => {
        res.status(201).json({ msg: "successfully added" });
      });
  } catch (err) {
    res.json({ msg: "somthing went wrong" });
  }
};
// exports.showDeails = async (req, res) => {
//   const data = await req.user.populate(
//     "expense.expenses"
//     // "ispremiumuser",
//     // "name"
//   );
//   const countme = data.expense.expenses.length;
//   console.log(countme);
//   res.json({
//     data: data.expense.expenses,
//     ispre: data.ispremiumuser,
//     name: data.name,
//   });
// };

exports.showDeails = async (req, res) => {
  const page = +req.query.page || 1;
  const ITEMS_PER_PAGE = +req.header("limit") || 1;
  let totalItems;
  const data = await req.user.populate("expense.expenses");
  totalItems = data.expense.expenses.length;
  const newData = await User.find(
    { _id: req.user._id },
    {
      "expense.expenses": {
        $slice: [(page - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE],
      },
    }
  );
  res.json({
    expences: newData,
    ispre: req.user.ispremiumuser,
    name: req.user.name,
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPriviousPage: page > 1,
    nextPage: page + 1,
    previosPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
  });
};

exports.deleteDeails = (req, res, next) => {
  const prodId = req.body.id;
  req.user
    .deleteExpense(prodId)
    .then(() => {
      console.log("product destroyed");
      res.status(200).json({ msg: "successfully deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.downloadExpence = async (req, res) => {
//   try {
//     const expence = await req.user.populate("expense.expenses");
//     const data = JSON.stringify(expence);
//     res.status(200).json({ data: data });
//   } catch (e) {
//     console.log(e);
//   }
// };
// exports.downloadExpence = async (req, res) => {
//   try {
//     const expence = await req.user.getExpences();
//     const strigyfyExpences = JSON.stringify(expence);
//     const userId = req.user.id;
//     const filename = `Expence${userId}/${new Date()}.txt`;
//     const filrUrl = await uploadToS3(strigyfyExpences, filename);
//     Urls.create({ url: filrUrl, userId: req.user.id });
//     res.status(200).json({ data: filrUrl, success: true });
//   } catch (err) {
//     res.json({ msg: "somthing went wrong" });
//   }
// };

// function uploadToS3(data, filename) {
//   const BUCKET_NAME = process.env.BUCKET_NAME;
//   const IAM_USER_KEY = process.env.IAM_USER_KEY;
//   const IM_USER_SECRET = process.env.IM_USER_SECRET;

//   let s3bucket = new AWS.S3({
//     accessKeyId: IAM_USER_KEY,
//     secretAccessKey: IM_USER_SECRET,
//   });

//   let params = {
//     Bucket: BUCKET_NAME,
//     Key: filename,
//     Body: data,
//     ACL: "public-read",
//   };

//   return new Promise((resolve, reject) => {
//     s3bucket.upload(params, (err, s3response) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(s3response.Location);
//       }
//     });
//   });
// }

// exports.allDownload = async (req, res, next) => {
//   try {
//     const urls = await req.user.getUrls();
//     res.json({ data: urls });
//   } catch (err) {
//     res.json({ msg: "somthing went wrong" });
//   }
// };
