//You can edit ALL of the code here
let mainGridContainer = document.querySelector(".main-grid");
const allEpisodes = getAllEpisodes();

function setup() {
  makePageForEpisodes(allEpisodes);
}
window.onload = setup;

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
    episodeSummary.innerText = episode.summary
      .replaceAll("<p>", "")
      .replaceAll("</p>", "")
      .replaceAll("<br>", "");

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
  episode.forEach((e) => {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");

    h2.innerText = `${e.name} - S0${e.season}E${
      e.number < 10 ? "0" + e.number : e.number
    }`;
    img.setAttribute("src", e.image.original);
    p.innerHTML = e.summary;
    p.style.maxWidth = "720px";
    img.style.maxWidth = "720px";
    article.append(h2, img, p);
    article.style.justifyContent = "center";
    mainGridContainer.append(article);
   
  });
};
