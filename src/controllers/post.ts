import { Request, Response } from "express";
import { Express } from "express";
import { Schema } from "mongoose";
import Post from "../models/post.js";
import { setErrorDetails } from "../utils/helper.js";
import { IUser } from "../utils/interfaces.js";
import { IResponse } from "../utils/interfaces.js";
import Collection from "../models/collection.js";

function mediaType(type: string): string {
    if (type.startsWith("image")) {
        return "image";
    } else if (type.startsWith("video")) {
        return "video";
    } else if (type.startsWith("audio")) {
        return "audio";
    } else {
        return "gif";
    }
}

/***
 * @desc Create post
 * @route POST /api/posts
 */
async function createPostHandler(req: Request, res: Response): Promise<any> {
    const author = req.user?.id as unknown as Schema.Types.ObjectId;
    const { title, subtitle, story, size, links, hashTags, mentions, location, forte, collectionId } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const files: Express.Multer.File[] = req.files as Express.Multer.File[];

        const media =
            files?.map((file: any) => {
                return {
                    url: `${file.destination}/${file.filename}`,
                    type: mediaType(file.mimetype),
                };
            }) || [];

        const post = await Post.create({
            author,
            title,
            subtitle,
            size,
            story,
            media,
            forte,
            links,
            hashTags,
            mentions,
            location: location,
        });

        if (collectionId) {
            await Collection.findByIdAndUpdate(
                collectionId,
                {
                    $push: {
                        posts: post.id,
                    },
                },
                { new: true }
            );
        }

        response.msg = "Post Created Successfully";
        response.post = post;
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Get Posts of a user
 * @route GET /api/posts/:postId
 */
async function getPostsHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const posts = await Post.find({
            author: userId,
        }).limit(10);

        response.msg = "Got All posts";
        response.posts = posts;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Get Single post
 * @route POST /api/posts/post/:postId
 */
async function getSpecificPostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId).populate({
            path: "applauds",
            select: "fullName username email",
        });

        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        response.msg = "Post Found";
        response.post = post;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Delete a post
 * @route POST /api/posts/post/:postId
 */
async function deletePostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findByIdAndDelete(postId);

        if (post === null) {
            response.msg = "Post Not Found";
            return res.status(404).json(response);
        }

        response.msg = "Post Deleted Successfully";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/* Like Handlers */

/***
 * @desc Get all likes in a post
 * @route GET /api/posts/post/likes/:postId
 */
async function allApplaudsHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId).populate("applauds");

        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        response.msg = "Fetched all applauds users";
        response.users = post.applauds as unknown as IUser[];

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc like or dislike in a post
 * @route GET /api/posts/post/like/:postId
 */
async function likePostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        const isLiked: boolean = post?.applauds.includes(userId);

        const updatedPost = await Post.findByIdAndUpdate(postId, isLiked ? { $pull: { applauds: userId } } : { $addToSet: { applauds: userId } }, { new: true });

        response.msg = isLiked ? "Unliked Post" : "Liked Post";
        response.post = updatedPost!;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/* Comment Handler */

/***
 * @desc Get all comments in a post
 * @route GET /api/posts/post/comments/:postId
 */
async function allCommentsHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId).populate([{ path: "comments.user" }, { path: "comments.replies.user" }, { path: "comments.applauds" }]);
        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        response.msg = "Fetched all comments";
        response.comments = post.comments;

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Comment in a post
 * @route GET /api/posts/post/comment/:postId
 */
async function commentPostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;
    const { text } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { comments: { user: userId, text: text } },
            },
            { new: true }
        );

        if (!post) {
            response.msg = "No Post Found";
            return res.status(404).json(response);
        }

        response.msg = "Commented Successfully";
        response.post = post;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Update a comment
 * @route Patch /api/posts/post/comment/:commentId
 */
async function updateCommentHandler(req: Request, res: Response): Promise<any> {
    const { commentId } = req.params;
    let { postId, text } = req.body;
    postId = postId as unknown as Schema.Types.ObjectId;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "No Post Found";
            return res.status(404).json(response);
        }

        post.comments = post.comments.map((comment) => {
            if (comment._id.toString() !== commentId) {
                comment.text = text;
                return comment;
            }

            return comment;
        });
        await post.save();

        response.msg = "Comment Updated Successfully";
        response.comments = post.comments;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Delete a comment
 * @route Delete /api/posts/post/comment/:commentId
 */
async function deleteCommentHandler(req: Request, res: Response): Promise<any> {
    const { commentId } = req.params;
    let { postId } = req.body;
    postId = postId as unknown as Schema.Types.ObjectId;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "No Post Found";
            return res.status(404).json(response);
        }

        post.comments = post.comments.filter((comment) => comment._id.toString() !== commentId);
        await post.save();

        response.msg = "Comment Deleted Successfully";
        response.comments = post.comments;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Reply in a post comment
 * @route GET /api/posts/post/comment/reply/:commentId
 */
async function addReplyHandler(req: Request, res: Response): Promise<any> {
    const { postId, text } = req.body;
    const { commentId } = req.params;
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "No Post Found";
            return res.status(404).json(response);
        }

        let comment = post.comments.find((comment) => comment._id.toString() === commentId);

        comment?.replies?.push({
            user: userId,
            text: text,
        });

        await post.save();

        response.msg = "Replied Successfully";
        response.comment = comment;
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
    const { postId, commentId, text } = req.body;
    const { replyId } = req.params;

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
        response.comment = comment;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/**
 * @desc Delete a reply
 * @route Patch /api/posts/post/comment/reply/:commentId
 */
async function deleteReplyHandler(req: Request, res: Response): Promise<any> {
    const { postId, commentId } = req.body;
    const { replyId } = req.params;

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
        response.comment = comment;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Like in a post comment
 * @route GET /api/posts/post/comment/like/:commentId
 */
async function addLikeHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id;
    const { postId } = req.body;
    const { commentId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        let allComments = post.comments;
        let isLiked: boolean = false;
        allComments = allComments.map((comment) => {
            if (comment._id.toString() === commentId) {
                isLiked = comment.applauds?.includes(userId) ?? false;

                if (isLiked) {
                    comment.applauds = comment.applauds?.filter((id) => id.toString() !== userId);
                } else {
                    comment.applauds = [...(comment.applauds || []), userId];
                }
            }
            return comment;
        });
        await post.save();

        response.msg = isLiked ? "Unliked Post" : "Liked Post";
        response.comments = allComments;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export {
    allApplaudsHandler,
    commentPostHandler,
    createPostHandler,
    deletePostHandler,
    getPostsHandler,
    getSpecificPostHandler,
    likePostHandler,
    allCommentsHandler,
    addReplyHandler,
    addLikeHandler,
    deleteCommentHandler,
    updateCommentHandler,
    updateReplyHandler,
    deleteReplyHandler,
};
