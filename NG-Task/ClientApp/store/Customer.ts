/// <reference path="accountform.ts" />
import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CustomerState {
    isLoading: boolean; 
    isLoadingCustomerDetail: boolean 
    selectedCustomer: number; 
    customerDetail?: CustomerDetail; 
    customers: CustomerSummary[]; 
    accountForm?: AccountFormState; 
}

export interface CustomerSummary{
    id: number;
    name: string;
    branch: string;
}

export interface CustomerDetail {
    id: number;
    name: string;
    branch: string;
    openDate: string;
    accounts: CustomerAccount[];
    accountLength: number;
    totalBalance: number; 
    pageIndex: number; 
    pageSize: number; 
}

export interface CustomerAccount {
    id: number;
    balance: number;
    accountType: string;
    classCode: string;
    currencyISO: string;
}

export interface CreateCustomerAccount {
    customerId: number;
    accountType: string;
    classCode: string;
    balance: number;
    currencyISO: string;
}

export interface AccountFormState {
    accountTypes: string[];
    classCodes: string[];
    currencies: string[];
}


// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestCustomersAction{
    type: 'REQUEST_CUSTOMERS'; 
}

interface ReceiveCustomersAction {
    type: 'RECEIVE_CUSTOMERS';
    customers: CustomerSummary[];
}

interface RequestCustomerDetailsAction {
    type: 'REQUEST_CUSTOMER';
    customerId: number;
    pageIndex: number; 
}

interface ReceiveCustomerDetailsAction {
    type: 'RECEIVE_CUSTOMER';
    customerDetail: CustomerDetail;  
}

interface ClearCustomerDetailsAction {
    type: 'CLEAR_CUSTOMER'; 
}

interface RequestDeleteAccountAction {
    type: 'REQUEST_DELETE_ACCOUNT';
    customerId: number; 
    accountId: number;
}

interface ReceiveDeleteAccountAction {
    type: 'RECEIVE_DELETE_ACCOUNT';
    customerDetail: CustomerDetail; 
}

interface RequestAddAccountAction {
    type: 'REQUEST_ADD_ACCOUNT';
    account: CreateCustomerAccount;
}

interface ReceiveAddAccountAction {
    type: 'RECEIVE_ADD_ACCOUNT';
    customerDetail: CustomerDetail;
}

interface RequestAccountTypesAction {
    type: 'REQUEST_ACCOUNT_TYPES';
}

interface ReceiveAccountTypesAction {
    type: 'RECEIVE_ACCOUNT_TYPES';
    accountTypes: string[];
}

interface RequestClassCodesAction {
    type: 'REQUEST_CLASS_CODES';
    accountType: string;
}

interface ReceiveClassCodesAction {
    type: 'RECEIVE_CLASS_CODES';
    classCodes: string[];
}

interface RequestCurrenciesAction {
    type: 'REQUEST_CURRENCIES';
}

interface ReceiveCurrenciesAction {
    type: 'RECEIVE_CURRENCIES';
    currencies: string[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
    RequestCustomersAction | ReceiveCustomersAction
    | RequestCustomerDetailsAction | ReceiveCustomerDetailsAction | ClearCustomerDetailsAction
    | RequestDeleteAccountAction | ReceiveDeleteAccountAction
    | RequestAddAccountAction | ReceiveAddAccountAction
    | RequestAccountTypesAction | ReceiveAccountTypesAction
    | RequestClassCodesAction | ReceiveClassCodesAction
    | RequestCurrenciesAction | ReceiveCurrenciesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

    requestCustomers: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (!getState().customer.customers || getState().customer.customers.length == 0) {
            let fetchTask = fetch(`api/customers`)
                .then(response => response.json() as Promise<CustomerSummary[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_CUSTOMERS', customers: data as CustomerSummary[] });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_CUSTOMERS' });
        }
    },

