import * as React from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends React.Component{

    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div>
                    <NavMenu />
                </div>
                <div >
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
