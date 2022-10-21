const main = document.querySelector("main");
const searchBar = document.querySelector("input");
const episodesDropDown = document.querySelector("#episode-selector");
const showsDropDown = document.querySelector("#show-selector");
let allShowsName = [];

const fetchShowsApi = () => {
  fetch("https://api.tvmaze.com/shows")
    .then((res) => res.json())
    .then((dataArr) => {
      allShows = dataArr;

      makePageForEpisodes(dataArr);
      search(dataArr);
      dropDownShowSelector(dataArr);
      dropDownEpisodeSelector(dataArr);
    });
};

//=====
// 100
//=====
function makePageForEpisodes(episodesList) {
  episodesList.forEach((episode) => {
    const cardBox = document.createElement("article");
    cardBox.className = `card-box`;
    const cardHeader = document.createElement("h2");
    cardHeader.className = `card-header`;
    const cardImg = document.createElement("img");
    cardImg.className = `card-image`;
    const cardSummary = document.createElement("p");
    cardSummary.className = `card-summary`;
    cardBox.append(cardHeader, cardImg, cardSummary);
    main.append(cardBox);

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

function search(episodes) {
  searchBar.addEventListener("input", (event) => {
    let searchText = event.target.value.toLowerCase();
    console.log(searchText);

    let filteredEpisodes = episodes.filter((episode) => {
      return (
        episode.name.includes(searchText) ||
        episode.summary.includes(searchText) ||
        episode.name.toLowerCase().includes(searchText) ||
        episode.summary.toLowerCase().includes(searchText)
      );
    });
    main.innerText = "";
    if (filteredEpisodes.length === 0) {
      const paragraph = document.createElement("p");
      paragraph.style.color = "white";
      main.append(paragraph);
      return (paragraph.innerText = `OOPS! There is No Result!!`);
    }
    makePageForEpisodes(filteredEpisodes);
  });
}

//=====
// 300
//=====

function dropDownEpisodeSelector(episodes) {
  episodes.forEach((episode) => {
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

    let selectedEpisode = episodes.filter((episode) =>
      episode.name.includes(targetedEpisode)
    );
    main.innerText = "";
    episodesDropDown.value === "see-all-episodes"
      ? makePageForEpisodes(episodes)
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

    let selectedShow = shows.filter((show) => show.name.includes(targetedShow));
    main.innerText = "";
    showsDropDown.value === "see-all-shows"
      ? makePageForShows(shows)
      : makePageForShows(selectedShow);
  });
}

fetchShowsApi();
