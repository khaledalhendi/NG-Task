import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CustomerListProp } from '../store';

export const CustomerList = (props: CustomerListProp) => {
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

                    {props.customers.map(c => 
                        <NavLink exact to={'/customer/' + c.id } activeClassName='active'>
                            <span className='glyphicon glyphicon-home'></span> {c.name }
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
