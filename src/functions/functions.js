// import prisma from "../db/db.js";

// export const getData = async () => {
//   try {
//     const data = await prisma.user.findMany();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const createUser = async (user, email) => {
//   try {
//     const data = await prisma.user.create({
//       data: {
//         user,
//         email,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebase } from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3ateZboUdEuutAxIu_qA3ualnRC0HWlU",
  authDomain: "easyjobs-812ee.firebaseapp.com",
  databaseURL: "https://easyjobs-812ee-default-rtdb.firebaseio.com",
  projectId: "easyjobs-812ee",
  storageBucket: "easyjobs-812ee.appspot.com",
  messagingSenderId: "292372363334",
  appId: "1:292372363334:web:927ccae2a1c2090446f247",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
