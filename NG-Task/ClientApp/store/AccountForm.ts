import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface AccountFormStateOld
{
    accountTypes: string[]; 
    classCodes: string[]; 
    currencies: string[]; 

    selectedAccountType?: string; 
    selectedClassCode?: string; 
    selectedCurrency?: string; 
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestAccountTypesAction{
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

interface SelectAccountType {
    type: 'SELECT_ACCOUNT_TYPE'; 
    accountType: string; 
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
    RequestAccountTypesAction | ReceiveAccountTypesAction
    | RequestClassCodesAction | ReceiveClassCodesAction
    | RequestCurrenciesAction | ReceiveCurrenciesAction
    | SelectAccountType; 


// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

    requestAccountTypes: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (!getState().customer.customers || getState().customer.customers.length == 0) {
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

        let fetchTask = fetch(`api/const/currency`)
            .then(response => response.json() as string[])
            .then(data => {
                dispatch({ type: 'RECEIVE_CURRENCIES', currencies: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_CURRENCIES'});
    },

    selectAccountTyoe: (accountType: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SELECT_ACCOUNT_TYPE', accountType });
    }
   
}


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: AccountFormStateOld = { accountTypes: [], classCodes: [], currencies: []   };

export const reducer: Reducer<AccountFormStateOld> = (state: AccountFormStateOld, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ACCOUNT_TYPES':
            return {
                ...state
            };
        case 'RECEIVE_ACCOUNT_TYPES':
            return {
                ...state,
                accountTypes: action.accountTypes,
            };

        case 'REQUEST_CLASS_CODES':
            return { 
                ...state
            };
        case 'RECEIVE_CLASS_CODES':
                return {
                    ...state,
                    classCodes: action.classCodes
            };
        case 'REQUEST_CURRENCIES':
            return {
                ...state
            }
        case 'RECEIVE_CURRENCIES':
            return {
                ...state,
                currencies: action.currencies
            }
        case 'SELECT_ACCOUNT_TYPE':
            return {
                ...state,
                selectedAccountType: action.accountType
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};