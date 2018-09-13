const { Foo } = require('./');

class Bar {
  constructor(bar) {
    this.bar = bar;
  }
}

module.exports.Foo = Foo;
module.exports.Bar = Bar;
