export const configSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  // errorClass: "modal__error_visible",
};

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid)
    hideInputError(formElement, inputElement, config);
  else
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
};

export const resetValidation = (formElement, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
  });
};
const showInputError = (formElement, inputElement, errorMessage, config) => {
  formElement.querySelector(`#${inputElement.id}-error`).textContent =
    errorMessage;
  inputElement.classList.add(config.inputErrorClass);
};
const hideInputError = (formElement, inputElement, config) => {
  formElement.querySelector(`#${inputElement.id}-error`).textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};
const disableButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};
const hasInvalidInput = (inputList) => {
  return inputList.some((element) => !element.validity.valid);
};
