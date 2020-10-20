"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* We insert in 'div id="app"' in index.html */
const html_app = document.getElementById("app");
const html_app_inner = html_app.innerHTML;
const maxPokemonID = 151;
/* Random integer in the interval [min,max] */
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const getPokemon = (id, poke) => __awaiter(void 0, void 0, void 0, function* () {
    let output = `
          <div class="loading_text"><h2><i>Loading Pokémon...</i></h2></div>
      `;
    html_app.innerHTML = html_app_inner + output;
    const data = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = yield data.json();
    poke.id = pokemon.id;
    poke.name = pokemon.name;
    poke.image = `${pokemon.sprites.front_default}`;
    showPokemon(poke);
});
const showPokemon = (pokemon) => {
    let output = `
          <div class="card">
              <span class="card--id">#${pokemon.id}</span>
              <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
          </div>
      `;
    html_app.innerHTML = html_app_inner + output;
};
const newPokemon = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let randID = randomIntFromInterval(0, maxPokemonID);
        while (pickedUp[randID] == true) {
            randID = randomIntFromInterval(0, maxPokemonID);
        }
        pickedUp[randID] = true;
        yield getPokemon(randID, ourPoke);
    });
};
/*
const userNaming = (ele: HTMLElement): void => {
    if(event.key == 'Enter'){
        alert(ele.value);
    }
}
*/
let pickedUp = Array(maxPokemonID + 1);
pickedUp.fill(false);
let pokes = [];
let mistakesPokes = Array(maxPokemonID + 1);
mistakesPokes.fill(0);
let ourPoke = { id: -1, name: "null", image: "null" };
newPokemon();
