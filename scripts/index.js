const initialCards = [
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Angkor Thom, Cambodia",
    link: "./images/content/place-images/AngkorThomCambodia.jpg",
  },
  {
    name: "Petra, Jordan",
    link: "./images/content/place-images/PetraJordan.jpg",
  },
  {
    name: "Machu Picchu, Peru",
    link: "./images/content/place-images/MachuPicchuPeru.jpg",
  },
  {
    name: "Giza, Egypt",
    link: "./images/content/place-images/GizaEgypt.jpg",
  },
  {
    name: "Chichén Itzá, Mexico",
    link: "./images/content/place-images/ChichenItzaMexico.jpg",
  },
  {
    name: "Taj Mahal, India",
    link: "./images/content/place-images/TajMahalIndia.jpg",
  },
];

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".cards__list");
initialCards.forEach((cardData) => {
  cardList.append(getCardElement(cardData));
});

// edit profile elements
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const modalExitButton = editProfileModal.querySelector(".modal__exit-button");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
// edit profile form
const modalForm = document.forms["profile-form"];
const modalNameInput = modalForm.querySelector("#input-name");
const modalDescInput = modalForm.querySelector("#input-description");

// add card elements
const addCardModal = document.querySelector("#add-card-modal");
const addCardOpenButton = document.querySelector(".profile__add-button");
const addCardExitButton = addCardModal.querySelector(".modal__exit-button");
// add card form
const addCardForm = document.forms["add-card-form"];
const addCardFormLink = addCardForm.querySelector("#add-card-input-link");
const addCardFormName = addCardForm.querySelector("#add-card-input-name");

// image preview elements
const previewModal = document.querySelector("#preview-modal");
const previewExitButton = previewModal.querySelector(".modal__exit-button");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

// edit profile events
profileEditButton.addEventListener("click", () => {
  openModal(editProfileModal);
  modalNameInput.value = profileName.textContent;
  modalDescInput.value = profileDesc.textContent;
});
modalExitButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});
modalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closeModal(editProfileModal);
  profileName.textContent = modalNameInput.value;
  profileDesc.textContent = modalDescInput.value;
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
  closeModal(addCardModal);
  cardList.prepend(
    getCardElement({ link: addCardFormLink.value, name: addCardFormName.value })
  );
});

// preivew events
previewExitButton.addEventListener("click", () => {
  closeModal(previewModal);
});

function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  // Create Card From Template
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Get card elements
  let cardTitle = cardElement.querySelector(".card__title");
  let cardImage = cardElement.querySelector(".card__image");

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
      cardElement.remove();
    });
  cardElement // preivew image
    .querySelector(".card__image")
    .addEventListener("click", (evt) => {
      openModal(previewModal);
      previewImage.src = cardData.link;
      previewImage.alt = cardData.name;
      previewCaption.textContent = cardData.name;
    });

  return cardElement;
}
