let net = require('net');

let server = net.createServer(function(c) { //'connection' listener
  console.log('Cliente conectado.');
  c.on('end', function() {
    console.log('Cliente disconectado.');
  });
  c.on('data', function(buffer){
    if (buffer[0] === 1){
      let number = buffer.toString();
      if (Number.isNaN(number)) {
          c.write('Na opção 1 é necessário enviar um inteiro na msg', "utf-8");
      }
      else {
          c.write(number);
          console.log(number);
      }
    }
    else if (buffer[0] === 2){
      let char = buffer.toString();

      if (char.length !== 1) {
        c.write('Na opção 2 é necessário enviar apenas um caracter', 'utf-8');
      }
      else {
          var asciiNumber = char.charCodeAt();
          if (asciiNumber === char.toLowerCase().charCodeAt()) {
              c.write(char.toLowerCase, "utf-8");
          }
          else {
              c.write(char.toUpperCase, "utf-8");
          }
      }
      
    }
    else if (buffer[0] === 3){
      const sentence = buffer.toString();
      const invertedSentence = sentence.split('').reverse().join('');
      c.write(invertedSentence);
      console.log(invertedSentence);
      //c.write(data.toString().split("").reverse().join(""));
      //console.log(buffer.toString().split("").reverse().join(""));
    }
    else{
      console.log("Erro");
    }
  })
  
  c.on('error', function(err){
    console.log(err);
  })
});
server.listen(9925, function() { //'listening' listener
  console.log('Servidor online');
});