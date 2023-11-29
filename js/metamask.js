const userAccount = document.getElementById('user-account');
const mint = document.getElementById('mint');

const forwarderOrigin = 'http://localhost:9010';
const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

window.addEventListener('DOMContentLoaded', async () => {
  if (window.ethereum) {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log(accounts)
  }
});

userAccount.addEventListener("click", async () => {
  if (typeof window.ethereum == 'undefined') {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.open("https://metamask.app.link/dapp/fantacuties.com");
      return;
    } else {
      onboarding.startOnboarding();
    };

  }
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  console.log(accounts)
});
