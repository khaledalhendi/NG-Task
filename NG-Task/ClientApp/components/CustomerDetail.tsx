import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as CustomerDetailState  from '../store/CustomerDetail';
import { bindActionCreators } from 'redux';

// At runtime, Redux will merge together...
type CustomerDetailProp =
    CustomerDetailState.CustomerDetailState        // ... state we've requested from the Redux store
    & typeof CustomerDetailState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ customerId: string }>; // ... plus incoming routing parameters

class CustomerDetail extends React.Component<CustomerDetailProp, {}> {

    componentWillMount() {
        // This method runs when the component is first added to the page
        let customerId = parseInt(this.props.match.params.customerId);

        console.log(`mount customerId: ${customerId}`);
        this.props.requestCustomerDetails(customerId);
    }

    componentWillReceiveProps(nextProps: CustomerDetailProp) {
        // This method runs when incoming props (e.g., route params) change
        let customerId = parseInt(nextProps.match.params.customerId);

        console.log(`recieve customerId: ${customerId}`);
        this.props.requestCustomerDetails(customerId);
    }

    public render() {
        return (< div >
            {this.props.customerDetail ? this.renderTable() : "Loading..."}
        </ div >);
    }

    renderTable() {


        return (
            < div >
                < div >
                Name {this.props.customerDetail.name}
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
                            this.props.customerDetail.accounts.map(a =>
                                < tr key={a.id}>
                                    < td >{a.id}</ td >
                                    < td >{a.balance}</ td >
                                </ tr >
                            )}
                    </ tbody >
                </ table >
                </ div >
            </ div >);
    }

}


const mapStateToProps = (state: ApplicationState): CustomerDetailProp => {
    return {
        customerDetail: state.customer.customerDetail, 
        customerId: state.customer.customerId,
    } as any
};

const mapDispatchToProps = (dispatch: any): any => {
    return bindActionCreators({
        requestCustomerDetails:
            CustomerDetailState.actionCreators.requestCustomerDetails
    }, dispatch);
};

export default connect(
    mapStateToProps, 
   mapDispatchToProps
)(CustomerDetail) as any;

