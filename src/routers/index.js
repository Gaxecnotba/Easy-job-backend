import express from "express";
import bodyParser from "body-parser";
import { createPostForAuthenticatedUser } from "../functions/functionsP.js";
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
  const { postData } = req.body;

  try {
    await createPostForAuthenticatedUser(postData);
    res.status(200).send("Post created successfully!");
  } catch (error) {
    res.status(500).send("Error creating post: " + error.message);
  }
});

export default router;
