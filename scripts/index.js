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

const cardList = document.querySelector(".cards__list");
initialCards.forEach((cardData) => {
  cardList.append(getCardElement(cardData));
});

const profileEditButton = document.querySelector(".profile__edit-button");
const modalExitButton = document.querySelector(".modal__exit-button");
const modal = document.querySelector("#edit-profile-modal");

const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");

const modalForm = document.querySelector(".modal__form");
const modalNameInput = document.querySelector("#input-name");
const modalDescInput = document.querySelector("#input-description");

profileEditButton.addEventListener("click", function () {
  modal.classList.add("modal_opened");
  modalNameInput.value = profileName.textContent;
  modalDescInput.value = profileDesc.textContent;
});
modalExitButton.addEventListener("click", closeModal);
modalForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  profileName.textContent = modalNameInput.value;
  profileDesc.textContent = modalDescInput.value;

  closeModal();
});

function closeModal() {
  modal.classList.remove("modal_opened");
}

function getCardElement(data) {
  // Create Card From Template
  let cardTemplate = document.querySelector("#card-template").content;
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  let cardTitle = cardElement.querySelector(".card__title");
  let cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}
