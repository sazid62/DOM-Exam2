"use strict";
document.getElementById("createAccButton").addEventListener("click", () => {
    const userName = document.getElementById("username")
        .value;
    const Userpassword = document.getElementById("password").value;
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || [{}];
    let foundPrevUser = false;
    if (userName.length >= 1 && userName.length >= 1) {
        userInfo.forEach((user) => {
            if (user.name == userName) {
                foundPrevUser = true;
            }
        });
    }
    if (foundPrevUser) {
        let warningMessage = document.getElementById("warningMessage");
        if (warningMessage) {
            warningMessage.innerText =
                "Sorry This UserName Already Exist, Try Again Please!";
        }
        setTimeout(() => {
            let warningMessage = document.getElementById("warningMessage");
            if (warningMessage) {
                warningMessage.innerText = "";
            }
        }, 1000);
    }
    else if (userName.length >= 1 && userName.length >= 1) {
        userInfo.push({
            name: userName,
            password: Userpassword,
        });
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        let warningMessage = document.getElementById("warningMessage");
        if (warningMessage) {
            warningMessage.innerText =
                "YEsssssssssssss, Succesfull created. Redirecting To LogIn page";
        }
        setTimeout(() => {
            let warningMessage = document.getElementById("warningMessage");
            if (warningMessage) {
                warningMessage.innerText = "";
            }
            window.location.href = "../index.html";
        }, 1000);
    }
    else {
        let warningMessage = document.getElementById("warningMessage");
        if (warningMessage) {
            warningMessage.innerText = " Please fill up the form correctly";
        }
        setTimeout(() => {
            let warningMessage = document.getElementById("warningMessage");
            if (warningMessage) {
                warningMessage.innerText = "";
            }
        }, 1000);
    }
});
