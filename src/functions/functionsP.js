import prisma from "../db/db.js";

async function getPosts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (error) {
    console.error(error);
  }
}

async function createPost(title, description, job_location, status) {
  try {
    const post = await prisma.post.create({
      data: {
        title,
        description,
        job_location,
        status,
      },
    });
    return post;
  } catch (error) {
    console.error(error);
  }
}

async function updatePost(id, title, description, job_location, status) {
  try {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        job_location,
        status,
      },
    });
    return post;
  } catch (error) {
    console.error(error);
  }
}

export { getPosts, createPost, updatePost };
