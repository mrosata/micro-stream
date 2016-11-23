requirejs(["helpers", "micro-stream"], function(_, Stream) {
  
  const eventStream = Stream.fromEvent('click');
  
  eventStream.subscribe
    .map(
      _.path(['target', 'dataset', 'apiDoc']))
    .map(
      console.log.bind(console));
});