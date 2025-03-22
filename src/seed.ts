import mongoose from "mongoose";
import User from "./models/user.js";
import dotenv from "dotenv";
import Post from "./models/post.js";
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connection Successful");
    } catch (err) {
        console.error("Connection Error:", err);
        throw err; // Re-throw to handle it in the caller
    }
};

const seedUsers = async () => {
    const users = [
        new User({
            username: "john_doe",
            fullName: "John Doe",
            email: "john@example.com",
            password: "password123",
            profilePicture: "https://example.com/john.jpg",
            bio: "Love crafting!",
            story: "Started my journey in 2020",
            socialLinks: { twitter: "https://twitter.com/johndoe" },
            followers: [],
            following: [],
            role: "user",
            preferences: ["Woolen Craft", "Poetry"],
        }),
        new User({
            username: "admin_user",
            fullName: "Admin User",
            email: "admin@example.com",
            password: "adminpass",
            profilePicture: "https://example.com/admin.jpg",
            bio: "Admin of the platform",
            story: "Managing the platform since 2018",
            socialLinks: { linkedin: "https://linkedin.com/in/adminuser" },
            followers: [],
            following: [],
            role: "admin",
            preferences: ["Exclusive"],
        }),
        new User({
            username: "jane_smith",
            fullName: "Jane Smith",
            email: "jane@example.com",
            password: "password456",
            profilePicture: "https://example.com/jane.jpg",
            bio: "Avid poet and writer",
            story: "Writing since childhood",
            socialLinks: { instagram: "https://instagram.com/janesmith" },
            followers: [],
            following: [],
            role: "user",
            preferences: ["Poetry"],
        }),
        new User({
            username: "mark_taylor",
            fullName: "Mark Taylor",
            email: "mark@example.com",
            password: "password789",
            profilePicture: "https://example.com/mark.jpg",
            bio: "Tech enthusiast",
            story: "Building innovative projects",
            socialLinks: { github: "https://github.com/marktaylor" },
            followers: [],
            following: [],
            role: "user",
            preferences: ["Exclusive", "Woolen Craft"],
        }),
        new User({
            username: "lisa_white",
            fullName: "Lisa White",
            email: "lisa@example.com",
            password: "password321",
            profilePicture: "https://example.com/lisa.jpg",
            bio: "Love for designing",
            story: "Crafting unique designs since 2015",
            socialLinks: { behance: "https://behance.net/lisawhite" },
            followers: [],
            following: [],
            role: "user",
            preferences: ["Woolen Craft"],
        }),
    ];

    try {
        // Clear existing users
        await User.deleteMany({});
        console.log("Existing users deleted");

        // Save all users
        await Promise.all(users.map((user) => user.save()));
        console.log("Users added successfully");
    } catch (error) {
        console.error("Error seeding users:", error);
    }
};

