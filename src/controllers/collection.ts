import { Request, Response } from "express";
import { Schema } from "mongoose";
import Collection from "../models/collection.js";
import { setErrorDetails } from "../utils/helper.js";
import { IPost, IResponse } from "../utils/interfaces.js";

/***
 * @desc Get All Collections
 * @route Get api/collections
 */
async function getCollectionHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;

    try {
        let response: IResponse = {
            msg: "",
        };
        const collections = await Collection.find({ userId: userId });

        if (!collections) {
            response.msg = "No Collection Found";
            return res.status(404).json(response);
        }

        response.msg = "Collections Found";
        response.collections = collections;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Add Collection
 * @route POST api/collections
 */
async function addCollectionHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;
    const { title, visibility, posts } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const collection = await Collection.create({
            title: title,
            userId: userId,
            visibility: visibility,
            posts: posts,
        });

        response.msg = "Collection Created";
        response.collection = collection;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Update Collection
 * @route PUT api/collections/:collectionId
 */
async function updateCollectionHandler(req: Request, res: Response): Promise<any> {
    const { title, visibility } = req.body;
    const { collectionId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        await Collection.findByIdAndUpdate(collectionId, {
            $set: {
                title: title,
                visibility: visibility,
            },
        });

        response.msg = "Collection updated";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Delete Collection
 * @route PUT api/collections/:collectionId
 */
async function deleteCollectionHandler(req: Request, res: Response): Promise<any> {
    const { collectionId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        await Collection.findByIdAndDelete(collectionId);

        response.msg = "Collection Deleted";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Get Collection Posts
 * @route GET api/collections/:collectionId
 */
async function getCollectionPostsHandler(req: Request, res: Response): Promise<any> {
    const { collectionId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const collection = await Collection.findById(collectionId).populate("posts");

        response.msg = "All Posts";
        response.posts = collection?.posts as unknown as IPost[];
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Remove post from Collection
 * @route PUT api/collections/:collectionId/remove-post
 */
async function removeCollectionPostHandler(req: Request, res: Response): Promise<any> {
    const { collectionId } = req.params;
    const { postId } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const collection = await Collection.findById(collectionId);

        if (!collection) {
            response.msg = "Collection Not found";
            return res.status(404).json(response);
        }

        collection.posts = collection.posts.filter((id) => {
            return id.toString() !== postId;
        });
        collection.save();

        response.msg = "Post Deleted";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { getCollectionHandler, addCollectionHandler, updateCollectionHandler, getCollectionPostsHandler, deleteCollectionHandler, removeCollectionPostHandler };
