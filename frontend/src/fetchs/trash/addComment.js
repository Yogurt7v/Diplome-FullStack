

export const addCommentFetch = (author, userId, productId, content) =>
  fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      author: author,
      authorId: userId,
      productsId: productId,
     content,
    }),
    }).then((createdUser) => createdUser.json());
