import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CustomerListState {
    customers?: CustomerSummary[]; 
}

export interface CustomerSummary {
    id: number;
    name: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestCustomerListAction {
    type: 'REQUEST_CUSTOMERLIST';
}

interface ReceiveCustomerListAction {
    type: 'RECEIVE_CUSTOMERLIST';
    customerList: CustomerSummary[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestCustomerListAction | ReceiveCustomerListAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestCustomerList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (!getState().customerList.customers) {
            let fetchTask = fetch(`api/customers`)
                .then(response => response.json() as Promise<CustomerSummary[]>)
                .then(data => {
                    console.log(data as CustomerSummary[]);

                    dispatch({ type: 'RECEIVE_CUSTOMERLIST', customerList: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_CUSTOMERLIST' });
        }
        
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CustomerListState = { customers: [] };

export const reducer: Reducer<CustomerListState> = (state: CustomerListState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_CUSTOMERLIST':
            return {customers: state.customers};
        case 'RECEIVE_CUSTOMERLIST':
                return {customers: action.customerList};
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};