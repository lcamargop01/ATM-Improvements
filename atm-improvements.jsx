const ATMControls = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Withdrawal'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="atm-controls label huge">
      <h5> {`Please enter the amount for ${choice[Number(!isDeposit)].toLowerCase()}`}</h5>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};

const Account = () => {
  const [amount, setAmount] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = balance;

  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    const enteredValue = event.target.value;
    console.log(`handleChange ${amount}`);

    if (enteredValue <= 0) {
      setValidTransaction(false);
      return false;
    }
    if (atmMode === "Withdrawal" && enteredValue > balance) {
      setValidTransaction(false);
      return false;
    }
    setValidTransaction(true);    
    setAmount(Number(enteredValue));
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? balance + amount : balance - amount;

    if (atmMode === "Withdrawal" && amount > balance) {
      setValidTransaction(false);
      event.preventDefault();
      return;
    }

    setBalance(newTotal);

    if (atmMode === "Withdrawal" && newTotal === 0) {
      setValidTransaction(false);
    }

    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    const userSelection = event.target.value;
    setAtmMode(userSelection);
    if (userSelection) {
      setIsDeposit(userSelection === "Deposit");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">Account Balance: ${status}</h2>

      <label>Select "Deposit" or "Withdrawal" below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
      <option id="no-selection" value=""></option>
      <option id="deposit-selection" value="Deposit">Deposit</option>
      <option id="cashback-selection" value="Withdrawal">Withdrawal</option>
      </select>

      { atmMode && <ATMControls onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMControls> }

    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
