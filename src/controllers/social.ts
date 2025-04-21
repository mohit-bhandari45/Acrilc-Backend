import { Request, Response } from "express";
import mongoose, { Schema } from "mongoose";
import Post from "../models/post.js";
import User, { IUser } from "../models/user.js";
import { IResponse } from "../types/response.js";
import { setErrorDetails } from "../utils/helper.js";

/***
 * @desc Follow/Unfollow a user
 * @route GET /api/:userId/follow
 */
async function followUnfollowHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;
    const loggedUser = req.user?.id;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findById(userId);
        if (!user) {
            response.msg = "No User";
            return res.status(404).json(response);
        }

        user.followers = user.followers ?? [];
        const isFollowed = user.followers.some((id) => id.toString() === loggedUser);

        user.followers = isFollowed ? user.followers.filter((id) => id.toString() !== loggedUser) : [...user.followers, loggedUser as unknown as Schema.Types.ObjectId];

        await user.save();
        response.msg = isFollowed ? "User Unfollowed" : "User Followed";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Get all followers of a user
 * @route GET /api/:userId/followers
 */
async function getAllFollowersHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findById(userId).populate("followers");
        if (!user) {
            response.msg = "No User";
            return res.status(404).json(response);
        }

        user.followers = user.followers ?? [];

        response.msg = "Got Followers";
        response.data = user.followers;
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Get all followings of a user
 * @route GET /api/:userId/following
 */
async function getAllFollowingHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findById(userId).populate("following");
        if (!user) {
            response.msg = "No User";
            return res.status(404).json(response);
        }

        user.following = user.following ?? [];

        response.msg = "Got Following";
        response.data = user.following;
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/* Post and Storyboard Interaction Handlers */

/* Applaud Handlers */

/***
 * @desc Get all applauds in a section(post/storyboard)
 * @route GET /api/socials/:section/:sectionId/applauds
 */
