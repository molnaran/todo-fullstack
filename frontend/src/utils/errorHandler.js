export const createErrorMessage = error => {
  let errorMessage = "Something went wrong!";
  if (error.response && error.response.data && error.response.data.message) {
    errorMessage = error.response.data.message;
  }
  return errorMessage;
};