    requestCustomerDetails: (customerId: number, pageIndex: number = 1): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        if (!getState().customer.customerDetail || customerId !== getState().customer.customerDetail.id) {
            let fetchTask = fetch(`api/customers/${customerId}/${pageIndex}`)
                .then(response => response.json() as Promise<CustomerDetail>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_CUSTOMER', customerDetail: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_CUSTOMER', customerId, pageIndex });
        }
    },

    clearCustomerDetails: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: 'CLEAR_CUSTOMER'}); 
    },

    deleteAccount: (customerId: number, accountId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        let fetchTask = fetch(`api/customers/${customerId}/account/${accountId}`, {method:"DELETE"})
            .then(response => response.json() as Promise<CustomerDetail>)
            .then(data =>{
                dispatch({ type: 'RECEIVE_DELETE_ACCOUNT', customerDetail: data} );
                });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_DELETE_ACCOUNT', customerId, accountId});
    },

    addAccount: (account : CreateCustomerAccount): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        let fetchTask = fetch(`api/customers/${account.customerId}/account`,
            {
                method: "POST",
                body: JSON.stringify({ ...account }),
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then(response => response.json() as Promise<CustomerDetail>)
            .then(data => {
                dispatch({ type: 'RECEIVE_ADD_ACCOUNT', customerDetail: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_ADD_ACCOUNT', account });
    },

    requestAccountTypes: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        let accountTypes = getState().customer.accountForm.accountTypes;  
        if (!accountTypes || accountTypes.length == 0) {
            let fetchTask = fetch(`api/const/accountType`)
                .then(response => response.json() as Promise<string[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_ACCOUNT_TYPES', accountTypes: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_ACCOUNT_TYPES' });
        }
    },

    requestClassCodes: (accountType: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        //let currentAccountType = getState().customer.accountForm.selectedAccountType;
        //if (currentAccountType != accountType) {
        //if (!getState().accountForm.accountType != accountType) {
        let fetchTask = fetch(`api/const/classCode/${accountType}`)
            .then(response => response.json() as string[])
            .then(data => {
                dispatch({ type: 'RECEIVE_CLASS_CODES', classCodes: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_CLASS_CODES', accountType });
        //}
    },

    requestCurrencies: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let currencies = getState().customer.accountForm.currencies;  
        if (!currencies || currencies.length == 0) {
            let fetchTask = fetch(`api/const/currency`)
                .then(response => response.json() as string[])
                .then(data => {
                    dispatch({ type: 'RECEIVE_CURRENCIES', currencies: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_CURRENCIES' });
        }
    }
}


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CustomerState = {
    isLoading: false,
    isLoadingCustomerDetail: false,
    selectedCustomer: null,
    customers: [],
    accountForm: {
        accountTypes: [],
        classCodes: [],
        currencies: [], 
    }
};

export const reducer: Reducer<CustomerState> = (state: CustomerState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_CUSTOMERS':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_CUSTOMERS':
            return {
                ...state,
                customers: action.customers,
                isLoading: false
            };

        case 'REQUEST_CUSTOMER':
            return { 
                ...state,
                isLoadingCustomerDetail: true, 
                selectedCustomer: action.customerId,
                isLoading: true
            };
        case 'RECEIVE_CUSTOMER':
                return {
                    ...state,
                    isLoadingCustomerDetail: false,
                    customerDetail: action.customerDetail,
                    isLoading: false 
            };
        case 'CLEAR_CUSTOMER':
            return {
                ...state, 
                customerDetail: null, 
                selectedCustomer: null
            }
        case 'REQUEST_DELETE_ACCOUNT':
            return {
                ...state, 
                isLoading: true
            }
        case 'RECEIVE_DELETE_ACCOUNT':
            return {
                ...state,
                isLoading: false,
                customerDetail: action.customerDetail,
            }
        case 'REQUEST_ADD_ACCOUNT':
            return {
                ...state,
                isLoading: true
            }
        case 'RECEIVE_ADD_ACCOUNT':
            return {
                ...state,
                isLoading: false,
                customerDetail: action.customerDetail,
            }
        case 'REQUEST_ACCOUNT_TYPES':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_ACCOUNT_TYPES':
            return {
                ...state,
                isLoading: false,
                accountForm: {
                    ...state.accountForm,
                    accountTypes: action.accountTypes
                },
            };

        case 'REQUEST_CLASS_CODES':
            return {
                ...state
            };
        case 'RECEIVE_CLASS_CODES':
            return {
                ...state,
                accountForm: {
                    ...state.accountForm,
                    classCodes: action.classCodes
                }
            };
        case 'REQUEST_CURRENCIES':
            return {
                ...state
            }
        case 'RECEIVE_CURRENCIES':
            return {
                ...state,
                accountForm: {
                    ...state.accountForm,
                    currencies: action.currencies
                },
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};