async function allApplaudsHandler(req: Request, res: Response): Promise<any> {
    const { section, sectionId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        let data;
        if (section === "post") {
            data = await Post.findById(sectionId).populate("applauds");
        } else {
            data = await Post.findById(sectionId).populate("storyboard.applauds");
            data = data?.storyBoard;
        }

        if (!data) {
            response.msg = section === "post" ? "Post Not found" : "Storyboard not found";
            return res.status(404).json(response);
        }

        response.msg = data.applauds === undefined || data.applauds.length === 0 ? "No Applauds Yet!" : "Fetched all users applauds";
        response.data = data.applauds as unknown as IUser[];

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Applaud or unApplaud in a section(post/storyboard)
 * @route GET /api/socials/:section/:sectionId/applaud
 */
async function applaudSectionHandler(req: Request, res: Response): Promise<any> {
    const { section, postId } = req.params;
    const userId = req.user?.id;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);

        if (!post) {
            response.msg = section === "post" ? "Post Not found" : "Storyboard not found";
            return res.status(404).json(response);
        }

        let isLiked: boolean;

        if (section === "post") {
            isLiked = post.applauds.includes(userId);

            if (isLiked) {
                post.applauds = post.applauds.filter((applaud) => {
                    return applaud.toString() !== userId.toString();
                });
            } else {
                post.applauds.push(userId);
            }

            response.msg = isLiked ? "UnApplauded a Post" : "Applauded a Post";
            response.data = post.applauds;
        } else {
            post.storyBoard.applauds = post.storyBoard.applauds ?? [];
            isLiked = post.storyBoard.applauds.includes(userId);

            if (isLiked) {
                post.storyBoard.applauds = post.storyBoard.applauds.filter((applaud) => {
                    return applaud.toString() !== userId.toString();
                });
            } else {
                post.storyBoard.applauds.push(userId);
            }

            response.msg = isLiked ? "UnApplauded a Story" : "Applauded a Story";
            response.data = post.storyBoard.applauds;
        }

        await post.save();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/* Comment Handler */

/***
 * @desc Get all comments in a section(post/storyboard)
 * @route GET /api/socials/:section/:sectionId/comments
 */
async function allCommentsHandler(req: Request, res: Response): Promise<any> {
    const { section, sectionId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const isPostSection: boolean = section === "post";

        if (isPostSection) {
            const post = await Post.findById(sectionId).populate([
                { path: "comments.user", select: "_id username profilepic" },
                { path: "comments.applauds", select: "_id username profilepic" },
                { path: "comments.replies.user", select: "_id username profilepic" },
            ]);

            if (!post) {
                response.msg = "Post Not found";
                return res.status(404).json(response);
            }

            response.msg = post.comments.length === 0 ? "No Comments Yet!" : "Fetched all comments";
            response.data = post.comments;
        } else {
            const post = await Post.findOne({
                "storyBoard._id": sectionId,
            }).populate([
                { path: "storyBoard.comments.user", select: "_id username profilepic" },
                { path: "storyBoard.comments.applauds", select: "_id username profilepic" },
                { path: "storyBoard.comments.replies.user", select: "_id username profilepic" },
            ]);

            if (!post) {
                response.msg = "Storyboard Not found";
                return res.status(404).json(response);
            }

            post.storyBoard.comments = post.storyBoard.comments ?? [];
            response.msg = post.storyBoard.comments.length === 0 ? "No Comments Yet!" : "Fetched all comments";
            response.data = post.storyBoard.comments;
        }

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Comment in a section(post/storyboard)
 * @route POST /api/socials/:section/:sectionId/comment
 */
async function commentPostHandler(req: Request, res: Response): Promise<any> {
    const { section, sectionId } = req.params;
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;
    const { text } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const isPostSection: boolean = section === "post";

        if (isPostSection) {
            const post = await Post.findByIdAndUpdate(
                sectionId,
                {
                    $push: {
                        comments: {
                            user: userId,
                            text: text,
                        },
                    },
                },
                { new: true }
            );

            if (!post) {
                response.msg = "No Post Found";
                return res.status(404).json(response);
            }

            await post.populate({
                path: "comments.user",
                select: "_id username profilepic",
            });
            const comment = post.comments[post.comments.length - 1];

            response.data = comment;
        } else {
            const post = await Post.findOne({
                "storyBoard._id": sectionId,
            });
            if (!post) {
                response.msg = "No Storyboard Found";
                return res.status(404).json(response);
            }

            post.storyBoard.comments = post.storyBoard.comments ?? [];

            post.storyBoard.comments.push({
                _id: new mongoose.Types.ObjectId(),
                user: userId,
                text,
            });

            await post.populate({
                path: "storyBoard.comments.user",
                select: "_id username profilepic",
            });

            await post.save();

            const comment = post.storyBoard.comments[post.storyBoard.comments.length - 1];
            response.data = comment;
        }

        response.msg = "Commented Successfully";
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Update a comment
 * @route Patch /api/socials/:section/:sectionId/comment/:commentId
 */
async function updateCommentHandler(req: Request, res: Response): Promise<any> {
    const { section, sectionId, commentId } = req.params;
    let { text } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const isPostSection: boolean = section === "post";
        let post;
        let comment;

        if (isPostSection) {
            post = await Post.findById(sectionId);
            if (!post) {
                response.msg = "No Post Found";
                return res.status(404).json(response);
            }

            comment = post.comments.find((comment) => comment._id.toString() === commentId);
        } else {
            post = await Post.findOne({
                "storyBoard._id": sectionId,
            });
            if (!post) {
                response.msg = "No Storyboard Found";
                return res.status(404).json(response);
            }

            post.storyBoard.comments = post.storyBoard.comments ?? [];
            comment = post.storyBoard.comments.find((comment) => comment._id.toString() === commentId);
        }

        if (!comment) {
            response.msg = "No Comment Found";
            return res.status(404).json(response);
        }

        comment.text = text;
        if (isPostSection) {
            await post.populate({
                path: "comments.user",
                select: "_id username profilepic",
            });
        } else {
            await post.populate({
                path: "storyBoard.comments.user",
                select: "_id username profilepic",
            });
        }

        await post.save();
        response.data = comment;
        response.msg = "Comment Updated Successfully";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Delete a comment
 * @route Delete /api/socials/:section/:sectionId/comment/:commentId
 */
async function deleteCommentHandler(req: Request, res: Response): Promise<any> {
    const { section, sectionId, commentId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const isPostSection: boolean = section === "post";
        let post;

        if (isPostSection) {
            post = await Post.findById(sectionId);
            if (!post) {
                response.msg = "No Post Found";
                return res.status(404).json(response);
            }

            post.comments = post.comments.filter((comment) => comment._id.toString() !== commentId);
        } else {
            post = await Post.findOne({
                "storyBoard._id": sectionId,
            });
            if (!post) {
                response.msg = "No Storyboard Found";
                return res.status(404).json(response);
            }

            post.storyBoard.comments = post.storyBoard.comments ?? [];
            post.storyBoard.comments = post.storyBoard.comments.filter((comment) => comment._id.toString() !== commentId);
        }

        await post.save();
        response.msg = "Comment Deleted Successfully";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/* Comment Interaction Controllers */

/***
 * @desc Applaud in a post comment
 * @route GET /api/posts/post/comment/like/:commentId
 */
async function addPostCommentApplaudHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id;
    const { commentId, postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        const comment = post.comments.find((comment) => comment._id.toString() === commentId);
        if (!comment) {
            response.msg = "Comment Not found";
            return res.status(404).json(response);
        }

        const isApplauded: boolean = (comment.applauds ?? []).includes(userId);
        if (isApplauded) {
            comment.applauds = comment.applauds?.filter((applaud) => applaud.toString() !== userId);
        } else {
            comment.applauds?.push(userId);
        }
        await post.save();

        response.msg = isApplauded ? "UnApplauded Comment" : "Applauded Comment";
        response.data = comment;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Reply in a post comment
 * @route POST /api/posts/post/:postId/comment/:commentId/reply
 */
async function addReplyHandler(req: Request, res: Response): Promise<any> {
    const { text } = req.body;
    const { postId, commentId } = req.params;
    const userId = req.user?.id;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "No Post Found";
            return res.status(404).json(response);
        }

        const comment = post.comments.find((comment) => comment._id.toString() === commentId);
        if (!comment) {
            response.msg = "Comment Not found";
            return res.status(404).json(response);
        }

        comment.replies = comment.replies || [];
        comment.replies.push({
            user: userId,
            text: text,
        });
        await post.save();

        response.msg = "Replied Successfully";
        response.data = comment;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/**
 * @desc Update a reply
 * @route Patch /api/posts/post/comment/reply/:commentId
 */
async function updateReplyHandler(req: Request, res: Response): Promise<any> {
    const { text } = req.body;
    const { postId, commentId, replyId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };
        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "No Post Found";
            return res.status(404).json(response);
        }

        const comment = post.comments.find((comment) => comment._id.toString() === commentId);
        if (!comment) {
            response.msg = "No Comment Found";
            return res.status(404).json(response);
        }

        const reply = comment.replies?.find((reply) => reply._id!.toString() === replyId);
        if (!reply) {
            response.msg = "No Reply Found";
            return res.status(404).json(response);
        }

        reply.text = text;
        await post.save();

        response.msg = "Reply Updated Successfully";
        response.data = comment;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/**
 * @desc Delete a reply
 * @route Patch /api/posts/post/:postId/:commentId/comment/reply/:replyId
 */
async function deleteReplyHandler(req: Request, res: Response): Promise<any> {
    const { postId, commentId, replyId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "No Post Found";
            return res.status(404).json(response);
        }

        const comment = post.comments.find((comment) => comment._id.toString() === commentId);
        if (!comment) {
            response.msg = "No Comment Found";
            return res.status(404).json(response);
        }

        if (!comment.replies || comment.replies.length === 0) {
            response.msg = "No Replies Found";
            return res.status(404).json(response);
        }

        comment.replies = comment.replies.filter((reply) => reply._id!.toString() !== replyId);
        await post.save();

        response.msg = "Reply Deleted Successfully";
        response.data = comment;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/**
 * @desc Add Applaud in a reply
 * @route GET /api/posts/post/:postId/comment/:commentId/reply/:replyId/applaud
 */
async function addApplaudPostCommentReplyHandler(req: Request, res: Response): Promise<any> {
    const { postId, commentId, replyId } = req.params;
    const userId = req.user?.id;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "No Post Found";
            return res.status(404).json(response);
        }

        const comment = post.comments.find((comment) => comment._id.toString() === commentId);
        if (!comment) {
            response.msg = "No Comment Found";
            return res.status(404).json(response);
        }

        const reply = (comment.replies ?? []).find((reply) => reply._id!.toString() === replyId);
        if (!reply) {
            response.msg = "No Reply Found";
            return res.status(404).json(response);
        }

        reply.applauds = reply.applauds ?? [];
        reply.applauds.push(userId);
        await post.save();

        response.msg = "Applauded Successfully in the Reply";
        response.data = comment;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export {
    addApplaudPostCommentReplyHandler,
    addPostCommentApplaudHandler,
    addReplyHandler,
    allApplaudsHandler,
    allCommentsHandler,
    applaudSectionHandler,
    commentPostHandler,
    deleteCommentHandler,
    deleteReplyHandler,
    followUnfollowHandler,
    getAllFollowersHandler,
    getAllFollowingHandler,
    updateCommentHandler,
    updateReplyHandler,
};
