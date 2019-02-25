import React,{Component} from 'react';
import firebase from 'firebase';
import M from 'materialize-css/dist/js/materialize.min.js'





class Login extends Component {
  constructor () {
    super()
    this.state = {
      email:'',
      password:''
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleSubmit(event){
     event.preventDefault();
     //this.props.onAuthEmail(this.state.email,this.state.password)
     firebase
       .auth()
       .signInWithEmailAndPassword(this.state.email,this.state.password)
       .then((user) => {
         M.toast({html: '<span class="toast-span">Has ingresado correctamente</span><button class="btn-flat toast-action"><i class="large green-text material-icons">check_circle</i></button>'})
         var instance = M.Modal.getInstance(document.getElementById("modalLogin"));
         instance.close();
         this.setState({
           email:'',
           password:''
         });
       })
       .catch((error) => {
         var msnerror= "Error"
         if(error.code==="auth/wrong-password"){msnerror= "La contraseña no es válida."}
         if(error.code==="auth/user-not-found"){msnerror= "No hay registro de usuario correspondiente a este identificador."}
         M.toast({html: '<span class="toast-span">'+msnerror+'</span><button class="btn-flat toast-action"><i class="large red-text material-icons">report</i></button>'})

       });
   }


handleChange(e){
  const { name, value } = e.target;
  this.setState({
    [name]: value
  });

}

render() {
  return (
    <div className="modal-content">

    <div className="row">

    <div className="row">

    <a className="btn waves-effect white black-text col s12 modal-close loginoption"  onClick={this.props.onAuth} href="#!">
    <i className="material-icons left">
    <img width="17px" alt="Google &quot;G&quot; Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
    </i>Iniciar sesión con google
    </a>

    </div>

    <div className="card">
    <div className="input-field col s12">
    <h6>Iniciar sesión con email</h6>
    {this.state.error}
    </div>

    <form onSubmit={this.handleSubmit}>
      <div className="row">
      <div className="input-field col s12">
      <input id="email" type="text" name="email" className="validate" value={this.state.email} onChange={this.handleChange} required />
      <label htmlFor="email">Email</label>
      </div>
      </div>
      <div className="row">
      <div className="input-field col s12">
        <input id="password" type="password" name="password" className="validate" value={this.state.password} onChange={this.handleChange} required/>
        <label htmlFor="password">Password</label>
      </div>
      </div>

      <div className="row">
      <div className="input-field col s12 right-align" >
        <button type="submit" className=" btn waves-effect">Iniciar sesión</button>
      </div>
      </div>

    </form>
    </div>

    <a className="modal-close btn waves-effect col s12 loginoption modal-trigger" href="#modalCreateUser">
    <i className="material-icons left">person_add</i>Crear cuenta
    </a>

    </div>

    <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect waves-green btn-flat">cancelar</a>
    </div>

   </div>
  )
}


}

export default Login;
