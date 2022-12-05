import { useEffect, useState } from 'react';
import Web3 from 'web3';
import SimpleStorageContract from './abi/SimpleStorage.json';
import NavBar from './components/navbar/NavBar';
function App() {
  const [errorMessage, setErrorMessage] = useState(); // state variable to set account.
  const [account, setAccount] = useState(); // state variable to set account.
  const [connectBtn, setConnectBtn] = useState("CONNECT TO WALLET"); // state variable to set account.
  const [nbTransactions,setNbTransactions] = useState(0);
  const [transactions,setTransactions] = useState([]);
  const CONTRACT_ABI =SimpleStorageContract.abi;
  const CONTRACT_ADDRESS = SimpleStorageContract.networks["2018"].address;
  const connectWalletHandler =()=>{
    if(window.ethereum){
      window.ethereum.request({method:"eth_requestAccounts"}).then(result=>{
        accountChangerHandler(result[0])
        setConnectBtn("Wallet connecté");
        web3.eth.getTransactionCount(result[0]).then(r=>setNbTransactions(r));
        
        
      })
    }
    else{
      setErrorMessage("Need to install Metamask!");
    }
  }
  const accountChangerHandler = (newAccount)=>{
    setAccount(newAccount);
  }
   

const web3 = new Web3(Web3.givenProvider);
// Contract address of the deployed smart contract

const storageContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);


  // Hold variables that will interact with our contract and frontend
  const [number, setUint] = useState(0);
  const [getNumber, setGet] = useState("0");

  
  const numberSet = async (t) => {
    t.preventDefault();
    // Get permission to access user funds to pay for gas fees
    const gas = await storageContract.methods.set(number).estimateGas();
    const post = await storageContract.methods.set(number).send({
      from: account,
      gas,
    }).then(r=>console.log("ok")).then(r=>console.log(r));
    web3.eth.getTransactionCount(account).then(r=>setNbTransactions(r))
  };

  const numberGet = async (t) => {
    t.preventDefault();
    const post = await storageContract.methods.get().call();
    setGet(post);
  };
  let tx =[];
  const getTransactions = ()=>{
web3.eth.getTransactionCount(account)
        .then((b=console.log)=>{
           for(var i=0;i<b;i++){
                   web3.eth.getBlock(b-i).then((Block)=>
                   {
                   const a =[Block.hash]
                    let  iterator =a.values()
                    for (let elements of iterator) { 
                      
                    web3.eth.getBlock(elements).then(console.log).then(e=>setTransactions(tr=>[...tr,e]));
       
                        } 
                    });
                }
                });
  }
   return (<>
    <NavBar account={account}/>
     <div>
       <h3>{"Se connecter"}</h3>
       <hr/>
       <button onClick={connectWalletHandler}>{connectBtn}</button>
       <p>Addresse : {account}</p>
       {errorMessage}
     </div>
     <h3> Lister transaction </h3>
     {`Nombre de transactions : ${nbTransactions}`}
     {transactions.map((value)=>{
      console.log(value);
      <p> mmm : {value}</p>;
     }
       
     )}
      <button onClick={getTransactions}>Listes transaction</button>
     <hr/>
     <h3> Envoyer transaction</h3>
     <div className="main">
       <div className="card">
         <form className="form" onSubmit={numberSet}>
           <label>
             Valeur du stockage:
             <input
               className="input"
               type="text"
               name="name"
               onChange={(t) => setUint(t.target.value)}
             />
           </label>
           <button className="button" type="submit" value="Confirm">
             Confirmer
           </button>
         </form>
         <br />
         <button className="button" onClick={numberGet} type="button">
           Afficher la valeur
         </button>
         {getNumber}
       </div>
     </div>
     <hr/>
     </>
   );
}

export default App;
