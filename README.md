### Micro Streams (beta)

The magic of streams, in a small package. Micro streams is a minimal implementation of some very powerful streams. The streams are designed to work in very specific, predictable ways, which allows for you to easily hook a stream up to any part of your program (including other streams!)

##### Install
```bash
  npm i micro-streams --save
  # or...
  yarn add micro-streams --save
```

##### Examples

**Example #1**: 
  This sets up a stream from all clicks on `'body'`, if there are any subscribers then it maps through the main streams attached functions, added using the `map` method. If no subscribers then the functions mapped to main stream are never ran.
  
  After subscribing, optional filters can be added (same as map but use `filter`, filter without explicit function just stops for `undefined`).

```javascript
// First create some stream (fromEvent takes optional selector as param 2).
let clickStream = Stream.fromEvent('click')
  // Streams are lazy! So maps don't get called w/o subscribers.
  .map(x => x.target.dataset.someDataProp)

let stream1 = clickStream.subscribe
  // stop values from streaming with default or custom filters.
  .filter()
  // curry will stop the flow of stream until all params are filled.
  .curry((a,b,c) => a * b * c)
  .subscribe
    // calls function with values and passes values on.
    .tap(alert)
    // maps values to function and passes new values on.
    .map(x => x + 2)
    // same as map, but wrapped in try{}catch, Optional fallback function.
    .trap(maybeErrorInFn, fallbackMapFn)
```

&nbsp;

------
> Comments, Suggestions, Talky-talks?
  - email Michael Rosata [mrosata1984@gmail.com](mrosata1984@gmail.com)

> Troubles, Issues, Uh-ohs and Boom-booms?
  - [Issues Page](https://github.com/mrosata/micro-streams/issues)
  
> Thanks and Appreciation
 - [RollupJs](http://rollupjs.org/)
 - [BabelJs](https://babeljs.io/)
 - [Mocha Testing Framework](https://mochajs.org/)
 - [Chai Testing Library](http://chaijs.com/)
 - [Istanbul Code Coverage](https://github.com/gotwarlost/istanbul)
 - [NPM](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com/) package management.
# micro-streams
