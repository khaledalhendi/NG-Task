import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CustomerState from '../store/Customer';
import { bindActionCreators } from 'redux';
import { CustomerList } from "./CustomerList";
import { CustomerDetail } from "./CustomerDetail";
import { CreateAccountForm } from "./CreateAccountForm";
import { Modal, Button } from 'react-bootstrap/lib';

// At runtime, Redux will merge together...
type CustomerProps =
    CustomerState.CustomerState        // ... state we've requested from the Redux store
    & typeof CustomerState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ customerId: string, pageIndex: string}>; // ... plus incoming routing parameters

class Customer extends React.Component<CustomerProps, {}> {

    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestCustomers(); 

        let customerId = parseInt(this.props.match.params.customerId);
        let pageIndex = parseInt(this.props.match.params.pageIndex);

        if (!pageIndex) {
            pageIndex = 1; 
        }

        if (customerId) {
            this.handleCustomerId(customerId, pageIndex);
        }
    }

    componentWillReceiveProps(nextProps: CustomerProps) {
        // This method runs when incoming props (e.g., route params) change
        let customerId = parseInt(nextProps.match.params.customerId);
        let pageIndex = parseInt(nextProps.match.params.pageIndex);

        if (customerId) {
            if (customerId != this.props.selectedCustomer && customerId != nextProps.selectedCustomer) {
                if (!pageIndex) {
                    pageIndex = 1;
                }
                this.handleCustomerId(customerId, pageIndex);
            }
            else if (pageIndex) {
                this.handleAccountPageChanged(pageIndex);
            }
        }
        else {
           
            this.props.clearCustomerDetails(); 
        }
    }

    ///Handles customerId changes to request a new customer 
    private handleCustomerId(customerId: number, pageIndex: number = 1) {
        if (!this.props.customerDetail || this.props.customerDetail.id != customerId) {
            this.props.requestCustomerDetails(customerId, pageIndex);
            this.props.requestAccountTypes();
            this.props.requestCurrencies();
        }
    }

    private handleAccountPageChanged(pageIndex: number) {
        this.props.requestCustomerDetails(this.props.customerDetail.id, pageIndex);
    }

    render() {
        return <div className="container">
            {this.props.isLoading? this.renderIsLoading() : ""}
            <div className="col-xs-3">
                <CustomerList customers={this.props.customers} selectedId={this.props.selectedCustomer} />
            </div>
            <div className="col-xs-9">   
                {this.props.customerDetail ? this.renderCustomerDetails() : <div className="text-center block-center">Select a customer please</div>}  
            </div>
        </div>
    }

    renderCustomerDetails()
    {
        return <div>
            <div>
                <CustomerDetail customerDetail={this.props.customerDetail} onDelete={this.accountOnDeleteHandler} />
            </div>
            <div>
                <CreateAccountForm {...this.props.accountForm} {...this.formActions} />
            </div>
        </div>;
    }

    renderIsLoading() {
        return <div className="static-modal loading-popup">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title> <span className="glyphicon glyphicon-refresh loading-spin" /> Loading</Modal.Title>

                </Modal.Header>
                <Modal.Body className="loader" >
                    Please wait while I load your data
                   
                            </Modal.Body>
            </Modal.Dialog>
        </div>
    }

    accountOnDeleteHandler = (accountId: number) => {
        let customerId = parseInt(this.props.match.params.customerId);
        if (confirm(`Do you really want to delete customer's ${customerId} account: ${accountId}?`)) {
            this.props.deleteAccount(customerId, accountId);
        }
    }


    formActions =
    {
        AccountTypeSelected: (accountType: string) => {
            this.props.requestClassCodes(accountType);
        },

        AddAccount: (account: CustomerState.CreateCustomerAccount) => 
        {
            this.props.addAccount({ ...account, customerId: this.props.customerDetail.id });
        },
    }
   
}

const mapStateToProps = (state: ApplicationState): CustomerProps => {
    return {
        customers: state.customer.customers,
        customerDetail: state.customer.customerDetail,
        isLoading: state.customer.isLoading,
        accountForm: state.customer.accountForm,
        selectedCustomer: state.customer.selectedCustomer,
        accountsPageIndex: state.customer.accountsPageIndex,
        isLoadingCustomerDetailc: state.customer.isLoadingCustomerDetail,
    } as any
};

const mapDispatchToProps = (dispatch: any): any => {
    return bindActionCreators({
        requestCustomers: CustomerState.actionCreators.requestCustomers,
        requestCustomerDetails: CustomerState.actionCreators.requestCustomerDetails,
        clearCustomerDetails: CustomerState.actionCreators.clearCustomerDetails,
        deleteAccount: CustomerState.actionCreators.deleteAccount,
        addAccount: CustomerState.actionCreators.addAccount,
        requestAccountTypes: CustomerState.actionCreators.requestAccountTypes,
        requestClassCodes: CustomerState.actionCreators.requestClassCodes,
        requestCurrencies: CustomerState.actionCreators.requestCurrencies,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Customer) as any;