/*global describe, it, before, beforeEach, after, afterEach */
import { Stream, StreamReducer } from '../';
import { expect } from 'chai';
import { MockStreamUtil } from './mock-stream-util';


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

  });
  
  
  /**
   * StreamReducer#map
   */
  describe('Stream#map', function () {

  });
  
  
  /**
   * StreamReducer#tap
   */
  describe('StreamReducer#tap', function () {

  });
  
  
  /**
   * StreamReducer#trap
   */
  describe('StreamReducer#trap', function () {
    
  });
  
});
