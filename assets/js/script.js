let xp = 1;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Graveto"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: " Graveto", power: 5 },
  { name: " Adaga", power: 30 },
  { name: " Bastão", power: 50 },
  { name: " Espada", power: 100 },
];

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

const goTown = () => update(locations[0]);

const goStore = () => update(locations[1]);

const goCave = () => update(locations[2]);

const goFight = () => {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
};

const defeatMonster = () => {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
};

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function easterEgg() {
  update(locations[7]);
}

const fightSlime = () => {
  fighting = 0;
  goFight();
};

const fightBeast = () => {
  fighting = 1;
  goFight();
};

const fightDragon = () => {
  fighting = 2;
  goFight();
};

const buyHealth = () => {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "Você comprou 10 pontos de vida.";
  } else {
    text.innerText = "Você não tem dinheiro suficiente para comprar vida.";
  }
};

const buyWeapon = () => {
  if (currentWeapon < weapons.length - 1)
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Você tem uma nova arma: " + newWeapon + ".\n";
      inventory.push(newWeapon);
      text.innerText += " No seu inventário você tem: " + inventory;
    } else {
      text.innerText = "Você não tem moedas suficientes para comprar uma arma.";
    }
  else {
    text.innerText = "Você já tem a melhor arma do jogo.";
    button2.innerText = "Vender armamento por 15 moedas";
    button2.onclick = sellWeapon;
  }
};

const sellWeapon = () => {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Você vendeu: " + currentWeapon + ".\n";
    text.innerText += " No seu inventário você tem: " + inventory;
  } else {
    text.innerText =
      "Não pode vender sua única arma. " + "Arma no inventario: " + inventory;
  }
};

const attack = () => {
  text.innerText = monsters[fighting].name + " ataca.\n";
  text.innerText +=
    " Você atacou com um " + weapons[currentWeapon].name + ".\n";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " Você errou.";
  }
  const life = health <= 0 ? 0 : health;
  healthText.innerText = life;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += inventory.pop() + " quebrou.\n";
    currentWeapon--;
  }
};

const isMonsterHit = () => {
  return Math.random() > 0.2 || health < 20;
};

const getMonsterAttackValue = (level) => {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
};

const dodge = () => {
  text.innerText = "Você desvia do ataque do " + monsters[fighting].name;
};

const restart = () => {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Graveto"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
};

const pick = (guess) => {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText =
    "Você escolheu " + guess + ". Aqui estão os números aleatórios: \n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Certo! Você ganhou 20 moedas!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Errado! Você perdeu 10 pontos de vida!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
};

const pickTwo = () => {
  pick(2);
};

const pickEight = () => {
  pick(8);
};

const locations = [
  {
    name: "Praça da cidade",
    "button text": [
      "Ir para a loja",
      "Ir para a gruta",
      "Lutar contra o dragão",
    ],
    "button functions": [goStore, goCave, fightDragon],
    text: "Você está na praça da cidade. Para onde você quer ir?",
  },
  {
    name: "Loja",
    "button text": [
      "10 pontos de saúde (10 moedas)",
      "Armamento (30 moedas)",
      "Ir para a praça",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Você está na loja. O que deseja comprar ?",
  },
  {
    name: "Gruta",
    "button text": [
      "Lutar contra o slime",
      "Lutar contra a besta feroz",
      "Ir para a praça da cidade",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Você entra na caverna. \nVocê vê alguns monstros.",
  },
  {
    name: "Luta",
    "button text": ["Ataque", "Esquiva", "Fugir"],
    "button functions": [attack, dodge, goTown],
    text: "Você está lutando contra o monstro.",
  },
  {
    name: "Monstro derrotado",
    "button text": [
      "Ir para a praça da cidade",
      "Ir para a praça da cidade",
      "Ir para a praça da cidade",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: "O monstro foi derrotado! Você ganhou pontos de experiência e encontrou moedas.",
  },
  {
    name: "perdeu",
    "button text": ["REINICIAR?", "REINICIAR?", "REINICIAR?"],
    "button functions": [restart, restart, restart],
    text: "Você morreu. ☠️",
  },
  {
    name: "win",
    "button text": ["REINICIAR?", "REINICIAR?", "REINICIAR?"],
    "button functions": [restart, restart, restart],
    text: "Você derrotou o dragão e VENCEU O JOGO!!! 🎉",
  },
  {
    name: "easter",
    "button text": ["2", "8", "Ir para a praça da cidade?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Você encontrou um jogo secreto. Escolha um número acima. Dez números serão escolhidos aleatoriamente entre 0 e 10. Se o número que você escolheu corresponder a um dos números aleatórios, você ganha!",
  },
];

const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15,
  },
  {
    name: "Besta feroz",
    level: 8,
    health: 60,
  },
  {
    name: "Dragão",
    level: 20,
    health: 300,
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
