let nameH1;
let climateSpan;
let terrainSpan;
let populationSpan;
let residentsUl;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  climateSpan = document.querySelector("span#climate");
  terrainSpan = document.querySelector("span#terrain");
  populationSpan = document.querySelector("span#population");
  residentsUl = document.querySelector("#residents>ul");

  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id);
    console.log("Fetched planet:", planet);
    //planet.residents = await fetchDetails(planet.residents);
    planet.residents = await fetchChars(id);
    planet.films = await(fetchFilms(id));
    console.log("Fetched residents:", planet.residents);
  } catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
}

async function fetchChars(id){
    let allChars = await fetch(`${baseUrl}/characters`)
    let chars = await allChars.json();
    console.log(chars)
    console.log(id)
    let filteredChars = [];
    for(let i = 0; i < chars.length; i++){
        console.log(chars[i].homeworld)
        if(chars[i].homeworld == id){
            filteredChars.push(chars[i]);
        }
    }
    console.log(filteredChars)
    return filteredChars;
}

async function fetchFilms(id){
    let films = await fetch(`${baseUrl}/planets/${id}/films`);
    let filmsObj = await films.json();
    return filmsObj;
}

async function fetchPlanet(id) {
  const planetUrl = `${baseUrl}/planets/${id}`;
  console.log("Fetching planet from:", planetUrl);
  const response = await fetch(planetUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function fetchDetails(urls) {
  const detailPromises = urls.map(async (url) => {
    console.log("Fetching detail from:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  });
  return Promise.all(detailPromises);
}

const renderPlanet = (planet) => {
  document.title = `SWAPI - ${planet.name}`;
  nameH1.textContent = planet.name;
  climateSpan.textContent = planet.climate;
  terrainSpan.textContent = planet.terrain;
  populationSpan.textContent = planet.population;

  const residentsLis = planet.residents.map(
    (resident) =>
      `<li><a href="/character.html?id=${
        resident.id
      }">${resident.name}</a></li>`
  );
  residentsUl.innerHTML = residentsLis.join("");

  const filmLis = planet.films.map(
    (film) =>
      `<li><a href="/film.html?id=${film.id}">${film.title}</a></li>`
  );
  document.getElementById("filmList").innerHTML = filmLis.join("");
};
