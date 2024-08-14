import { db, admin } from "../db/db.js";

async function createUser(data) {
  const userRef = db.collection("users").doc();
  await userRef.set({
    uid: data.uid,
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

async function getUserById(uid) {
  try {
    console.log(`Fetching user with ID: ${uid}`);
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      console.error(`User with ID ${uid} not found`);
      return null;
    } else {
      console.log(`User with ID ${uid} found`);
      return doc.data();
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
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
