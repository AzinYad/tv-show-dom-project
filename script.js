const main = document.querySelector("main");
const searchBar = document.querySelector("input");
const episodesDropDown = document.querySelector("#episode-selector");
const showsDropDown = document.querySelector("#show-selector");
const paragraph = document.createElement("p");
const homeBtn = document.querySelector("#home-btn");
let allShowsName = [];
let showObj = [];
let showId;
let id = [];
let allShows = [];
let allEpisodes = [];

const fetchShowsApi = () => {
  fetch("https://api.tvmaze.com/shows")
    .then((res) => res.json())
    .then((dataArr) => {
      allShows = dataArr;

      makePageForShows(dataArr);
      searchShows(dataArr);
      dropDownShowSelector(dataArr);
    })
    .catch((error) => console.log(error));
};


//=====
// 100
//=====
function makePageForShows(allShows) {
  const showSection = document.createElement("section");
  showSection.classList.add("show-section", "show-screen-section");
  allShows.forEach((show) => {
    const showBox = document.createElement("article");
    showBox.classList.add("show-box", "show-screen-box");
    const showImg = document.createElement("img");
    showImg.className = `show-img`;
    const showInfo = document.createElement("section");
    showInfo.className = `show-info`;
    const showHeader = document.createElement("h1");
    showHeader.className = `show-header`;
    const showDetail = document.createElement("section");
    showDetail.className = `show-detail`;
    const showSummary = document.createElement("h2");
    showSummary.className = `show-summary`;
    const rated = document.createElement("h4");
    const genres = document.createElement("h4");
    const status = document.createElement("h4");
    const runTime = document.createElement("h4");

    showDetail.append(rated, genres, status, runTime);
    showInfo.append(showHeader, showSummary, showDetail);
    showBox.append(showImg, showInfo);
    showSection.append(showBox);
    main.append(showSection);

    showHeader.innerText = `${show.name}`;

    rated.innerHTML = `<h4><strong  style="color:#0a0a21">Rated:</strong>${show.rating.average}</h4>`;
    genres.innerHTML = `<h4><strong  style="color:#0a0a21">Genres:</strong> ${show.genres[0]}| ${show.genres[1]}| ${show.genres[2]}</h4>`;
    status.innerHTML = `<h4><strong  style="color:#0a0a21">Status: </strong>${show.status}</h4>`;
    runTime.innerHTML = `<h4><strong  style="color:#0a0a21">Runtime:</strong> ${show.runtime} </h4>`;

    showSummary.innerHTML = `${show.summary}`;

    showImg.setAttribute("src", show.image.medium);
  });
}

function makePageForEpisodes(allEpisodes) {
  const episodeSection = document.createElement("section");
  episodeSection.className = `episode-section`;

  allEpisodes.forEach((episode) => {
    const cardBox = document.createElement("article");
    cardBox.className = `card-box`;
    const cardHeader = document.createElement("h2");
    cardHeader.className = `card-header`;
    const cardImg = document.createElement("img");
    cardImg.className = `card-image`;
    const cardSummary = document.createElement("p");
    cardSummary.className = `card-summary`;
    cardBox.append(cardHeader, cardImg, cardSummary);
    episodeSection.append(cardBox);
    main.append(episodeSection);

    episode.number > 9
      ? (cardHeader.innerText = `${episode.name}-S0${episode.season}E${episode.number}`)
      : (cardHeader.innerText = `${episode.name}-S0${episode.season}E0${episode.number}`);

    cardImg.setAttribute("src", episode.image.medium);
    cardSummary.innerHTML = episode.summary;
  });
}

//=====
// 200
//=====

// search among episodes

function searchEpisodes(allEpisodes) {
  searchBar.addEventListener("input", (event) => {
    let searchText = event.target.value.toLowerCase();
    console.log(searchText);

    let filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.includes(searchText) ||
        episode.summary.includes(searchText) ||
        episode.name.toLowerCase().includes(searchText) ||
        episode.summary.toLowerCase().includes(searchText)
      );
    });

    main.innerText = "";
    if (!filteredEpisodes.length) {
      paragraph.style.color = "white";
      main.append(paragraph);
      return (paragraph.innerText = `OOPS! There is No Result!!`);
    }
    makePageForEpisodes(filteredEpisodes);
  });
}

// search among shows

function searchShows(allShows) {
  searchBar.addEventListener("input", (event) => {
    let searchText = event.target.value.toLowerCase();
    console.log(searchText);

    let filteredShows = allShows.filter((show) => {
      return (
        show.name.includes(searchText) ||
        show.summary.includes(searchText) ||
        show.name.toLowerCase().includes(searchText) ||
        show.summary.toLowerCase().includes(searchText)
      );
    });

    main.innerText = "";
    if (!filteredShows.length) {
      paragraph.style.color = "white";
      main.append(paragraph);
      return (paragraph.innerText = `OOPS! There is No Result!!`);
    }
    makePageForShows(filteredShows);
  });
}

//=====
// 300
//=====

function dropDownEpisodeSelector(allEpisodes) {
  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.setAttribute("value", episode.name);
    episode.number > 9
      ? (option.innerText = `${episode.name} - S0${episode.season}E${episode.number}`)
      : (option.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`);
    episodesDropDown.append(option);
  });
  episodesDropDown.addEventListener("change", (event) => {
    const targetedEpisode = event.target.value;
    console.log(targetedEpisode);

    let selectedEpisode = allEpisodes.filter((episode) =>
      episode.name.includes(targetedEpisode)
    );
    main.innerText = "";
    episodesDropDown.value === "see-all-episodes"
      ? makePageForEpisodes(allEpisodes)
      : makePageForEpisodes(selectedEpisode);
  });
}

//=====
// 400
//=====

function dropDownShowSelector(shows) {
  // generate an array of shows name to sort
  shows.map((show) => {
    allShowsName.push(show.name);
  });

  // sort shows name
  let sortedNames = allShowsName.sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  sortedNames.forEach((showName) => {
    const option = document.createElement("option");
    option.setAttribute("value", showName);
    option.innerText = showName;
    showsDropDown.append(option);
  });

  showsDropDown.addEventListener("change", (event) => {
    const targetedShow = event.target.value;
    main.innerText = "";

    showsDropDown.value === "see-all-shows"
      ? makePageForShows(shows)
      : // get show Id to show all the episodes of selected show
        (showObj = shows.filter((show) =>
          show.name.includes(showsDropDown.value)
        ));

    showId = showObj[0].id;
    console.log(showId);

    episodesData = fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        allEpisodes = data;

        makePageForEpisodes(data);
        showsDropDown.style.display = `none`;
        searchEpisodes(data);
        dropDownEpisodeSelector(data);
      })
      .catch((error) => console.log(error));
  });
}

fetchShowsApi();


console.log(showId);
