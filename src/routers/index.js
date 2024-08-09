import express from "express";
import bodyParser from "body-parser";
import { createPostForAuthenticatedUser } from "../functions/functionsP.js";

const router = express.Router();

router.use(bodyParser.json());

router.post("/createpost", (req, res) => {
  res.status(200).json({ message: "Create post route is working!" });
});

router.get("/fetchingrouter", (req, res) => {
  res.status(200).json({ message: "Create post route is working!" });
});
// router.post("/createpost", async (req, res) => {
//   console.log("POST /createpost called"); // Add this line for debugging
//   const { idToken, postData } = req.body;

//   try {
//     await createPostForAuthenticatedUser(postData, idToken);
//     res.status(200).send("Post created successfully!");
//   } catch (error) {
//     res.status(500).send("Error creating post: " + error.message);
//   }
// });

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
