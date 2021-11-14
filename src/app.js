const pokemonAll = document.querySelector(".containerAll");
const loader = document.querySelector(".loader");
const buttonAll = document.querySelector(".pokemonAll");
const containerApi = document.querySelector(".containerAPI");
const input = document.querySelector(".search");
const containerSearch = document.querySelector(".containerSearch");
const types = document.querySelector(".typePokemons");
const type = document.querySelector(".types");
const randomButton = document.querySelector(".randomPokemon");
const logo = document.querySelector('.logo')

logo.addEventListener('click', () => {
  document.location.reload(true)
})

function genereateEvolutionsView(
  pokemon,
  primeriaEvolucao,
  segundaEvolucao,
  terceiraEvolucao
) {
  return `<div class="infoContainer">
  <p data-type="${pokemon.types["0"].type.name}"></p>

      <div class="infoContainerImage">
          <span>#${pokemon.id}</span>
          <h1>${pokemon.name}</h1>
          <img src="${pokemon.sprites.other["official-artwork"].front_default}">
      </div>
      <div class="infoContainerData">
          <div class="abilities">
              <div class="headerData">
                  Abilities
              </div>
              <div class="abilityList">
                  <ul>
                      <li>${pokemon.abilities[0].ability.name}</li>
                      <li>${
                        pokemon.abilities.length === 2
                          ? pokemon.abilities[1].ability.name
                          : ""
                      }</li>
                  </ul>
              </div>
              <div class="headerData">
                  Base Stats
              </div>
              <div class="atributtes">
                  <div class="containerColumns">
                      <div class="red">HP</div>
                      <div>${pokemon.stats[0].base_stat}</div>
                  </div>
                  <div class="containerColumns">
                      <div class="red">ATTACK</div>
                      <div>${pokemon.stats[1].base_stat}</div>
                  </div>
                  <div class="containerColumns">
                      <div class="red">DEFENSE</div>
                      <div>${pokemon.stats[2].base_stat}</div>
                  </div>
                  <div class="containerColumns">
                      <div class="red">SPECIAL-ATTACK</div>
                      <div>${pokemon.stats[3].base_stat}</div>
                  </div>
                  <div class="containerColumns">
                      <div class="red">SPECIAL-DEFENSE</div>
                      <div>${pokemon.stats[4].base_stat}</div>
                  </div>
                  <div class="containerColumns">
                      <div class="red">SPEED</div>
                      <div>${pokemon.stats[5].base_stat}</div>
                  </div>
              </div>
          </div>
          <div class="headerData">
              Evolution
          </div>
          <div class="containerBg">
            ${
              primeriaEvolucao
                ? `<div class="bg">
                    <img src="${primeriaEvolucao.sprites.other["official-artwork"].front_default}">
                </div>
                <svg class="MuiSvgIcon-root arrow__right" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path></svg>`
                : ""
            }

            ${
              segundaEvolucao
                ? `<div class="bg">
                     <img src="${segundaEvolucao.sprites.other["official-artwork"].front_default}">
                </div>
                `
                : ""
            }   

            ${
              terceiraEvolucao
                ? `
                <svg class="MuiSvgIcon-root arrow__right" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path></svg>
                <div class="bg">
                    <img src="${terceiraEvolucao.sprites.other["official-artwork"].front_default}">
                </div>`
                : ""
            }
          </div>
      </div>
  
  </div>`;
}

async function getEvolutions(generation) {
  const generationsChain = generation.chain;
  const envolves = generationsChain.evolves_to[0];

  const primeriaEvolucao =
    !!generationsChain.species.name &&
    (await getPost(`pokemon/${generationsChain.species.name}`));

  const segundaEvolucao =
    !!generationsChain.evolves_to[0] &&
    (await getPost(`pokemon/${generationsChain.evolves_to[0].species.name}`));

  const terceiraEvolucao =
    !!generationsChain?.evolves_to[0]?.evolves_to[0] &&
    (await getPost(
      `pokemon/${generationsChain.evolves_to[0].evolves_to[0].species.name}`
    ));

  return {
    primeriaEvolucao,
    segundaEvolucao,
    terceiraEvolucao,
  };
}

const colorsType = {
  fire: "#fb926c",
  grass: "#48d0b0",
  bug: "#53d26e",
  normal: "#eab4c4",
  water: "#79bffe",
  poison: "#ae88dd",
  electric: "#ffd86f",
  ground: "#a9702d",
  fairy: "#ec2674",
  fighting: "#f0623a",
  psychic: "#ff73be",
  rock: "#7d7d7d",
  ghost: "#906791",
  ice: "#95d1eb",
  dragon: "#63cad9",
  dark: "#483c5c",
  steel: "#4dad8d",
  flying: "#9fb9cb",
};

let limit = 36;
let offset = 0;

const getPost = async url => {
  const api = await fetch(`https://pokeapi.co/api/v2/${url}`);
  return api.json();
};

const addDom = async () => {
  const pokemon = await getPost(`pokemon?limit=${limit}&offset=${offset}`);
  pokemon.results.map(item => {
    pokeImage(item.url);
  });
};

const pokeImage = async image => {
  const formatado = image.replace("https://pokeapi.co/api/v2/", "");
  const dados = await getPost(formatado);
  pokemonAll.innerHTML += `
    <div class="cardPokemon">
        <header>
            <h3>${dados.name}</h3>
            <span>${dados.id}</span>
        </header>
        <p data-type="${dados.types["0"].type.name}">${
    dados.types[0].type.name
  }</p>
        <p>${dados.types.length === 2 ? dados.types[1].type.name : ""}</p>
        <img class="pokeImage" src="${
          dados.sprites.other["official-artwork"].front_default
        }">    
    </div>
    `;
  click();
  colocandoCor();
};

