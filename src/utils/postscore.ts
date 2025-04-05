import { IPost } from "../types/post.js";

function calculatePostScore(post: IPost): number {
    const applauds = post.applauds.length;
    const comments = post.comments.length;
    const replies = post.comments.reduce((total, c) => total + (c.replies?.length || 0), 0);

    const hoursSinceCreation = (Date.now() - post.createdAt.getTime()) / 36e5;
    const isRecent = hoursSinceCreation < 24;
    const recentPostBonus = isRecent ? 5 : 0;

    return applauds * 3 + comments * 2 + replies + recentPostBonus;
}


export { calculatePostScore }