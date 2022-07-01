const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { Contenedor }= require("./Contenedor");
const {engine} = require('express-handlebars')

const file = new Contenedor ('./productos.txt');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

const messages = [];

io.on("connection", async (socket) => {
  console.log("¡Nuevo cliente conectado!");

    try {
      await file.readFile().then(data => {
        socket.emit("data",data)
      });
    } catch (error) {
        console.log(error);
    }

    socket.on('new-product', async data => {
      const newProduct = data 
      try {
        await file.readFile().then(data => {
        newProduct.id = data.length + 1;
        data.push(newProduct);
        file.writeFile(JSON.stringify(data)); 
        io.sockets.emit('data', data);
        });
        } catch (error) {
          console.log(error);
        }
    });

    socket.emit('messages', messages);

    socket.on('new-message',data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
  });
  



const PORT = process.env.PORT || 3000;


httpServer.listen(PORT, function() {
    console.log('Servidor corriendo en puerto ' + PORT);
})

