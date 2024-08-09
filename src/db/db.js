import admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://easyjobs-812ee-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
const auth = admin.auth();
export { db, admin, auth };
