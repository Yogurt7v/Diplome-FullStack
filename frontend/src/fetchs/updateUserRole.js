import axios from "axios";

export const updateUserUpdateFetch = async (
  userId,
  newRoleId,
  newAddress,
  newHomeNumber,
  newFlatNumber,
  newPhone
) => {
  const response = await axios.patch(`/users/${userId}`, {
    role_id: newRoleId,
    address: newAddress,
    homeNumber: newHomeNumber,
    flatNumber: newFlatNumber,
    phone: newPhone,
  })
  return response;
};
