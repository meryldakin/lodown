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
        } else if (value instanceof Date) {
        return "date";
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
    if (array.includes(value) === false){
        return -1;
    } else {
        for (let i = 0; i < array.length; i++) {
            if (value === array[i]) {
               positionValue.push(i);
            }
        }
      } return positionValue[0];
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
    })
  return uniqueValues;
}