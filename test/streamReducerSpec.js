/*global describe, it, before, beforeEach, after, afterEach */
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
   * StreamReducer#filter
   */
  describe('Stream#reduce', function () {
    
    it('should be able to add subsequent streamed data', function() {
      mockUtil.setState('test', []);
      
      observer = stream1.subscribe;
      
      observer.map(x => x * 2)
        .reduce((total, num) => total + num, 0)
        .tap(data => {
          mockUtil.pushState('test', data);
        });
      
      stream1.push(10).push(20).push(30).push(100);
      
      expect(mockUtil.getState('test')).to.eql([20, 60, 120, 320]);
    });
  });
  
  
  it('should be able to build collections of data', function() {
    mockUtil.setState('test', []);
    
    observer = stream1.subscribe;
    
    observer.reduce(pushReducer, [], a=>a.length < 2)
      .map(data => mockUtil.pushState('test', data));
  
    // first collection
    stream1.push('hello').push('world');
    // second collection
    stream1.push('how does').push('it duu?');
    
    let expectation = [['hello', 'world'], ['how does', 'it duu?']];
    expect(mockUtil.getState('test')).to.eql(expectation);
    
  })
});
