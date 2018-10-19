function jsonStringify(toJSON, warningText) {
  try {
    return JSON.stringify(toJSON);
  } catch (err) {
    return warningText;
  }
}

export default jsonStringify;
