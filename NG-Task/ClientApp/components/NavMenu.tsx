import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='navbar'>
                <div className='navbar navbar-inverse'>
                <ul className='nav navbar-nav'>
                    <li>
                        <Link className='navbar-brand' to={'/'}>NG_Task</Link>
                    </li>
                    <li>
                        <NavLink exact to={ '/' } activeClassName='active'>
                            <span className='glyphicon glyphicon-home'></span> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={ '/customer' } activeClassName='active'>
                            <span className='glyphicon glyphicon-education'></span> Customer
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={ '/fetchdata' } activeClassName='active'>
                            <span className='glyphicon glyphicon-th-list'></span> Fetch data
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>;
    }
}
