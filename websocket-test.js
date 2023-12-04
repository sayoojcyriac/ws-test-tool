document.getElementById("connect-btn").addEventListener("click", function () {
  const url = document.getElementById("ws-url").value;
  connectWebSocket(url);
});

document
  .getElementById("disconnect-btn")
  .addEventListener("click", function () {
    if (window.websocket) {
      window.websocket.close();
    }
  });

function connectWebSocket(url) {
  if (window.websocket) {
    window.websocket.close();
  }

  window.websocket = new WebSocket(url);

  window.websocket.onopen = function (event) {
    logMessage("Connected to: " + url);
    document.getElementById("disconnect-btn").disabled = false;
  };

  window.websocket.onmessage = function (event) {
    logMessage("Message: " + event.data);
  };

  window.websocket.onclose = function (event) {
    logMessage("Disconnected.");
    document.getElementById("disconnect-btn").disabled = true;
  };

  window.websocket.onerror = function (error) {
    logMessage("Error: " + error);
  };
}

function logMessage(message) {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += message + "<br>";
}
