const chai = require('chai');
const JSDOMEnvironment = require('jest-environment-jsdom');

class ShouldEnvironment extends JSDOMEnvironment {
  async setup() {
    await super.setup();
    this.global.should = chai.should();
  }
}
module.exports = ShouldEnvironment;
