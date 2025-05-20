// Lancer de dés
function rollTheDice() {
    let numberDices = document.getElementsByClassName("newDices").length;
    let total = 0;

    for (let i = 0; i < numberDices; i++) {
        let result = Math.floor((Math.random() * 6) + 1);
        const element = document.querySelector("img#dice" + i);
        element.setAttribute("src", "assets/dices6/6dice" + result + ".png");
        element.setAttribute("data-random", result); // Ajout de l'attribut data-random avec la valeur du dé
        total += result;
    }

    // Met à jour le total des dés
    updateTotalDice();
}

// Ajout de dés
function addDice() {
    let numberDices = document.getElementsByClassName("newDices").length;

    let newDice = document.createElement("img");
    newDice.setAttribute("class", "newDices");
    newDice.setAttribute("id", "dice" + numberDices);
    newDice.setAttribute("src", "assets/dices6/6dice1.png"); // Image par défaut
    newDice.setAttribute("alt", "dé " + (numberDices + 1));
    newDice.setAttribute("data-random", 1); // Initialise l'attribut data-random avec la valeur 1

    document.querySelector(".dices").appendChild(newDice);

    // Met à jour le compteur de dés
    updateDiceCounter();

    // Met à jour le total des dés
    updateTotalDice();
}

// Supprimer un dé
function delDice() {
    let numberDices = document.getElementsByClassName("newDices").length;

    // Vérifiez s'il y a au moins un dé à supprimer
    if (numberDices > 1) {
        // Sélectionnez le dernier dé ajouté (ou ajustez la logique en fonction de vos besoins)
        let lastDice = document.querySelector(".newDices:last-child");

        // Supprimez le dé
        lastDice.parentNode.removeChild(lastDice);

        // Met à jour le compteur de dés
        updateDiceCounter();

        // Met à jour le total des dés
        updateTotalDice();
    }
}

// Fonction pour mettre à jour le compteur de dés
function updateDiceCounter() {
    let numberDices = countDice();
    document.querySelector(".diceNumber").textContent = numberDices;
}

// Fonction pour compter le nombre de dés
function countDice() {
    return document.getElementsByClassName("newDices").length;
}

// Fonction pour mettre à jour le total des dés
function updateTotalDice() {
    let numberDices = countDice();
    let total = 0;

    for (let i = 0; i < numberDices; i++) {
        let result = parseInt(document.querySelector("img#dice" + i).getAttribute("data-random")) || 1;
        total += result;
    }

    // Afficher le résultat total des dés
    displayTotalResult(total);
}

// Résultat total des dés
function displayTotalResult(total) {
    const resultDisplay = document.querySelector(".totalResult");
    resultDisplay.textContent = total;
}

// Appel initial pour mettre à jour le compteur de dés
updateDiceCounter();



///////////////////////////////////TEST PANNEAUX///////////////////////////////

class TabsManual {
    constructor(groupNode) {
      this.tablistNode = groupNode;
  
      this.tabs = [];
  
      this.firstTab = null;
      this.lastTab = null;
  
      this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
      this.tabpanels = [];
  
      for (var i = 0; i < this.tabs.length; i += 1) {
        var tab = this.tabs[i];
        var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));
  
        tab.tabIndex = -1;
        tab.setAttribute('aria-selected', 'false');
        this.tabpanels.push(tabpanel);
  
        tab.addEventListener('keydown', this.onKeydown.bind(this));
        tab.addEventListener('click', this.onClick.bind(this));
  
        if (!this.firstTab) {
          this.firstTab = tab;
        }
        this.lastTab = tab;
      }
  
      this.setSelectedTab(this.firstTab);
    }
  
    setSelectedTab(currentTab) {
      for (var i = 0; i < this.tabs.length; i += 1) {
        var tab = this.tabs[i];
        if (currentTab === tab) {
          tab.setAttribute('aria-selected', 'true');
          tab.removeAttribute('tabindex');
          this.tabpanels[i].classList.remove('is-hidden');
        } else {
          tab.setAttribute('aria-selected', 'false');
          tab.tabIndex = -1;
          this.tabpanels[i].classList.add('is-hidden');
        }
      }
    }
  
    moveFocusToTab(currentTab) {
      currentTab.focus();
    }
  
    moveFocusToPreviousTab(currentTab) {
      var index;
  
      if (currentTab === this.firstTab) {
        this.moveFocusToTab(this.lastTab);
      } else {
        index = this.tabs.indexOf(currentTab);
        this.moveFocusToTab(this.tabs[index - 1]);
      }
    }
  
    moveFocusToNextTab(currentTab) {
      var index;
  
      if (currentTab === this.lastTab) {
        this.moveFocusToTab(this.firstTab);
      } else {
        index = this.tabs.indexOf(currentTab);
        this.moveFocusToTab(this.tabs[index + 1]);
      }
    }
  
    /* EVENT HANDLERS */
  
    onKeydown(event) {
      var tgt = event.currentTarget,
        flag = false;
  
      switch (event.key) {
        case 'ArrowLeft':
          this.moveFocusToPreviousTab(tgt);
          flag = true;
          break;
  
        case 'ArrowRight':
          this.moveFocusToNextTab(tgt);
          flag = true;
          break;
  
        case 'Home':
          this.moveFocusToTab(this.firstTab);
          flag = true;
          break;
  
        case 'End':
          this.moveFocusToTab(this.lastTab);
          flag = true;
          break;
  
        default:
          break;
      }
  
      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  
    // Since this example uses buttons for the tabs, the click onr also is activated
    // with the space and enter keys
    onClick(event) {
      this.setSelectedTab(event.currentTarget);
    }
  }
  
  // Initialize tablist
  
  window.addEventListener('load', function () {
    var tablists = document.querySelectorAll('[role=tablist].manual');
    for (var i = 0; i < tablists.length; i++) {
      new TabsManual(tablists[i]);
    }
  });