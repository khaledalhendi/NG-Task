import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CustomerState {
    isLoading: boolean; 
    customerDetail: CustomerDetail; 
    customers: CustomerSummary[]; 
}

export interface CustomerSummary{
    name: string;
    id: number;
}

export interface CustomerDetail {
    id: number;
    name: string;
    accounts: CustomerAccount[];
    totalBalance: number; 
}

export interface CustomerAccount {
    id: number;
    balance: number;
    currencyISO: string; 
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
}

interface ReceiveCustomerDetailsAction {
    type: 'RECEIVE_CUSTOMER';
    customerDetail: CustomerDetail; 
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestCustomersAction | ReceiveCustomersAction | 
                   RequestCustomerDetailsAction | ReceiveCustomerDetailsAction;

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

    requestCustomerDetails: (customerId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        if (!getState().customer.customerDetail || customerId !== getState().customer.customerDetail.id) {
            let fetchTask = fetch(`api/customers/${customerId}`)
                .then(response => response.json() as Promise<CustomerDetail>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_CUSTOMER', customerDetail: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_CUSTOMER', customerId: customerId });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CustomerState = { customers: [], customerDetail: null , isLoading: false };

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
                customerDetail: state.customerDetail,
                isLoading: true
            };
        case 'RECEIVE_CUSTOMER':
                return {
                    ...state,
                    customerDetail: action.customerDetail,
                    isLoading: false 
                };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};