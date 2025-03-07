// Declare constants for the URL and the cards div
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

// Async function to fetch prophet data
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets); // Commented out after testing
  displayProphets(data.prophets); // Pass the prophets array to display function
}

// Function to display prophets as cards
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements for each prophet card
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');

    // Populate the h2 with the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Build the image element with attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append elements to the card
    card.appendChild(fullName);
    card.appendChild(portrait);

    // Append the card to the cards div
    cards.appendChild(card);
  });
};

// Call the fetch function
getProphetData();