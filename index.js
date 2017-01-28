'use strict';

// YOU KNOW WHAT TO DO //

/**
 * identity: Designed to return the value passed to it.
 * 
 * @param {Array or Object} value The simple or complex Object to pass.
 * 
 * @return {Array or Object} Identity returns the value passed to it unchanged.
 */

function identity(value) {
    return value;
}
module.exports.identity = identity;

/**
 * typeOf: Designed to return the type of value passed to it in string form.
 * 
 * @param {Array or Object} value The simple or complex Object to pass.
 * 
 * @return {String} TypeOf returns the type of data of the value in string form.
 */
 
function typeOf(value) { 
    if (typeof value === "number" || typeof value === "string" || 
    typeof value === "boolean" || typeof value === "function" ||
    typeof value === "undefined") {
      return typeof value;
    } else if (typeof value === "object") {
        if (Array.isArray(value)) {
        return "array";
        } else if (value === null) {
        return "null";
        } else {
          return "object";
        }
    }
}
module.exports.typeOf = typeOf;
/**
 * first: Designed to return the number of elements from the beginning of an 
 * array specified by the number passed.
 * 
 * @param {Array} array The array the elements will be taken from.
 * @param {Number} number The number of elements to remove from the front
 * of the array and return in an array.
 * 
 * @return {Array} First returns a new array that contains a specified number
 * of elements taken from the front of the passed array. Doesn't change original
 * array.
 * 
 */
 
function first (array, number) {
    var slicedArray = [];
    if (Array.isArray(array)) {
        if (typeof number !== "number") {
            return array[0];
        } else if (number < 0) {
            return [];
        }
        else if (number > array.length) {
            return array;
        }
        else {
            return slicedArray = array.slice(0, number);
        }
    } else {
        return [];
    }
}    

module.exports.first = first;

/**
 * last: Designed to return the number of elements from the end of an array
 * specified by the number passed.
 * 
 * @param {Array} array The array the elements will be taken from.
 * @param {Number} number The number of elements to remove from the end
 * of the array and return in an array.
 * 
 * @return {Array} Last returns a new array that contains a specified number
 * of elements taken from the end of the passed array. Doesn't change original
 * array.
 * 
 */

function last(array, number) {
    var lastSliceOfArray = [];
    if (Array.isArray(array)) {
        if (typeof number !== "number") {
            return array[array.length-1];
        } else if (number < 0) {
            return [];
        } else if (number > array.length) {
            return array;
        } else {
            return lastSliceOfArray = array.slice(-number, array.length);
        }
    } else {
        return [];
    }
}

module.exports.last = last;

/**
 * each: Designed to loop over a collection, Array or Object, and applies the action 
 * Function to each value in the collection.
 * 
 * @param {Array or Object} collection The collection over which to iterate.
 * @param {Function} action The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * indexOf: Designed to return the index of a specified value within an array.
 * 
 * @param {Array} array The array in which to check for the value.
 * @param {String or Number} value The value to check the position of within the
 * passed array.
 * 
 * @return {Number} IndexOf returns a number that represents the index of the 
 * value within the array, if it is there.
 */

function indexOf(array, value){
    var positionValue = [];
  each(array, function(element, index, collection){
    if (value === collection[index]){
      positionValue.push(index);
      }
  });
  return positionValue.length > 0 ? positionValue[0] : -1;
}

module.exports.indexOf = indexOf;

/**
 * filter: Designed to check the elements of an array or object against a test
 * and return the items that resolve to true in a new array.
 * 
 * @param {Array or Object} collection The Array or Object whose values will 
 * be checked against a test.
 * @param {Function} test The Function that will run on each element in the
 * Array or Object and return a Boolean for each.
 * 
 * @return {Array} Filter returns an array of all values in the Array or Object
 * that returned true for the test.
 */
 
function filter (collection, test) {
    const filtered = [];
    each(collection, function (value, position, collection) {
        if(test(value, position, collection)){
            filtered.push(value);
        }
    })
    return filtered;
}

module.exports.filter = filter;

/**
 * reject: Designed to check the elements of an array or object against a test
 * and return the items that resolve to false in a new array.
 * 
 * @param {Array or Object} collection The Array or Object whose values will 
 * be checked against a test.
 * @param {Function} test The Function that will run on each element in the
 * Array or Object and return a Boolean for each.
 * 
 * @return {Array} Filter returns an array of all values in the Array or Object
 * that returned false for the test.
 */
 
function reject(array, test) {
    const rejectedElements = [];
    filter(array, function(element, index, array){
        if(test(element, index, array) === false){
            rejectedElements.push(element);
        }
    });
  return rejectedElements;
}
module.exports.reject = reject;

/**
 * partition: Designed to check the elements of an array against a test
 * and return two arrays: the first with the elements that resolved to true
 * and the second with the elements that resolved to false.
 * 
 * @param {Array} array The Array whose values will be checked against a test.
 * @param {Function} test The Function that will run on each element in the
 * Array and return a Boolean for each.
 * 
 * @return {Array} Partition returns an array of two arrays: the first contains
 * the elements of the original array that resolved to true, the second contains
 * the elements of the original that resolved to false.
 */
 
function partition (array, test) {
    const partitionedArrays = [];
    const truthyArray = [];
    const falsyArray = [];
    filter(array, function(element, index, array){
       if(test(element, index, array)) {
           truthyArray.push(element);
       }
    });
    reject(array, function(element, index, array){
       if(test(element, index, array) === false) {
           falsyArray.push(element);
       }
    });
    partitionedArrays.push(truthyArray, falsyArray);
    return partitionedArrays;
}

module.exports.partition = partition;

