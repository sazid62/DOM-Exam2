"use strict";
document.getElementById("logInButton").addEventListener("click", () => {
    const userPass = document.getElementById("password").value;
    const userName = document.getElementById("username").value;
    console.log(userName, userPass);
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = userInfoString
        ? JSON.parse(userInfoString)
        : null;
    let isThisUserFound = false;
    userInfo === null || userInfo === void 0 ? void 0 : userInfo.forEach((user) => {
        if (user.name == userName && user.password == userPass) {
            isThisUserFound = true;
        }
    });
    console.log("is this = ", isThisUserFound);
    if (isThisUserFound) {
        localStorage.setItem("currentActiveUser", userName);
        localStorage.setItem("currentActiveUserTime", JSON.stringify(Date.now()));
        window.location.href = "./Others/index.html";
    }
    else {
        let warningMessage = document.getElementById("warningMessage");
        if (warningMessage) {
            warningMessage.innerText =
                "Sorry can't find username or password, try again";
        }
        setInterval(() => {
            let warningMessage = document.getElementById("warningMessage");
            if (warningMessage) {
                warningMessage.innerText = "";
            }
        }, 1000);
    }
});
