import axios from "axios";

export const getRolesFetch = async() => {
    
  //   const roles= await fetch("/roles").then(
  //   (loadedRoles) => loadedRoles.json()
  // );

  const roles = await axios.get("/roles").then((roles) => roles.data);
  console.log(roles);

  return roles
}