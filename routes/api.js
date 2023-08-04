"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    try {
      let errors = {
        invalidNum: false,
        invalidUnit: false,
      };
      let initNum, initUnit;
      try {
        initNum = convertHandler.getNum(req.query.input);
      } catch (e) {
        errors.invalidNum = true;
      }
      try {
        initUnit = convertHandler.getUnit(req.query.input);
      } catch (e) {
        errors.invalidUnit = true;
      }

      if (errors.invalidNum || errors.invalidUnit) {
        throw errors;
      }
      const returnNum = parseFloat(
        convertHandler.convert(initNum, initUnit).toFixed(5)
      );
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string,
      });
    } catch (error) {
      if (error.invalidNum && error.invalidUnit) {
        res.send("invalid number and unit");
      } else if (error.invalidNum) {
        res.send("invalid number");
      } else if (error.invalidUnit) {
        res.send("invalid unit");
      } else {
        console.log(error);
      }
    }
  });
};
