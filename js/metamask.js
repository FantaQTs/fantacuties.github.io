const userAccount = {
  metamaskInstall: document.getElementById('metamask-install'),
  metamaskConnect: document.getElementById('metamask-connect'),
  userWallet: document.getElementById('user-wallet')
};
const userStatus = document.getElementById('user-status');

const forwarderOrigin = 'http://localhost:9010';
const onboarding = new MetaMaskOnboarding({ forwarderOrigin });


const activateUserAccount = (elToActivate, isFirst=false) => {
  Object.keys(userAccount).forEach(el => {
    userAccount[el].style.display = el == elToActivate ? "block" : "none";
  });

  userStatus.className = "";
  if (!isFirst) {
    userStatus.classList.add(elToActivate == "userWallet" ? "connected" : "disconnected");
  } else {
    userStatus.classList.add(elToActivate);
  }
  void userStatus.offsetWidth;
  userStatus.classList.add("popup");
}

const selectAccount = (accounts, isFirst=false) => {
  if (accounts.length < 1) {
    activateUserAccount("metamaskConnect", isFirst);
  } else {
    activateUserAccount("userWallet", isFirst);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  if (window.ethereum) {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    selectAccount(accounts, true);
    window.ethereum.on("accountsChanged", selectAccount);
  } else {
    activateUserAccount("metamaskInstall", true);
  }
});

userAccount["metamaskInstall"].addEventListener("click", async () => {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.open("https://metamask.app.link/dapp/fantacuties.com");
  } else {
    onboarding.startOnboarding()
  };
});


userAccount["metamaskConnect"].addEventListener("click", async () => {
  await ethereum.request({ method: 'eth_requestAccounts' });
});


userStatus.addEventListener("animationend", () => {
  if (userStatus.classList.contains("connected")) {
    userStatus.classList.remove("connected");
    userStatus.classList.add("userWallet");
    userStatus.classList.add("popup");
  } else if (userStatus.classList.contains("disconnected")) {
    userStatus.classList.remove("disconnected");
    userStatus.classList.add(window.ethereum ? "metamaskConnect" : "metamaskInstall");
    userStatus.classList.add("popup");
  }
});
