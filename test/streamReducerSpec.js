/*global describe, it, before, beforeEach, after, afterEach, Promise */
import { Stream, StreamReducer } from '../src/index.js';
import { expect } from 'chai';
import { MockStreamUtil } from './mockStreamUtil.js';


/**
 * StreamReducer tests - these tests should ensure that the reduce
 * method creates expected patterns.
 */
describe('StreamReducer tests', function () {
  
  let stream1, stream2, observer, mockUtil;
  
  function sum(total, sum) {
    return total + sum;
  }
  function pushReducer(accum, item) {
    accum.push(item);
    return accum;
  }
  
  /**
   * beforeEach
   */
  beforeEach('Setup Stream and MockStream Util', function () {
    stream1 = Stream.of(null);
    stream2 = Stream.of(null);
    mockUtil = new MockStreamUtil({});
    mockUtil.setState('values', []);
    mockUtil.setState('called', 0);
  });
  
  /**
   * afterEach
   */
  afterEach('Cleanup Stream and MockStream Util', function () {
    const streams = [stream1, stream2];
    
    streams.forEach(stream => {
      if (stream && stream.cancel) {
        stream.cancel();
      }
    });
    
    stream1 = null;
    stream2 = null;
    mockUtil = null;
  });
  
  
  /**
   * StreamReducer Creation
   */
  describe('StreamReducer creation', function() {
    it('should be creatable though static method StreamReducer#of', function() {
      expect(StreamReducer).to.be.a('function');
    });
  });
  
  
  /**
   * StreamReducer.reduce
   */
  describe('StreamReducer.reduce', function () {
    
    it('should be able to add subsequent streamed data', function() {
      observer = stream1.subscribe;
      
      observer.map(x => x * 2)
        .reduce(sum, 0)
        .tap(data => {
          mockUtil.pushState('values', data);
        });
      
      stream1.push(10).push(20).push(30).push(100);
      
      expect(mockUtil.getState('values')).to.eql([20, 60, 120, 320]);
    });
    
    it('should be able to build collections of data', function () {
      
      observer = stream1.subscribe;
      
      observer.reduce(pushReducer, [], a => a.length >= 2)
        .map(data => mockUtil.pushState('values', data));
      
      // first collection
      stream1.push('hello').push('world');
      // second collection
      stream1.push('how does').push('it duu?');
      
      let expectation = [['hello', 'world'], ['how does', 'it duu?']];
      expect(mockUtil.getState('values')).to.eql(expectation);
    });
    
  });
  
  
  
  /**
   * StreamReducer.async
   */
  describe('StreamReducer.async', function () {
    it('should pass values once promise has resolved', function (done) {
      
      stream1.subscribe
        .async((val) => {
          return new Promise(function(resolve) {
            setTimeout(() => {
              mockUtil.increment('called');
              return resolve(`Got ${val}`);
            }, 1);
          })
        })
        .tap(result => {
          mockUtil.pushState('values', result);
        });
      
      stream1.push(10);
      setTimeout(() => stream1.push(20), 1);
  
      setTimeout(() => {
        
        expect(mockUtil.getState()).to.deep.equal({
          called: 2,
          values: ['Got 10', 'Got 20']
        });
  
        done();
      }, 12);
    });
  });
  
  
  
  /**
   * StreamReducer.curry
   */
  describe('StreamReducer.curry', function () {
    
    it('should partially apply as needed to non-curried function', function() {
      
      stream1.subscribe
        .curry(function(a, b, c){
          mockUtil.setState('called', mockUtil.getState('called') + 1);
          return a + b + c;
        })
        .tap(data => {
          mockUtil.pushState('values', data);
        });
      
      // This should totally apply to function
      stream1.push(10).push(20).push(30);
      // This should totally apply to function
      stream1.push('duck-').push('tales-').push('awoopwuup');
      // This shouldn't so the function won't be called again
      stream1.push(10).push(20);
      
      expect(mockUtil.getState('values')).to.eql([60, 'duck-tales-awoopwuup']);
      expect(mockUtil.getState('called')).to.equal(2);
    });
  });
  
  
  /**
   * StreamReducer.curried
   */
  describe('StreamReducer.curried', function () {
    
    it('should partially apply as needed to already curried function', function() {
      
      stream1.subscribe
        .curried(a => b => c => {
          mockUtil.increment('called');
          return a + b + c;
        })
        .tap(data => {
          mockUtil.pushState('values', data);
        });
      
      // This should totally apply to function
      stream1.push(10).push(20).push(30);
      // This should totally apply to function
      stream1.push('duck-').push('tales-').push('awoopwuup');
      // This shouldn't so the function won't be called again
      stream1.push(10).push(20);
      
      expect(mockUtil.getState('values')).to.eql([60, 'duck-tales-awoopwuup']);
    });
  });
  
  
  /**
   * StreamReducer.filter
   */
  describe('StreamReducer.filter', function () {
    it('should filter out undefined and null values by default', function () {
      
      stream1.subscribe
        .filter()
        .tap(data => {
          mockUtil.pushState('values', data);
          mockUtil.increment('called');
        });
      
      // 10.. 30
      stream1.push(10).push(undefined).push(30);
      // 'duck' .. 'tales'
      stream1.push(undefined).push().push('duck');
      // 'tales' .. false
      stream1.push('tales').push().push(null).push(false);
      // true .. undefined
      stream1.push().push(true).push(undefined);
      
      let expectation = [10, 30, 'duck', 'tales', false, true];
      expect(mockUtil.getState('values')).to.eql(expectation);
      expect(mockUtil.getState('called'), expectation.length)
    });
  });
  
});
