const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__save-button");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valid) hideInputError(formElement, inputElement);
  else
    showInputError(formElement, inputElement, inputElement.validationMessage);
};

const resetValidation = (formElement, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input);
  });
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

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("modal__save-button_disabled");
  }
};
const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add("modal__save-button_disabled");
};
const hasInvalidInput = (inputList) => {
  return inputList.some((element) => !element.validity.valid);
};

enableValidation();
