import {
  enableValidation,
  configSettings,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import "./index.css";

let selectedCard;
let selectedCardId;

// const initialCards = [
//   {
//     name: "Golden Gate bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Angkor Thom, Cambodia",
//     link: new URL(
//       "../images/content/place-images/AngkorThomCambodia.jpg",
//       import.meta.url
//     ),
//   },
//   {
//     name: "Petra, Jordan",
//     link: new URL(
//       "../images/content/place-images/PetraJordan.jpg",
//       import.meta.url
//     ),
//   },
//   {
//     name: "Machu Picchu, Peru",
//     link: new URL(
//       "../images/content/place-images/MachuPicchuPeru.jpg",
//       import.meta.url
//     ),
//   },
//   {
//     name: "Giza, Egypt",
//     link: new URL(
//       "../images/content/place-images/GizaEgypt.jpg",
//       import.meta.url
//     ),
//   },
//   {
//     name: "Chichén Itzá, Mexico",
//     link: new URL(
//       "../images/content/place-images/ChichenItzaMexico.jpg",
//       import.meta.url
//     ),
//   },
//   {
//     name: "Taj Mahal, India",
//     link: new URL(
//       "../images/content/place-images/TajMahalIndia.jpg",
//       import.meta.url
//     ),
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6f5c355c-ba63-4c32-a72d-75121ae25533",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((cardData) => {
      cardList.append(getCardElement(cardData));
    });
    profileName.textContent = userInfo.name;
    profileDesc.textContent = userInfo.about;
    profileImage.src = userInfo.avatar;
  })
  .catch(console.error);

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".cards__list");

// edit profile elements
const profileModal = document.querySelector("#edit-profile-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileExitButton = profileModal.querySelector(".modal__exit-button");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__avatar");
const profileForm = document.forms["profile-form"];
const profilNameInput = profileForm.querySelector("#input-name");
const profileDescInput = profileForm.querySelector("#input-description");

// add card elements
const addCardModal = document.querySelector("#add-card-modal");
const addCardOpenButton = document.querySelector(".profile__add-button");
const addCardExitButton = addCardModal.querySelector(".modal__exit-button");
const addCardSubmitButton = addCardModal.querySelector(".modal__save-button");
const addCardForm = document.forms["add-card-form"];
const addCardFormLink = addCardForm.querySelector("#add-card-input-link");
const addCardFormName = addCardForm.querySelector("#add-card-input-name");

// image preview elements
const previewModal = document.querySelector("#preview-modal");
const previewExitButton = previewModal.querySelector(".modal__exit-button");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

// avatar elements
const avatarOpenButton = document.querySelector(".profile__avatar-button");
const avatarModal = document.querySelector("#avatar-modal");
const avatarCloseButton = avatarModal.querySelector(".modal__exit-button");
const avatarForm = document.forms["avatar-form"];
const avatarFormLink = avatarForm.querySelector("#avatar-input-link");

// delete elements
const deleteModal = document.querySelector("#delete-modal");
const deleteCloseButton = deleteModal.querySelector(".modal__exit-button");
const deleteCancelButton = deleteModal.querySelector("#cancel-button");
const deleteConfirmButton = deleteModal.querySelector("#delete-button");

// delete events
deleteCloseButton.addEventListener("click", () => {
  closeModal(deleteModal);
});
deleteCancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
});
deleteConfirmButton.addEventListener("click", () => {
  api
    .deleteCard(selectedCardId)
    .then((res) => {
      closeModal(deleteModal);
      selectedCard.remove();
    })
    .catch(console.error);
});

// avatar events
avatarOpenButton.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarCloseButton.addEventListener("click", () => {
  closeModal(avatarModal);
});
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  api
    .editUserAvatar(avatarFormLink.value)
    .then((data) => {
      profileImage.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error);
});

// edit profile events
profileEditButton.addEventListener("click", () => {
  openModal(profileModal);
  profilNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
  resetValidation(
    profileForm,
    [profilNameInput, profileDescInput],
    configSettings
  );
});
profileExitButton.addEventListener("click", () => {
  closeModal(profileModal);
});
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  api
    .editUserInfo({
      name: profilNameInput.value,
      about: profileDescInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDesc.textContent = data.about;
      closeModal(profileModal);
    })
    .catch(console.error);
});

// add card events
addCardOpenButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardExitButton.addEventListener("click", () => {
  closeModal(addCardModal);
});
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  api
    .addCard({ link: addCardFormLink.value, name: addCardFormName.value })
    .then((res) => {
      closeModal(addCardModal);
      cardList.prepend(getCardElement(res));
      evt.target.reset();
      disableButton(addCardSubmitButton, configSettings);
    })
    .catch(console.error);
});

// preivew events
previewExitButton.addEventListener("click", () => {
  closeModal(previewModal);
});

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", modalEscapeListener);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", modalEscapeListener);
}
function getCardElement(cardData) {
  // Create Card From Template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Get card elements
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  // Assign card data
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // Setup buttons
  cardElement // like button
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      evt.currentTarget.classList.toggle("card__like-button_liked");
    });
  cardElement // delete button
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      openModal(deleteModal);
      selectedCard = cardElement;
      selectedCardId = cardData._id;
    });
  cardImage // preivew image
    .addEventListener("click", (evt) => {
      openModal(previewModal);
      previewImage.src = cardData.link;
      previewImage.alt = cardData.name;
      previewCaption.textContent = cardData.name;
    });

  return cardElement;
}

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(evt.target);
    }
  });
});

const modalEscapeListener = (evt) => {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_opened"));
  }
};

enableValidation(configSettings);
