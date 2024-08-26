console.log("Hej");

const socket = new SockJS("http://localhost:8080/websocket");
const messageList = document.getElementById("messageList");

const stompClient = Stomp.over(socket);

stompClient.connect({}, (frame) => {
  console.log("connected!");

  stompClient.subscribe("/topic/greetings", (greeting) => {
    console.log("greeting", JSON.parse(greeting.body).content);

    let li = document.createElement("li");
    li.innerText = JSON.parse(greeting.body).content;
    messageList.appendChild(li);
  });

  sendHello("Love");
});
//Egentligen använder man name från en inloggningsprocedur
function sendHello(name) {
  stompClient.send("/app/hello", {}, JSON.stringify({ name: name }));
}
