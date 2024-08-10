import { db, admin, auth } from "../db/db.js";
// import { getAuth } from "firebase-admin/auth";

async function createPostJob(userId, data) {
  if (!userId) {
    throw new Error("User ID is required to create a post.");
  }

  const postJobRef = db.collection("postjobs").doc();
  await postJobRef.set({
    title: data.title,
    description: data.description,
    job_location: data.job_location,
    status: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    userId: userId, // Asignar el userId al post
  });
}

async function createPostForAuthenticatedUser(data, idToken) {
  try {
    console.log("recieved toekn:" + idToken);
    const decodedToken = await auth.verifyIdToken(idToken); // Verificar el token de identificación del usuario
    const userId = decodedToken.uid; // Obtener el userId del token

    await createPostJob(userId, data); // Crear el post pasando el userId y los datos del post
    console.log("Post created successfully!");
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
// const data = {
//   title: "Post Title",
//   description: "Post Description",
//   job_location: "Location",
// };
// createPostJob("userId", data);

export { createPostForAuthenticatedUser };
