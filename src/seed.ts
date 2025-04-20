import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";
import Post from "./models/post.js";
dotenv.config();
import bcrypt from "bcrypt";

async function connectDB() {
    mongoose
        .connect(process.env.MONGO_URI!)
        .then(() => console.log("Connected Successfully"))
        .catch((err) => console.log(err));
}

async function seedUsers() {
    const userData = [
        {
            username: "john_doe",
            fullName: "John Doe",
            email: "john@example.com",
            password: "password123",
            profilePicture: "https://example.com/john.jpg",
            bio: "Love crafting!",
            story: "Started my journey in 2020",
            socialLinks: { twitter: "https://twitter.com/johndoe" },
            role: "user",
            preferences: ["Woolen Craft", "Poetry"],
        },
        {
            username: "admin_user",
            fullName: "Admin User",
            email: "admin@example.com",
            password: "adminpass",
            profilePicture: "https://example.com/admin.jpg",
            bio: "Admin of the platform",
            story: "Managing the platform since 2018",
            socialLinks: { linkedin: "https://linkedin.com/in/adminuser" },
            role: "admin",
            preferences: ["Exclusive"],
        },
        {
            username: "jane_smith",
            fullName: "Jane Smith",
            email: "jane@example.com",
            password: "password456",
            profilePicture: "https://example.com/jane.jpg",
            bio: "Avid poet and writer",
            story: "Writing since childhood",
            socialLinks: { instagram: "https://instagram.com/janesmith" },
            role: "user",
            preferences: ["Poetry"],
        },
        {
            username: "mark_taylor",
            fullName: "Mark Taylor",
            email: "mark@example.com",
            password: "password789",
            profilePicture: "https://example.com/mark.jpg",
            bio: "Tech enthusiast",
            story: "Building innovative projects",
            socialLinks: { github: "https://github.com/marktaylor" },
            role: "user",
            preferences: ["Exclusive", "Woolen Craft"],
        },
        {
            username: "lisa_white",
            fullName: "Lisa White",
            email: "lisa@example.com",
            password: "password321",
            profilePicture: "https://example.com/lisa.jpg",
            bio: "Love for designing",
            story: "Crafting unique designs since 2015",
            socialLinks: { behance: "https://behance.net/lisawhite" },
            role: "user",
            preferences: ["Woolen Craft"],
        },
    ];

    try {
        await User.deleteMany();
        const usersWithHashedPasswords = await Promise.all(
            userData.map(async (user) => ({
                ...user,
                password: user.password ? await bcrypt.hash(user.password, 10) : undefined,
            }))
        );
        const users = await User.insertMany(usersWithHashedPasswords);
        console.log("Inserted Users");
        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const images = [
    "https://i.ibb.co/DDR018pj/unsplash-00-Sz-LJ6y-QOk.png",
    "https://i.ibb.co/MymDhhMc/unsplash-s-Sv-Yv-QIqu-N8.png",
    "https://i.ibb.co/p6r9CNRL/unsplash-BLvyqm-Em0-PA.png",
    "https://i.ibb.co/LB7vLpc/Group-1000006017.png",
    "https://i.ibb.co/r2j9yFdP/Group-1000006019.png",
    "https://i.ibb.co/9H4FHk1F/Group-1000006018.png",
    "https://i.ibb.co/BVPCFLkF/Group-1000006022.png",
    "https://i.ibb.co/WW3W0qJ8/Group-1000006021.png",
];

async function seedPosts(users: any) {
    if (!users || users.length === 0) {
        console.log("No Users");
        return;
    }

    users = users.map((user: any) => user._id);

    const postTemplates = [
        "Exploring the Future of AI",
        "Sustainable Living Tips",
        "Mastering Digital Marketing",
        "The Rise of Electric Vehicles",
        "Mindfulness and Productivity Hacks",
        "Building Scalable Web Apps",
        "The Evolution of Remote Work",
        "Best Practices in Cybersecurity",
        "How to Stay Motivated in Learning",
        "The Power of Networking in Tech",
        "Social Media Trends in 2025",
        "Effective Time Management Strategies",
        "Mental Health in the Digital Age",
        "How to Start a Successful Blog",
        "The Role of Blockchain in Finance",
        "Developing a Personal Brand",
        "The Impact of Climate Change",
        "Cryptocurrency: The Next Big Thing?",
        "The Future of Space Exploration",
        "Mastering the Art of Public Speaking",
        "A Guide to Healthy Eating Habits",
        "The Science Behind Sleep Patterns",
        "Understanding Consumer Psychology",
        "The Rise of No-Code Development",
        "The Role of AI in Healthcare",
        "Unlocking Creativity in Writing",
        "Exploring the Metaverse",
        "The Art of Minimalist Living",
        "How to Grow Your YouTube Channel",
        "The Future of Gaming Technology",
    ];

    const forteTags = ["AI", "Technology", "Marketing", "Environment", "Productivity", "Finance", "Creativity", "Gaming", "Health", "Cybersecurity"];

    const locations = ["New York", "Los Angeles", "San Francisco", "Seattle", "Miami", "Austin", "Boston", "Denver", "Chicago", "Portland"];

    function getRandomUsers(count: number) {
        return [...Array(count)].map(() => users[Math.floor(Math.random() * users.length)]);
    }

    // Function to randomly select a forte from the limited set
    function getRandomForte() {
        return forteTags[Math.floor(Math.random() * forteTags.length)];
    }

    function generateComments() {
        return [...Array(2)].map(() => ({
            user: users[Math.floor(Math.random() * users.length)],
            text: "This is a great post!",
            applauds: getRandomUsers(2),
            replies: [...Array(2)].map(() => ({
                user: users[Math.floor(Math.random() * users.length)],
                text: "I totally agree with you!",
                applauds: getRandomUsers(1),
            })),
        }));
    }

    const posts = postTemplates.map((title, index) => {
        return new Post({
            author: users[Math.floor(Math.random() * users.length)],
            title: title,
            subtitle: `An in-depth look at ${title.toLowerCase()}`,
            size: ["small", "medium", "large"][Math.floor(Math.random() * 3)],
            story: `This post explores the topic of ${title} and its impact on modern society...`,
            links: [`https://example.com/${title.replace(/\s+/g, "-").toLowerCase()}`],
            hashTags: [`#${forteTags[index]}`, "#Trending"],
            media: [
                { url: images[Math.floor(Math.random() * images.length)], type: "image" },
                { url: images[Math.floor(Math.random() * images.length)], type: "image" },
            ],
            forte: getRandomForte(),
            location: locations[Math.floor(Math.random() * locations.length)],
            applauds: getRandomUsers(3),
            comments: generateComments(),
        });
    });

    try {
        await Post.deleteMany();
        await Post.insertMany(posts);
        console.log("Inserted Docs");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function main() {
    connectDB();

    try {
        const users = await seedUsers();
        await seedPosts(users);
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected");
    }
}

main();
