//You can edit ALL of the code here
const rootElem = document.querySelector(".main-grid");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
window.onload = setup;

// =============
//   level100
// =============

function makePageForEpisodes(episodeList) {
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach((element) => {
    const articleBox = document.createElement("article");
    articleBox.className = "episode-box";

    const headerH2 = document.createElement("h2");
    headerH2.className = "header";
    headerH2.style.fontSize = "1.2rem";

    const episodeImage = document.createElement("img");
    episodeImage.className = "episode-img";
    episodeImage.style.borderRadius = "10px";
    episodeImage.style.boxShadow = "-3px 3px 10px black";

    const episodeSummary = document.createElement("p");
    episodeImage.className = "episode-summary";

    articleBox.append(headerH2, episodeImage, episodeSummary);
    rootElem.append(articleBox);

    headerH2.innerText =
      element.number === 10
        ? `${element.name}-S0${element.season}E${element.number}`
        : `${element.name}-S0${element.season}E0${element.number}`;

    episodeImage.setAttribute("src", element.image.medium);
    episodeSummary.innerText = element.summary
      .replaceAll("<p>", "")
      .replaceAll("</p>", "")
      .replaceAll("<br>", "");
  });
}

// ==========
//  Level200
// ==========
let searchItem = () => {
  let searchBar = document.querySelector("#search");

  searchBar.addEventListener("input", (e) => {
    let targetItem = e.target.value.toLowerCase();

    let filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.includes(targetItem) ||
        episode.summary.includes(targetItem) ||
        episode.name.toLowerCase().includes(targetItem) ||
        episode.summary.toLowerCase().includes(targetItem)
      );
    });

    rootElem.innerText = "";
    console.log(rootElem);
    filteredEpisodes.forEach((filteredEpisode) =>
      makePageForEpisodes(filteredEpisode)
    );
  });
};

searchItem;
