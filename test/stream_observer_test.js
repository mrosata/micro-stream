/*global describe, it, before, beforeEach, after, afterEach */
import { Stream, StreamObserver } from '../';
import { expect } from 'chai';
import { MockStreamUtil } from './mock-stream-util';


/**
 * StreamObserver tests - make sure that an observer is created from
 * subscribing to a stream. Make sure it can map, tap, trap, and also
 * that it can use reduce and filter. Ensure that data is properly
 * changed as it moves through the stream and that observers may be
 * cancelled.
 */
describe('StreamObserver tests', function () {
  
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
  
  it('should be created implicitly through Stream subscription', () => {
    stream1 = Stream.of();
    
    expect(stream1).to.be.an.object;
    expect(stream1.constructor).to.deep.equal(Stream);
    
    const observer = stream1.subscribe;
    expect(observer).to.be.an.object;
    expect(observer.constructor).to.deep.equal(StreamObserver)
    
  });
  
  it('should be able to map ops over values passed from stream', () => {
    stream1 = Stream.of();
    mockUtil = new MockStreamUtil();
    
    stream1.subscribe.map((data) => {
      mockUtil.setState(data);
    });
    
    stream1.push('changed in map');
    expect(mockUtil.getState()).to.equal('changed in map');
    
  });
  
});
