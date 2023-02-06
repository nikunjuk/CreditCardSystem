const db = require("../context/ContextManager");
const luhn = require("luhn");

exports.getAll = async (req, res) => {
  try {
    await db.userModel
      .find()
      .then((resp) => {
        if (resp) {
          res.send({
            code: 200,
            data: resp,
          });
        } else {
          res.send({
            code: 400,
            message: "User Not Found",
          });
        }
      })
      .catch((error) => {
        res.send({
          code: 400,
          message: "Something went wrong",
        });
      });
  } catch (error) {
    console.log("Getting error while requesting server :", error);
    res.send({
      message: "somting went wrong",
      code: 404,
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    let isExists = await db.userModel.findOne({
      name: req.body.name,
    });

    if (isExists) {
      return res.send({
        message: "User is already exist.",
        code: 400,
      });
    }

    var is_valid = validate(req.body.cardNumber);
    if (!is_valid) {
      return res.send({
        message: "Invalid card number.",
        code: 400,
      });
    }

    const insert = await new db.userModel({
      name: req.body.name,
      cardNumber: req.body.cardNumber,
      cardLimit: req.body.cardLimit,
    });

    await insert.save();

    return res.send({
      message: "User inserted Successfuly",
      data: insert,
      code: 200,
    });
  } catch (erorr) {
    console.log("Getting error to insert user:", erorr);
    res.send({
      message: "Something went wrong",
      code: 400,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    let deleted = await db.userModel.findByIdAndDelete({
      _id: req.body.id,
    });
    if (deleted) {
      return res.send({
        message: "User deleted successfully",
        code: 200,
      });
    } else {
      return res.send({ message: "User not found", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to delete User:", erorr);
    res.send({
      message: "Something went wrong",
      code: 400,
    });
  }
};

const validate = (cardNumber) => {
  var trimmed = String(cardNumber).replace(/[\s]/g, "")
    , length = trimmed.length
    , odd = false
    , total = 0
    , calc
    , calc2;

    if (!/^[0-9]+$/.test(trimmed)) {
      return false;
    }

    for (var i = length; i > 0; i--) {
      calc = parseInt(trimmed.charAt(i - 1));
      if (!odd) {
        total += calc;
      } else {
        calc2 = calc * 2;

        switch (calc2) {
        case 10: calc2 = 1; break;
        case 12: calc2 = 3; break;
        case 14: calc2 = 5; break;
        case 16: calc2 = 7; break;
        case 18: calc2 = 9; break;
        default: calc2 = calc2;
        }
        total += calc2;
      }
      odd = !odd;
    }

    return (total !== 0 && (total % 10) === 0);
  }