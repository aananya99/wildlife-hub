// -----Reusuable functions--------
const getElement = (id) => {
  const element = document.getElementById(id);
  return element;
};
const removeBtnClass = () => {
  buttons.forEach((btn) => {
    btn.classList.add("bg-white", "text-green-700");
    btn.classList.remove("bg-green-500", "text-white");
  });
};
const selectBtnClass = (btn) => {
  btn.classList.remove("bg-white", "text-green-700");
  btn.classList.add("bg-green-500", "text-white");
};

const cardContainer = getElement("card-container");
const btnExplorer = getElement("btn-explore");
const searchInput = getElement("search-input");
const errMsg = getElement("error-msg");
const countMsg = getElement("count-msg");
const NoMatchMsg = getElement("no-match");
const allBtn = getElement("all");
const mammalsBtn = getElement("mammals");
const birdsBtn = getElement("birds");
const reptilesBtn = getElement("reptiles");
const marineBtn = getElement("marine");
const amphibianBtn = getElement("amphibian");
const animalModal = getElement("animal-modal");
const modalContent = getElement("modal-content");
const sortSelect = getElement("sort-select");
const buttons = [
  allBtn,
  mammalsBtn,
  birdsBtn,
  reptilesBtn,
  marineBtn,
  amphibianBtn,
];

// global data
let animals = []; //Original data ,never changed
let currentAnimals = []; //working data

// loadAnimals function
const loadAnimals = async () => {
  try {
    const res = await fetch("../data/animals.json");
    const data = await res.json();
    animals = data;
    currentAnimals = [...data];
    // console.log(animals); //master copy
    // console.log(currentAnimals); //working copy
    displayAnimalsCard(currentAnimals);
  } catch (error) {
    console.error(error);
    errMsg.classList.remove("hidden");
  }
};
loadAnimals();

// displayAnimalsCard function
const displayAnimalsCard = (animals) => {
  const count = animals.length;
  if (count === 1) {
    countMsg.innerText = "Showing 1 Animal";
  } else {
    countMsg.innerText = `Showing ${count} Animals`;
  }
  cardContainer.innerHTML = "";
  animals.forEach((animal) => {
    const animalCard = document.createElement("div");
    animalCard.innerHTML = `
                     <div
          class="card bg-base-100 w-full h-full shadow-sm hover:shadow-xl hover:translate-y-1 transition-all duration-300 active:scale-95"
        >
          <figure class="p-3">
            <img
              src=${animal.image}
              alt=${animal.name}
              class="h-56 object-contain rounded-2xl"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${animal.name}</h2>
            <p class="font-semibold">
              <i class="fa-solid fa-location-dot text-green-500"></i>${animal.country}
            </p>
            <p>Habitat: ${animal.habitat}</p>
            <p>Diet: ${animal.diet === "Herbivore" ? "🌿Herbivore" : "🍖Carnivore"}</p>
            <div class="card-actions justify-center">
              <button data-id ="${animal.id}"
                class="btn border-2 border-green-700 text-green-700 bg-white rounded-xl hover:bg-green-100 active:scale-95"
              >
                View Details
              </button>
            </div>
    `;
    cardContainer.append(animalCard);
  });
};

