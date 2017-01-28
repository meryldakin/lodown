'use strict';

var 
    expect = require('chai').expect,
    sinon = require('sinon'),
    lodown = require('../index'),
    customers = require('./fixtures/customers.json');

describe('lodown', function() {
    describe('identity', function() {
        it('should return value passed', function(){
          let result = lodown.identity(5);
          expect(result).to.equal(5);
        });
        
        it('should return value passed', function(){
          let result = lodown.identity([]);
          expect(result).to.eql([]);
        });
    });
});

describe('lodown', function() {
    describe('typeOf', function() {
        it('should return data type of element passed in string form', function(){
          let result = lodown.typeOf(5);
          expect(result).to.equal("number");
        });
        
        it('should return "array" if array is passed', function(){
          let result = lodown.typeOf([]);
          expect(result).to.eql("array");
        });
        it('should return "null" if null is passed', function(){
          let result = lodown.typeOf(null);
          expect(result).to.equal("null");
        });
        it('should return "obect" if object is passed', function(){
          let result = lodown.typeOf({});
          expect(result).to.eql("object");
        });
    });
});

describe('lodown', function() {
    describe('first', function() {
        it('should return however many elements from the front of the array as specified by number given', function(){
          let result = lodown.first([1,2,3,4,5], 2);
          expect(result).to.eql([1,2]);
        });
        
        it('should return [] if first argument is not an array', function(){
          let result = lodown.first("a", 1);
          expect(result).to.eql([]);
        });
        
        it('should return first element in array if no number given', function(){
          let result = lodown.first([1,2,3], "apricot");
          expect(result).to.equal(1);
        });
        it('should return [] if number is less than 0', function(){
          let result = lodown.first([1,2,3], -1);
          expect(result).to.eql([]);
        });
        it('should return full array if number is greater than length of array', function(){
          let result = lodown.first([1,2,3], 5);
          expect(result).to.eql([1,2,3]);
        });
    });
});

describe('lodown', function() {
    describe('last', function() {
        it ('should return however many elements from the end of an array as specified by number given', function(){
            let result = lodown.last([1,2,3], 2);
            expect(result).to.eql([2,3]);
        });
        it ('should return [] if first argument is not an array', function(){
            let result = lodown.last('kitty', 2);
            expect(result).to.eql([]);
        });
        it ('should return [] if number is less than 0', function(){
            let result = lodown.last([1,2,3], -2);
            expect(result).to.eql([]);
        });
        it ('should return last element in array if no number given', function(){
            let result = lodown.last([1,2,3]);
            expect(result).to.equal(3);
        });
        it ('should return full array if number is greater than array length', function(){
            let result = lodown.last([1,2,3], 7);
            expect(result).to.eql([1,2,3]);
        });
    });
});


