const fs = require("fs");
const pdf = require("pdf-parse");
const User = require("../models/user");

let data1 = fs.readFileSync("General Council BG.pdf");
let data2 = fs.readFileSync("devcon.pdf");
let data3 = fs.readFileSync("ACM Xperience FAQs.pdf");
let data4 = fs.readFileSync("check.pdf");
require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");

exports.getpdfdata = async (req, res) => {
  const { requ } = req.body;
  const regexp = new RegExp(`(${requ.join("*|")}*)`);
  console.log(regexp);
  let data = [data1, data4];
  let retData = [];

  const promise = data.map(async (val, index) => {
    let recrutScore = 0;
    let pdfData = await pdf(val);
    let matchedwords = pdfData.text.toLowerCase().match(regexp);
    if (matchedwords === null) {
      matchedwords = [];
    }
    let tfmodel = await use.loadQnA();
    const input = {
      queries: requ,
      responses: matchedwords,
    };
    var scores = [];
    const embeddings = tfmodel.embed(input);
    const embed_query = embeddings["queryEmbedding"].arraySync();
    const embed_responses = embeddings["responseEmbedding"].arraySync();
    for (let i = 0; i < input["queries"].length; i++) {
      for (let j = 0; j < input["responses"].length; j++) {
        if (dotProduct(embed_query[i], embed_responses[j]) >= 9.8) {
          scores.push({
            name: pdfData.info.Title || "empty",
            score: dotProduct(embed_query[i], embed_responses[j]),
            query: input["queries"][i],
            response: input["responses"][j],
          });
        }
      }
    }
    // pdfData.text.toLowerCase().includes(element.toLowerCase())
    //   ? recrutScore++
    //   : null;
    return scores;
  });
  const prodata = await Promise.all(promise);
  console.log("1");
  res.send({ retData: prodata });
};

exports.getuserdata = async (req, res) => {
  try {
    console.log(req.userId);
    const user = await User.findById(req.userId);
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Error" });
  }
};

exports.updateUserData = async (req, res) => {
  try {
    let value = req.body.user;
    let user = await User.updateOne({ _id: req.user._id }, value);
    if (!user) {
      return res.status(500).json({ message: "Error" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

const dotProduct = (xs, ys) => {
  const sum = (xs) => (xs ? xs.reduce((a, b) => a + b, 0) : undefined);

  return xs.length === ys.length
    ? sum(zipWith((a, b) => a * b, xs, ys))
    : undefined;
};

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
const zipWith = (f, xs, ys) => {
  const ny = ys.length;
  return (xs.length <= ny ? xs : xs.slice(0, ny)).map((x, i) => f(x, ys[i]));
};
