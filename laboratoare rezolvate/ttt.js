var player = prompt("Hai să jucăm X și 0. Cum te cheamă?");
var playerSymbol = prompt(`Bună, ${player}. Cu ce vrei să joci? X sau 0? X începe primul.`);
var computerSymbol = playerSymbol === "X" ? "0" : "X";
var tabla = Array(9).fill("?");

function printtt(tabla) {
    let display = "";
    for (let i = 0; i < 9; i++) {
        display += tabla[i] === "?" ? ` ${i + 1} ` : ` ${tabla[i]} `;
        display += (i % 3 === 2) ? "\n" : "|";
    }
    alert(display);  
}

function UrmMiscare() {
    printtt(tabla);
    return prompt("Unde vrei să pui următorul semn?");
}

function valid(position) {
    let pos = parseInt(position) - 1;
    return pos >= 0 && pos < 9 && tabla[pos] === "?"; 
}

function win(symbol) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linii
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // coloane
        [0, 4, 8], [2, 4, 6]             // diagonale
    ];
    return winningCombinations.some(combo => 
        combo.every(index => tabla[index] === symbol)
    );
}

function draw() {
    return tabla.every(cell => cell !== "?");
}


while (true) {
    let position = UrmMiscare();
    if (valid(position)) {
        tabla[parseInt(position) - 1] = playerSymbol;

        
        if (win(playerSymbol)) {
            alert(`Bravo, ${player}, ai câștigat!`);
            break;
        } else if (draw()) {
            alert("Remiză!");
            break;
        }

        
        let computerMove;
        do {
            computerMove = Math.floor(Math.random() * 9) + 1;
        } while (!valid(computerMove));
        
        tabla[computerMove - 1] = computerSymbol;
        
        if (win(computerSymbol)) {
            alert("Ai pierdut :( ");
            break;
        } else if (draw()) {
            alert("Remiză!");
            break;
        }
    } else {
        alert("Poziție invalidă. Încearcă din nou.");
    }
}
