function checkCashRegister(price, cash, cid) {
  let currencyDenominations = {
    "ONE HUNDRED": 10000,
    TWENTY: 2000,
    TEN: 1000,
    FIVE: 500,
    ONE: 100,
    QUARTER: 25,
    DIME: 10,
    NICKEL: 5,
    PENNY: 1,
  };

  let change = (cash - price) * 100;

  let totalCid = 0;

  for (let value of cid) {
    totalCid += value[1] * 100;
  }

  if (change > totalCid) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (change === totalCid) {
    return { status: "CLOSED", change: [...cid] };
  } else {
    let tempDenomination = [];
    let changeArray = [];

    let reversedCid = cid.reverse();

    for (let value of reversedCid) {
      value[1] = value[1] * 100;

      tempDenomination = [value[0], 0];

      while (change >= currencyDenominations[value[0]] && value[1] > 0) {
        change -= currencyDenominations[value[0]];
        value[1] -= currencyDenominations[value[0]];
        tempDenomination[1] += currencyDenominations[value[0]] / 100;
      }

      if (tempDenomination[1] > 0) changeArray.push(tempDenomination);
    }

    if (change > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change: [...changeArray] };
  }
}

checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
