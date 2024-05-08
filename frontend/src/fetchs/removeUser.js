export const removeUserFetch = async (userId) => 
  fetch(`/users/${userId}`, {
    method: "DELETE",
  });