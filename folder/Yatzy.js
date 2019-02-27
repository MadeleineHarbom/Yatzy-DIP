let hold = [false, false, false, false, false];
let values = [1, 1, 1, 1, 1];
let throwCount = 0;
let frequency = [0, 0, 0, 0, 0, 0];
let fillerCount = 15;

scores = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    sum: 0,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    total: 0
};

function checkGameOver() {
    if (fillerCount === 0) {
        alert(`Game over! Your score is ${scores['total']}`);
    }
}

function postTurn() {
    fillerCount--;
    updateTotal();
    checkGameOver();
    throwCount = 0;
    checkForBonus();
    unholdDice();
}


let faceimgs = ["../pics/die1.png", "../pics/die2.png", "../pics/die3.png",
    "../pics/die4.png", "../pics/die5.png", "../pics/die6.png"];
let dice = document.querySelectorAll(".die");


for (let i = 0; i < 5; i++) {
    dice[i].firstChild.src = faceimgs[i];
    dice[i].onclick = () => {
        hold[i] = !hold[i];
        if (hold[i]) {
            dice[i].className = "diehold";

        }
        else {
            dice[i].className = "die";
        }
    }
}

let rollbutton = document.getElementById("rollbtn");
rollbutton.onclick = throwDice;
addButtonFunctions();

function unholdDice(){
    dice.forEach((die) => {
        die.className = "die";
    });
    hold = [false, false, false, false, false];
}

function updateDice() {
    for (let i = 0; i < 5; i++) {
        dice[i].firstChild.src = faceimgs[values[i] - 1];
    }

}

function updateScores() {
    let field;
    freqFaceValue();
    for (let face = 1; face <= 6; face++) {
        if (scores[`${face}`] == null) {
            field = document.getElementById(`form${face}`);
            field.innerHTML = valueSpecificFace(face)
        }

    }

    if (scores[`7`] == null) {
        field = document.getElementById("form1p");
        field.innerText = valueOnePair();
    }
    if (scores[`8`] == null) {
        field = document.getElementById("form2p");
        field.innerText = valueTwoPair(); //WTF?
    }
    if (scores[`9`] == null) {
        field = document.getElementById("form3some");
        field.innerText = valueThree(); //WTF?
    }
    if (scores["10"] == null) {
        field = document.getElementById("form4some");
        field.innerText = valueFour();
    }

    if (scores["11"] == null) {
        field = document.getElementById("formFullHouse");
        field.innerText = valueFullHouse();
    }
    if (scores["12"] == null) {
        field = document.getElementById("formSS");
        field.innerText = valueSmallStraight();
    }

    if (scores["13"] == null) {
        field = document.getElementById("formLS");
        field.innerText = valueLargeStraight();
    }

    if (scores["14"] == null) {
        field = document.getElementById("formChance");
        field.innerText = valueChance();
    }

    if (scores["15"] == null) {
        field = document.getElementById("formYatzi");
        field.innerText = valueYatzy();
    }

    field = document.getElementById("total");
    field.innerText = scores['total'];
    field = document.getElementById('sum');
    field.innerText = scores['sum'];


}

function updateTotal() {
    let tot = document.getElementById('total');
    tot.innerText = scores['total'];
}

function checkForBonus() {
    if (scores['bonus'] !==  null) {
        if (scores['sum'] >= 63) {
            scores['bonus'] = 50;
            let button = document.getElementById("bonus");
            button.innerText = scores['bonus'];
        }

    }

}




function throwDice() {

    if (throwCount < 3) {
        for (let die = 0; die < values.length; die++) {
            if (hold[die] === false) {
                values[die] = randomRoll();
                freqFaceValue();
            }
        }
        updateDice(values);
        updateScores(values);
        throwCount++;
        document.getElementById('turnID').innerText = throwCount;
    }
    else {
        alert("You are out of turns. Please save your results");
    }


}


function randomRoll() {
    let min = 1;
    let max = 7;
    let random = Math.floor(Math.random() * (+max - +min)) + +min; //make pretty
    console.log("Random Number Generated : " + random); //for debuggy stuff, delete me
    return random;

}





//----- Resultat beregninger

function valueSpecificFace(face) {

    let total = 0;
    for (let i = 0; i < values.length; i++) {
        if (values[i] == face) {
            total += face;
        }
    }
    return total;
}

