const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

suite("Functional Tests", function () {
  this.timeout(5000);
  test("convert a valid input", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=10km")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "km");
        assert.equal(res.body.returnNum, (10 / miToKm).toFixed(5));
        assert.equal(res.body.returnUnit, "mi");
        assert.equal(
          res.body.string,
          "10 kilometers converts to 6.21373 miles"
        );
        done();
      });
  });
  test("convert an invalid input", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });
  test("convert an invalid number input", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=1/2/3km")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });
  test("convert an input with invalid number and unit", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=2/4/3megagram")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });
  test("convert when input is only unit", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=gal")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "gal");
        done();
      });
  });
});
