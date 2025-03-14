import mongoose from "mongoose";
import Post from "./models/post.js";

const samplePosts = [
    {
        text: "Exploring the beauty of nature!",
        media: [{ url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", type: "image" }],
        hashTags: ["#nature", "#exploration"],
        author: "67d2ba47ecfef54fd5e20b39",
    },
    {
        text: "Coding journey begins.",
        media: [{ url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f", type: "image" }],
        hashTags: ["#coding", "#programming"],
        author: "67d2ba47ecfef54fd5e20b39",
    },
    {
        text: "New audio track released!",
        media: [{ url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc", type: "image" }],
        hashTags: ["#music", "#newtrack"],
        author: "67d2ba47ecfef54fd5e20b39",
    },
    {
        text: "Stunning sunset views.",
        media: [{ url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368", type: "image" }],
        hashTags: ["#sunset", "#photography"],
        author: "67d2ba47ecfef54fd5e20b39",
    },
    {
        text: "GIF that made my day!",
        media: [{ url: "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif", type: "gif" }],
        hashTags: ["#fun", "#happy"],
        author: "67d2ba47ecfef54fd5e20b39",
    },
    {
        text: "Favorite recipe for dinner.",
        media: [{ url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", type: "image" }],
        hashTags: ["#food", "#recipe"],
        author: "67d2ba47ecfef54fd5e20b39",
    },
    {
        text: "Check out this incredible art piece!",
        media: [{ url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", type: "image" }],
        hashTags: ["#art", "#design"],
        author: "67d2ba47ecfef54fd5e20b39",
    },
    {
        text: "Workout routine for the week.",
        media: [{ url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f707", type: "image" }],
        hashTags: ["#fitness", "#health"],
        author: "67d2ba47ecfef54fd5e20b39",
    },
    {
        text: "Podcast episode dropped!",
        media: [{ url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f", type: "image" }],
        hashTags: ["#podcast", "#learning"],
        author: "67d2ba47ecfef54fd5e20b39",
    },
    {
        text: "A glimpse of the tech conference.",
        media: [{ url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc", type: "image" }],
        hashTags: ["#tech", "#conference"],
        author: "67d2ba47ecfef54fd5e20b39",
    },
];

mongoose
    .connect(process.env.MONGO_URI!)
    .then(async () => {
        await Post.insertMany(samplePosts);
        console.log("Sample posts added successfully");
        mongoose.disconnect();
    })
    .catch((error) => console.error("Error seeding data:", error));
