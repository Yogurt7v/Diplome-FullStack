const Comment = require("../models/Comment.js");

async function getComments(productId) {
    const comments = await Comment.find({ productsId: productId });
    return comments;
}

async function addComment(reqest) {
    const comment = new Comment({
        author: reqest.author,
        authorId: reqest.userId,
        productsId: reqest.productId,
        content: reqest.content,
        publishedAt: new Date(),
    });
    await comment.save();
    console.log("New comment created");
    return comment;

}

async function deleteComment(commentId) {
    await Comment.deleteOne({ _id: commentId });
    console.log("Comment deleted");
}

module.exports = { getComments, addComment, deleteComment }