/* import fs from 'fs'; */
const fs = require('fs');

class Contenedor{
    constructor(ruta){
        this.ruta = ruta;
    }

    async save(data){
        try{
            const dataInicial = await this.getAll().then(data2 => {
            console.log("por aca estamos " + data2)})
            const dataPush = JSON.parse(data)
            let maxId = await this.maxId();
            dataPush.id = maxId + 1; 
            dataInicial.push(dataPush);
            const dataString = JSON.stringify(dataInicial);
            console.log(`nueva tabla ${dataString}`)
            await fs.promises.writeFile(this.ruta, dataString);
        }catch(err){
            throw new Error(`la accion no pudo ser realizada ${err.message} `)
        }
    }

    async getAll(){
        try {
            const res = fs.promises.readFile(this.ruta, (err, data) => {
                if (err) throw err;
                /* return Buffer.from(data); */
                return data
            });
            
        } catch (error) {
            console.log(error);
        }
    }

   async getById(id){
        try {
            const data = await this.getAll();
            const dataFiltrada = data.filter(item => item.id == id);
            console.log(`para el id ${id} se encontro ${JSON.stringify(dataFiltrada[0])}`);
            return dataFiltrada[0];
        } catch (error) {
            console.log(error);
        }
    }

    async readFile() {
       
        return new Promise((resolve, reject) => {
            
          fs.readFile(this.ruta, 'utf8', function (err, data) {
            if (err) {
              reject(err);
            }
            resolve (JSON.parse(data));
            return JSON.parse(data)
          });
        });
      }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.ruta, "[]");
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){   
        try {
            const data = await this.getAll();
            const dataFiltrada = data.filter(item => item.id != id);
            const dataString = JSON.stringify(dataFiltrada);
            console.log(`el id ${id} se elimino la nueva tabla quedo de la siguiente manera ${dataString}`);
            await fs.promises.writeFile(this.ruta, dataString);
        } catch (error) {
            console.log(error);
        }
    }

   async maxId(){
        try {
            const res = await this.getAll();
            const maxId = res.reduce((max, item) => item.id > max ? item.id : max, 0);
            return maxId;
        } catch (error) {
            console.log(error);
        }
    }

    async writeFile(data){
        try {
            await fs.promises.writeFile(this.ruta, data);
        } catch (error) {
            console.log(error);
        }
    }
    
}




class Producto{
        constructor(id, precio, title,thumbnailUrl, reviews,star, Categoria, description, stock){
        this.id = id;
        this.precio = precio;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.reviews = reviews;
        this.star = star;
        this.Categoria = Categoria;
        this.description = description;
        this.stock = stock;
    }
}

module.exports = {Contenedor}
/* export {Contenedor} */

/* const Id = null

const fileOne = new Contenedor("./productos.txt")
const nuevoProducto = new Producto( Id , 500,  "Pizza", "https://www.google.com", 10, 2, "Pizzas", "Pizza de queso", "10");

/* fileOne.save(JSON.stringify(nuevoProducto)) */
/* fileOne.getAll()  */
/* fileOne.getById(9) */
/* fileOne.deleteById(9) */
/* fileOne.deleteAll() */

/* const Ejercicios = async () => {
    try {
        await fileOne.save(JSON.stringify(nuevoProducto));
        await console.log( fileOne.getAll()) ;
        await fileOne.getById(9);
        await fileOne.deleteById(9);
        await fileOne.deleteAll();

    } catch (error) {
        console.log(error);
    }
}  */

 const Ejercicios = async () => {
    try {
       
        await fileOne.readFile();
    } catch (error) {
        console.log(error);
    }
}  

const nuevoProducto = new Producto( 23 , 500,  "Pizza", "https://www.google.com", 10, 2, "Pizzas", "Pizza de queso", "10");
const fileOne = new Contenedor("./productos.txt")
console.log(Ejercicios())


