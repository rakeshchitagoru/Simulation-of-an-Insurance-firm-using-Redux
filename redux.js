console.clear();

const { createStore, combineReducers } = Redux;

// People dropping off forms (Action creators)

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    // This is the form
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};

const createPolicy = name => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: 20
    }
  };
};

const deletePolicy = name => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

// Departments(reducers)

const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    return [...oldListOfClaims, action.payload]; // common if we are adding record to array.
  }

  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter(policy => policy != action.payload.name);
  }
  return listOfPolicies;
};

// Company Setup

const Departments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(Departments);

store.dispatch(createPolicy("Rakesh"));
store.dispatch(createClaim("Rakesh", 100));
store.dispatch(deletePolicy("Rakesh"));

console.log(store.getState());
