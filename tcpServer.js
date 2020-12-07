var net = require('net');

var server = net.createServer(function(c) { //'connection' listener
  console.log('Cliente conectado.');
  c.on('end', function() {
    console.log('Cliente disconectado.');
  });
  c.on("data", function(buffer){
    const data = buffer.toString();
    const dataList = data.split("=");
    console.log(data);
    console.log(dataList);
    console.log(dataList.length);
      const option = dataList[0];
      const msg = { data: dataList[1]}
      switch (option) {
          case '1':
              number = +msg.data;
              c.write(number + 1, "utf-8");
              break;
          case '2':
              var char = msg.data.toString();
              c.write(char.toUpperCase(), "utf-8");
              break;
          case '3':
              const sentence = msg.data.toString()
              c.write(sentence.split('').reverse().join(''),"utf-8");
              break;
          default:
              c.write("Comando inválido.", "utf-8");
              break;
      }
  
    
    
  })
  c.on("message", function(buffer,rinfo){
    const data = buffer.toString();
    const dataList = data.split("=");
    console.log(data);
    console.log(dataList);
  })
  c.on("error", function(err){
    console.log(err);
  })
});
server.listen(9925, function() { //'listening' listener
  console.log('Servidor online');
});