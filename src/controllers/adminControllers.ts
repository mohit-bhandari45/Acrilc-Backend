import { Request, Response } from "express";
import User from "../models/user.js";
import { makeResponse } from "../utils/response.js";
import Post from "../models/post.js";
import Story from "../models/storyboard.js";
import Project from "../models/marketplace.js";
import { setErrorDetails } from "../utils/helper.js";
import ApiFeatures from "../utils/apiFeature.js";

async function getAllUsersControllers(req: Request, res: Response): Promise<void> {
    const resultPerPage = 10;
    const count = await User.countDocuments();

    const apiFeatures = new ApiFeatures(User.find().sort({ $natural: -1 }), req.query).searchUser().filter();

    let filteredUsers = await apiFeatures.query;
    let filteredUsersCount = filteredUsers.length;

    apiFeatures.pagination(resultPerPage);
    filteredUsers = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        count,
        resultPerPage,
        users: filteredUsers,
        filteredUsersCount,
    });
}

async function getUserByIdHandler(req: Request, res: Response): Promise<void> {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404).json(makeResponse("User Not found"));
        return;
    }

    const posts = await Post.find({ author: user._id });

    res.status(200).json(makeResponse("User Found", { user, posts }));
    return;
}

async function updateUserHandler(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const userId = req.user?.id;
    const user = await User.findById(id);

    if (!user) {
        res.status(404).json(makeResponse("User Not found"));
        return;
    }

    if (userId.toString() === id.toString()) {
        res.status(200).json(makeResponse("Self Updating is prohibited"));
        return;
    }

    const { fullName, username, bio, story, socialLinks, visibility, preferences, role } = req.body;

    const map = new Map();
    if (socialLinks) {
        socialLinks.forEach((link: { [x: string]: any }) => {
            map.set(link["platform"], link["url"]);
        });
    }

    try {
        await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    username: username && username,
                    fullName: fullName && fullName,
                    bio: bio && bio,
                    story: story && story,
                    socialLinks: map && map,
                    visibility: visibility && visibility,
                    preferences: preferences && preferences,
                    role: role && role,
                },
            },
            { new: true }
        );

        res.status(200).json(makeResponse("User Updated"));
        return;
    } catch (error) {
        res.status(500).json(setErrorDetails("Internal Server Error", error as string));
        return;
    }
}

async function deleteUserHandler(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const userId = req.user?.id;
    const user = await User.findById(id);

    if (!user) {
        res.status(404).json(makeResponse("User Not found"));
        return;
    }

    if (userId.toString() === id.toString()) {
        res.status(200).json(makeResponse("Self deleting is prohibited"));
        return;
    }

    await Post.deleteMany({ author: id });
    await Story.deleteMany({ author: id });
    await Project.deleteMany({ author: id });

    await User.findByIdAndDelete(user._id);

    res.status(200).json(makeResponse("User Deleted"));
    return;
}

/* Contents handling */
async function deletePostsHandler(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
        res.status(404).json(makeResponse("User Not found"));
        return;
    }

    await Post.deleteMany({ author: userId });

    res.status(200).json(makeResponse("Posts deleted"));
    return;
}

async function deletePostByIdHandler(req: Request, res: Response): Promise<void> {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
        res.status(404).json(makeResponse("Post Not found"));
        return;
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json(makeResponse("Posts deleted"));
    return;
}

export { getAllUsersControllers, getUserByIdHandler, deleteUserHandler, deletePostsHandler, deletePostByIdHandler, updateUserHandler };
