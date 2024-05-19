import axios from "axios";
import { getUsersFetch } from "./getUsers";

export const getComments = async (productId) => {
    const comments = await axios.get(`/comments/${productId}`).then((comments) => comments.data);
    
    const users = await getUsersFetch();

    comments.forEach((comment) => {
        const foundedUser = users.find(({ id }) => id === comment.authorId);
        comment.author = foundedUser?.login;
    });
    return comments;
}