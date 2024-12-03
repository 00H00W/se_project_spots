import {
  enableValidation,
  configSettings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import "./index.css";

let selectedCard;
let selectedCardId;

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
const deleteForm = document.forms["delete-form"];
const deleteCloseButton = deleteModal.querySelector(".modal__exit-button");
const deleteCancelButton = deleteModal.querySelector("#cancel-button");
const deleteConfirmButton = deleteModal.querySelector("#delete-button");

// close button assignment
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

// delete events
deleteForm.addEventListener("submit", (evt) => {
  handleFormSubmit(
    evt,
    () => {
      return api
        .deleteCard(selectedCardId)
        .then((res) => {
          closeModal(deleteModal);
          selectedCard.remove();
        })
        .catch(console.error);
    },
    "Delete",
    "Deleting..."
  );
});

// avatar events
avatarOpenButton.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarForm.addEventListener("submit", (evt) => {
  handleFormSubmit(evt, () => {
    return api
      .editUserAvatar(avatarFormLink.value)
      .then((data) => {
        profileImage.src = data.avatar;
        closeModal(avatarModal);
      })
      .catch(console.error);
  });
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
profileForm.addEventListener("submit", (evt) => {
  handleFormSubmit(evt, () => {
    return api
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
});

// add card events
addCardOpenButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardForm.addEventListener("submit", (evt) => {
  handleFormSubmit(evt, () => {
    return api
      .addCard({ link: addCardFormLink.value, name: addCardFormName.value })
      .then((res) => {
        closeModal(addCardModal);
        cardList.prepend(getCardElement(res));
        disableButton(addCardSubmitButton, configSettings);
      })
      .catch(console.error);
  });
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
  const likeButton = cardElement.querySelector(".card__like-button");
  if (cardData.isLiked) likeButton.classList.add("card__like-button_liked");
  likeButton // like button
    .addEventListener("click", (evt) => {
      api
        .changeLike(
          likeButton.classList.contains("card__like-button_liked"),
          cardData._id
        )
        .then(() => {
          likeButton.classList.toggle("card__like-button_liked");
        })
        .catch(console.error);
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

function handleFormSubmit(
  evt,
  submitCallback,
  defualtText = "Save",
  loadingText = "Saving..."
) {
  evt.preventDefault();
  const submitText = evt.submitter;
  submitText.textContent = loadingText;
  submitCallback()
    .then(() => {
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitText.textContent = defualtText;
    });
}

enableValidation(configSettings);
