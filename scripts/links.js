const baseURL = 'https://azurehawke.github.io/wdd230/';

const linksURL = `${baseURL}data/links.json`;

async function getLinks() {
  const response = await fetch(linksURL);
  const data = await response.json();
  displayLinks(data.lessons); 
}

const displayLinks = (weeks) => {
  const linksList = document.querySelector('#links-list');

  weeks.forEach((week) => {
    let listItem = document.createElement('li');
    listItem.textContent = `Lesson ${week.lesson}: `;


    week.links.forEach((link, index) => {
      let anchor = document.createElement('a');
      anchor.setAttribute('href', link.url);
      anchor.textContent = link.title;

      listItem.appendChild(anchor);

      if (index < week.links.length - 1) {
        listItem.appendChild(document.createTextNode(' | '));
      }
    });

    linksList.appendChild(listItem);
  });
};

getLinks();