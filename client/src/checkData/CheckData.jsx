//check if object has exist at least one empty value
function checkEmptyValue(object) {
  return Object.values(object).some((value) => {
    if (typeof value === "object" && value !== null) {
      return checkEmptyValue(value);
    }
    return value === null || value === "";
  });
}

export { checkEmptyValue };
