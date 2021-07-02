import { Howl, Howler } from "howler";
import "regenerator-runtime/runtime";

const input__Search = document.getElementById("inputPokemon");
const btn__Search = document.querySelector(".btnSearch");
const pokeContainer = document.querySelector(".grid");
const musicBtn = document.getElementById("music__Btn");

let array = [];

const musicSrc = {
  overload: new Howl({
    src: [
      "../music/vlc-record-2021-05-31-08h18m09s-POKÉMON - All 20 theme songs with-",
    ],
    autoplay: true,
  }),
};

const pokemonNumber = 150;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const mainType = Object.keys(colors);

const fetch__Pokemon = async () => {
  for (let i = 1; i < pokemonNumber; i++) {
    await getpokemonAPI(i);
  }
};

btn__Search.addEventListener("click", createPokemonCard);

//need to fetch API
const getpokemonAPI = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();

  createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
  // console.log(pokemon);
  // let inputValue = input__Search.value;
  // console.log(pokemon.name);
  // console.log(inputValue);
  // let findPokemon = pokemon.find((name) => inputValue === name);
  // if (inputValue === pokemon.name) {
  //creating an element to create a card
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemonDiv");

  //taking all the type name of the pokemons
  const type = pokemon.types.map((el) => el.type.name);
  //type name index is searched and its index will be 0 others index will be -1
  //it will give the index which is greater than -1
  const colorType = mainType.find((cltype) => type.indexOf(cltype) > -1);

  //slicing the name
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  //taking the id from the pokemon json
  const pokemonInner = `
    <div class="img__Container">
        <img src= "https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name} /">
    </div> 
    <div class="pokemon__Description">
        <h3 class="pokemonName">${name}</h3>
        <span class="pokemonType">Type: ${colorType}</span>
    </div>`;

  //setting the value
  pokemonDiv.innerHTML = pokemonInner;

  //APPENDING THE CHILD
  pokeContainer.appendChild(pokemonDiv);

  // if (input__Search !== pokemon.name || input__Search.trim() === "") {
  //   const pokeDiv = document.createElement("div");
  //   pokeDiv.classList.add("noCardFound");

  //   const noCardInner = `<div class="noCard__Container">
  //     <h3>No Card Available</h3>
  //     <p>Please find other card</p>
  //   </div>`;
  //   pokeDiv.innerHTML = noCardInner;
  //   pokeContainer.appendChild(pokeDiv);
  // }
}

fetch__Pokemon();

function audioPlaying() {
  musicBtn.addEventListener("click", () => {
    if (!musicSrc.overload.playing()) {
      musicSrc
        .then((music) => {
          music.overload.play();
        })
        .catch((error) => {
          console.log("there is no music");
        });
    }
  });
}
