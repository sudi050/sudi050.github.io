let guessesRemaining = 5;
let currentGuess = [];
let nextLetter = 0;
let word = "hello";
var dict = {};
for (let i = 0; i < word.length; i++) {
  if (dict[word[i]] === undefined) {
    dict[word[i]] = 1;
    } else {    
    dict[word[i]] += 1;
  }
}
console.log("Connected") 
document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        check()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("row")[5 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter () {
    let row = document.getElementsByClassName("row")[5 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function check(){
    dictcopy = Object.assign({}, dict)
    console.log(dictcopy)
    let guess = currentGuess.join("")
    console.log(guess)
    for (let i = 0; i < 5; i++) {
        if (guess[i] === word[i] && dictcopy[guess[i]] > 0) {
            dictcopy[guess[i]] -= 1
            markgreen(i)
            markkeyboard(guess[i], "green")
        }
    }
    for (let i = 0; i < 5; i++) {
        if (word.includes(guess[i]) && dictcopy[guess[i]] > 0 && guess[i] !== word[i]) {
                dictcopy[guess[i]] -= 1
                markyellow(i)
                markkeyboard(guess[i], "yellow")
            }
            
        else if (guess[i] !== word[i]) {
            markkeyboard(guess[i], "grey")
        }
    }
    if (guess === word) {
        alert("You win!")
    }
    guessesRemaining -= 1
    currentGuess = []
    nextLetter = 0
    if (guessesRemaining === 0) {
        alert("You lose!")
    }
}

function markgreen (index) {
    console.log(index)
    document.getElementsByClassName("row")[5-guessesRemaining].children[index].style.backgroundColor = "green"
}

function markyellow (index) {
    console.log(index)
    document.getElementsByClassName("row")[5-guessesRemaining].children[index].style.backgroundColor = "yellow"
}

function markkeyboard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter.toUpperCase()) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}