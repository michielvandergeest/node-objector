/**
 * Objector
 * A set of useful utilities to work with Objects in Node.js
 * version 0.0.1
 * Copyright 2014 - Michiel van der Geest
 */


/**
 * Exposes an instance of Objector to the outside world
 */
module.exports = Objector();


/**
 * Constructor
 */
function Objector() {

	if (!(this instanceof Objector)) {
		return new Objector();
	}

}


/**
 * Make a new object structure
 * @param  {object} obj
 * @param  {string} key
 * @return {object|false}
 */
Objector.prototype.make = function (obj, key) {

	obj = validateObject(obj)

	if(!obj)
	{
		return false;
	}

	// add the key to the object
	createNestedObject(obj, key.split('.'));

	return obj;
}


/**
 * Assign a value to a value to an element in a (nested) object
 * @param  {object} obj
 * @param  {string} key
 * @param  {mixed} value
 * @return {object}
 */
Objector.prototype.assign = function(obj, key, value) {

	obj = validateObject(obj)

	if(!obj)
	{
		return false;
	}

	// add the key to the object
	createNestedObject(obj, key.split('.'), value);

	return obj;

}


/**
 * Grab a value from a (nested) object
 * @param  {object} obj
 * @param  {string} key
 * @return {object}
 */
Objector.prototype.grab = function (obj, key) {

	obj = validateObject(obj)

	if(!obj)
	{
		return false;
	}

	var keys = key.split('.');
	for( var i = 0; i < keys.length; i++ ) {
		obj = obj[ keys[i] ] = obj[ keys[i] ] || {};
	}

	// return false when not found
	if(!obj.length) return false;

	return obj;

}


/**
 * Get the size of an object
 * @param  {obj} obj
 * @return {integer}
 */
Objector.prototype.size = function (obj) {

	var size = 0;

	for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }

    return size;

}


/**
 * Validate if a variable is an object, create an object if nothing passed
 * @param  {object} obj
 * @return {object|false}
 */
var validateObject = function(obj) {

	// create an empty object when null is passes
	if(obj == null)
	{
		return obj = {};
	}
	else
	{
		var type = typeof obj

		// return false when not an object (string, boolean or function) is passed
		if( type != 'object')
		{

			return false;

		}
		else
		{
			// let's make sure the object is not actually an array
			if(Array.isArray(obj))
			{
				return false;
			}
		}

	}

	return obj;
}


/**
 * Create a nested object
 * @param  {object} obj
 * @param  {array} keys
 * @param  {mixed} value
 * @return {object}
 */
var createNestedObject = function( obj, keys, value ) {

	// when value parameter is passed, set variable key to the last item in the keys array
	// and pop the key from the array
	var key = arguments.length == 3 ? keys.pop() : false;

	for( var i = 0; i < keys.length; i++ ) {
		obj = obj[ keys[i] ] = obj[ keys[i] ] || {};
	}

	// assign the value to the last key, if it is set
	if( key ) obj = obj[ key ] = value;

	return obj;
};