const seedPosts = async () => {
    const posts = [
        new Post({
            title: "Exploring the Mountains",
            text: "An amazing journey through the Rockies with breathtaking views.",
            media: [{ url: "https://example.com/mountain.jpg", type: "image" }],
            size: "large",
            links: ["https://example.com/travel-blog"],
            hashTags: ["#travel", "#mountains", "#nature"],
            mentions: ["67db01a8dcad7b328eb0099d"],
            author: "67db01a8dcad7b328eb0099d",
        }),
        new Post({
            title: "Tech Innovations 2024",
            text: "Exploring the latest advancements in AI and machine learning.",
            media: [{ url: "https://example.com/ai.png", type: "image" }],
            size: "medium",
            links: ["https://example.com/tech-news"],
            hashTags: ["#AI", "#ML", "#TechTrends"],
            mentions: ["67db01a8dcad7b328eb0099f"],
            author: "67db01a8dcad7b328eb0099f",
        }),
        new Post({
            title: "Gaming World",
            text: "Latest updates on the gaming industry, featuring new releases and updates.",
            media: [{ url: "https://example.com/gameplay.mp4", type: "video", duration: 120 }],
            size: "large",
            links: ["https://example.com/games"],
            hashTags: ["#Gaming", "#E3", "#NewReleases"],
            mentions: ["67db01a8dcad7b328eb0099e"],
            author: "67db01a8dcad7b328eb0099e",
        }),
        new Post({
            title: "Healthy Lifestyle Tips",
            text: "5 easy habits to improve your daily routine and mental well-being.",
            media: [{ url: "https://example.com/health.jpg", type: "image" }],
            size: "small",
            links: ["https://example.com/health-blog"],
            hashTags: ["#HealthyLiving", "#Wellness", "#Mindset"],
            mentions: ["67db01a8dcad7b328eb0099b"],
            author: "67db01a8dcad7b328eb0099b",
        }),
        new Post({
            title: "Delicious Recipes",
            text: "Try this new pasta recipe that’s easy to make at home!",
            media: [{ url: "https://example.com/pasta.jpg", type: "image" }],
            size: "medium",
            links: ["https://example.com/recipe"],
            hashTags: ["#Foodie", "#Recipes", "#Pasta"],
            mentions: ["67db01a8dcad7b328eb0099c"],
            author: "67db01a8dcad7b328eb0099c",
        }),
        new Post({
            title: "Fitness Motivation",
            text: "Daily workout routines for strength and endurance.",
            media: [{ url: "https://example.com/fitness.jpg", type: "image" }],
            size: "large",
            links: ["https://example.com/fitness-blog"],
            hashTags: ["#Fitness", "#Workout", "#Health"],
            mentions: ["67db01a8dcad7b328eb0099d"],
            author: "67db01a8dcad7b328eb0099d",
        }),
        new Post({
            title: "Coding Tips",
            text: "Improve your coding skills with these useful tips and tricks.",
            media: [{ url: "https://example.com/coding.jpg", type: "image" }],
            size: "medium",
            links: ["https://example.com/coding-tips"],
            hashTags: ["#Coding", "#JavaScript", "#Programming"],
            mentions: ["67db01a8dcad7b328eb0099f"],
            author: "67db01a8dcad7b328eb0099f",
        }),
        new Post({
            title: "Music Festival 2024",
            text: "Get ready for the biggest music festival of the year!",
            media: [{ url: "https://example.com/music.jpg", type: "image" }],
            size: "large",
            links: ["https://example.com/music-festival"],
            hashTags: ["#Music", "#Festival", "#Live"],
            mentions: ["67db01a8dcad7b328eb0099e"],
            author: "67db01a8dcad7b328eb0099e",
        }),
        new Post({
            title: "Art Exhibition",
            text: "Explore amazing artworks from talented artists.",
            media: [{ url: "https://example.com/art.jpg", type: "image" }],
            size: "medium",
            links: ["https://example.com/art-exhibition"],
            hashTags: ["#Art", "#Creativity", "#Inspiration"],
            mentions: ["67db01a8dcad7b328eb0099b"],
            author: "67db01a8dcad7b328eb0099b",
        }),
        new Post({
            title: "Travel Adventure",
            text: "Discover hidden gems and breathtaking destinations around the world.",
            media: [{ url: "https://example.com/travel.jpg", type: "image" }],
            size: "large",
            links: ["https://example.com/travel-guide"],
            hashTags: ["#Travel", "#Adventure", "#Wanderlust"],
            mentions: ["67db01a8dcad7b328eb0099c"],
            author: "67db01a8dcad7b328eb0099c",
        }),
    ];

    try {
        await Post.deleteMany(); // Clear existing data to avoid duplicates
        await Promise.all(posts.map((post) => post.save()));
        console.log("Posts seeded successfully");
    } catch (error) {
        console.error("Error seeding posts:", error);
    }
};

async function main() {
    // Wait for the database connection
    await connectDB();
    await seedUsers();
    await seedPosts();
    // Disconnect gracefully
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
}

main();
