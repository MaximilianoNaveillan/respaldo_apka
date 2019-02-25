import React,{Component} from 'react';
import {Link} from 'react-router-dom';


class Navigation extends Component {
  constructor () {
    super()
    this.state = {
      onload:true
    }
    this.renderUserData = this.renderUserData.bind(this)
    this.renderLoginButton = this.renderLoginButton.bind(this)
  }



  renderUserData () {
  //  onModalUserOpen(user.displayName,user.photoURL)

  var imgreturn = (<i className="material-icons circle teal darken-3">person</i>);

  if(this.props.photoURL){
    if(this.props.photoURL!== null){
      imgreturn = (
        <img
        className='circle'
        src={this.props.photoURL}
        alt={this.props.user.displayName}
        />
      )
    }

  }

  //

    return (
      <ul className="collection right iconuser">
      <li className="waves-effect waves-light collection-item avatar valign-wrapper">
      <a className="modal-trigger" href="#modalUser">
      {imgreturn}
      </a>
      </li>
      </ul>
    )
  }

  renderLoginButton () {
//   onClick={this.props.onAuth}

    return (
      <ul className="right">
      <li className='waves-effect waves-light'>
        <a className='modal-trigger' href="#modalLogin">
          Iniciar sesión
        </a>
      </li>
      </ul>

    )
  }

render() {

  return (
    <div>
    <nav className='nav-wrapper teal'>
      <div className='container'>
      <ul>
      <Link className="brand-logo waves-effect waves-light" to={'/'}>
        {this.props.appName}
      </Link>
      </ul>

      {this.props.user ? this.renderUserData() : this.renderLoginButton()}

        <ul className="right hide-on-med-and-down">

         <li className='waves-effect waves-light '>
             <Link to={'/misapka'}>
                 Publica tu estacionamiento
             </Link>
         </li>

        </ul>



      </div>

    </nav>

    </div>
  )
}


}

export default Navigation;
