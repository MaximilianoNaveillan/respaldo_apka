import React from 'react';
import {Link} from 'react-router-dom';
import Aparkar from './parking-deck.jpg';
import firebase from 'firebase';

export default class Misapka extends React.Component {
  constructor () {
    super()
    this.state = {
      datacharge:null,
      useruid:'',
      displayName:'Cargando...',
      phone:'',
      cl:''
    }
    this.renderTestLogin = this.renderTestLogin.bind(this)
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({useruid:user.uid,img:user.photoURL});
        firebase.database().ref(this.state.useruid).on('value', snap => {
          if(snap.val()){
            this.setState({
              displayName:snap.val().displayName,
              datacharge:true,
              phone:snap.val().phone,
            });
          }

        });

      }else{
        this.setState({
          useruid:'',
          displayName:'Cargando...',
          datacharge:true,
        });
      }

    } )
  }

  componentWillUnmount(){
        firebase.database().ref(this.state.useruid).off();
  }

  renderTestLogin(){
    if(!this.state.useruid){
      return (
        <div>
        <div id="modal11" className="modal open"
        style ={{zIndex: 1003,display: 'block',opacity: 1,top: '10%',transform: 'scaleX(1) scaleY(1)'}}>
          <div className="modal-content center-align">

            <h6>Para acceder a la busqueda debes estar registrado</h6><br/>

              <a className="waves-effect waves-light btn modal-trigger margin0" href="#modalLogin">Iniciar sesión</a>
          </div>
          <div className="modal-footer">


            <a href="/" className="modal-close waves-effect waves-green btn-flat margin0">Salir de la busqueda</a>
          </div>

        </div>

        <div className="modal-overlay" style={{zIndex: "1002", display: "block", opacity: "0.5"}}></div>
        </div>
      );
    }else {

      if(!this.state.phone){
        fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(location => {
          console.log(location);
          this.setState({cl:location.country_calling_code})
        })
        return (
          <div>
          <div id="modal11" className="modal open"
          style ={{zIndex: 1003,display: 'block',opacity: 1,top: '10%',transform: 'scaleX(1) scaleY(1)'}}>
            <div className="modal-content center-align">

              <h6>Aún no registras tu número telefónico</h6><br/>

              <form className="col s12">
              <div className="row">
                <div className="input-field col s4">
                  <input id="first_name" type="tel" className="validate"/>
                  <label htmlFor="first_name">{this.state.cl}</label>
                </div>
                <div className="input-field col s8">
                  <input id="last_name" type="tel" className="validate"/>
                  <label htmlFor="last_name">Numero telefónico</label>
                </div>
              </div>
              </form>


            </div>
            <div className="modal-footer">


              <a href="/" className="modal-close waves-effect waves-green btn-flat margin0">Salir</a>
            </div>

          </div>

          <div className="modal-overlay" style={{zIndex: "1002", display: "block", opacity: "0.5"}}></div>
          </div>
        );


      }else{
        return '';
      }
    }
  }

    render(){

        return (
            <div className={''} >
            {this.renderTestLogin()}

            <div className="fixedtop">
              <Link className="btn-floating fixedbtnbtn teal lighten-2 scale-transition scale-out" to={'/about'}>
              <i className="material-icons">search</i>
              </Link>
            </div>
            <div className="row">
            <div className="col s12 addapka">
              <div className="card">
                <div className="card-image">

                  <img style={{height:"40vh",width:"100%"}} alt={this.state.displayName} src={Aparkar}/>
                  <h5 className="publictitle">¡ Publica tu estacionamiento y gana dinero !</h5>


                  {this.state.datacharge ?
                  <span className="card-title spantitle">
                  {this.state.displayName}
                  </span>
                :null}

                </div>
                <div className="card-content">
                  <p>{this.state.displayName}</p>
                </div>
                <div className="card-action">
                  <a href="#">Crear nueva publicación</a>
                </div>
              </div>
            </div>
            </div>
            </div>
        );
    }
}
