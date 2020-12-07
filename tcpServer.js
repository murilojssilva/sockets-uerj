let net = require('net');

const server = net.createServer(socket => {
  console.log('Cliente conectado.');
  socket.on('end', function() {
    console.log('Cliente disconectado.');
  });
  socket.on('data', function(buffer){
    if (buffer[0] === 1){
      let number = buffer.toString();
      if (Number.isNaN(number)) {
          socket.write('Na opção 1 é necessário enviar um inteiro na msg', "utf-8");
      }
      else {
          socket.write(number);
          console.log(number);
      }
    }
    else if (buffer[0] === 2){
      let char = buffer.toString();

      if (char.length !== 1) {
        socket.write('Na opção 2 é necessário enviar apenas um caracter', 'utf-8');
      }
      else {
          var asciiNumber = char.charCodeAt();
          if (asciiNumber === char.toLowerCase().charCodeAt()) {
              socket.write(char.toLowerCase, "utf-8");
          }
          else {
              socket.write(char.toUpperCase, "utf-8");
          }
      }
      
    }
    else if (buffer[0] === 3){
      let sentence = buffer.toString();
      let inverted = sentence.split("").reduce((rev, char)=> char + rev, ''); 
      socket.write(inverted, "utf-8");
      //socket.write(inverted);
    }
    else{
      console.log("Erro");
    }
  })
  
  socket.on('error', function(err){
    console.log(err);
  })
});
server.listen(9925, function() { //'listening' listener
  console.log('Servidor online');
});