"use strict";
let now = Number(localStorage.getItem("currentActiveUserTime")) + 70 * 1000 || 0;
let intervalID = setInterval(() => {
    let diff = now - Date.now();
    let minutes = Math.floor(diff / (1000 * 60));
    let seconds = Math.floor((diff - minutes * (1000 * 60)) / 1000);
    console.log("dif = ", diff);
    console.log("Mn = ", minutes);
    console.log("sec = ", seconds);
    if (minutes < 10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds;
    let time = document.getElementById("time");
    if (time) {
        time.innerHTML = `Your Session time ${minutes} : ${seconds}s remaining`;
    }
    if (diff <= 0) {
        localStorage.removeItem("currentActiveUser");
        localStorage.removeItem("currentActiveUserTime");
        document.querySelector("body").innerHTML =
            "<h1 >Your Session Time out!</h1>";
        clearInterval(intervalID);
    }
}, 1000);
function currentTime() {
    let time = new Date();
    return time;
}
console.log(currentTime());
// window.location.href = "index.html";
let currentActiveUser = localStorage.getItem("currentActiveUser");
if (currentActiveUser == null) {
    document.querySelector("body").innerHTML =
        "<h1>OOps sorry, Log In first</h1>";
    setTimeout(() => {
        document.querySelector("body").innerHTML +=
            "<h2>Redirecting to Log in page</h1>";
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);
    }, 1000);
}
let Person = {
    name: currentActiveUser,
    fundMoney: 0,
    totalSpendOnShopping: 0,
    shoppingMoney: 0,
    card: [],
    activities: [],
};
let UserActivityDetails = JSON.parse(localStorage.getItem("UserActivityDetails") || "[]");
let pushOk = true;
UserActivityDetails.forEach((user) => {
    if (user.name == currentActiveUser) {
        pushOk = false;
    }
});
if (pushOk == true) {
    UserActivityDetails.push(Person);
    localStorage.setItem("UserActivityDetails", JSON.stringify(UserActivityDetails));
}
let z = [];
// z.indexOf(Person);
let indeX = -1, c = 0;
UserActivityDetails.forEach((user) => {
    if (user.name == Person.name) {
        indeX = c;
    }
    c++;
});
console.log(indeX);
function updateLocalStorage() {
    localStorage.setItem("UserActivityDetails", JSON.stringify(UserActivityDetails));
    UserActivityDetails = JSON.parse(localStorage.getItem("UserActivityDetails") || "[]");
}
document.getElementById("welcome").innerText = `Hey ${localStorage.getItem("currentActiveUser")}, Welcome Back!`;
if (UserActivityDetails.lenght === null) {
    document.getElementById("showDetails").innerText =
        "Hmmmm, It seems you didn't shopping yet..!";
}
document.getElementById("fundMoney").innerText = `Total fund has:  ${UserActivityDetails[indeX].fundMoney}`;
document.getElementById("addMoneyBtn").addEventListener("click", (e) => {
    let value = document.getElementById("addMoneyInput")
        .value;
    document.getElementById("addMoneyInput").value = "";
    if (Number(value) <= 0) {
        document.getElementById("warningMessageAddMoney").innerText =
            "Need Positive Number";
        setTimeout(() => {
            document.getElementById("warningMessageAddMoney").innerText = "";
        }, 1000);
    }
    else {
        UserActivityDetails[indeX].fundMoney =
            Number(UserActivityDetails[indeX].fundMoney) + Number(value);
        UserActivityDetails[indeX].activities.push({
            details: `Adding Money: ${value}`,
            timestamp: `TIme: ${currentTime()}`,
        });
        updateLocalStorage();
        fetichingLast5activities();
        document.getElementById("fundMoney").innerText = `Total fund has:  ${UserActivityDetails[indeX].fundMoney}`;
        const warningMessage = document.getElementById("warningMessageAddMoney");
        if (warningMessage) {
            warningMessage.innerText = "Successfully Added!";
        }
        setTimeout(() => {
            document.getElementById("warningMessageAddMoney").innerText = "";
        }, 1000);
    }
});
function showTotalSpendsOnShopping() {
    document.getElementById("totalSpendOnShopping").innerText = `Total Spends on Shopping: ${UserActivityDetails[indeX].totalSpendOnShopping}`;
}
showTotalSpendsOnShopping();
function fetchingCard() {
    let countCard = 1;
    document.getElementById("card").innerHTML = "";
    UserActivityDetails[indeX].card.forEach((card) => {
        let div = document.createElement("div");
        div.innerHTML += `
           <div id = ${indeX} style = "w-6px h-6px border-radious-2">  
             <span> Card ${countCard}: <p>Name: ${card.name}</p> 
            <p>Name: ${card.price}</p> 
            <br>
            <button id = "${card.id}"> Buy Now </button> 
            </div>
            `;
        document.getElementById("card").appendChild(div);
        document.getElementById(`${card.id}`).addEventListener("click", () => {
            console.log("sajid");
            if (UserActivityDetails[indeX].fundMoney >= card.price) {
                document.getElementById("warningMessageAddCard").innerText =
                    "Successfully Buy WOw!";
                UserActivityDetails[indeX].fundMoney -= card.price;
                UserActivityDetails[indeX].totalSpendOnShopping =
                    Number(UserActivityDetails[indeX].totalSpendOnShopping) +
                        Number(card.price);
                UserActivityDetails[indeX].activities.push({
                    details: `Buying ${card.name} with ${card.price}$`,
                    timestamp: `Timestamp: ${currentTime()}`,
                });
                updateLocalStorage();
                fetichingLast5activities();
                document.getElementById("fundMoney").innerText = `Total fund has:  ${UserActivityDetails[indeX].fundMoney}`;
                showTotalSpendsOnShopping();
            }
            else {
                document.getElementById("warningMessageAddCard").innerText =
                    "Sorry you dont have enough Balance";
            }
            setTimeout(() => {
                document.getElementById("warningMessageAddCard").innerText = "";
            }, 1000);
        });
        countCard++;
    });
}
fetchingCard();
if (UserActivityDetails[indeX].card.length == 0) {
    document.getElementById("card").innerText = "Opps Card is Emplty!";
}
document.getElementById("addCard").addEventListener("click", () => {
    if (document.getElementById("cardName").value &&
        document.getElementById("cardPrice").value) {
        UserActivityDetails[indeX].card.push({
            name: document.getElementById("cardName").value,
            price: document.getElementById("cardPrice").value,
            id: Math.random() + 100,
        });
        updateLocalStorage();
        fetchingCard();
        UserActivityDetails[indeX].activities.push({
            details: `New Card ${document.getElementById("cardName").value} with ${document.getElementById("cardPrice").value} added`,
            timestamp: `${currentTime()}`,
        });
        fetichingLast5activities();
        document.getElementById("warningMessageAddCard").innerText =
            "Successfully Added!";
        setTimeout(() => {
            document.getElementById("warningMessageAddCard").innerText = "";
        }, 1000);
    }
    document.getElementById("cardName").value = "";
    document.getElementById("cardPrice").value = "";
});
function fetichingLast5activities() {
    document.getElementById("activities").innerHTML = "";
    let deleted = UserActivityDetails[indeX].activities.length > 5
        ? UserActivityDetails[indeX].activities.length - 5
        : 0;
    UserActivityDetails[indeX].activities.splice(0, deleted);
    updateLocalStorage();
    console.log("sajid", UserActivityDetails[indeX].activities);
    let emptyActivities = UserActivityDetails[indeX].activities;
    if (emptyActivities == null) {
        document.getElementById("activities").innerText =
            "Hmmm , Theres no Activities yet";
    }
    let c = 1;
    UserActivityDetails[indeX].activities.forEach((d) => {
        document.getElementById("activities").innerHTML += `
  <div style =" ">
  
  <p>[${c}] ${d.details}
          <br>Timestamp: ${d.timestamp}
    <p>
  </div>
  `;
        c++;
    });
}
fetichingLast5activities();
