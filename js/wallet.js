const notify = document.querySelector("#notify");

notify.addEventListener("animationend", () => {
  notify.classList.remove("active");
  notify.innerHTML = "";
});

const notifyUser = (notification) => {
  notify.innerHTML = notification;
  notify.classList.add("active");
}

const connect = document.querySelector("#connect");
let walletAddress;

const connectMetamask = async () => {
  if (typeof window.ethereum == "undefined") return;

  const accounts = await ethereum.request({method: 'eth_accounts'});
  walletAddress = accounts[0];
  
  if (typeof walletAddress == "undefined") {
    notifyUser("Metamask not connected");
  } else {
    notifyUser(`Metamask connected with address: ${walletAddress}`);
    connect.src = "../assets/navbar/metamask-connected.png";
  }
}

if (typeof window.ethereum != "undefined") {
  window.ethereum.on("connect", async () => {
    await connectMetamask();
  });
}

window.addEventListener("load", async () => {
  await connectMetamask();
});

const disconnectMetamask = async () => {
  walletAddress = undefined;
  notifyUser("Metamask disconnected");
  connect.src = "../assets/navbar/metamask-disconnected.png";
}

if (typeof window.ethereum != "undefined") {
  window.ethereum.on("disconnect", async () => {
    await disconnectMetamask();
  });
}

if (typeof window.ethereum != "undefined") {
  window.ethereum.on("accountsChanged", (accounts) => {
    const oldWalletAddress = walletAddress;
    walletAddress = accounts[0];
    if (typeof walletAddress == "undefined") {
      notifyUser("Metamask disconnected");
      connect.src = "../assets/navbar/metamask-disconnected.png";
    }
    else {
      if (typeof oldWalletAddress == "undefined") {
        notifyUser(`Metamask connected with address: ${walletAddress}`);
        connect.src = "../assets/navbar/metamask-connected.png";
      } else {
        notifyUser(`Changed current address to: ${walletAddress}`);
      }
    }
  });
}

const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
const metamaskURL = mobileUA.test(navigator.userAgent) ? 
  "https://metamask.app.link/dapp/fantacuties.com" : 
  "https://metamask.io/download/";

connect.addEventListener("click", async () => {
  if (typeof window.ethereum == "undefined") {
    if(mobileUA.test(navigator.userAgent)) {
      window.open(metamaskURL);
    } else {
      notifyUser(
        `Install <a href="${metamaskURL}" target="_blank" 
        style="color:white;text-decoration:underline">Metamask</a> first!`
      );
    }
  } else if (typeof walletAddress != "undefined") {
    notifyUser(`Metamask already connected with address ${walletAddress}`);
  } else {
    await ethereum.request({method: 'eth_requestAccounts'})
      .catch((error) => {
        notifyUser(error.message);
    });
  }
});

const contractAddress = "0xe18dca1E254B736766dcE130D5848290803b9556";

let contractABI;
let contractInterface;
window.addEventListener("load", async () => {
  const contractResponse = await fetch("../contract/FantaCuties.json");
  const contractData = await contractResponse.json();
  contractABI = await contractData.abi;
  contractInterface = new ethers.utils.Interface(contractABI);
});

const tokenAmountInput = document.querySelector("#token-amount");
let tokenAmount;

tokenAmountInput.addEventListener("input", () => {
  tokenAmount = tokenAmountInput.value;
  if (tokenAmount > 1) {
    mint.children[2].innerText = `Mint ${tokenAmount} Cuties`;
  } else {
    mint.children[2].innerText = `Mint ${tokenAmount} Cutie`;
  }
});

const mint = document.querySelector("#mint");

mint.addEventListener("click", async () => {
  if (typeof window.ethereum == "undefined") {
    notifyUser(
      `Install <a href="${metamaskURL}" target="_blank" 
      style="color:white;text-decoration:underline">Metamask</a> first!`
	  );
    return;
  }
  
  if (typeof walletAddress == "undefined") {
    notifyUser("Connect Metamask first!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner(walletAddress)
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
  const tokenAmount = parseInt(tokenAmountInput.value, 10);
  const tokenPrice = await contract.getPrice(0);
  let txValue = tokenPrice * (tokenAmount);
  
  const tx = {
    to: contractAddress,
    from: walletAddress,
    value: `0x${txValue.toString(16)}`,
    data: contractInterface.encodeFunctionData("publicMint", [tokenAmount])
  }
  
  let isReverted = false;
  await contract.estimateGas.publicMint(tokenAmount, {
    "value": ethers.utils.parseEther(ethers.utils.formatEther(`${txValue}`))
  })
    .catch((error) => {
      isReverted = true;
      if(error.code == "INSUFFICIENT_FUNDS") {
        notifyUser("(╥﹏╥) Insufficient funds");
      } else {
        notifyUser(`(╥﹏╥) ${error.error.message.split(":").pop().trim()}`);
      }
      return;
  });
  if (isReverted) return;

  await window.ethereum.request(
    {method: 'eth_sendTransaction', params: [tx]}
  )
    .then((txHash) => {
      notifyUser(
        `(˶ᵔ ᵕ ᵔ˶) Yayy! Transaction completed. You can check it ` +
        `<u><a href="https://etherscan.io/tx/${txHash}">here</a></u>`
      );
  })
    .catch((error) => {
      notifyUser("(╥﹏╥) Something went wrong...");
  });
});
