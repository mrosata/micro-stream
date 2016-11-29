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
  
  /**
   * beforeEach
   */
  beforeEach('Setup Stream and MockStream Util', function () {
    stream1 = Stream.of(null);
    stream2 = Stream.of(null);
    mockUtil = new MockStreamUtil();
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
      mockUtil.setState([]);
      
      observer = stream1.subscribe;
      
      observer.map(x => x * 2)
        .reduce((total, num) => total + num, 0)
        .tap(data => {
          mockUtil.pushState(data);
        });
      
      stream1.push(10).push(20).push(30);
      
      expect(mockUtil.getState()).to.eql([20, 60, 120]);
    });
  });
  
});
