
export const deleteCommentFetch = (commentId) =>
fetch(`/comments/${commentId}`, {
    method: "DELETE",
  });