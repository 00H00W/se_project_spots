const initialCards = [
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
const modalNameInput = document.querySelector("#input-name");
const modalDescInput = document.querySelector("#input-description");

// add card elements
const addCardModal = document.querySelector("#add-card-modal");
const addCardOpenButton = document.querySelector(".profile__add-button");
const addCardExitButton = addCardModal.querySelector(".modal__exit-button");

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

addCardOpenButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardExitButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(data) {
  // Create Card From Template
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Get card elements
  let cardTitle = cardElement.querySelector(".card__title");
  let cardImage = cardElement.querySelector(".card__image");

  // Assign card data
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}
