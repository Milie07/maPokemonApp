/* 
** Module SearchPokemon.js
[x] Rechercher un Pokémon en tapant son nom
[x] Afficher le nom, l'image, les types et Evolutions du Pokémon recherché
[X] Gérer le cas où le Pokémon n'existe pas et afficher le message d'erreur
[x] Réinitialiser le formulaire et supprimer les résultats affichés
[x] Sanitizer les entrées utilisateur -> utilisation de TextContent à la place d'innerHTML
[X] Afficher les résultats dans une carte stylisée avec du CSS
[]Bonus : Proposer des suggestions de noms de Pokémon au fur et à mesure de la saisie
[]Bonus : enregistrer les recherches précédentes et les afficher sur le coté du formulaire
*/

class SearchPokemon {
  constructor() {
    this.form = document.querySelector("form");
    this.input = document.querySelector("input");
    this.pokemons = [];

    this.errorMessage = document.createElement("p");
    this.form.insertAdjacentElement("afterend", this.errorMessage);

    this.init();
    this.resetDiv();
  }
  // Initialisation du module
  async init() {
    await this.getPokemons();
    this.watchUserInput();
  }
  // Ecoute de la saisie utilisateur
  watchUserInput() {
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.getPokemonsData();
    });
  }
  // Récupération des données JSON
  async getPokemons() {
    const response = await fetch("https://tyradex.vercel.app/api/v1/pokemon")
    this.pokemons = await response.json();
  }
  // Récupération des infos du Pokémon recherché
  getPokemonsData() {
    const pokemonsName = this.input.value.trim();
    const pokemonData = this.getDataToLower(pokemonsName);
    if (pokemonData) {
      this.showErrorMessage();
      const name = pokemonData.name.fr;
      const sprite = pokemonData.sprites.regular;
      const typeName = pokemonData.types.map( type => type.name).join(" / ");
      const primaryType = pokemonData.types[0].name; // Premier type du Pokémon
      const evolutions = pokemonData.evolution?.next?.map( evol => evol.name).join(" → ") || "Dernier stade d'évolution";
      
      // Création de la carte Pokémon
      const newCard = document.createElement("div");
      newCard.classList = "cardPokemon";
      newCard.style.backgroundColor = this.getGoodColorType(primaryType);
      // Ajout de l'image du Pokémon
      const imgPokemon = document.createElement("img");
      imgPokemon.className = "cardPokemon_img";
      imgPokemon.src = sprite;
      imgPokemon.alt = name;
      // Ajout du titre/nom du Pokémon
      const namePokemon = document.createElement("h2");
      namePokemon.className = "cardPokemon_name";
      namePokemon.textContent = name;
      // Ajout du Type du Pokémon
      const typePokemon = document.createElement("p");
      typePokemon.className = "cardPokemon_type";
      typePokemon.textContent = `Type : ${typeName}`;
      // Ajout des évolutions
      const evolPokemon = document.createElement("p");
      evolPokemon.className = "cardPokemon_evolution";
      evolPokemon.textContent = `Evolutions : ${evolutions}`;

      newCard.append(imgPokemon, namePokemon, typePokemon, evolPokemon);
      document.querySelector(".cards").appendChild(newCard);
      
    } else {
        this.showErrorMessage("Pokémon non trouvé");
    }
  }
  // Gestion du background de la carte en fonction du type de pokémon
  getGoodColorType(type) {
    switch(type) {
      case "Normal":
        return "#A8A878";
      case "Feu":
        return "#F08030";
      case "Eau":
        return "#6890F0";
      case "Plante":
        return "#78C850";
      case "Électrik":
        return "#F8D030";
      case "Glace":
        return "#98D8D8";
      case "Combat":
        return "#C03028";
      case "Poison":
        return "#A040A0";
      case "Sol":
        return "#E0C068";
      case "Vol":
        return "#A890F0";
      case "Psy":
        return "#F85888";
      case "Insecte":
        return "#A8B820";
      case "Roche":
        return "#B8A038";
      case "Spectre":
        return "#705898";
      case "Dragon":
        return "#7038F8";
      case "Ténèbres":
        return "#705848";
      case "Acier":
        return "#B8B8D0";
      case "Fée":
        return "#EE99AC";
      default:
        return "#FFFFFF";
    }
  }
  // Gérer les erreurs de saisie 
  showErrorMessage(message ="") {
    this.errorMessage.textContent = message;
  }
  // Passer la saisie utilisateur en minuscules pour la comparaison +
  getDataToLower(inputPokeName) {
    const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const inputClean = removeAccents(inputPokeName.toLowerCase())
    const data = this.pokemons.find(pokeObject => removeAccents(pokeObject.name.fr.toLowerCase()) === inputClean);
    return data;
  }
  // Réinitialisation du formulaire et suppression des résultats affichés
  resetDiv() {
    this.form.reset();
    this.form.addEventListener("reset", () => {
      const divs = document.querySelectorAll("div");
      divs.forEach( div => div.remove() );
    })
  }
}


export { SearchPokemon };
