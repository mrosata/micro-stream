# MicroStream JS ![alt Travis CI test status](https://travis-ci.org/mrosata/micro-stream.svg?branch=master)
The magic of streams, in a small package. MicroStream JS is a minimal implementation of a very powerful pattern. Streams are exciting, they transform the way you work with data in your applications. Streams may be a new paradigm for you and your programs, and they do require a shift in thinking, but one I believe that you will truly enjoy. Streams allow us as developers to become very expressive, as they provide an elegant solution to pairing complexities usually found within tight event-driven logic to the reliability of more generalized utility methods.

Looking for something specific? Maybe you'd do better checking out [the API & Documentation Website for MicroStream JS][website].


Installation
----
MicroStream JS is about 10.8KB on the wire gzipped and comes wrapped in an [UMD (Universal Module Definition)][umd-git-repo], which is compatible with almost all of the widely used module formats today. MicroStream JS should integrate easily into your projects.

```sh
$ # Install Micro-Stream JS using Yarn.
$ yarn add micro-stream --save
$ # ... or install using NPM
$ npm install micro-stream --save
```

If your using Webpack, Browserify, Node or RequireJS, you should be able to import the main Stream class in the same way which you'd normally import other packages.

```javascript
// CommonJS
import {Stream} from 'micro-stream';
// Browserify/NodeJS
const Stream = require('micro-stream');
// now we have { Stream, StreamObserver, StreamReducer }

// RequireJS
define(['Streams'], function (Stream) {
  /*..  Streams.Stream
        Streams.StreamObserver
        Streams.StreamReducer ..*/
});
```

There is also the option of dropping a script tag for the file `dist/micro-stream.global.js` which will introduce a global variable Stream, though this is not a recommended practice.

```html
    <!-- This is not the recommended method of importing MicroStreamJS -->
    <script src="path/to/micro-stream/dist/micro-stream.global.js"></script>
```

&nbsp;

### Examples

##### **Example #1**: 
Let us setup a stream from all clicks on the HTML `"body"` element. Whenever there are subscribers to the stream, then it will "map" all new clicks through any mapped ops (functions). If there are no subscribers, then the ops mapped to `clickStream` are never applied. Streams are lazy that way.
  
After subscribing, optional filters can be added (The `filter` method stops unwanted values from continuing downstream. Using `filter` without an explicit op by default will stop values of type `"undefined"`).

```javascript
// First create some stream (fromEvent takes optional selector as param 2).
let clickStream = Stream.fromEvent('click')
  // Streams are lazy! So maps don't get called w/o subscribers.
  .map( (x) => x.target.dataset.someDataProp )

let stream1 = clickStream.subscribe
  // block undefined values from streaming using filter. 
  .filter()
  // curry will stop the flow of stream until all params are filled.
  .curry((a,b,c) => a * b * c)
  .subscribe
    // calls function with values and passes values on.
    .tap(alert)
    // maps values to function and passes new values on.
    .map( (n) => n + 2 )
    // same as map, but wrapped in try{}catch, Optional fallback function.
    .trap(maybeErrorInFn, fallbackMapFn)
```
##### API & Documentation
It is highly suggested that if you've come this far that  you check out [the API & Documentation Site for MicroStreamJS][website].

&nbsp;

Project Information
----
#### Contribution
Would you like to help in the development of MicroStreamJS? You can clone the repo and contribute. The MicroStreamJS project was only created this week, 11/24/2015, so at the moment I don't have any better instructions. For those wanting to help out, your should reach out to me through email, [mrosata1984@gmail.com][mailtoMike]
```sh
$ git clone https://github.com/mrosata/micro-stream.git
$ cd micro-stream
```

#### Todos
 - Finish Writing Tests and Docs.
 - Build some cool examples.


#### License
*Because we love you,*
***MicroStreamJS is licensed under MIT, copyright Michael Rosata 2016***


#### Issues, Comments, Vegetables or Stones
Have an issue? Make a PR or [post the issues here][git-issues]
[Visit the website for API info][website]


#### Thanks
Of coarse none of this would have been easy without an amazing opensource community supporting the projects used to build this project here.
  -  [Rollup package bundler][rollup]
  -  [Yarn package manager][yarn]
  -  [NPM package repository and manager][npm]
  -  [Mocha testing suite][mocha]
  -  [Chai testing utils][chai]
  -  [Istanbul test coverage][istanbul]
  -  [Dillinger.io Markdown editor repo][dill]
  



[//]: # (Links in Doc)
   [git-repo]: <https://github.com/mrosata/micro-stream>
   [git-issues]: <https://github.com/mrosata/micro-stream/issues>
   [website]: <https://mrosata.github.io/micro-stream>
   [mailtoMike]: <mailto:mrosata1984@gmail.com>
   [@onethingsimple]: <http://twitter.com/onethingsimple>
   [umd-git-repo]: <https://github.com/umdjs/umd>
   [dill]: <https://github.com/joemccann/dillinger>
   [yarn]: <https://yarnpkg.com>
   [npm]: <https://npmjs.com>
   [babel]: <https://babeljs.io/>
   [mocha]: <https://mochajs.org/>
   [chai]: <http://chaijs.com/>
   [istanbul]: <https://github.com/gotwarlost/istanbul>
   [rollup]: <http://rollupjs.org>
   
