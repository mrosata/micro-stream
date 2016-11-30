/*global describe, it, before, beforeEach, after, afterEach */
import { Stream } from '../src/index.js';
import { expect } from 'chai';
import { MockStreamUtil } from './mockStreamUtil.js';


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
    mockUtil = new MockStreamUtil({});
    mockUtil.setState('values', []);
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
    mockUtil.reset();
    mockUtil = null;
  });
  
  
  /**
   * Stream Creation with of and new.
   */
  describe('Stream.of() & new Stream()', function () {
    
    it('should have tenants of the Stream class', function () {
      stream1 = null;
      // The identifier myStream should be null to begin with
      expect(stream1).to.be.a('null');
      expect(Stream).to.be.a('function');
      expect(Stream.of).to.be.a('function');
      expect(Stream.fromEvent).to.be.a('function');
    });
    
    
    it('should be able to create new Streams', function () {
      stream1 = new Stream();
      
      expect(stream1).to.be.a('object');
      expect(stream1.constructor).to.deep.equal(Stream);
      expect(stream1.map).to.be.a('function');
      expect(stream1.tap).to.be.a('function');
      expect(stream1.trap).to.be.a('function');
      expect(stream1.__subscribe).to.be.a('function');
      expect(stream1).to.have.ownProperty('__cancelled');
      expect(stream1.__cancelled).to.equal(false);
      expect(stream1).to.have.ownProperty('__value');
      expect(stream1.__value).to.be.a('function');
      expect(stream1).to.have.ownProperty('observers');
      expect(stream1.observers).to.be.a('array');
      
    });
    
    it('should not be able to use stream instance methods on Stream', () => {
      expect(Stream).to.be.an('function');
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
      mockUtil.setState('value', 'initial');
      
      stream1.tap((data) => {
        mockUtil.setState('value', data);
      });
      
      
      expect(mockUtil.getState('value')).to.equal('initial');
      stream1.push(100);
      expect(mockUtil.getState('value')).to.equal('initial');
    });
    
    
    it('should runs ops after subscription starts', function () {
      
      stream1.tap((data) => {
        mockUtil.setState('value', data);
      });
      
      stream1.subscribe;
      stream1.push(100);
      
      expect(mockUtil.getState('value')).to.equal(100);
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
        .tap(data => mockUtil.setState('value', data));
      
      stream1.push(50);
      expect(mockUtil.getState('value')).to.equal(350);
      
      stream1.push(100);
      expect(mockUtil.getState('value')).to.equal(400);
      
      mockUtil.setState('value', "can't touch this...");
      stream1.cancel();
      stream1.push(200);
      stream1.push('mah na na nump, dah dum, bahn bump!');
      expect(mockUtil.getState('value')).to.equal("can't touch this...");
    });
    
  });
  
  
  
  /**
   * Stream#map
   */
  describe('Stream#map', function () {
    
    it('runs ops only if pushed after subscribe.', function () {
      mockUtil.setState('value', 1);
      
      stream1.map((data) => {
        mockUtil.setState('value', data);
        return data;
      });
      
      expect(mockUtil.getState('value')).to.equal(1);
      stream1.subscribe;
      stream1.push(99);
      expect(mockUtil.getState('value')).to.equal(99);
    });
    
    it('properly passes and accepts values.', function () {
      mockUtil.setState('value', 1);
      
      stream1
        .map((data) => data + 200)
        .map(data => data * 2)
        .map(data => mockUtil.setState('value', data))
        .subscribe;
      
      stream1.push(50);
      expect(mockUtil.getState('value')).to.equal(500);
    });
  });
  
  
  /**
   * Stream#as
   */
  describe('Stream#as', function () {
    
    it('should pass the "as" value on each push.', function () {
      
      stream1.as(10).subscribe
        .tap(data => {
          mockUtil.pushState('values', data);
        });
      
      stream1.push(1).push(null).push(undefined).push('hello');
      
      expect(mockUtil.getState('values')).to.eql([10, 10, 10, 10]);
    });
  });
  
  
  /**
   * Stream#tap
   */
  describe('Stream#tap', function () {
    
    it('will not run on values if Stream is not subscribed.', function () {
      
      stream1.tap((data) => {
        mockUtil.pushState('values', data);
        return 999;
      }).map(data => {
        mockUtil.pushState('values', data);
      });
      
      
      expect(mockUtil.getState('values')).to.be.an('array');
      expect(mockUtil.getState('values')).to.have.length(0);
      stream1.push(10);
      expect(mockUtil.getState('values')).to.be.empty;
    });
    
    
    it('will run as no-op after Stream is subscribed.', function () {
      
      stream1.tap((data) => {
        mockUtil.pushState('values', data);
        return 999;
      }).map(data => {
        mockUtil.pushState('values', data);
      }).subscribe;
      
      
      expect(mockUtil.getState('values')).to.be.an('array');
      expect(mockUtil.getState('values')).to.have.length(0);
      stream1.push(10);
      expect(mockUtil.getState('values')).to.have.length(2);
      expect(mockUtil.getState('values')).to.not.include(999);
    });
    
    it('passes the same value it accepts.', function () {
      mockUtil.setState('value', 1);
      
      stream1
        .map(data => data * 2)
        .tap(data => {
          expect(data).to.equal(400);
        })
        .tap(data => data + 1000)
        .tap(data => mockUtil.setState('value', data))
        .map(data => {
          expect(data).to.equal(400);
        })
        .subscribe;
      
      stream1.push(200);
      expect(mockUtil.getState('value')).to.equal(400);
    });
    
  });
  
  
  /**
   * Stream#trap
   */
  describe('Stream#trap', function () {
    
    
    it('runs ops only if pushed after subscribe.', function () {
      mockUtil.setState('value', 1);
      stream1.trap((data) => {
        mockUtil.setState('value', data);
        return data;
      });
      
      expect(mockUtil.getState('value')).to.equal(1);
      
      stream1.subscribe;
      stream1.push(99);
      expect(mockUtil.getState('value')).to.equal(99);
    });
    
    
    it('should work like map when there are no errors', function() {
      
      mockUtil.setState('value', 1);
      
      stream1
        .trap((data) => data + 200)
        .trap(data => data * 2)
        .trap(data => mockUtil.setState('value', data))
        .subscribe;
      
      stream1.push(50);
      expect(mockUtil.getState('value')).to.equal(500);
    });
    
    it('should return value from error handler when there is an error', function () {
      // Set 'value' to an array that will hold values to test from stream.

      stream1
        .trap(
          () => {throw new Error("ooops");},
          (err) => {
            mockUtil.pushState('values', err.message);
            return 777;
          })
        .trap(data => {
          mockUtil.pushState('values', data);
          return data;
        })
        .subscribe;
      
      stream1.push(50);
      expect(mockUtil.getState('values')).to.have.length(2);
      expect(mockUtil.getState('values')).to.eql(['ooops', 777]);
    });
    
  });
  
});
