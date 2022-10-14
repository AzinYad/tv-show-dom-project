//You can edit ALL of the code here
let mainGridContainer = document.querySelector(".main-grid");
const allEpisodes = getAllEpisodes();

function setup() {
  makePageForEpisodes(allEpisodes);
}


// =============
//   level100
// =============

// let generateBoxId = (episode) => `article box id: ${episode.id}`;

function makePageForEpisodes(episodeList) {
  episodeList.forEach((episode) => {
    let articleBox = document.createElement("article");
    articleBox.className = "episode-box";
    // articleBox.id = generateBoxId(episode);

    const episodeBoxHeader = document.createElement("h2");
    episodeBoxHeader.className = "header";

    const episodeImage = document.createElement("img");
    episodeImage.className = "episode-img";

    const episodeSummary = document.createElement("p");
    episodeSummary.className = "episode-summary";

    episodeBoxHeader.innerText =
      episode.number >= 10
        ? `${episode.name}-S0${episode.season}E${episode.number}`
        : `${episode.name}-S0${episode.season}E0${episode.number}`;

    episodeImage.setAttribute("src", episode.image.medium);
    episodeSummary.innerHTML = episode.summary;
    
    articleBox.append(episodeBoxHeader, episodeImage, episodeSummary);
    if (mainGridContainer) {
      mainGridContainer.append(articleBox);
    }
  });
}

// ==========
//  Level200
// ==========

// let matchSearchText = (episode, searchTerm) => {
//   allEpisodes.filter((episode) => {
//     return (
//       episode.name.includes(searchTerm) ||
//       episode.summary.includes(searchTerm) ||
//       episode.name.toLowerCase().includes(searchTerm) ||
//       episode.summary.toLowerCase().includes(searchTerm)
//     );
//   });
// };

let search = () => {
  let searchBar = document.getElementById("search");
  if (!searchBar) {
    return;
  }

  searchBar.addEventListener("input", (event) => {
    let searchText = event.target.value;
    if (searchText === null) return;

    const filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.includes(searchText) ||
        episode.summary.includes(searchText) ||
        episode.name.toLowerCase().includes(searchText) ||
        episode.summary.toLowerCase().includes(searchText)
      );
    });
    mainGridContainer.innerText = "";
    makePageForEpisodes(filteredEpisodes);

    // let validEpisodes = allEpisodes.filter((episode) =>
    //   matchSearchText(episode, searchText)
    // );

    // let unValidEpisodes = allEpisodes.filter(
    //   (episode) => !matchSearchText(episode, searchText)
    // );

    // validEpisodes
    //   .map((episode) => generateBoxId(episode))
    //   .forEach((boxId) => {
    //     const box = document.getElementById(boxId);
    //     if (box === null) {
    //       // This should not happen, it should always be an element
    //       console.warn("could not find element using id: " + elemId);
    //     } else {
    //       box.classList.remove(".is-hidden");
    //     }
    //   });

    // unValidEpisodes
    //   .map((episode) => generateBoxId(episode))
    //   .forEach((boxId) => {
    //     const box = document.getElementById(boxId);
    //     if (box === null) {
    //       // This should not happen, it should always be an element
    //       console.warn("could not find element using id: " + elemId);
    //     } else {
    //       box.classList.add(".is-hidden");
    //     }
    //   });
  });
};

search();

// ==========
//  Level300
// ==========

const dropDown = () => {
  const episodeSelector = document.getElementById("episode-selector");

  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.setAttribute("value", episode.name);

    option.innerText =
      episode.number >= 10
        ? `${episode.name}-S0${episode.season}E${episode.number}`
        : `${episode.name}-S0${episode.season}E0${episode.number}`;

    episodeSelector.append(option);
  });

  episodeSelector.addEventListener("change", (e) => {
    mainGridContainer.innerHTML = "";
    let selected = allEpisodes.filter(
      (episode) => episode.name === e.target.value
    );
    e.target.value === "see-all"
      ? makePageForEpisodes(allEpisodes)
      : onePageEpisode(selected);
  });
};

const onePageEpisode = (episode) => {
  
   const largeArticleBox = document.createElement("article");
   episode.forEach((episode) => {
   
    largeArticleBox.className = "large-episode-box";
    // largeArticleBox.id = generateBoxId(episode);

    const largeBoxHeader = document.createElement("h2");
    largeBoxHeader.className = "large-header";

    const largeImage = document.createElement("img");
    largeImage.className = "large-episode-img";

    const largeSummary = document.createElement("p");
    largeSummary.className = "large-episode-summary";

    largeBoxHeader.innerText =
      episode.number >= 10
        ? `${episode.name}-S0${episode.season}E${episode.number}`
        : `${episode.name}-S0${episode.season}E0${episode.number}`;

    largeImage.setAttribute("src", episode.image.original);
    largeSummary.innerHTML = episode.summary;

    largeArticleBox.append(largeBoxHeader, largeImage, largeSummary);
    if (mainGridContainer) {
      mainGridContainer.append(largeArticleBox);
    }
  });
};

dropDown();
window.onload = setup;