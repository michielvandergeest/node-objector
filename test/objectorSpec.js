var expect = require("chai").expect;
var objector = require("../lib/objector.js");

describe("Objector", function() {

	// make an object structure
	describe("#make", function() {

		it("Should add the passed key to the object", function() {

			var obj = {};
			obj = objector.make(obj, 'foo');
			expect(obj.foo).to.be.an('object');

		});

		it("Should return false when a string is passed as object", function() {

			// string
			var obj = 'string';
			obj = objector.make(obj, 'foo');
			expect(obj).to.be.false

		});

		it("Should return false when an array is passed as object", function() {

			// array
			var obj = [];
			obj = objector.make(obj, 'foo');
			expect(obj).to.be.false

		});

		it("Should return false when a boolean is passed as object", function() {

			// boolean
			var obj = true;
			obj = objector.make(obj, 'foo');
			expect(obj).to.be.false

		});

		it("Should return false when a function is passed as object", function() {

			// function
			var obj = function() {};
			obj = objector.make(obj, 'foo');
			expect(obj).to.be.false

		});

		it("Should create an object and add the passed key to the object when undefined is passed as object", function() {

			// undefined
			var obj;
			obj = objector.make(obj, 'foo');
			expect(obj.foo).to.be.an('object');

		});

		it("Should create an object and add the passed key to the object when 'null' is passed as object", function() {

			// NULL
			var obj = null;
			obj = objector.make(obj, 'foo');
			expect(obj.foo).to.be.an('object');

		});

		it("Should create a nested object when the passed key uses dot-notation", function() {

			var obj = {};
			obj = objector.make(obj, 'foo.bar');
			expect(obj.foo.bar).to.be.an('object');

			var obj = {};
			obj = objector.make(obj, 'foo.bar.foobar');
			expect(obj.foo.bar.foobar).to.be.an('object');

		});

		it("Should not overwrite existing keys in the object", function() {

			var obj = {foo: 'value'};
			obj = objector.make(obj, 'foo');
			expect(obj.foo).to.equal('value');

			var obj = {foo: {bar: 'value' }};
			obj = objector.make(obj, 'foo.bar');
			expect(obj.foo.bar).to.equal('value');

		});

	});

	// assign a value to an element in a (nested) object
	describe('#assign', function() {

		it("Should assign a value to an existing key", function() {

			var obj = {foo: 'foo'};
			obj = objector.assign(obj, 'foo', 'bar');
			expect(obj.foo).to.equal('bar');

			var obj = {foo: { bar: 'foo'} };
			obj = objector.assign(obj, 'foo.bar', 'bar');

			expect(obj.foo.bar).to.equal('bar');

		});

		it("Should create the object structure if it doesn't exist yet and assign a value", function() {

			var obj = {foo: 'foo'};
			obj = objector.assign(obj, 'bar', 'bar');
			expect(obj.bar).to.equal('bar');

		});

	});

	// grab a value from a nested object
	describe('#grab', function() {

		it("Should return a value from an object structure", function() {

			var obj = {foo: 'foo'};
			var value = objector.grab(obj, 'foo');
			expect(value).to.equal('foo');

			var obj = {foo: { bar: 'foobar'} };
			var value = objector.grab(obj, 'foo.bar');
			expect(value).to.equal('foobar');

		});

		it("Should return false when the key doesn't exist in the object structure", function() {

			var obj = {foo: 'foo'};
			var value = objector.grab(obj, 'bar');
			expect(value).to.equal(false);

			var obj = {foo: { bar: 'foobar'} };
			var value = objector.grab(obj, 'bar.foo');
			expect(value).to.equal(false);

		});

	});

	// get the size of an object
	describe('#size', function() {

		it("Should return the size of an object", function() {

			var obj = {foo: 'foo'};
			var value = objector.size(obj);
			expect(value).to.equal(1);

			var obj = {foo: 'foo', bar: 'bar'};
			var value = objector.size(obj);
			expect(value).to.equal(2);

			var obj = {foo: { bar: 'foobar'} };
			var value = objector.size(obj);
			expect(value).to.equal(1);

			var obj = {foo: { bar: 'foobar'}, bar: 'foo' };
			var value = objector.size(obj);
			expect(value).to.equal(2);

			var obj = {foo: { bar: 'foobar', foobar: 'barfoo', barfoo: 'foobar'} };
			var value = objector.size(obj.foo);
			expect(value).to.equal(3);

		});

	});

});