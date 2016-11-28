/*global describe, it, before, beforeEach, after, afterEach */
import { Stream } from '../';
import { expect } from 'chai';
import { MockStreamUtil } from './mock-stream-util';


/**
 * Test the basic Stream class. Creating streams and making
 * sure that the streams are lazy until subscribed to.
 */
describe('Stream tests, basic creation and functionality', function () {
  
  let stream1, mockUtil;
  
  /**
   * beforeEach
   */
  beforeEach('Creating clean stream and mock util', function () {
    // Create new stream to use for tests.
    stream1 = Stream.of(null);
    mockUtil = new MockStreamUtil();
  });
  
  /**
   * afterEach
   */
  afterEach('Cleaning state of stream and mock util', function () {
    // Cancel Stream and nullify reference
    if (stream1 && stream1.cancel && !stream1.__cancelled) {
      stream1.cancel();
    }
    stream1 = null;
    mockUtil = null;
  });
  
  
  /**
   * Stream Creation with of and new.
   */
  describe('Stream.of() & new Stream()', function () {
    let myStream;
    beforeEach(() => {
      myStream = null;
    });
    
    it('should have tenants of the Stream class', function () {
      // The identifier myStream should be null to begin with
      expect(myStream).to.be.null;
      expect(Stream).to.be.a.function;
      expect(Stream.of).to.be.a.function;
      expect(Stream.fromEvent).to.be.a.function;
    });
    
    
    it('should be able to create new Streams', function () {
      expect(myStream).to.be.null;
      myStream = new Stream();
      
      expect(myStream).to.be.a.object;
      expect(myStream.constructor).to.deep.equal(Stream);
      expect(myStream.map).to.be.a.function;
      expect(myStream.tap).to.be.a.function;
      expect(myStream.trap).to.be.a.function;
      expect(myStream.__subscribe).to.be.a.function;
      expect(myStream).to.have.ownProperty('__cancelled');
      expect(myStream.__cancelled).to.equal(false);
      expect(myStream).to.have.ownProperty('__value');
      expect(myStream.__value).to.be.a.function;
      expect(myStream).to.have.ownProperty('observers');
      expect(myStream.observers).to.be.a.array;
      
    });
    
    it('should not be able to use stream instance methods on Stream', () => {
      expect(Stream).to.be.a.object;
      expect(Stream.constructor).to.not.equal(Stream);
      expect(Stream).to.not.have.ownProperty('observers');
      expect(Stream).to.not.have.ownProperty('__cancelled');
      expect(Stream).to.not.have.ownProperty('__value');
    });
  });
  
  
  /**
   * Stream#subscribe
   */
  describe('Stream#subscribe', function () {
    it('should not have any effects from before subscription', function () {
      stream1.tap((data) => {
        mockUtil.setState(data);
      });
      
      expect(mockUtil.getState()).to.be.null;
      stream1.push(100);
      expect(mockUtil.getState()).to.be.null;
    });
    
    it('should runs ops after subscription starts', function () {
      
      stream1.tap((data) => {
        mockUtil.setState(data);
      });
      
      expect(mockUtil.getState()).to.be.null;
      stream1.subscribe;
      
      stream1.push(100);
      expect(mockUtil.getState()).to.equal(100);
    });
    
  });
  
  
  
  /**
   * Stream#cancel
   */
  describe('Stream#cancel', function () {
    it('should not have any effects after cancellation', function () {
      stream1.subscribe
        .map(val => val + 100)
        .map(val => val + 200)
        .tap(data => mockUtil.setState(data));
      
      stream1.push(50);
      expect(mockUtil.getState()).to.equal(350);
      
      stream1.push(100);
      expect(mockUtil.getState()).to.equal(400);
      
      mockUtil.setState("can't touch this...");
      stream1.cancel();
      stream1.push(200);
      stream1.push('mah na na nump, dah dum, bahn bump!');
      expect(mockUtil.getState()).to.equal("can't touch this...");
    });
    
  });
  
  
  
  /**
   * Stream#map
   */
  describe('Stream#map', function () {
    
    it('runs ops only if pushed after subscribe.', function () {
      mockUtil.setState(1);
      
      stream1.map((data) => {
        mockUtil.setState(data);
        return data;
      });
      
      expect(mockUtil.getState()).to.equal(1);
      stream1.subscribe;
      stream1.push(99);
      expect(mockUtil.getState()).to.equal(99);
    });
    
    it('properly passes and accepts values.', function () {
      mockUtil.setState(1);
      
      stream1
        .map((data) => data + 200)
        .map(data => data * 2)
        .map(data => mockUtil.setState(data))
        .subscribe;
      
      stream1.push(50);
      expect(mockUtil.getState()).to.equal(500);
    });
  });
  
  
  /**
   * Stream#tap
   */
  describe('Stream#tap', function () {
    
    it('will not run on values if Stream is not subscribed.', function () {
      mockUtil.setState([]);
      
      stream1.tap((data) => {
        mockUtil.pushState(data);
        return 999;
      }).map(data => {
        mockUtil.pushState(data);
      });
      
      
      expect(mockUtil.getState()).to.be.an.array;
      expect(mockUtil.getState()).to.have.length(0);
      stream1.push(10);
      expect(mockUtil.getState()).to.have.length(0);
    });
    
    
    it('will run as no-op after Stream is subscribed.', function () {
      mockUtil.setState([]);
      
      stream1.tap((data) => {
        mockUtil.pushState(data);
        return 999;
      }).map(data => {
        mockUtil.pushState(data);
      }).subscribe;
      
      
      expect(mockUtil.getState()).to.be.an.array;
      expect(mockUtil.getState()).to.have.length(0);
      stream1.push(10);
      expect(mockUtil.getState()).to.have.length(2);
      expect(mockUtil.getState()).to.not.include(999);
    });
    
    it('passes the same value it accepts.', function () {
      mockUtil.setState(1);
      
      stream1
        .map(data => data * 2)
        .tap(data => {
          expect(data).to.equal(400);
        })
        .tap(data => data + 1000)
        .tap(data => mockUtil.setState(data))
        .map(data => {
          expect(data).to.equal(400);
        })
        .subscribe;
      
      stream1.push(200);
      expect(mockUtil.getState()).to.equal(400);
    });
    
  });
  
  
  /**
   * Stream#trap
   */
  describe('Stream#trap', function () {
    
    
    it('runs ops only if pushed after subscribe.', function () {
      mockUtil.setState(1);
      stream1.trap((data) => {
        mockUtil.setState(data);
        return data;
      });
      
      expect(mockUtil.getState()).to.equal(1);
      
      stream1.subscribe;
      stream1.push(99);
      expect(mockUtil.getState()).to.equal(99);
    });
    
    
    it('should work like map when there are no errors', function() {
      
      mockUtil.setState(1);
      
      stream1
        .trap((data) => data + 200)
        .trap(data => data * 2)
        .trap(data => mockUtil.setState(data))
        .subscribe;
      
      stream1.push(50);
      expect(mockUtil.getState()).to.equal(500);
    });
    
    it('should return value from error handler when there is an error', function () {
      
      mockUtil.setState([]);
      
      stream1
        .trap(
          () => {throw new Error("ooops");},
          (err) => {
            mockUtil.pushState(err.message);
            return 777;
          })
        .trap(data => {
          mockUtil.pushState(data);
          return data;
        })
        .subscribe;
      
      stream1.push(50);
      expect(mockUtil.getState()).to.have.length(2);
      expect(mockUtil.getState()).to.eql(['ooops', 777]);
    });
    
  });
  
});
