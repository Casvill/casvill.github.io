// Configuración de Firebase (proporcionada por Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBo6Dnpj7w7eUUTaHPD-xflL4L0g9vG6uk",
  authDomain: "qrwall-93676.firebaseapp.com",
  databaseURL: "https://qrwall-93676-default-rtdb.firebaseio.com",
  projectId: "qrwall-93676",
  storageBucket: "qrwall-93676.appspot.com",
  messagingSenderId: "792777985358",
  appId: "1:792777985358:web:4abc443c5643f27f1aa21f",
  measurementId: "G-Z7VWNZFMWZ",
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const messagesRef = database.ref("messages");

// Escuchar eventos de envío de formularios
document.getElementById("messageForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const userMessage = document.getElementById("userMessage").value;

  // Guardar el mensaje en Firebase
  messagesRef
    .push({
      message: userMessage,
      timestamp: new Date().toISOString(),
    })
    .then(() => {
      console.log("Mensaje enviado:", userMessage);
      alert("Mensaje enviado.");
      document.getElementById("userMessage").value = ""; // Limpiar campo
    })
    .catch((error) => {
      console.error("Error al enviar el mensaje:", error);
    });
});

// Mostrar mensajes en tiempo real
messagesRef.on("value", (snapshot) => {
  const messagesList = document.getElementById("messagesList");
  messagesList.innerHTML = "<h3>Mensajes de otros usuarios:</h3>";

  const messages = snapshot.val();
  if (messages) {
    Object.values(messages).forEach((msg) => {
      messagesList.innerHTML += `
        <p><strong>${new Date(msg.timestamp).toLocaleString()}:</strong> ${msg.message}</p>
      `;
    });
  } else {
    messagesList.innerHTML += "<p>No hay mensajes todavía.</p>";
  }
});