function freqFaceValue() {
    frequency = [0, 0, 0, 0, 0, 0];
    for (let face = 1; face <= 6; face++) {
        frequency[face - 1] = 0;

        for (let value = 0; value < values.length; value++) {
            if (values[value] == face) {
                frequency[face - 1]++;
            }
        }
    }
    console.log(frequency);
}

function valueManyOfAKind(n) {
    let place = 0;
    for (let i = 0; i < frequency.length; i++) {
        if (frequency[i] >= n) {
            place = i+1;
        }
    }

    let sum = place * n;
    return sum;
}




function valueYatzy() {

    let sum = 0;
    frequency.forEach(function (value) {
        if (value === 5) {
            sum = 50;
        }
    });
    return sum;
}


function valueChance() {
    let sum = 0;
    values.forEach(function (value) {
        sum += value;
    });
    return sum;
}


function valueOnePair() {
    let sum = 0;
    for (let i = 1; i <= frequency.length; i++) {
        if (frequency[i-1] >= 2) {
            sum = i * 2;
        }
    }

    return sum;
}


function valueTwoPair() {

    let counter = 0;
    let sum = 0;
    for (let i = 1; i <= frequency.length; i++) {
        if (frequency[i-1] >= 2) {
            sum += (i * 2);
            counter++;
        }
    }
    if (counter != 2) {
        sum = 0;
    }
    return sum;
}


function valueThree() {
    let sum = valueManyOfAKind(3)
    return sum;
}


function valueFour() {
    let sum = valueManyOfAKind(4);
    return sum;
}

function valueSmallStraight() {
    let sum = 0;
    let small = true;
    for (let i = 1; i < frequency.length ; i++) {
        if (frequency[i-1] !== 1) {
            small = false; //skall ikke denne taelle op?
        }
    }
    if (small === true) {
        sum = 1 + 2 + 3 + 4 + 5;
    }
    return sum;
}


function valueLargeStraight() {
    let sum = 0;
    let large = true;
    for (let i = 2; i <= frequency.length; i++) {
        if (frequency[i-1] !== 1) {
            large = false;
        }
    }
    if (large === true) {
        sum = 2 + 3 + 4 + 5 + 6;
    }
    return sum;
}

function valueFullHouse() {

    let sum = 0;
    let sum2 = 0;
    let sum3 = 0;
    for (let i = 1; i <= frequency.length; i++) {
        if (frequency[i-1] === 2) {
            sum2 = (i * 2);
        }
        else if (frequency[i-1] === 3) {
            sum3 = (i * 3);
        }

        if (sum2 !== 0 && sum3 !== 0) {
            sum = sum2 + sum3;
        }
    }
    return sum;
}




//result button functions
function setFormsSingles(number) {
    let form = document.getElementById(`form${number}`);
    form.onclick = () => {
        if (throwCount !== 0 && scores[`${number}`] === null) {
            let s = valueSpecificFace(number);
            scores[`${number}`] = s;
            scores['sum'] += s;
            scores['total'] += s;
            document.getElementById('sum').innerText = scores['sum'];
            form.className = "result-form scorehold";
            postTurn();
        }



    };


}

function setFormRest(btn, name, func) {
    btn.onclick = () => {
        if (throwCount !== 0) {
            let val = func();
            scores[`${name}`] = val;
            scores['total'] += val;
            btn.className = "result-form scorehold";
            postTurn();
        }


    }
}



function addButtonFunctions() {
    for (let i = 1; i <= 6; i++) {
        setFormsSingles(i);
    }

    setFormRest(document.getElementById("form1p"), 7, valueOnePair);
    setFormRest(document.getElementById("form2p"), 8, valueTwoPair);
    setFormRest(document.getElementById("form3some"), 9, valueThree);
    setFormRest(document.getElementById("form4some"), 10, valueFour);
    setFormRest(document.getElementById("formFullHouse"), 11, valueFullHouse);
    setFormRest(document.getElementById("formSS"), 12, valueSmallStraight);
    setFormRest(document.getElementById("formLS"), 13, valueLargeStraight);
    setFormRest(document.getElementById("formChance"), 14, valueChance);
    setFormRest(document.getElementById("formYatzi"), 15, valueYatzy);
}






