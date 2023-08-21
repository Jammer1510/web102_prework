// Import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// Create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// Function to remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// Function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (const game of games) {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <h3>${game.name}</h3>
            <p>Description: ${game.description}</p>
        `;
        gamesContainer.appendChild(gameCard);
    }
}

// Initial display of all games
addGamesToPage(GAMES_JSON);

// Display the total number of contributions
const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// Display the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// Display the total number of games
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;

// Button event listeners and filtering functions
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// Display company description and statistics
const descriptionContainer = document.getElementById("description-container");
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const unfundedGamesMessage = unfundedGamesCount === 1 ? "game remains unfunded" : "games remain unfunded";
const raisedAndGamesMessage = `We've raised $${totalRaised.toLocaleString()} across ${totalContributions.toLocaleString()} contributions in support of ${GAMES_JSON.length} games. Currently, ${unfundedGamesCount} ${unfundedGamesMessage}.`;
const descriptionParagraph = document.createElement('p');
descriptionParagraph.textContent = raisedAndGamesMessage;
descriptionContainer.appendChild(descriptionParagraph);

// Display top funded games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.slice().sort((a, b) => b.pledged - a.pledged);

const [firstGame, secondGame] = sortedGames;

const firstGameElement = document.createElement('p');
firstGameElement.textContent = `🥇 Top Funded Game: ${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement('p');
secondGameElement.textContent = `🥈 Runner Up: ${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);