/**
 * unique: Designed to filter an array for duplicate values and return a 
 * new array with duplicate values removed.
 * 
 * @param {Array} array The Array whose values will be checked for duplicates.
 * 
 * @return {Array} Unique returns a new array without any duplicates from the 
 * first by employing the filter and indexOf functions. The filter funtion tests
 * the array against a test and returns any values that resolve to true in 
 * a new array. The test uses indexOf to return only the first instance of a 
 * value to the new array.
 */
 
 function unique (array) {
  var uniqueValues = filter(array, function (element, index, array) {
        return indexOf(array, element) === index;
    });
  return uniqueValues;
}

module.exports.unique = unique;

/**
 * map: Designed to iterate through an array or object and apply an action
 * to each item, then return a new array with the function executed for each.
 * 
 * @param {Object or Array} collection The Object or Array to iterate through.
 * @param {Function} action The function that will act upon every item in 
 * the collection.
 * 
 * @return {Array} Map returns a new array of the elements passed through it
 * with each affected by the action passed to it.
 */
 
function map (collection, action) {
    const mappedArray = [];
    each(collection, function (element, index, array){
      mappedArray.push(action(element, index, array));
    });
    return mappedArray;
}

module.exports.map = map;

/**
 * pluck: Designed to take an array of objects and a property, then return 
 * every value in each object that corresponds to that property.
 * 
 * @param {Array} arrOfObj The array of objects that will be checked for the 
 * existence of the passed property.
 * @param {String} property The property that indicates which values of the 
 * objects to return
 * 
 * @return {Array} Pluck returns an array of the values that corresponds
 * to the property given as an argument.
 */
 
 function pluck(arrOfObj, property) {
  return map(arrOfObj, function (element, index, collection){
    return arrOfObj[index][property];
  });
}

module.exports.pluck = pluck;

/**
 * contains: Designed to tell whether or not a certain element exists in an array
 * 
 * @param {Array} array The Array to check through for the given element
 * @param {String | Number | Boolean | Array | Object} value The value to check
 * array for
 * 
 * @return {Boolean} Contains returns a true if value is found in array, otherwise
 * returns false
 */

function contains(array, value){
    let arrayContainsValue = [];
    each(array, function(element){
    if (element === value){
    arrayContainsValue.push(true);
    }
  });
  return arrayContainsValue[0] === true ? true : false;
}

module.exports.contains = contains;

/**
 * every: Designed to return true on an Object or Array only if every 
 * value in the collection is true or can be coerced to true.
 * 
 * @param {Array or Object} collection The Object or Array to check through
 * @param {Function} test The test to execute on each value that will return
 * a true or false
 * 
 * @return {Boolean} Every returns a true only if every value resolves to
 * true after the test is executed on it. If one value resolves to false,
 * Every returns false.
 */

function every (collection, test) {
  if (test){
    const filteredValues = filter(map(collection, test), function (value){
      return Boolean(value) === false;
    });
    if (filteredValues[0] === false){
      return false;
    } else {
      return true;
    }
  } else if (!test) {
      const justValues = map(collection, function (value){
        return Boolean(value);
      });
      const justFilteredValues = filter(justValues, function(value){
        return value === false;
      });
    if (justFilteredValues[0] === false){
      return false;
    } else {
      return true;
    }
  }
}

module.exports.every = every;

/**
 * some: Designed to return false on an Object or Array only if every 
 * value in the collection is false or can be coerced to false. It is the 
 * opposite of Every - it returns true if SOME of the values are true.
 * 
 * @param {Array or Object} collection The Object or Array to check through
 * @param {Function} test The test to execute on each value that will return
 * a true or false
 * 
 * @return {Boolean} Some returns false when every value is false. It returns
 * true if some (even one) of the values is true.
 */
 
function some (collection, test) {
if (test){
    const filteredValues = filter(map(collection, test), function (value){
      return Boolean(value) === true;
    });
    if (filteredValues[0] === true){
      return true;
    } else {
      return false;
    }
  } else if (!test) {
      const justValues = map(collection, function (value){
        return Boolean(value);
      });
      const justFilteredValues = filter(justValues, function(value){
        return value === true;
      });
    if (justFilteredValues[0] === true){
      return true;
    } else {
      return false;
    }
  }
}

module.exports.some = some;

/**
 * reduce: Designed to combine the values in an array with whatever function
 * is passed to it and return a single value.
 * 
 * @param {Array} array The array of values to combine
 * @param {Function} action The operation to perform on the values that will
 * combine them into one value
 * @param {Number | Seed | Boolean | Array | Object} seed The starting 
 * value to combine the values in array with. Can be omitted and if it is, the
 * first value in the array will act as the seed.
 * 
 * @return {Number | Seed | Boolean | Array | Object} Reduce returns a single
 * value that represents the combined values of the passed array
 */

function reduce (array, action, seed){
let counter;
  if (seed === undefined){
    counter = array[0];
    let reducedArray = array.slice(1);
    each(reducedArray, function(value, index, collection){
      counter = action(counter, value, index + 1);
    });  
 } else {
    counter = seed;
    each(array, function(value, index, collection){
      counter = action(counter, value, index);
    });
  } return counter;
}

module.exports.reduce = reduce;

/**
 * extend: Designed to take one or more objects and combine the properties 
 * of the objects into the first object.
 * 
 * @param {Object} object The object that will hold the properties of any
 * other object passed through (any number of objects can be passed through
 * here, but the first one will be returned with the properties of all the 
 * rest).
 * 
 * @return {Object} Extend returns a single object that holds the properties 
 * of all other objects passed in after it.
 */
 
function extend (object){
  let args = Array.from(arguments);
  each(args, function(elementInCollec, key, collection){
    each(args[key], function(elementInCollec, key, collection){
      object[key] = elementInCollec;
    });
  });
  return object;
  
}

module.exports.extend = extend;