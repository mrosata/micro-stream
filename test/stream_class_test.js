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
  beforeEach(() => {
    // Create new stream to use for tests.
    stream1 = Stream.of();
    mockUtil = new MockStreamUtil();
  });
  afterEach(() => {
    // Cancel Stream and nullify reference
    if (stream1 && stream1.cancel) {
      stream1.cancel();
    }
    stream1 = null;
    mockUtil = null;
  });


// ATM this just a test to test that tests work, (they don't actually test anything)
  describe('Creating Streams with Stream class', () => {
    let myStream;
    beforeEach(() => {
      myStream = null;
    });
    
    it('should have tenants of the Stream class', () => {
      // The identifier myStream should be null to begin with
      expect(myStream).to.be.null;
      expect(Stream).to.be.a.function;
      expect(Stream.of).to.be.a.function;
      expect(Stream.fromEvent).to.be.a.function;
    });
    
    
    it('should be able to create new Streams', () => {
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
  
  
  
  describe('Subscribing and Cancelling to a stream.', () => {
    beforeEach(() => {
      
    })
  });
  
  
  
  describe('Laziness of Stream', () => {
    
    it('should not take action on map until subscribed to', () => {
      mockUtil.setState(1);
      stream1.map((data) => {
        mockUtil.setState(data);
        return data;
      });
      stream1.push(99);
      
      expect(mockUtil.getState()).to.equal(1);
      
      stream1.subscribe;
      stream1.push(99);
      expect(mockUtil.getState()).to.equal(99);
    });
    
    
    it('should not take action on tap until subscribed to', () => {
      mockUtil.setState(1);
      stream1.tap((data) => {
        mockUtil.setState(data);
      });
      stream1.push(99);
      
      expect(mockUtil.getState()).to.equal(1);
      
      stream1.subscribe;
      stream1.push(99);
      expect(mockUtil.getState()).to.equal(99);
    });
    
    
    it('should not take action on trap until subscribed to', () => {
      mockUtil.setState(1);
      stream1
        .trap(function (data) {
          mockUtil.setState(data);
          throw "Error so that tap error handler runs if this runs!";
        }, function(/*err*/) {
          mockUtil.setState(10);
          return 10;
        });
      
      stream1.push(99);
      expect(mockUtil.getState()).to.equal(1);
      
      stream1.subscribe;
      stream1.push(99);
      // State should equal 10 because that is the value set in error handler.
      expect(mockUtil.getState()).to.equal(10);
    });
    
  });
});
