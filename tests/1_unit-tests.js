const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("converHandler tests", function () {
    // convertHandler should correctly read a whole number input.
    test("correctly reading whole numbers", function () {
      assert.strictEqual(
        convertHandler.getNum("5km"),
        5,
        "5 is correctly identified"
      );
    });
    // convertHandler should correctly read a decimal number input.
    test("correctly reading decimal number", function () {
      assert.strictEqual(
        convertHandler.getNum("3.2L"),
        3.2,
        "decimal number is correctly identified"
      );
    });
    // convertHandler should correctly read a fractional input.
    test("correctly read fractional numbers", function () {
      assert.strictEqual(
        convertHandler.getNum("4/5km"),
        0.8,
        "fractional number are correctly identified"
      );
    });
    // convertHandler should correctly read a fractional input with a decimal.
    test("correctly reads fraction inputs with decimal", function () {
      assert.strictEqual(
        convertHandler.getNum("6.5/9.4mi"),
        6.5 / 9.4,
        "fractional numbers with decimal are identified correctly"
      );
    });
    // convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test("return error on double fraction", function () {
      assert.throws(
        () => convertHandler.getNum("3/2/3km"),
        Error,
        /Invalid number/,
        "correctly throws errors on double fraction"
      );
    });
    // convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    test("returns 1 when only unit is provided", function () {
      assert.strictEqual(
        convertHandler.getNum("L"),
        1,
        "correctly uses 1 as initNum when only unit is given"
      );
    });
    // convertHandler should correctly read each valid input unit.
    test("correctly read each valid input unit", function () {
      assert.strictEqual(
        convertHandler.getUnit("3gal"),
        "gal",
        "correctly readys gal"
      );
      assert.strictEqual(
        convertHandler.getUnit("3l"),
        "L",
        "correctly reads L"
      );
      assert.strictEqual(
        convertHandler.getUnit("5LBS"),
        "lbs",
        "correctly reads lbs"
      );
      assert.strictEqual(
        convertHandler.getUnit("2Kg"),
        "kg",
        "correctly reads kg"
      );
      assert.strictEqual(
        convertHandler.getUnit("3mi"),
        "mi",
        "correctly reads mi"
      );
      assert.strictEqual(
        convertHandler.getUnit("2km"),
        "km",
        "correctly reads km"
      );
    });
    // convertHandler should correctly return an error for an invalid input unit.
    test("correctly return error when input is invalid", function () {
      assert.throws(
        () => convertHandler.getUnit("1kilometers"),
        Error,
        /Invalid unit/i,
        "correctly throws error when unit is incorrect"
      );
    });
    // convertHandler should return the correct return unit for each valid input unit.
    test("correctly return the correct return unit for each valid unit input", function () {
      assert.strictEqual(
        convertHandler.getReturnUnit("gal"),
        "L",
        "correctly returns L when gal is input"
      );
      assert.strictEqual(
        convertHandler.getReturnUnit("L"),
        "gal",
        "correctly returns gal when L is input"
      );
      assert.strictEqual(
        convertHandler.getReturnUnit("lbs"),
        "kg",
        "correctly returns kg when lbs is input"
      );
      assert.strictEqual(
        convertHandler.getReturnUnit("kg"),
        "lbs",
        "correctly returns lbs when kg is input"
      );
      assert.strictEqual(
        convertHandler.getReturnUnit("mi"),
        "km",
        "correctly returns km when mi is input"
      );
      assert.strictEqual(
        convertHandler.getReturnUnit("km"),
        "mi",
        "correctly returns mi when km is input"
      );
    });
    // convertHandler should correctly return the spelled-out string unit for each valid input unit.
    test("correctly return spelled out string for each unit", function () {
      assert.strictEqual(
        convertHandler.spellOutUnit("gal"),
        "gallons",
        "correctly spells out gallons for gal"
      );
      assert.strictEqual(
        convertHandler.spellOutUnit("L"),
        "liters",
        "correctly spells out liters for L"
      );
      assert.strictEqual(
        convertHandler.spellOutUnit("lbs"),
        "pounds",
        "correctly spells out pounds for lbs"
      );
      assert.strictEqual(
        convertHandler.spellOutUnit("kg"),
        "kilograms",
        "correctly spells out kilogram for kg"
      );
      assert.strictEqual(
        convertHandler.spellOutUnit("mi"),
        "miles",
        "correctly spells out miles for mi"
      );
      assert.strictEqual(
        convertHandler.spellOutUnit("km"),
        "kilometers",
        "correctly spells out kilometers for km"
      );
    });
    // convertHandler should correctly convert gal to L.
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    test("correctly converts from gal to L", function () {
      assert.strictEqual(
        convertHandler.convert(1, "gal"),
        galToL,
        "correctly converts gallons to liters"
      );
    });
    // convertHandler should correctly convert L to gal.
    test("correctly converts from L to gal", function () {
      assert.strictEqual(
        convertHandler.convert(1, "L"),
        1 / galToL,
        "correctly converts liters to gallons"
      );
    });
    // convertHandler should correctly convert mi to km.
    test("correctly converts from mi to km", function () {
      assert.strictEqual(
        convertHandler.convert(1, "mi"),
        miToKm,
        "correctly converts mi to km"
      );
    });
    // convertHandler should correctly convert km to mi.
    test("correctly converts from mi to km", function () {
      assert.strictEqual(
        convertHandler.convert(1, "km"),
        1 / miToKm,
        "correctly converts km to mi"
      );
    });
    // convertHandler should correctly convert lbs to kg.
    test("correctly converts from lbs to kg", function () {
      assert.strictEqual(
        convertHandler.convert(1, "lbs"),
        lbsToKg,
        "correctly converts pounds to kilograms"
      );
    });
    // convertHandler should correctly convert kg to lbs.
    test("correctly coverts kg to lbs", function () {
      assert.strictEqual(
        convertHandler.convert(1, "kg"),
        1 / lbsToKg,
        "correctly converts kilograms to pounds"
      );
    });
  });
});
