/* We insert in 'div id="app"' in index.html */
const html_app: HTMLElement | any = document.getElementById("app");
const html_app_inner = html_app.innerHTML;
const maxPokemonID: number = 151;

interface IPokemon {
    id: number;
    name: string;
    image: string;
}

/* Random integer in the interval [min,max] */
function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getPokemon = async (id: number, poke: IPokemon): Promise<void> => {
    let output: string = `
          <div class="loading_text"><h2><i>Loading Pokémon...</i></h2></div>
      `;
    html_app.innerHTML = html_app_inner + output;

    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon: any = await data.json()

    poke.id = pokemon.id;
    poke.name = pokemon.name;
    poke.image = `${pokemon.sprites.front_default}`;

    showPokemon(poke)
}

const showPokemon = (pokemon: IPokemon): void => {
    let output: string = `
          <div class="card">
              <span class="card--id">#${pokemon.id}</span>
              <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
          </div>
      `;
    html_app.innerHTML = html_app_inner + output;
}

const newPokemon = async function(): Promise<void>{
    let randID: number = randomIntFromInterval(0,maxPokemonID);
    while(pickedUp[randID] == true){
        randID = randomIntFromInterval(0,maxPokemonID);
    }
    pickedUp[randID] = true;
    await getPokemon( randID, ourPoke);
}

/*
const userNaming = (ele: HTMLElement): void => {
    if(event.key == 'Enter'){
        alert(ele.value);
    }
}
*/

let pickedUp: boolean[] = Array(maxPokemonID+1);
pickedUp.fill(false);
let pokes: Array<IPokemon> = [];
let mistakesPokes: number[] = Array(maxPokemonID+1);
mistakesPokes.fill(0); 
let ourPoke: IPokemon = {id: -1, name: "null", image: "null"};
newPokemon();