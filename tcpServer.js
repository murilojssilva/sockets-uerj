var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.on("data", function(data){
    c.write(data);
  })
  c.on("error", function(err){
    console.log(err);
  })
});
server.listen(6000, function() { //'listening' listener
  console.log('server bound');
});
