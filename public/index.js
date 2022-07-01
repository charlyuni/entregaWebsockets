const socket = io();
const date = new Date().toLocaleString();

const input = document.querySelector("input");
document.getElementById("buttonProduc").addEventListener("click", () => {

  const newProduct = {
    title: document.getElementById('title').value,
    star: document.getElementById('star').value,
    precio: document.getElementById('precio').value,
};
document.getElementById('title').value = '';
document.getElementById('star').value = '';
document.getElementById('precio').value = null;
socket.emit('new-product', newProduct);
return false;
});

socket.on("data", (data) => {

  const productosInput = data
    .map(
      (data) =>{
        return `       
          <tr>
            <td>${data.title}</td>
            <td>${data.precio}</td>
            <td>${data.thumbnailUrl}</td>
            <td>${data.star}</td>
            <td>${data.reviews}</td>
          </tr>`

      
  
      }
    ).join("");
  document.querySelector("#productos").innerHTML = productosInput;
});


function render(data) {
  const html = data.map((elem, index) => {
      return(`<div>
          <strong>${elem.email}</strong> <strong>${elem.date}</strong>:
          <em>${elem.text}</em> </div>`)
  }).join(" ");
  document.getElementById('chat').innerHTML = html;
}


socket.on('messages', function(data) { render(data); });

function addMessage(e) {
  console.log(e);
  const mensaje = {
      email: document.getElementById('email').value,
      date: date,
      text: document.getElementById('texto').value
  };
  console.log(mensaje);
  socket.emit('new-message', mensaje);
  return false;
}