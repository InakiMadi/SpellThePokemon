"use strict";
const html_enter = document.getElementById("enter");
const html_enter_inner = html_enter.innerHTML;
const html_hint = document.getElementById("hint");
const html_hint_inner = html_hint.innerHTML;
const html_gal = document.getElementById("gallery");
const html_gal_inner = html_gal.innerHTML;
const html_corr = document.getElementById("howManyCorrect");
const html_corr_inner = html_corr.innerHTML;
const html_wro = document.getElementById("howManyWrong");
const html_wro_inner = html_wro.innerHTML;
let PkmnCorrector = function (ourPokeNameM, userPokeNameM) {
    let result = false;
    if (ourPokeNameM == "MR-MIME") {
        if (userPokeNameM == "MR. MIME"
            || userPokeNameM == "MR MIME"
            || userPokeNameM == "MRMIME"
            || userPokeNameM == "MR-MIME"
            || userPokeNameM == "MR.MIME"
            || userPokeNameM == "MISTER MIME"
            || userPokeNameM == "MISTER-MIME"
            || userPokeNameM == "MISTERMIME") {
            result = true;
        }
    }
    else if (ourPokeNameM == "NIDORAN-M") {
        if (userPokeNameM == "NIDORAN M"
            || userPokeNameM == "NIDORAN-M"
            || userPokeNameM == "NIDORAN MACHO"
            || userPokeNameM == "NIDORAN MALE"
            || userPokeNameM == "NIDORAN") {
            result = true;
        }
    }
    else if (ourPokeNameM == "NIDORAN-F") {
        if (userPokeNameM == "NIDORAN F"
            || userPokeNameM == "NIDORAN-F"
            || userPokeNameM == "NIDORAN HEMBRA"
            || userPokeNameM == "NIDORAN FEMALE"
            || userPokeNameM == "NIDORAN"
            || userPokeNameM == "NIDORAN H"
            || userPokeNameM == "NIDORAN-H") {
            result = true;
        }
    }
    return result;
};
let DisplayArray = function (arr) {
    let result = "";
    for (let i = 0; i < arr.length; ++i) {
        result += i + ": " + arr[i] + ", ";
    }
    return result;
};
let DisplayArrayPkmn = function (arr) {
    let result = "";
    for (let i = 0; i < arr.length; ++i) {
        result += i + ": " + arr[i].name + ", ";
    }
    return result;
};
let showGallery = function (arr) {
    let output = "";
    for (let i = 0; i < arr.length; ++i) {
        output += `<div class="card">
            <span class="card--id">#${arr[i].id}</span>
            <img class="card--image" src=${arr[i].image} alt=${arr[i].name} />
            <div class="card--name">${arr[i].name}</div>
        </div>`;
    }
    return output;
};
let AddToGallery = function () {
    if (!addedGallery[ourPoke.id]) {
        let newPoke = {
            id: ourPoke.id,
            name: ourPoke.name,
            image: ourPoke.image,
        };
        pokes.push(newPoke);
        pokes.sort(function (a, b) {
            return (a.id - b.id);
        });
        addedGallery[newPoke.id] = true;
        html_gal.innerHTML = showGallery(pokes);
    }
};
let HintDisplay = function (origMessage) {
    let result = "";
    for (let i = 0; i < origMessage.length; ++i) {
        result += origMessage[i] + " ";
    }
    return result;
};
let CreateHint = function (n) {
    let result = "";
    for (let i = 0; i < n; ++i) {
        result += "_";
    }
    return result;
};
let HintRandom = function (origMessage, changingMessage) {
    let randPos = randomIntFromInterval(0, changingMessage.length - 1);
    while (changingMessage[randPos] != "_") {
        randPos = randomIntFromInterval(0, origMessage.length - 1);
    }
    let result = "";
    for (let i = 0; i < changingMessage.length; ++i) {
        if (i == randPos) {
            result += origMessage[i];
        }
        else {
            result += changingMessage[i];
        }
    }
    return result;
};
let CheckUserNaming = function () {
    let userPokeName = document.getElementById("userPokeName");
    let output;
    let userPokeNameM = userPokeName.value.toUpperCase();
    let ourPokeNameM = ourPoke.name.toUpperCase();
    if (mistakes == 0) {
        hint = CreateHint(ourPokeNameM.length);
    }
    if (PkmnCorrector(ourPokeNameM, userPokeNameM) || userPokeName.value.toUpperCase() == ourPoke.name.toUpperCase()) {
        totalCorrect++;
        output = `
            <div class="correct"><i>Correct !</i></div>
        `;
        let output_corrs = `Correct: ${totalCorrect}`;
        userPokeName.value = "";
        hint = "";
        mistakes = 0;
        html_corr.innerHTML = output_corrs;
        html_hint.innerHTML = html_hint_inner;
        html_enter.innerHTML = html_enter_inner + output;
        AddToGallery();
        newPokemon();
    }
    else {
        totalMistakes++;
        mistakesPokes[ourPoke.id]++;
        output = `
            <div class="false"><i>Wrong... Try again.</i></div>
        `;
        let output_wro = `Mistakes: ${totalMistakes}`;
        html_wro.innerHTML = output_wro;
        if (mistakes < ourPokeNameM.length) {
            html_hint.innerHTML = html_hint_inner;
            hint = HintRandom(ourPokeNameM, hint);
            let output_hint = `<div class="hint">${HintDisplay(hint)}</div>`;
            html_hint.innerHTML += output_hint;
        }
        mistakes++;
        html_enter.innerHTML = html_enter_inner + output;
    }
};
let KeyPressed = function (e) {
    if (e.key == "Enter") {
        if (!gameFinished)
            CheckUserNaming();
        else {
            let output = `
                <div class="correct">
                 Game is over. Thank you for playing! (Refresh to restart!)
                </div>
            `;
            html_enter.innerHTML = html_enter_inner + output;
        }
    }
};
let hint = "";
let totalMistakes = 0;
let mistakes = 0;
let totalCorrect = 0;
const btn = document.getElementById("enterButton");
btn.addEventListener("click", (e) => CheckUserNaming());
