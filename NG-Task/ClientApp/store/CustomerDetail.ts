import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CustomerDetailState {
    isLoading: boolean;
    customerId: number; 
    customerDetail: CustomerDetail; 
}

export interface CustomerDetail {
    id: number;
    name: string;
    accounts: CustomerAccount[];
}

export interface CustomerAccount {
    id: number;
    balance: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

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
type KnownAction = RequestCustomerDetailsAction | ReceiveCustomerDetailsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestCustomerDetails: (customerId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        if (customerId !== getState().customer.customerId) {
            console.log(`fetching data api/customers/${customerId}`);
            let fetchTask = fetch(`api/customers/${customerId}`)
                .then(response => response.json() as Promise<CustomerDetail>)
                .then(data => {
                    console.log(data as CustomerDetail); 

                    dispatch({ type: 'RECEIVE_CUSTOMER', customerDetail: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_CUSTOMER', customerId: customerId });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CustomerDetailState = { customerId: -1,  customerDetail: null , isLoading: false };

export const reducer: Reducer<CustomerDetailState> = (state: CustomerDetailState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_CUSTOMER':
            return {
                customerId: action.customerId,
                customerDetail: state.customerDetail,
                isLoading: true
            };
        case 'RECEIVE_CUSTOMER':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.customerDetail.id === state.customerId) {
                return {
                    customerId: action.customerDetail.id,
                    customerDetail: action.customerDetail,
                    isLoading: true
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};