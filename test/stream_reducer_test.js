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
    
    it('should be created implicitly via Stream subscription', function () {
      
      expect(stream1).to.be.an.object;
      expect(stream1.constructor).to.deep.equal(Stream);
      
      observer = stream1.subscribe;
      expect(observer).to.be.an.object;
      expect(observer.constructor).to.deep.equal(StreamReducer)
      
    });
  
    it('should be created using StreamReducer#of', function () {
      observer = StreamReducer.of(stream1, (data) => {
        data + 10;
      });
      
      expect(observer.constructor).to.deep.equal(StreamReducer);
    });
  });
  
  
  /**
   * StreamReducer#map
   */
  describe('Stream#map', function () {
    
    it('does not matter where the subscribe property is in relation to map.', function () {
      mockUtil.setState([]);
      
      stream1
        .map(data => data * 2)
        .subscribe
        .map(data => data + 1000)
        .map(data => mockUtil.pushState(data));
      
      stream2.subscribe
        .map(data => data * 2)
        .map(data => data + 1000)
        .map(data => mockUtil.pushState(data));
      
      stream1.push(200);
      stream2.push(300);
      expect(mockUtil.getState()).to.have.length(2);
      expect(mockUtil.getState()).to.eql([1400, 1600])
    });
    
  });
  
  
  /**
   * StreamReducer#tap
   */
  describe('StreamReducer#tap', function () {
    
    it('passes the same value it accepts.', function () {
      mockUtil.setState(1);
      
      stream1.subscribe
        .map(data => data * 2)
        .tap(data => {
          expect(data).to.equal(400);
        })
        .tap(data => data + 1000)
        .tap(data => mockUtil.setState(data))
        .map(data => {
          expect(data).to.equal(400);
        });
      
      stream1.push(200);
      expect(mockUtil.getState()).to.equal(400);
    });
    
  });
  
  
  /**
   * StreamReducer#trap
   */
  describe('StreamReducer#trap', function () {
    
    it('should work like map when there are no errors', function() {
      
      mockUtil.setState(1);
      
      stream1.subscribe
        .trap((data) => data + 200)
        .trap(data => data * 2)
        .trap(data => mockUtil.setState(data));
      
      stream1.push(50);
      expect(mockUtil.getState()).to.equal(500);
    });
    
    it('should return value from error handler when there is an error', function () {
      
      mockUtil.setState([]);
      
      stream1.subscribe
        .trap(
          () => {throw new Error("ooops");},
          (err) => {
            mockUtil.pushState(err.message);
            return 777;
          })
        .trap(data => {
          mockUtil.pushState(data);
          return data;
        });
      
      stream1.push(50);
      expect(mockUtil.getState()).to.have.length(2);
      expect(mockUtil.getState()).to.include(777);
      expect(mockUtil.getState()).to.include('ooops');
    });
    
  });
  
});
