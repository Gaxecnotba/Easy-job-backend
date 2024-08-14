import express from "express";
import bodyParser from "body-parser";
import { createPostForAuthenticatedUser } from "../functions/functionsP.js";
import { getUserById, createUser } from "../functions/functions.js";
import { admin } from "../db/db.js";

const router = express.Router();

router.use(bodyParser.json());

router.post("/users/create", async (req, res) => {
  const { uid, email } = req.body;
  const data = {
    uid: uid,
    username: "",
    email: email,
    name: "",
    lastname: "",
    phone: "",
    countryName: "",
    provinceName: "",
    cityName: "",
  };
  try {
    const usercreated = await createUser(data);
    if (usercreated) {
      res.json({ message: "User created successfully" });
    } else {
      res.json({ message: "User not created, something happened" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/users/:userid", async (req, res) => {
  const { authtoken } = req.headers;
  const { userid } = req.params;
  console.log(userid);
  try {
    // const authUser = await admin.auth().verifyIdToken(authtoken);

    // if (authUser.uid !== userid) {
    //   return res.status(403).json({ message: "Unauthorized access" });
    // }

    const user = await getUserById(userid);
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

// router.get("/prismadata", async (req, res) => {
//   try {
//     const data = await getData();
//     console.log(data);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/prismaregister", async (req, res) => {
//   const email = req.body.email;
//   const user = req.body.user;
//   try {
//     const response = await createUser(user, email);
//     if (response) {
//       res.json({ message: "User created successfully" });
//     } else {
//       res.json({
//         message: "User not created because already exits",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/createPost", async (req, res) => {
//   const title = req.body.title;
//   const description = req.body.description;
//   const job_location = req.body.job_location;
//   const status = req.body.status;
//   try {
//     const response = await createPost(title, description, job_location, status);
//     if (response) {
//       res.json({ message: "Post created successfully" });
//     } else {
//       res.json({ message: "Post not created, something happend" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.put("/updatePost", async (req, res) => {
//   const id = req.body.id;
//   const title = req.body.title;
//   const description = req.body.description;
//   const job_location = req.body.job_location;
//   const status = req.body.status;
//   try {
//     const response = await updatePost(
//       id,
//       title,
//       description,
//       job_location,
//       status
//     );
//     if (response) {
//       res.json({ message: "Post updated successfully" });
//     } else {
//       res.json({ message: "Post not updated, something happend" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