const getNextPokemons = () => {
  setTimeout(() => {
    offset += 36;
    addDom();
  }, 300);
};

const removeLoader = () => {
  setTimeout(() => {
    loader.classList.remove("show");
    getNextPokemons();
  }, 1000);
};

const showLoader = () => {
  loader.classList.add("show");
  removeLoader();
};

const colocandoCor = () => {
  const p = document.querySelectorAll("p");

  p.forEach(item => {
    let card = item.parentElement;
    const type = item.getAttribute("data-type");

    card.style.background = colorsType[type];
  });
};

const search = async () => {
  type.style.display = "none";
  containerApi.innerHTML = "";
  const inputValue = input.value;
  const pokemon = await getPost(`pokemon/${inputValue}`);
  const species = pokemon.species.url;
  const speciesFormatado = species.replace("https://pokeapi.co/api/v2/", "");
  const oi = await getPost(speciesFormatado);
  const urlGeneration = oi.evolution_chain.url;
  const generationFormatado = urlGeneration.replace(
    "https://pokeapi.co/api/v2/",
    ""
  );
  const generation = await getPost(generationFormatado);

  const primeriaEvolucao =
    !!generation.chain.species.name &&
    (await getPost(`pokemon/${generation.chain.species.name}`));
  const segundaEvolucao =
    !!generation.chain.evolves_to[0] &&
    (await getPost(`pokemon/${generation.chain.evolves_to[0].species.name}`));
  const terceiraEvolucao =
    !!generation?.chain?.evolves_to[0]?.evolves_to[0] &&
    (await getPost(
      `pokemon/${generation.chain.evolves_to[0].evolves_to[0].species.name}`
    ));

  containerSearch.innerHTML = genereateEvolutionsView(
    pokemon,
    primeriaEvolucao,
    segundaEvolucao,
    terceiraEvolucao
  );
  colocandoCor();
};

input.addEventListener("keypress", e => {
  if (e.keyCode === 13) {
    search();
  }
});

buttonAll.addEventListener("click", () => {
  containerApi.innerHTML = "";
  addDom();
  window.addEventListener("scroll", () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      showLoader();
    }
  });
});

types.addEventListener("click", () => {
  containerApi.innerHTML = "";
  container.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    `;
  const names = document.querySelectorAll(".typeLink");
  names.forEach(item => {
    const index = item.getAttribute("data-id");
    const { url } = apiNames[index];
    item.addEventListener("click", async () => {
      const dados = await getPost(url);
      dados.pokemon.forEach(item => {
        typePokemon(item.pokemon.url);
      });
    });
  });
});

const typePokemon = async url => {
  type.style.display = "none";
  const formatado = url.replace("https://pokeapi.co/api/v2/", "");
  const dados = await getPost(formatado);
  pokemonAll.innerHTML += `
    <div class="cardPokemon">
        <header>
            <h3>${dados.name}</h3>
            <span>${dados.id}</span>
        </header>
        <p data-type="${dados.types["0"].type.name}">${
    dados.types[0].type.name
  }</p>
        <p>${dados.types.length === 2 ? dados.types[1].type.name : ""}</p>
        <img class="pokeImage" src="${
          dados.sprites.other["official-artwork"].front_default
        }">    
    </div>
    `;
  colocandoCor();
  click();
};

const click = async () => {
  const card = document.querySelectorAll(".cardPokemon");
  card.forEach(item => {
    item.addEventListener("click", async () => {
      pokemonAll.style.display = "none";
      const name = item.children;
      const namePokemon = name[0].children[0];
      const pokemon = await getPost(`pokemon/${namePokemon.innerText}`);
      const species = pokemon.species.url;
      const speciesFormatado = species.replace(
        "https://pokeapi.co/api/v2/",
        ""
      );
      const specie = await getPost(speciesFormatado);
      const urlGeneration = specie.evolution_chain.url;
      const generationFormatado = urlGeneration.replace(
        "https://pokeapi.co/api/v2/",
        ""
      );
      const generation = await getPost(generationFormatado);
      const { primeriaEvolucao, segundaEvolucao, terceiraEvolucao } =
        await getEvolutions(generation);

      containerSearch.innerHTML = genereateEvolutionsView(
        pokemon,
        primeriaEvolucao,
        segundaEvolucao,
        terceiraEvolucao
      );
      colocandoCor();
    });
  });
};

const randomNumbers = async (max = 898, min = 1) => {
  type.style.display = "none";
  containerApi.innerHTML = "";
  const random = Math.round(Math.random() * (max - min) + min);
  const pokemonRandom = await getPost(`pokemon/${random}`);
  const species = pokemonRandom.species.url;
  const speciesFormatado = species.replace("https://pokeapi.co/api/v2/", "");
  const specie = await getPost(speciesFormatado);
  const urlGeneration = specie.evolution_chain.url;
  const generationFormatado = urlGeneration.replace(
    "https://pokeapi.co/api/v2/",
    ""
  );
  const generation = await getPost(generationFormatado);
  const { primeriaEvolucao, segundaEvolucao, terceiraEvolucao } =
    await getEvolutions(generation);

  containerSearch.innerHTML = genereateEvolutionsView(
    pokemonRandom,
    primeriaEvolucao,
    segundaEvolucao,
    terceiraEvolucao
  );

  colocandoCor();
};

randomButton.addEventListener("click", () => {
  randomNumbers();
});
