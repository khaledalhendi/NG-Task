import { NavLink, Link } from 'react-router-dom';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as CustomerListState from '../store/CustomerList';
import { bindActionCreators } from 'redux';
import * as ListComp from './CustomerList';


type CustomerCellProps =
    CustomerListState.CustomerListState        // ... state we've requested from the Redux store
    & typeof CustomerListState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<any>;

class CustomerList extends React.Component<CustomerCellProps, {}> {

    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestCustomerList();
    }

    componentWillReceiveProps(nextProps: CustomerCellProps) {
        // This method runs when incoming props (e.g., route params) change
        //this.props.requestCustomerList(); 
    }

    render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>NG_Task</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>

                        {this.props.customers.map(c =>
                            <NavLink exact to={'/customer/' + c.id} activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> {c.name}
                                <div>
                                    {c.id}
                                </div>
                            </NavLink>
                        )};
                </ul>
                </div>
            </div>
        </div>;
    }
}
const mapStateToProps = (state: ApplicationState): CustomerCellProps => {
    return {
        customers: state.customerList.customers
    } as CustomerCellProps
};

const mapDispatchToProps = (dispatch: any): any => {
    return bindActionCreators({
        requestCustomerList: CustomerListState.actionCreators.requestCustomerList
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerList);
