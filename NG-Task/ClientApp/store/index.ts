import * as WeatherForecasts from './WeatherForecasts';
import * as CustomerDetail from './CustomerDetail';
import * as CustomerList from './CustomerList';

// The top-level state object
export interface ApplicationState {
    weatherForecasts: WeatherForecasts.WeatherForecastsState;
    customer: CustomerDetail.CustomerDetailState; 
    customerList: CustomerList.CustomerListState; 
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    weatherForecasts: WeatherForecasts.reducer,
    customer: CustomerDetail.reducer,
    customerList: CustomerList.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}