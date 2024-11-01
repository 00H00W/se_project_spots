const initialCards = [
  {
    name: "Angkor Thom, Cambodia",
    link: "https://unsplash.com/photos/a-long-hallway-with-stone-walls-and-pillars-HVDSaAoyou4",
  },
  {
    name: "Petra, Jordan",
    link: "https://unsplash.com/photos/brown-concrete-building-during-daytime-V_JINc1uYXY",
  },
  {
    name: "Machu Picchu, Peru",
    link: "https://unsplash.com/photos/a-city-in-the-mountains-lyoFZoZNx0c",
  },
  {
    name: "Giza, Egypt",
    link: "https://unsplash.com/photos/pyramid-of-giza-Nsi6jZ9tRZo",
  },
  {
    name: "Chichén Itzá, Mexico",
    link: "https://unsplash.com/photos/a-very-tall-pyramid-with-a-clock-on-its-side-o3IOpem3bwA",
  },
  {
    name: "Taj Mahal, India",
    link: "https://unsplash.com/photos/a-white-building-with-a-blue-sky-y023qB37LVc",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const modalExitButton = document.querySelector(".modal__exit-button");
const modal = document.querySelector("#edit-profile-modal");

profileEditButton.addEventListener("click", function () {
  modal.classList.add("modal_opened");
});
modalExitButton.addEventListener("click", function () {
  modal.classList.remove("modal_opened");
});