// event delegation
cardContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.dataset.id;
    const selectedAnimal = animals.find((animal) => {
      return animal.id === Number(id);
    });
    displayAnimalsDetails(selectedAnimal);
  }
});
// displayAnimalsDetails function
const displayAnimalsDetails = (animal) => {
  modalContent.innerHTML = `
        <div class="space-y-4 ">
          <img
            src=${animal.image}
            alt=${animal.name}
            class="w-full h-64 object-contain rounded-xl bg-gray-100"
          />
          <div>
            <h2 class="text-3xl font-bold text-green-700">${animal.name}</h2>
            <p class="text-gray-500 flex items-center gap-2 mt-1"><i class="fa-solid fa-location-dot text-green-500"></i> ${animal.country}</p>
          </div>
          <p class="text-gray-700 leading-relaxed">${animal.description}</p>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-green-50 rounded-lg p-3">
              <p class="text-sm text-gray-500">Habitat</p>
              <p class="font-semibold">${animal.habitat}</p>
            </div>
            <div class="bg-green-50 rounded-lg p-3">
              <p class="text-sm text-gray-500">Diet</p>
              <p class="font-semibold">${animal.diet === "Herbivore" ? "🌿Herbivore" : "🍖Carnivore"}</p>
            </div>
            <div class="bg-green-50 rounded-lg p-3">
              <p class="text-sm text-gray-500">Speed</p>
              <p class="font-semibold">${animal.speed}</p>
            </div>
            <div class="bg-green-50 rounded-lg p-3">
              <p class="text-sm text-gray-500">Weight</p>
              <p class="font-semibold">${animal.weight}</p>
            </div>
            <div class="bg-green-50 rounded-lg p-3">
              <p class="text-sm text-gray-500">Lifespan</p>
              <p class="font-semibold">${animal.lifespan}</p>
            </div>
            <div class="bg-green-50 rounded-lg p-3">
              <p class="text-sm text-gray-500">Status</p>
              <p class="font-semibold">${animal.isEndangered ? "🔴Endangered" : "🟢Not Endangered"}</p>
            </div>
          </div>
        </div>
      </div>
 `;
  animalModal.showModal();
};

// category filter function
const filterAnimals = (category) => {
  currentAnimals = [...animals]; //make fresh copy from original data
  if (category === "All") {
    displayAnimalsCard(currentAnimals);
    return;
  }

  const filtered = currentAnimals.filter(
    (animal) => animal.category === category,
  );
  currentAnimals = filtered;
  console.log(currentAnimals);
  displayAnimalsCard(currentAnimals);
};

allBtn.addEventListener("click", () => {
  filterAnimals("All");
  removeBtnClass();
  selectBtnClass(allBtn);
});

mammalsBtn.addEventListener("click", () => {
  filterAnimals("Mammal");
  removeBtnClass();
  selectBtnClass(mammalsBtn);
});

birdsBtn.addEventListener("click", () => {
  filterAnimals("Bird");
  removeBtnClass();
  selectBtnClass(birdsBtn);
});

reptilesBtn.addEventListener("click", () => {
  filterAnimals("Reptile");
  removeBtnClass();
  selectBtnClass(reptilesBtn);
});

marineBtn.addEventListener("click", () => {
  filterAnimals("Marine");
  removeBtnClass();
  selectBtnClass(marineBtn);
});

amphibianBtn.addEventListener("click", () => {
  filterAnimals("Amphibian");
  removeBtnClass();
  selectBtnClass(amphibianBtn);
});

// sortByName function
const sortByName = (order) => {
  if (order === "az") {
    currentAnimals.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  } else if (order === "za") {
    currentAnimals.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  }
  displayAnimalsCard(currentAnimals);
};
sortSelect.addEventListener("change", () => {
  if (!sortSelect.value) return;
  sortByName(sortSelect.value);
});

// search with debounce
const searchAnimals = () => {
  const searchValue = searchInput.value.toLowerCase().trim();
  const searchedAnimal = currentAnimals.filter((animal) => {
    return animal.name.toLowerCase().includes(searchValue);
  });
  if (searchedAnimal.length === 0) {
    NoMatchMsg.classList.remove("hidden");
    countMsg.classList.add("hidden");
  } else {
    NoMatchMsg.classList.add("hidden");
    countMsg.classList.remove("hidden");
  }
  displayAnimalsCard(searchedAnimal);
};
let timer;
searchInput.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(searchAnimals, 500); //after 500 ms,run searchAnimals func
});

// explore btn
btnExplorer.addEventListener("click", () => {
  searchInput.scrollIntoView({
    behavior: "smooth",
  });
  searchInput.focus();
});
