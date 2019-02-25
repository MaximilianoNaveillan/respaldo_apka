import React,{Component} from 'react';
import firebase from 'firebase';
import Aparkar from './parking-deck.jpg';
import M from 'materialize-css/dist/js/materialize.min.js'






class Userinfo extends Component {
  constructor () {
    super()
    this.state = {
      uploadValue:0,
      picture:null
    }
    this.renderUserData = this.renderUserData.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
    handleChange(event){
      const user= firebase.auth().currentUser;
      const file = event.target.files[0];
      const filename = file.name.split('.').pop();

      if(filename === "jpg"){
        const storageRef = firebase.storage().ref(`photo-users/${this.props.email}`);
        const task = storageRef.put(file);

        task.on('state_changed', snapshot => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
            uploadValue: percentage
          })
        }, error => {
          console.log(error.message)
        }, () => {
          storageRef.getDownloadURL().then(url => {
                   this.setState({
                            picture: url,
                            uploadValue: 0
                        });
                        user.updateProfile({
                          photoURL : url
                        })
                        this.props.onHandleOnChange('photoURL',url)
                        document.getElementById("filePath").value = "";
                        document.getElementById("chargenwimg").value = "";
                        M.toast({html: '<span>Guardado...</span><button class="btn-flat toast-action"><i class="large green-text material-icons">check_circle</i></button>'})

                    })﻿




        });
      }else{
          M.toast({html: '<span>Formato inválido...</span><button class="btn-flat toast-action"><i class="large red-text material-icons">report</i></button>'})

      }
      this.setState({
               picture: null,
               uploadValue: 0
           });
      document.getElementById("chargenwimg").value = "";
      document.getElementById("filePath").value = "";
    }



renderUserData(){
    var imgreturn = (<i className="material-icons circle teal darken-3">person</i>);

    if (this.state.picture){
      imgreturn = (
        <img
        className="circle"
        src={this.state.picture}
        alt={this.props.displayName}
        />
      )

    }

      if(this.props.photoURL!== null){
        imgreturn = (
          <img

          className="circle"
          src={this.props.photoURL}
          alt={this.props.displayName}
          />
        )

    }


    return (imgreturn)

}


render() {
  const style ={
      width:`${this.state.uploadValue}%`
  }
  //user.displayName, photoURL:user.photoURL, email:user.email
  return (

    <div>
    <div className="card-image">
      <img src={Aparkar} alt={this.props.displayName}  style={{height:"40vh",width:"100%"}}/>
      <span className="card-title">
      <div id="avataruserinfo" className="collection-item avatar margin0">
        {this.renderUserData()}

        <span className="title truncate">{this.props.displayName} </span>
        <p className="truncate">{this.props.email} {this.state.img}</p>


        <div className="file-field input-field">

        <label htmlFor="chargenwimg" className="chargephoto">
        <i className="material-icons">camera_alt</i>
        <input id="chargenwimg" onChange={this.handleChange} type="file"/>
        <input id="filePath" placeholder="editar imagen" className="file-path validate chargephotoinput" type="text"/>
        </label>
      </div>
      </div>
      </span>
    </div>






    <div className="modal-footer marginandpadding0">
    <div className="progress marginandpadding0">
    <div className="determinate" style={style}></div>
    </div>
      <a onClick={this.props.onLogout} href="#!" className="modal-close waves-effect waves-red btn-flat left">Cerrar sesión</a>
      <a href="#!" className="modal-close waves-effect waves-white btn-flat">cancelar</a>
    </div>



    </div>
  )
}


}

export default Userinfo;
