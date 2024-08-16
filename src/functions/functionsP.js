import { db, admin, auth } from "../db/db.js";
// import { getAuth } from "firebase-admin/auth";

async function createPostJob(data) {
  // if (!userId) {
  //   throw new Error("User ID is required to create a post.");
  // }

  const postJobRef = db.collection("postjobs").doc();
  await postJobRef.set({
    title: data.title,
    description: data.description,
    job_location: data.job_location,
    status: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    uid: data.uid, // Asignar el userId al post
  });
}

async function getAllJobs() {
  const jobs = [];
  try {
    const snapshot = await db.collection("postjobs").get();
    console.log("Document data:", snapshot);
    if (!snapshot) {
      console.log("No Jobs found");
    } else {
      snapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      return jobs;
    }
  } catch (error) {
    console.error("Error getting jobs:", error);
  }
}
async function getJobsById(title) {
  try {
    const snapshot = await db
      .collection("postjobs")
      .where("title", "==", title)
      .get();
    console.log("Document data:", snapshot);
    console.log("Document data:", title);
    if (!snapshot) {
      console.log("No such document: ", title);
    } else {
      const dataJob = [];
      snapshot.forEach((doc) => {
        dataJob.push(doc.data());
      });
      return dataJob;
    }
  } catch (error) {
    console.error("Error getting jobs:", error);
  }
}

async function createPostForAuthenticatedUser(data) {
  try {
    // console.log("recieved toekn:" + idToken);
    // const decodedToken = await auth.verifyIdToken(idToken);
    // const userId = decodedToken.uid; // Obtener el userId del token

    await createPostJob(data); // Crear el post pasando el userId y los datos del post
    console.log("Post created successfully!");
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

export {
  createPostForAuthenticatedUser,
  createPostJob,
  getAllJobs,
  getJobsById,
};
