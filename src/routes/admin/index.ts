import { Router } from "express";
import { deletePostByIdHandler, deletePostsHandler, deleteUserHandler, getAllUsersControllers, getUserByIdHandler, updateUserHandler } from "../../controllers/adminControllers.js";
import { authCheckMiddleware, authorizeRoles } from "../../middlewares/auth.js";

const router = Router();

router.use(authCheckMiddleware);
router.get("/all", authorizeRoles("admin"), getAllUsersControllers);
router.route("/user/byId/:id").get(authorizeRoles("admin"), getUserByIdHandler).delete(authorizeRoles("admin"), deleteUserHandler).put(authorizeRoles("admin"), updateUserHandler);

router.delete("/posts/:userId", authorizeRoles("admin"), deletePostsHandler);
router.delete("/post/:postId", authorizeRoles("admin"), deletePostByIdHandler);

export default router;
