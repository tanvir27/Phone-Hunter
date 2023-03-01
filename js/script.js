// const loadPhonesStart = async (searchText) => {
//   const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
//   const res = await fetch(url);
//   const data = await res.json();
//   displayStartPhones(data.data);
// };
// const displayStartPhones = (phones) => {
//   const phonesStartContainer = document.getElementById("phonesStart-container"); // get the container by id
//   // for clearing values input filed
//   phonesStartContainer.innerText = "";
//   // displaying all phones one by one

//   phones.forEach((phone) => {
//     const phoneDiv = document.createElement("div");
//     phoneDiv.classList.add("col");
//     // set innerHtml otherwise we cant show the phone in dsiplay
//     phoneDiv.innerHTML = `
//         <div class="card p-4">
//           <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
//           <div class="card-body">
//             <h5 class="card-title">${phone.phone_name}</h5>
//             <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//             <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>


//           </div>
//         </div>
//         `;
//     // last one is append child the phones container div
//     phonesStartContainer.appendChild(phoneDiv);
//   });
// }
// loadPhonesStart();

const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

// for displaying phones in website
const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container"); // get the container by id
  // for clearing values input filed
  phonesContainer.innerText = "";
  const showAll = document.getElementById("show-all");

  // display 10 phones only and then click show button for show all items
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 12);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  // display no phones
  const noPhone = document.getElementById("no-found-message");

  // if else condition for valid search
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  // displaying all phones one by one
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    // set innerHtml otherwise we cant show the phone in dsiplay
    phoneDiv.innerHTML = `
        <div class="card p-4">
          <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>


          </div>
        </div>
        `;

    // last one is append child the phones container div
    phonesContainer.appendChild(phoneDiv);
  });

  // append chhild er pore spinner ta off hoye jabe
  // stopp spinner or loader
  toggleSpinner(false);
};

const proccessSearch = (dataLimit) => {
  toggleSpinner(true);
  const searcField = document.getElementById("search-field");
  const searchText = searcField.value;
  searcField.value = '';
  loadPhones(searchText, dataLimit);
};

// Handle for Search button click
document.getElementById("btn-search").addEventListener("click", function () {
  // jokhnon button a click korbe tokhn spinner ta start hbe bcz data load houa obdi spinner ta ghhurbe, jokhn peye jabe data tokhn spinner ta off hoye jabe
  // start loader
  document.getElementById('phonesStart-container').classList.add('d-none');
  proccessSearch(10);
});

// search input field event key handler

document.getElementById("search-field")
  .addEventListener("keypress", function (e) {
    // console.log(e.key);
    if (e.key === "Enter") {
      proccessSearch(10);
    }
  });

//  loader functionallity work
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    // jodi isLoading = true hoy tokhn d-none ta k remove kore dibe
    loaderSection.classList.remove("d-none");
  } else {
    // r jokhn false hbe tokhn abr add kore dibe
    loaderSection.classList.add("d-none");
  }
};

// not thhe best way for show all data
document.getElementById("btn-show-all").addEventListener("click", function () {
  proccessSearch();
});

// for phone details

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};
// loadPhoneDetails();

// for display phone details data. connected to loadphone details function
const displayPhoneDetails = (phone) => {
  // console.log(phone);
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
    <p class='text-center'>Release Date: ${
      phone.releaseDate ? phone.releaseDate : "No Release Date Found"
    } </p>
    
    <h5>Main Features: </h5>
    <p>Storage: ${
      phone.mainFeatures ? phone.mainFeatures.storage : "No Storage Information"
    } </p>
    <p>Chipset: ${phone.mainFeatures.chipSet}</p>
    <p>Display Size: ${phone.mainFeatures.displaySize}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>Sensors List: <br> ${phone.mainFeatures.sensors}</p>
    <h5>Others: </h5>
    <p>WlAN:  ${phone.others ? phone.others.WlAN : "No WlAN Information"}</p>
    <p>Bluetooth:  ${
      phone.others ? phone.others.Bluetooth : "No Bluetooth Information"
    }</p>
    <p>GPS:  ${phone.others ? phone.others.GPS : "No GPS Information"}</p>
    <p>NFC:  ${phone.others ? phone.others.NFC : "No NFC Information"}</p>
    `;
};

// call  loadPhones functions otherwise it wont work firstly
 loadPhones('apple');
