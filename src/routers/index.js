import express from "express";
import bodyParser from "body-parser";
import {
  createPostForAuthenticatedUser,
  createPostJob,
  getAllJobs,
  getJobsById,
} from "../functions/functionsP.js";
import { getUserById, createUser } from "../functions/functions.js";
import { admin } from "../db/db.js";

const router = express.Router();

router.use(bodyParser.json());

router.post("/users/create", async (req, res) => {
  const {
    uid,
    email,
    username,
    name,
    lastName,
    phone,
    countryName,
    provinceName,
    cityName,
  } = req.body;
  const data = {
    uid: uid,
    username: username,
    email: email,
    name: name,
    lastName: lastName,
    phone: phone,
    countryName: countryName,
    provinceName: provinceName,
    cityName: cityName,
  };
  console.log(data);
  try {
    const usercreated = await createUser(data);
    if (usercreated) {
      res.json({ message: "User created successfully" });
    } else {
      res.json({ message: "User not created, something happened" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/users/:uid", async (req, res) => {
  const { authtoken } = req.headers;
  const { uid } = req.params;
  console.log(uid);
  try {
    // const authUser = await admin.auth().verifyIdToken(authtoken);

    // if (authUser.uid !== uid) {
    //   return res.status(403).json({ message: "Unauthorized access" });
    // }

    const user = await getUserById(uid);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error verifying token or fetching user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.post("/createpost", async (req, res) => {
  // const { uid } = req.headers;
  const { uid, title, description, location } = req.body;
  const postData = {
    uid: uid,
    title: title,
    description: description,
    job_location: location,
  };

  try {
    await createPostJob(postData);
    res.status(200).send("Post created successfully!");
  } catch (error) {
    res.status(500).send("Error creating post: " + error.message);
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await getAllJobs();
    if (jobs) {
      res.json({ jobs });
    } else {
      res.status(404).json({ message: "No jobs found" });
    }
  } catch (error) {
    console.error("Error getting jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/jobs/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const job = await getJobsById(title);
    if (job) {
      res.json({ job });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error("Error getting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
