/*
** Module AutoSuggestion.js
** Gestion de l'auto-suggestion de noms de Pokémon
[x]: Proposer des suggestions de noms de Pokémon au fur et à mesure de la saisie
[x]: Gestion de l'accessibilité avec saisie clavier 
*/

class AutoSuggestion {
  constructor(input, pokemons) {
    this.input = input;
    this.pokemons = pokemons;
    this.suggestionsBox = null;
    this.selectedIndex = -1;
  }

  // Gestion de l'auto-suggestion de nom de Pokemon à la recherche
  initAutoSuggestion() {
    this.suggestionsBox = document.createElement("ul");
    this.suggestionsBox.className = "suggestions";
    this.input.insertAdjacentElement("afterend", this.suggestionsBox);
    this.selectedIndex = -1;

    this.input.addEventListener("input", () => {
      this.selectedIndex = -1;
      const autoInput = this.input.value.trim().toLowerCase();
      this.suggestionsBox.innerHTML = "";

      const results = this.pokemons.filter((poke) =>
        poke.name?.fr?.toLowerCase().includes(autoInput)
      );
      results.forEach((poke) => {
        const pokeItem = document.createElement("li");
        pokeItem.textContent = poke.name.fr;
        pokeItem.addEventListener("click", () => {
          this.input.value = poke.name.fr;
          this.suggestionsBox.innerHTML = "";
        });
        this.suggestionsBox.appendChild(pokeItem);
      });
    });
    this.input.addEventListener("keydown", (e) => {
      const items = this.suggestionsBox.querySelectorAll("li");
      if (!items.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
      } else if (e.key === "Enter" && this.selectedIndex >= 0) {
        e.preventDefault();
        this.input.value = items[this.selectedIndex].textContent;
        this.suggestionsBox.innerHTML = "";
        this.input.focus();
        return;
      }
      items.forEach((item, i) => {
        item.classList.toggle("selected", i === this.selectedIndex);
      });
    });
  }
}

export { AutoSuggestion };
