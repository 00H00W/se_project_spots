const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll(".modal__input");
  const buttonElement = formElement.querySelector(".modal__save-button");

  // toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      // toggleButtonState(inputList, buttonElement);
    });
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valid) hideInputError(formElement, inputElement);
  else
    showInputError(formElement, inputElement, inputElement.validationMessage);
};

const showInputError = (formElement, inputElement, errorMessage) => {
  formElement.querySelector(`#${inputElement.id}-error`).textContent =
    errorMessage;
  inputElement.classList.add("modal__input_type_error");
};
const hideInputError = (formElement, inputElement) => {
  formElement.querySelector(`#${inputElement.id}-error`).textContent = "";
  inputElement.classList.remove("modal__input_type_error");
};

enableValidation();
