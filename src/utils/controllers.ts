import Post from "../models/post.js";
import Story from "../models/storyboard.js";
import { IPost } from "../types/post.js";
import { IStoryBoard } from "../types/storyboard.js";

async function getData(section: string, sectionId: string): Promise<IPost | IStoryBoard | null> {
    if (section === "post") {
        return await Post.findById(sectionId).populate("applauds");
    } else {
        return await Story.findById(sectionId).populate("applauds");
    }
}

export { getData };