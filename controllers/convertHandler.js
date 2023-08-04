function ConvertHandler() {
  const numberTester = /^[0-9](.*[0-9])?/;

  this.getNum = function (input) {
    const numberPart = numberTester.exec(input);
    if (!numberPart) {
      return 1;
    }
    const numbers = numberPart[0].split("/");
    if (numbers.length >= 3) {
      throw new Error("Invalid number");
    }
    const numerator = parseFloat(numbers[0]);
    const denominator = parseFloat(numbers[1]) || 1;
    if (isNaN(numerator) || isNaN(denominator)) {
      throw new Error("not a number");
    }
    return numerator / denominator;
  };

  this.getUnit = function (input) {
    let unitText = input.replace(numberTester, "").toLowerCase();
    switch (unitText) {
      case "gal":
      case "kg":
      case "lbs":
      case "km":
      case "mi":
        return unitText;
      case "l":
        return "L";
      default:
        throw new Error("Invalid unit");
    }
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "kg":
        return "lbs";
      case "lbs":
        return "kg";
      case "km":
        return "mi";
      case "mi":
        return "km";
      default:
        throw new Error("Invalid unit");
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case "gal":
        return "gallons";
      case "L":
        return "liters";
      case "kg":
        return "kilograms";
      case "lbs":
        return "pounds";
      case "km":
        return "kilometers";
      case "mi":
        return "miles";
      default:
        throw new Error("Invalid unit");
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case "gal":
        return initNum * galToL;
      case "L":
        return initNum / galToL;
      case "lbs":
        return initNum * lbsToKg;
      case "kg":
        return initNum / lbsToKg;
      case "mi":
        return initNum * miToKm;
      case "km":
        return initNum / miToKm;
      default:
        throw new Error("Invalid unit");
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitFull = this.spellOutUnit(initUnit);
    const returnUnitFull = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitFull} converts to ${returnNum} ${returnUnitFull}`;
  };
}

module.exports = ConvertHandler;
