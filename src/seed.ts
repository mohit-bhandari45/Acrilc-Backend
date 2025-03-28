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
            author: "67e6391805198e606304dc73",
            title: "The Rise of Tech",
            subtitle: "How technology is shaping the future",
            size: "large",
            story: "Technology is rapidly transforming our world, bringing innovative solutions...",
            links: ["https://example.com/tech"],
            hashTags: ["#Tech", "#Innovation"],
            media: [{ url: "https://example.com/image1.jpg", type: "image" }],
            forte: "Technology",
            location: "San Francisco, CA",
        }),
        new Post({
            author: "67e6391805198e606304dc73",
            title: "Healthy Living Tips",
            subtitle: "A guide to a balanced lifestyle",
            size: "medium",
            story: "Maintaining a healthy lifestyle is crucial for overall well-being...",
            links: ["https://example.com/health"],
            hashTags: ["#Health", "#Wellness"],
            media: [{ url: "https://example.com/fitness.jpg", type: "image" }],
            forte: "Health",
            location: "Los Angeles, CA",
        }),
        new Post({
            author: "67e6391805198e606304dc73",
            title: "AI in Daily Life",
            subtitle: "How artificial intelligence is improving our lives",
            size: "small",
            story: "AI is integrated into our daily tasks, from smart assistants to personalized content...",
            links: ["https://example.com/ai"],
            hashTags: ["#AI", "#Future"],
            media: [{ url: "https://example.com/ai.jpg", type: "image" }],
            forte: "Artificial Intelligence",
            location: "New York, NY",
        }),
        new Post({
            author: "67e6391805198e606304dc73",
            title: "Eco-Friendly Solutions",
            subtitle: "Going green with sustainable practices",
            size: "medium",
            story: "Sustainable living is the need of the hour for preserving our planet...",
            links: ["https://example.com/eco"],
            hashTags: ["#EcoFriendly", "#Sustainability"],
            media: [{ url: "https://example.com/eco.jpg", type: "image" }],
            forte: "Environment",
            location: "Seattle, WA",
        }),
        new Post({
            author: "67e6391805198e606304dc73",
            title: "Remote Work Guide",
            subtitle: "Maximizing productivity while working remotely",
            size: "large",
            story: "Remote work offers flexibility but requires discipline and structure...",
            links: ["https://example.com/remote"],
            hashTags: ["#RemoteWork", "#Productivity"],
            media: [{ url: "https://example.com/remote.jpg", type: "image" }],
            forte: "Work Culture",
            location: "Austin, TX",
        }),
        new Post({
            author: "67e63949e350df7d322f2dd2",
            title: "Fitness Journey",
            subtitle: "Achieving fitness goals effectively",
            size: "medium",
            story: "Starting a fitness journey can be overwhelming, but consistency is key...",
            links: ["https://example.com/fitness"],
            hashTags: ["#Fitness", "#Health"],
            media: [{ url: "https://example.com/fit.jpg", type: "image" }],
            forte: "Fitness",
            location: "Denver, CO",
        }),
        new Post({
            author: "67e63949e350df7d322f2dd2",
            title: "Cooking Masterclass",
            subtitle: "Exploring the art of cooking",
            size: "large",
            story: "Cooking is a creative skill that allows you to express yourself through flavors...",
            links: ["https://example.com/cooking"],
            hashTags: ["#Cooking", "#Foodie"],
            media: [{ url: "https://example.com/cook.jpg", type: "image" }],
            forte: "Culinary Arts",
            location: "Chicago, IL",
        }),
        new Post({
            author: "67e63949e350df7d322f2dd2",
            title: "Mindfulness Practices",
            subtitle: "Bringing calm and clarity to your day",
            size: "small",
            story: "Mindfulness is a practice that fosters awareness and focus in the present moment...",
            links: ["https://example.com/mindfulness"],
            hashTags: ["#Mindfulness", "#MentalHealth"],
            media: [{ url: "https://example.com/mindful.jpg", type: "image" }],
            forte: "Mental Health",
            location: "Miami, FL",
        }),
        new Post({
            author: "67e63949e350df7d322f2dd2",
            title: "Digital Marketing Strategies",
            subtitle: "Boost your online presence effectively",
            size: "large",
            story: "Digital marketing leverages online platforms to reach a wider audience...",
            links: ["https://example.com/marketing"],
            hashTags: ["#Marketing", "#Digital"],
            media: [{ url: "https://example.com/marketing.jpg", type: "image" }],
            forte: "Marketing",
            location: "Boston, MA",
        }),
        new Post({
            author: "67e63949e350df7d322f2dd2",
            title: "Art and Creativity",
            subtitle: "Unlocking your inner artist",
            size: "medium",
            story: "Creativity flourishes when you allow your mind to wander and experiment...",
            links: ["https://example.com/art"],
            hashTags: ["#Art", "#Creativity"],
            media: [{ url: "https://example.com/art.jpg", type: "image" }],
            forte: "Art",
            location: "Portland, OR",
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
    // await seedUsers();
    await seedPosts();
    // Disconnect gracefully
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
}

main();