describe('lodown', function() {
    describe('each', function() {
        it('should iterate an Array, applying action to each element, index of the element, and the collection', function() {
            var action = sinon.spy();
            lodown.each(customers, action);
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
   
        it('should iterate an Object, applying action for each value, key of value, and Object', function() {
            var action = sinon.spy();
            var customer = customers[0];
            lodown.each(customer, action);
            expect(action.callCount).to.equal(Object.keys(customer).length);
            for(var key in customer) {
              expect(action.calledWith(customer[key], key, customer)).to.be.true;
            }
        });
    });
});

describe('lodown', function() {
    describe('indexOf', function() {
        it ('should return the first occuring index number of a given element in an array', function(){
            let result = lodown.indexOf([1,2,3], 2);
            expect(result).to.equal(1);
        });
        it ('should return -1 if element not found in array', function(){
            let result = lodown.indexOf([1,2,3], 4);
            expect(result).to.equal(-1);
        });
    });
});

describe('lodown', function() {
    describe('filter', function() {
        it ('should return only the elements of an array that pass a given test', function(){
           let result = lodown.filter([1,2,3], function(value){
               return value > 1;
           });
           expect(result).to.eql([2,3]);
        });
        it ('should return elements of array that resolve to true when passed a test even if test does not result in a Boolean)', function(){
            let result = lodown.filter([1,2,3], function(value){
                return value + 2;
            });
            expect(result).to.eql([1,2,3]);
        });
    });
}); 

describe('lodown', function() {
    describe('reject', function() {
        it ('should return the elements of an array that fail a given test', function(){
           let result = lodown.reject([1,2,3], function(value){
               return value > 1;
           });
           expect(result).to.eql([1]);
        });
        it ('should return elements of array that resolve to false when passed a test even if test does not result in a Boolean)', function(){
            let result = lodown.reject([1,2,3], function(value){
                return value + 2;
            });
            expect(result).to.eql([]);
        });
    });
});

describe('lodown', function() {
    describe('partition', function() {
        it ('should return an array of two arrays: the first whose elements passed a test and the second whose elements failed it', function(){
           let result = lodown.partition([1,2,3], function(value){
               return value > 1;
           });
           expect(result).to.eql([[2,3], [1]]);
        });
    });
});

describe('lodown', function() {
    describe('unique', function() {
        it ('should return an array with duplicates removed', function(){
           let result = lodown.unique([1, 2, 2, '2', 3, 'horse', 'horse', 'lady']);
           expect(result).to.eql([1, 2, '2', 3, 'horse', 'lady']);
        });
    });
});

describe('lodown', function() {
    describe('map', function() {
        it ('should return an array with function applied to each element in it', function(){
           let result = lodown.map([1, 2, 3, 4], function(value){
               return value + 1;
           });
           expect(result).to.eql([2, 3, 4, 5]);
        });
    });
});

describe('lodown', function() {
    describe('pluck', function() {
        it ('should take a property and search an array of objects for it, then return array of elements that correspond to that property', function(){
           let result = lodown.pluck([{one: 'a'}, { one: 'b', two: 'c'}, {one: 'd'}], "one"); 
           expect(result).to.eql(['a', 'b', 'd']);
        });
    });
});

describe('lodown', function() {
    describe('contains', function() {
        it ('should return a true or false for whether an array contains a given element', function(){
           let result = lodown.contains([1,2,3,4], 2); 
           expect(result).to.equal(true);
        });
        it ('should return false if no value is given', function(){
            let result = lodown.contains([1,2,3]);
            expect(result).to.equal(false);
        });
    });
});

describe('lodown', function() {
    describe('every', function() {
        it ('should return true only if every value in a collection passes a test', function(){
           let result = lodown.every([1,2,3,4], function(value){
               return value > 2;
           }); 
           expect(result).to.equal(false);
        });
        it ('should return true only if every value in a collection passes a test', function(){
           let result = lodown.every([1,2,3,4], function(value){
               return value > 0;
           }); 
           expect(result).to.equal(true);
        });
        it ('if no function is given, should return true if every element is truthy', function(){
           let result = lodown.every([1,null,3,4]); 
           expect(result).to.equal(false);
        });
        it ('if all values are true, returns true', function(){
           let result = lodown.every([3,4], function(value){
               return value > 0;
           }); 
           expect(result).to.equal(true);
        });
    });
});

describe('lodown', function() {
    describe('some', function() {
        it ('should return true if at least one of the elements in a collection pass a test', function(){
           let result = lodown.some([1,2,3,4], function(value){
               return value > 2;
           }); 
           expect(result).to.equal(true);
        });
        it ('if no function is given, should return true if at least one of the values are truthy', function(){
            let result = lodown.some([1,2,0]);
            expect(result).to.equal(true);
        });
    });
});

describe('lodown', function() {
    describe('reduce', function() {
        it ('should use provided function to combine array and seed into one value', function(){
           let result = lodown.reduce([1,2,3], function(value, nextValue){
               return value + nextValue;
           }, 2); 
           expect(result).to.equal(8);
        });
        it ('should use the first element in array as seed if no seed is present', function(){
            let result = lodown.reduce([1,2,3], function(value, nextValue){
               return value + nextValue;
           }); 
           expect(result).to.equal(6);
        });
        it ('should still work if seed is 0', function(){
            let result = lodown.reduce([1,2,3], function(value, nextValue){
               return value + nextValue;
           }, 0); 
           expect(result).to.equal(6);
        });
    });
});

describe('lodown', function() {
    describe('extend', function() {
        it ('should combine properties of all objects passed into the first object passed', function(){
           let result = lodown.extend({one: 'a'}, {two: 'b'}, {three: 'c'});
           expect(result).to.eql({one: 'a', two: 'b', three: 'c'});
        });
        it ('should update the values of the object properties if a property with a different value is passed', function(){
            let result = lodown.extend({one: 'a'}, {two: 'b'}, {one: 'c'});
            expect(result).to.eql({one: 'c', two: 'b'});
        });
    });
});