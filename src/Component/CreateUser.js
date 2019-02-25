import React,{Component} from 'react';
import firebase from 'firebase';
import M from 'materialize-css/dist/js/materialize.min.js'




class CreateUser extends Component {
  constructor () {
    super()
    this.state = {
      nwname:'',
      nwlastname:'',
    nwemail:'',
    nwPassword1:'',
    nwPassword2:'',
    nwPasswordvalidate:'',
    caracter:0,
    }
this.handleChange=this.handleChange.bind(this);
this.handleChangepass=this.handleChangepass.bind(this);
this.handleChangePassLength=this.handleChangePassLength.bind(this);
this.addCUser=this.addCUser.bind(this);
  }


  addCUser(e){
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(this.state.nwemail, this.state.nwPassword1)
      .then((userCredentials)=>{
          if(userCredentials.user){
            userCredentials.user.updateProfile({
              displayName:`${this.state.nwname} ${this.state.nwlastname}`
            })
            .then(result =>{
              this.props.handleDisplayName(this.state.nwname, this.state.nwlastname)
              var instance = M.Modal.getInstance(document.getElementById("modalCreateUser"));
              instance.close();
            })

          }
      })
      .catch(function(error) {
        console.log(error);
        console.log(error.code);
        var msnerror= "Error"
       if(error.code==="auth/email-already-in-use"){msnerror= "La dirección de correo electrónico ya está en uso por otra cuenta."}
        M.toast({html: '<span class="toast-span">'+msnerror+'</span><button class="btn-flat toast-action"><i class="large red-text material-icons">report</i></button>'})
      });

//      firebase.auth().createUserWithEmailAndPassword(this.state.nwemail,this.state.nwPassword1).then(function(user) {


  }

  handleChange(e){
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });

  }

  handleChangePassLength(e){
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      caracter:value.length
    });


  }

  handleChangepass(e){
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    if(value !== this.state.nwPassword1){
      this.setState({
        nwPasswordvalidate: 'El password no coincide con la verificació'
      });
    }else{
      this.setState({
        nwPasswordvalidate: ''
      });
    }

  }

render() {
  return (
    <div className="modal-content">
    <form action="#"  autoComplete="off" onSubmit={this.addCUser}>

      <div className="row">

      <div className="input-field col s6">
      <input id="nwname" type="text" name="nwname" onChange={this.handleChange} required />
      <label htmlFor="nwname">Nombre</label>
      </div>

      <div className="input-field col s6">
      <input id="nwlastname" type="text" name="nwlastname" onChange={this.handleChange} required />
      <label htmlFor="nwlastname">Apellido</label>
      </div>

      <div className="input-field col s12">
      <input id="nwEmail" type="email" name="nwemail" className="validate"  onChange={this.handleChange} required />
      <label htmlFor="nwEmail">Ingreasa email</label>
      <span className="helper-text" data-error="El email no tiene un formato valido" data-success=""></span>
      </div>
      </div>
      <div className="row">
      <div className="input-field col s12">
        <input id="nwPassword1" minLength="8" type="password" name="nwPassword1" className="validate" value={this.state.nwPassword1}  onChange={this.handleChangePassLength} required/>
        <label htmlFor="nwPassword1">Ingresa password</label>
        <span className="helper-text" data-error={this.state.caracter+' caracteres de un mínimo de 8'} data-success="">{this.state.caracter} caracteres de un mínimo de 8</span>
      </div>
      </div>
      <div className="row">
      <div className="input-field col s12">
        <input id="nwPassword2" type="password" name="nwPassword2" pattern={this.state.nwPassword1} className="validate" value={this.state.nwPassword2}  onChange={this.handleChangepass} required/>
        <label htmlFor="nwPassword2">verifica tu password</label>
        <span className="helper-text" data-error="El password no coincide con la verificación" data-success="">{this.state.nwPasswordvalidate}</span>
      </div>
      </div>


      <div className="modal-footer">
        <button type="submitsubmit" className=" btn waves-effect left">Crear cuenta</button>
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">cancelar</a>
      </div>

    </form>




   </div>
  )
}


}

export default CreateUser;
