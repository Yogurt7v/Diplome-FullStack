export const getRolesFetch = async() => {
    
    const roles= await fetch("/roles").then(
    (loadedRoles) => loadedRoles.json()
  );

  return roles
}