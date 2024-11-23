// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Configuración de Firebase
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Autenticación anónima
const auth = getAuth(app);
signInAnonymously(auth)
  .then(() => {
    console.log("Usuario autenticado anónimamente");
  })
  .catch((error) => {
    console.error("Error en la autenticación:", error);
  });

// Referencia a la base de datos
const messagesRef = ref(database, "messages");

// Enviar un mensaje
document.getElementById("messageForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const userMessage = document.getElementById("userMessage").value;

  push(messagesRef, {
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
onValue(messagesRef, (snapshot) => {
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
