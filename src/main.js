// Some useful variables
let pokemon;
let right = 0;
let wrong = 0;

// Function to request pokemon data
const getPokemon = async (pokeID) => {
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokeID}`,
      options
    );
    const poke = await response.json();
    return poke;
  } catch (e) {
    return console.log("Api Error: " + e.message);
  }
};

// Generates random pokemon ID
const randPokeId = () => {
  return Math.floor(Math.random() * 893) + 1;
};

// Draw the pokemon on the canvas
const drawImg = (source, black = false) => {
  var canvas = document.getElementById("pokeImg");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = source;
  img.onload = function (e) {
    // Clear and draw an new image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 10, 10, 400, 400);

    // Transforms the image to hide the pokemon
    if (black) {
      var pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pixelData.data.length; i += 4) {
        pixelData.data[i] = 0;
        pixelData.data[i + 1] = 0;
        pixelData.data[i + 2] = 0;
      }
      ctx.putImageData(pixelData, 0, 0);
    }
  };
};

// Change the current pokemon
const changePoke = async () => {
  let pokemonId = randPokeId();
  pokemon = await getPokemon(pokemonId);
  drawImg(pokemon.sprites.front_default, true);
};

// Submit pokemon name
const submit = () => {
  let pog = document.getElementById("pokeInput").value.toLowerCase();
  response(pog == pokemon.name);
};

// Code response to the submit
const response = (valor) => {
  drawImg(pokemon.sprites.front_default);
  let bord = document.getElementById("pbox");
  let but = document.getElementById("but");

  if (valor) {
    bord.style.border = "10px solid #22ff00";
    but.style.backgroundColor = "#22ff00";
    but.innerText = "New";
    right++;
  } else {
    bord.style.border = "10px solid #ff9900";
    but.style.backgroundColor = "#ff9900";
    but.innerText = "New";
    wrong++;
  }

  but.onclick = newPoke;
};

// Generates new pokemon on the page
const newPoke = () => {
  document.getElementById("pbox").style.border = "";
  document.getElementById("but").style.backgroundColor = "#1b1d1c";
  document.getElementById("but").innerText = "Submit";
  document.getElementById("but").onclick = submit;
  changePoke();
};

// INIT
changePoke();
