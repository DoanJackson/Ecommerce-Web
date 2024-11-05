function getDataLocal() {
  const res = JSON.parse(localStorage.getItem("login"));
  if (!res) {
    console.log("Not authenticated");
    return undefined;
  }
  return res;
}

export { getDataLocal };
