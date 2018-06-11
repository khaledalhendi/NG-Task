import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='navbar'>
                <div className='navbar navbar-inverse'>
                <ul className='nav navbar-nav'>
                    <li>
                        <Link className='navbar-brand' to={'/'}>NG Task</Link>
                    </li>
                    <li>
                        <NavLink exact to={ '/' } activeClassName='active'>
                            <span className='glyphicon glyphicon-home'></span> Customers
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>;
    }
}
