# MicroStream JS ![alt Travis CI test status](https://travis-ci.org/mrosata/micro-stream.svg?branch=master)

The magic of streams, in a small package. *MicroStream JS* is a minimal implementation of a very powerful pattern. Streams are exciting, they can transform the ways by which we work with and think about data in our applications. If streams are new to your programs, they could require a shift in thinking, but one that I believe you will truly enjoy. Streams allow us as developers to become very expressive, as they provide an elegant solution of pairing the complexities found within event-driven or async driven logic, with the reliability of logic typically found in small utility methods or pure functions.

Looking for more in-depth *MicroStream JS* information? Something specific in mind? Maybe you'd do better checking out [the API & Documentation Website for *MicroStream JS*][website].


&nbsp;

Installation
----
*MicroStream JS* is about ~4KB - 10KB over the wire gzipped, it comes packaged in all the popular module formats, eg: [UMD (Universal Module Definition)][umd-git-repo]. *MicroStream JS* should integrate easily into your projects using `import`, `require`, `define`, if your project supports it... we support you! 

*MicroStream JS* installs super simple with ***yarn*** or ***npm***.

```sh
$ # Install Micro-Stream JS using Yarn.
$ yarn add micro-stream

$ # Install using NPM
$ npm install micro-stream --save
```

If your using Webpack/Browserify/RequireJS, AMD or NodeJS then you should be all set to import the main Stream class in the same way which you'd import any other package.

```javascript
// CommonJS, ES2015 imports
import microStream from 'micro-stream';

// Browserify/RequireJS/NodeJS
const microStream = require('micro-stream');
// now we have { Stream, StreamObserver, StreamReducer }

// AMD
define(['microStream'], function (microStream) {/*...code..*/});
```

Now you will have access to the three Stream classes of "*MicroStream JS*". You could get away with only bringing the main `Stream` class into scope as it has access all three and will naturally transition into the proper Stream types as you need them. Additionally, you have access to the 3 class namespaces directly as well. Remember to read [the API & Documentation for MicroStreamJS][website].

```javascript
const { Stream, StreamObserver, StreamReducer } = microStream;

// Want to make a stream? Let's do it!
// First, let's make a logger, because logging is awesome! TEAM I/O!
const logger = (label) => console.log.bind(console, `${label}: `);


const stream = Stream.of(null)
  .tap(logger('your number'))
  .map(val => val * 5)
  .tap(logger('times five'));
  
stream.push(10).push(20).push(30); // Nothing... MicroStream is lazy

// So let's subscribe!
const observer = stream.subscribe;

stream.push(20); // 'your number: 5', 'times five: 100'

// Then we can access cool features like `reduce`!
observer.reduce((a, b) => a + b, 0)
  .tap(logger('add-em-up'))
  
stream.push(100).push(30).push(-20).push(10);
// Output:
'your number:  100'
'times five:  500'
'add-em-up:  500'
'your number:  30'
'times five:  150'
'add-em-up:  650'
'your number:  -20'
'times five:  -100'
'add-em-up:  550'
'your number:  10'
'times five:  50'
'add-em-up:  600'
```

&nbsp;

Examples
----
##### **Example #1**: 
Let us setup a stream from all clicks on the HTML `"body"` element. Whenever there are subscribers to the stream, then it will "map" all DOM click events through any ops mapped to the stream (*"ops" === "functions"*). If there are no subscribers, then the events passed to `clickStream` are never applied to any ops. Rembemer, streams are lazy that way.
  
After subscribing, optional filters can be added (The `filter` method stops unwanted values from continuing downstream. Using `filter` without an explicit filter op will stop `"undefined"` and `null` values by default). Below we'll collect the `event.pageX` value from each click, partially apply those values to a function that will multiply 3 numbers, if the number is over 5million, the app will throw an error and we'll fix that error using `.trap`. Take a look!  

```javascript
// Let's use the logger from above!
const logger = (label) => console.log.bind(console, `${label}: `);

function iThrowErrorAfter5mil(val) {
  if (val > 5000000) {
    throw new Error('Too BIG!');
  }
  return val;
}
function iFixErrors(err) {
  console.error(err.message);
  return 4999999;
}

/**
* Now we'll create a stream using `fromEvent` which is a helper
* for events. Your encouraged to roll your own DOM helpers though :)
*/
let clickStream = Stream.fromEvent('click')
  .path(['pageX'])
  .tap(logger('multiply'));

// Remember to subscribe or no work gets done.
clickStream.subscribe
  .filter()
  // curry will stop the flow of stream until all params are filled.
  .curry((a, b, c) => a * b * c)
  // Log out the value of the product of last 3 click `event.pageX`
  .tap(logger('And that equals: '))
  // maps values to function and passes new values on.
  .map((n) => n + 2)
  // same as map, but wrapped in try{}catch, Optional fallback function.
  .trap(iThrowErrorAfter5mil, iFixErrors)
  .tap(logger('Guaranteed Under 5 million'));
```

&nbsp;

API & Documentation
----
It is highly suggested that if you've come this far that  you check out [the API & Documentation Site for MicroStreamJS][website].

&nbsp;

Project Information
----
#### Contribution
Would you like to help in the development of MicroStreamJS? You can clone the repo and contribute. The MicroStreamJS project was created, 11/23/2015, and at the moment I don't have any better instructions for those who wish to contribute. The npm package only has the modules for production, so to contribute you will have to clone this repo (*see below*), peek at the tests that are completed so far for inspiration on what needs to be done, or reach out to me through email, [michael.rosata@gmail.com][mailtoMike]

```sh
$ git clone https://github.com/mrosata/micro-stream.git
$ cd micro-stream
$ yarn install        # or.. npm install
$ yarn build          # or.. npm run build
$ yarn test:watch 
```

#### Todos
 - Build some more cool examples (*and test those too*).
 - Most tests are written, but it would be nice to write some practical examples and test them as well.


#### License
*Because we love you,*
***MicroStreamJS is licensed under MIT, copyright Michael Rosata 2016***


#### Issues, Comments, Vegetables or Stones
Have an issue? Make a PR or [post the issues here][git-issues]
[Visit the MicroStream JS website for API info][website]


#### Thanks
Of coarse none of this would have been easy without an amazing opensource community supporting the projects used to build this project here.
  -  [Rollup package bundler][rollup]
  -  [Yarn package manager][yarn]
  -  [NPM package repository and manager][npm]
  -  [Mocha testing suite][mocha]
  -  [Chai testing utils][chai]
  -  [Istanbul test coverage][istanbul]
  -  [Babel Runtime][babel-runtime]
  -  [Dillinger.io Markdown editor repo][dill]
  



[//]: # (Links in Doc)
   [git-repo]: <https://github.com/mrosata/micro-stream>
   [git-issues]: <https://github.com/mrosata/micro-stream/issues>
   [website]: <https://mrosata.github.io/micro-stream>
   [mailtoMike]: <mailto:michael.rosata@gmail.com>
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
   [babel-runtime]: <https://babeljs.io/docs/plugins/transform-runtime/>
   
