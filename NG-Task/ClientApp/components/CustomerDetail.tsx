import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import { CustomerDetailState } from '../store/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// At runtime, Redux will merge together...
type CustomerDetailProp =
    CustomerDetailState        // ... state we've requested from the Redux store
    & RouteComponentProps<{ customerId: string }>; // ... plus incoming routing parameters
//    & typeof WeatherForecastsState.actionCreators      // ... plus action creators we've requested


class CustomerDetail extends React.Component<CustomerDetailProp, {}> {
    //componentDidMount() {
    //    let cus: CustomerDetailProp = { name: "Ahmed", id: 0, accounts: [{ id: 100, balance: 50 }, { id: 101, balance: 210 }] }; 


    //}

    componentWillReceiveProps(nextProps: CustomerDetailProp) {
        let cus: CustomerDetailState = { name: "Ahmed", id: parseInt(nextProps.match.params.customerId), accounts: [{ id: 100, balance: 50 }, { id: 101, balance: 210 }] };

        this.setState(prev => {
            return { ...prev, ...cus, id: parseInt(nextProps.match.params.customerId) }
        });
    }

    public render() {
        return (< div >

            < div >
                Id {this.props.id}
            </ div >
            < div >
                Name {this.props.name}
            </ div >
            < div >
                < table className='table' >

                    < thead >

                        < tr >

                            < th > Id </ th >

                            < th > Balance </ th >

                        </ tr >

                    </ thead >

                    < tbody >
                        {
                            this.props.accounts.map(a =>

                                < tr key={a.id}>

                                    < td >{a.id}</ td >

                                    < td >{a.balance}</ td >

                                </ tr >
                            )}
                    </ tbody >
                </ table >;
                </ div >
        </ div >);
    }

}


const mapStateToProps = (state: ApplicationState): CustomerDetailProp => {
    return {
        accounts: state.customer.accounts
    } as any
};

//const mapDispatchToProps = (dispatch: any): any => {
//    return bindActionCreators({
//        requestWeatherForecasts:
//            WeatherForecastsState.actionCreators.requestWeatherForecasts
//    }, dispatch);
//};

export default connect(
    mapStateToProps,
    {}
    //mapDispatchToProps
)(CustomerDetail) as any;