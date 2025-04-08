// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
// Optional: If you want to use Analytics, include it as well
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3jS7ffCtQFleLlwHCzuJ2t9gW3bTR_7g",
  authDomain: "leave-a-tip.firebaseapp.com",
  projectId: "leave-a-tip",
  storageBucket: "leave-a-tip.firebasestorage.app",
  messagingSenderId: "1038215457972",
  appId: "1:1038215457972:web:a7ae00de2e25654b80fbe1",
  measurementId: "G-TZD3HEC0KT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Analytics (if you need Analytics)
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export the Firestore database instance and serverTimestamp so you can use it in your app
export { db, serverTimestamp };
