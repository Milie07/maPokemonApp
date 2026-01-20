/*
** Module TypeColors.js
** Gestion des couleurs de fond en fonction du type de Pokémon
[x] Adapter la couleur du fond de la carte en fonction du type de Pokémon
*/

class TypeColors {
  // Gestion du background de la carte en fonction du type de pokémon
  static getGoodColorType(type) {
    switch (type) {
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
}

export { TypeColors };
