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
const profileModal = document.querySelector("#edit-profile-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileExitButton = profileModal.querySelector(".modal__exit-button");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const profileForm = document.forms["profile-form"];
const profilNameInput = profileForm.querySelector("#input-name");
const profileDescInput = profileForm.querySelector("#input-description");

// add card elements
const addCardModal = document.querySelector("#add-card-modal");
const addCardOpenButton = document.querySelector(".profile__add-button");
const addCardExitButton = addCardModal.querySelector(".modal__exit-button");
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
  openModal(profileModal);
  profilNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
});
profileExitButton.addEventListener("click", () => {
  closeModal(profileModal);
});
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closeModal(profileModal);
  profileName.textContent = profilNameInput.value;
  profileDesc.textContent = profileDescInput.value;
});

// add card events
addCardOpenButton.addEventListener("click", () => {
  addCardFormLink.value = "";
  addCardFormName.value = "";
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
