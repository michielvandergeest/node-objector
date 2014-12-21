#Objector

##A set of useful utilities to work with Objects in Node.js

###Introduction
Objector makes working with javascript objects a bit easier. Especially nested / multilevel objects.

With objector you can easily:

- create an empty object structure
- assign values to elements in an existing object
- retrieve values from (nested) elements in an object
- get the size of an object

###Instalation

Install Objector through NPM

```
npm install objector --save
```

This will install Objector as a dependency and update your package.json automatically.

Next require Objector in your Node.js script, like this:

```
var objector = require('objector');
```

###Usage

Objector has an easy to use interface:

####Creating an empty object structure

With the ```objector.make``` method, using a dot-notation, you can create an empty, nested object structure.

```
var obj = {};
obj = objector.make(obj, 'foo.bar.foobar');
obj = objector.make(obj, 'foo.bar.foobar2');
obj = objector.make(obj, 'foo.bar.foobar3');
```

Will produce the following object:

```
{
	foo: {
		bar: {
			foobar: null,
			foobar2: null,
			foobar3: null
		}
	}
}
```

####Assigning values to an existing object

Once an object structure is created, you can easily assign values to it, using the ```objector.assign``` method. Assigning data to nested elements in an object is easy using a dot-notation.

Considering the object structure created before:

```
objector.assign(obj, 'foo.bar.foobar', 'value 1');
objector.assign(obj, 'foo.bar.foobar2', 'value 2');
objector.assign(obj, 'foo.bar.foobar2', 'value 3');
```

Will modify the object to:

```
{
	foo: {
		bar: {
			foobar: 'value 1',
			foobar2: 'value 2',
			foobar3: 'value 3'
		}
	}
}
```

When you try to assign a value to an element in an object doesn't exist yet, it will automatically be created, similar to ```objector.make```.

####Retrieving a value from an object

Retrieving a value from a multilevel object structure is easy with the ```objector.grab``` method. Simply pass the path to the element using a dot-notation, and it will return the value. If the element doesn't exist, it will return false.

```
objector.grab(obj, 'foo.bar.foobar'); // returns 'value 1'
objector.grab(obj, 'foo.bar.nothing'); // returns 'false'
```

####Getting the size of an object

In Javascript there doesn't exist a method to get the size of an object, like we have ```length()``` for arrays. But still, often it is handy to know how many elements an object has. The ```objector.size``` method does exactly that. Pass the path to the element using a dot-notation, and it will return the size of the object.

```
objector.grab(obj, 'foo'); // returns 1
objector.grab(obj, 'foo.bar'); // returns 3
```

