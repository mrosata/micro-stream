/*global describe, it*/
import { inspect, Stream } from '../';
import { equal } from 'assert';


// ATM this just a test to test that tests work, (they don't actually test anything)
describe('Stream class', () => {
  it('should be a class', () => {
    equal('function', typeof Stream, 'Stream is a function');
  });
  
  it('should be inspectable', () => {
    const stream = new Stream(x => x + 10);
    equal('function', typeof inspect(stream), 'Stream is inspectable');
  });
});