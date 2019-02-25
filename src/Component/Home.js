import React from 'react';
import {Link} from 'react-router-dom';



export default class Home extends React.Component {


    render(){
        const style ={
            display:'flex',
            justifyContent:'center',
            alignItems:'center'

        }


        return (
          <div>

          <div className="fixedtop">

            <Link className="btn-floating fixedbtnbtn teal lighten-2 scale-transition scale-out"
            to={'/about'} >
            <i className="material-icons">search</i>
            </Link>

          </div>
                <div style={style}>
                   <div  >
                         <div className={'container '}>
                             <h2 className={'teal-text'}>Hello World!</h2>
                             <p>
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                         </p>
                         </div>
                    </div>
                </div>
          </div>
        );
    }
}
