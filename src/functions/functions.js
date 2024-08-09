import { db, admin } from "../db/db.js";

async function createUser(data) {
  const userRef = db.collection("users").doc();
  await userRef.set({
    username: data.username,
    email: data.email,
    name: data.name,
    lastname: data.lastname,
    phone: data.phone,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    countryName: data.countryName,
    provinceName: data.provinceName,
    cityName: data.cityName,
  });
}

async function getUserById(userId) {
  const userRef = db.collection("users").doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log("No such document!");
    return null;
  } else {
    return doc.data();
  }
}

export { createUser, getUserById };
// const newUser = {
//   username: "johndoe",
//   email: "johndoe@example.com",
//   password: "password123",
//   name: "John",
//   lastname: "Doe",
//   phone: 1234567890,
//   countryName: "CountryName",
//   provinceName: "ProvinceName",
//   cityName: "CityName",
// };

// createUser(newUser);
