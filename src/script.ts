interface User {
  name: string;
  password: string;
}

(document.getElementById("logInButton") as HTMLButtonElement).addEventListener(
  "click",
  () => {
    const userPass: string = (
      document.getElementById("password") as HTMLInputElement
    ).value;
    const userName: string = (
      document.getElementById("username") as HTMLInputElement
    ).value;

    console.log(userName, userPass);

    const userInfoString = localStorage.getItem("userInfo");
    const userInfo: null | User[] = userInfoString
      ? JSON.parse(userInfoString)
      : null;

    let isThisUserFound = false;

    userInfo?.forEach((user) => {
      if (user.name == userName && user.password == userPass) {
        isThisUserFound = true;
      }
    });

    console.log("is this = ", isThisUserFound);
    if (isThisUserFound) {
      localStorage.setItem("currentActiveUser", userName);
      localStorage.setItem("currentActiveUserTime", JSON.stringify(Date.now()));

      window.location.href = "./Others/index.html";
    } else {
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
  }
);
