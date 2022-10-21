const main = document.querySelector("main");
const searchBar = document.querySelector("input");
const dropDown = document.querySelector("#selector");

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

const fetchShowsApi = () => {
  fetch("https://api.tvmaze.com/shows/5/episodes")
    .then((res) => res.json())
    .then((dataArr) => {
      makePageForEpisodes(dataArr);
      search(dataArr);
      dropDownSelector(dataArr);
    });
};

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
      paragraph.style.color="white"
      main.append(paragraph);
      return (paragraph.innerText = `OOPS! There is No Result!!`);
    }
    makePageForEpisodes(filteredEpisodes);
  });
}

//=====
// 300
//=====

function dropDownSelector(episodes) {
  episodes.forEach((episode) => {
    const option = document.createElement("option");
    option.setAttribute("value", episode.name);
    episode.number > 9
      ? (option.innerText = `${episode.name} - S0${episode.season}E${episode.number}`)
      : (option.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`);
    dropDown.append(option);
  });
  dropDown.addEventListener("change", (event) => {
    const targetedEpisode = event.target.value;
    console.log(targetedEpisode);

    let selectedEpisode = episodes.filter((episode) =>
      episode.name.includes(targetedEpisode)
    );
    main.innerText = "";
    dropDown.value === "see-all"
      ? makePageForEpisodes(episodes)
      : makePageForEpisodes(selectedEpisode);
  });
}

fetchShowsApi();
