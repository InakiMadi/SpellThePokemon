const html_enter: HTMLElement | any = document.getElementById("enter")
const html_enter_inner = html_enter.innerHTML;
const html_hint: HTMLElement | any = document.getElementById("hint")
const html_hint_inner = html_hint.innerHTML;
const html_gal: HTMLElement | any = document.getElementById("gallery");
const html_gal_inner = html_gal.innerHTML;
const html_corr: HTMLElement | any = document.getElementById("howManyCorrect");
const html_corr_inner = html_corr.innerHTML;
const html_wro: HTMLElement | any = document.getElementById("howManyWrong");
const html_wro_inner = html_wro.innerHTML;

let PkmnCorrector = function(ourPokeNameM:string, userPokeNameM: string): boolean{
    let result: boolean = false;
    if(ourPokeNameM == "MR-MIME"){
        if(userPokeNameM == "MR. MIME"
           || userPokeNameM == "MR MIME"
           || userPokeNameM == "MRMIME"
           || userPokeNameM == "MR-MIME"
           || userPokeNameM == "MR.MIME"
           || userPokeNameM == "MISTER MIME"
           || userPokeNameM == "MISTER-MIME"
           || userPokeNameM == "MISTERMIME"){
                result = true;
        }
    }
    else if(ourPokeNameM == "NIDORAN-M"){
        if(userPokeNameM == "NIDORAN M"
           || userPokeNameM == "NIDORAN-M"
           || userPokeNameM == "NIDORAN MACHO"
           || userPokeNameM == "NIDORAN MALE"
           || userPokeNameM == "NIDORAN"){
                result = true;
        }
    }
    else if(ourPokeNameM == "NIDORAN-F"){
        if(userPokeNameM == "NIDORAN F"
           || userPokeNameM == "NIDORAN-F"
           || userPokeNameM == "NIDORAN HEMBRA"
           || userPokeNameM == "NIDORAN FEMALE"
           || userPokeNameM == "NIDORAN"
           || userPokeNameM == "NIDORAN H"
           || userPokeNameM == "NIDORAN-H"){
                result = true;
        }
    }
    return result;
}

let DisplayArray = function(arr: any[]): string{
    let result: string = "";
    for(let i: number = 0; i<arr.length; ++i){
        result += i + ": " + arr[i] + ", ";
    }
    return result;
}
let DisplayArrayPkmn = function(arr: any[]): string{
    let result: string = "";
    for(let i: number = 0; i<arr.length; ++i){
        result += i + ": " + arr[i].name + ", ";
    }
    return result;
}


let showGallery = function(arr: IPokemon[]): string{
    let output: string = "";
    for(let i: number = 0; i< arr.length; ++i){
        output += `<div class="card">
            <span class="card--id">#${arr[i].id}</span>
            <img class="card--image" src=${arr[i].image} alt=${arr[i].name} />
            <div class="card--name">${arr[i].name}</div>
        </div>`
    }
    return output;
}
let AddToGallery = function(): void{
    let newPoke: IPokemon = {
        id: ourPoke.id,
        name: ourPoke.name,
        image: ourPoke.image,
    };
    pokes.push(newPoke);
    pokes.sort( 
                function(a: IPokemon, b: IPokemon): number{
                    return (a.id - b.id);
                } 
    );
    html_gal.innerHTML = showGallery(pokes);
}



let HintDisplay = function(origMessage: string): string{
    let result: string = "";
    for(let i:number = 0; i<origMessage.length; ++i){
        result += origMessage[i] + " ";
    }
    return result;
}

let CreateHint = function(n: number): string{
    let result: string = "";
    for(let i:number = 0; i<n; ++i){
        result +=  "_";
    }
    return result;
}

let HintRandom = function(origMessage: string, changingMessage: string): string{
    let randPos:number = randomIntFromInterval(0,changingMessage.length-1);
    while(changingMessage[randPos] != "_"){
        randPos = randomIntFromInterval(0,origMessage.length-1);
    }
    let result: string = "";
    for(let i:number = 0; i<changingMessage.length; ++i){
        if(i == randPos){
            result += origMessage[i];
        }
        else{
            result += changingMessage[i];
        }
    }
    return result;
}


let CheckUserNaming = function(): void{
    let userPokeName: HTMLElement | any = document.getElementById("userPokeName");
    let output: string;
    let userPokeNameM: string = userPokeName.value.toUpperCase();
    let ourPokeNameM: string = ourPoke.name.toUpperCase();
    if(mistakes == 0){
        hint = CreateHint(ourPokeNameM.length);
    }

    if( PkmnCorrector(ourPokeNameM,userPokeNameM) || userPokeName.value.toUpperCase() == ourPoke.name.toUpperCase() ){
        totalCorrect++;
        output = `
            <div class="correct"><i>Correct !</i></div>
        `;
        let output_corrs: string = `Correct: ${totalCorrect}`
        userPokeName.value = "";
        hint = "";
        mistakes = 0;
        html_corr.innerHTML = output_corrs;
        html_hint.innerHTML = html_hint_inner;
        html_enter.innerHTML = html_enter_inner + output;
        AddToGallery();
        newPokemon();
    }
    else{
        totalMistakes++;
        mistakesPokes[ourPoke.id]++;
        output = `
            <div class="false"><i>Wrong... Try again.</i></div>
        `;
        let output_wro: string = `Mistakes: ${totalMistakes}`
        html_wro.innerHTML = output_wro;
        if(mistakes < ourPokeNameM.length){
            html_hint.innerHTML = html_hint_inner;
            hint = HintRandom(ourPokeNameM,hint);
            let output_hint: string = `<div class="hint">${HintDisplay( hint )}</div>`;
            html_hint.innerHTML += output_hint;
        }
        mistakes++;
        html_enter.innerHTML = html_enter_inner + output;
    }
}



let KeyPressed = function(e:KeyboardEvent): void{
    if(e.key == "Enter"){
        CheckUserNaming();
    }
}

let hint: string = "";
let totalMistakes: number = 0;
let mistakes: number = 0;
let totalCorrect: number = 0;

const btn: HTMLElement | any = document.getElementById("enterButton");
btn.addEventListener("click", (e:Event) => CheckUserNaming());