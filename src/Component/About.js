import React from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import Mapa from '../Component/Mapa';
//import {Route} from 'react-router-dom';
import { OpenStreetMapProvider} from 'leaflet-geosearch';
import M from 'materialize-css/dist/js/materialize.min.js'



// setup
var provider = new OpenStreetMapProvider();




export default class About extends React.Component {
  constructor () {
    super()
    this.state = {
      search:'',
      adresssearch:[],
      lat: 0,
      lng: 0,
      gpslat: 0,
      gpslng: 0,
      gps:null,
      watchID:null,
      myAddressName:null,
      dbuser:null,
      useruid:'',
      vehicle:null,
      traslatenav:false,
        }
  this.selectAdress = this.selectAdress.bind(this)
  this.watchPosition = this.watchPosition.bind(this)
  this.renderTestLogin = this.renderTestLogin.bind(this)
  this.renderVheicleSelect = this.renderVheicleSelect.bind(this)
  this.sideNav = this.sideNav.bind(this)
  this.closeSidenav = this.closeSidenav.bind(this)

  }

  sideNav(){
    this.setState(prevState => ({
      traslatenav: !prevState.traslatenav
    }));
    if(this.state.traslatenav === false){
      document.getElementById("search").focus();
    }

    }

  closeSidenav(e){
  if(e===true){this.sideNav()}
}

  watchPosition(){
    navigator.geolocation.clearWatch(this.state.watchID);
    var watchID =''
    if(this.state.gpslat !== 0){
      navigator.geolocation.clearWatch(this.state.watchID);
      watchID = null;
      this.setState({
          gpslat:0,
          gpslng:0
      });
    }
    else{
      watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
          gpslat:position.coords.latitude,
          gpslng:position.coords.longitude
      });
    },(err) => {
      console.warn('ERROR(' + err.code + '): ' + err.message);
      navigator.geolocation.clearWatch(this.state.watchID);
      watchID = null;
      this.setState({
          gpslat:0,
          gpslng:0
      });
    },{
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  })
    }

    this.setState({watchID})

  }
  //componentDidUpdate(){

  //}
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({useruid:user.uid,traslatenav:true});
        firebase.database().ref(this.state.useruid).on('value', snap => {

          if(snap.val().vehicle){
            this.setState({vehicle:snap.val().vehicle});
            document.getElementById(`setVehicle${snap.val().vehicle}`).checked = true;
          }

        });

      }else{
        this.setState({useruid:''});
        if(this.state.vehicle){
          document.getElementById(`setVehicle${this.state.vehicle}`).checked = false;
          this.setState({vehicle:null});
        }
      }

    } )
    navigator.geolocation.getCurrentPosition((position) => {

      fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon='+position.coords.longitude+'&lat='+position.coords.latitude)
      .then(res => res.json())
      .then(location => {
       this.setState({myAddressName:location.display_name});
      });
    this.setState({
        lat:position.coords.latitude,
        lng:position.coords.longitude,
    });

  },() => {
      console.log("no se puede acceder a tu locación");
      fetch('https://ipapi.co/json')
      .then(res => res.json())
    .then(location => {
      this.setState({
          lat:location.latitude,
          lng:location.longitude,

      });
      fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon='+location.longitude+'&lat='+location.latitude)
      .then(res => res.json())
      .then(location => {
      this.setState({myAddressName:location.display_name});
      });
      })

    })
// firebase datos de vehículo
//useruid:'',
//    const userdb = firebase.database().ref().child('object');
  }

  setVehicle(e){
    const userdb = firebase.database().ref(this.state.useruid);
    userdb.update({
      vehicle:e
    })
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
      M.AutoInit();
      return '';
    }
  }

  renderVheicleSelect(e){
    var icon="dehaze";
    var name="";
    var color="";
    if(!e){name='selecciona vheículo';color='red-text';}
    if(e==='1'){icon='directions_bike';console.log("icon");name='bicicleta'}
    if(e==='2'){icon='motorcycle';name='motocicleta'}
    if(e==='3'){icon='time_to_leave';name='vheículo pequeño'}
    if(e==='4'){icon='airport_shuttle';name='vheículo mediano'}
    if(e==='5'){icon='local_shipping';name='vheículo grande'}
    return(
      <div className="row vehicleselect">
      <div className="col s8 left-align">
      {name}
      </div>
      <div className="col s2 right-align" >
      <i className={`material-icons ${color}`}>{icon}</i>
      </div>
      <div className="col s2 left-align">
      <i className="material-icons left-align left" >arrow_drop_down</i>
      </div>
      </div>
    )
  }

  componentWillUnmount(){

        navigator.geolocation.clearWatch(this.state.watchID);

        firebase.database().ref(this.state.useruid).off()
        //firebase.auth().off();
  }


  changeSearch (e) {
    if(!this.state.vehicle){
    var instance = M.Collapsible.getInstance(document.getElementById("selectvheicle"));
    instance.open(1);
    this.setState({search:''})
  }else{
    var value=e.target.value
    this.setState({search:value})

        if(value.length < 3){
          this.setState({adresssearch:[]});
          return false;
        }
        else{
          provider.search({ query: `${value}, Chile` }).then((results) => {
            this.setState({adresssearch:results});
            return false;
          })
        }
  }
  }

  selectAdressoff(){
    this.setState({adresssearch:[],search:''})
  }

  selectAdress(x,y,label){
    firebase.auth().onAuthStateChanged(user => { console.log(user.uid) } )
    this.setState({adresssearch:[],search:'',lat:y,lng:x})
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon='+x+'&lat='+y)
    .then(res => res.json())
    .then(location => {
     this.setState({myAddressName:location.display_name,adresssearch:[]});
    });
  }



    render(){

      const stylenav = `sidenav ${this.state.traslatenav ? 'traslateon' : 'traslateoff'} scale-transition scale-out`;
      const stylebtn = `${this.state.traslatenav ? 'fixedtopon' : 'fixedtop'}`;

        return (

            <div >

            {this.renderTestLogin()}
            <div className={stylebtn}>
              <a
              className="btn-floating fixedbtnbtn teal lighten-2  scale-transition"
              href="#!"
              onClick={this.sideNav}
              >
              <i className="material-icons">search</i>
              </a>
            </div>


            <div className={stylenav}  id="sidenavsearch">


              <ul className="collapsible" id="selectvheicle">


                  <li id="lisearch">

                  <div className="collapsible-header divsearch row">

                  <div className="col  s12 marginandpadding0">

                  <div className="input-field transparent divsearchfield">

                  <input
                  className="col s10"
                  id="search"
                  type="search"
                  placeholder="Busqueda por dirección"
                  value={this.state.search}
                  onChange={this.changeSearch.bind(this)}
                  onClick={this.changeSearch.bind(this)}
                  />
                  <i className="material-icons col s2" onClick={this.selectAdressoff.bind(this)}>close</i>


                  </div>

                  </div>

                  </div>

                  <div className="collapsible-body hidden"></div>

                  <div className="fixed collection ulstringsearch">
                  {
                    this.state.adresssearch.map( search => {
                      return(
                          <a href="#!"
                          onClick={() => this.selectAdress(search.x,search.y,search.label)}
                          className="collection-item lighten-4"
                          key={search.raw.place_id}>
                          {search.label}
                          </a>
                      )
                    })
                  }
                  </div>

                  </li>









                  <li>
                  <div className="collapsible-header waves-effect waves-block waves-grey">
                  {this.renderVheicleSelect(this.state.vehicle)}
                  </div>
                  <div className="collapsible-body grey lighten-4">
                  <form>

                  <div className="row vehicleselect waves-effect waves-block waves-grey" onClick={() => this.setVehicle('1')}>
                  <div className="col s8">
                  <label>
                  <input name="group1" id="setVehicle1" type="radio" />
                  <span>bicicleta</span>
                  </label>
                  </div>
                  <div className="col s4" >
                  <label htmlFor="setVehicle1"><i className="material-icons">directions_bike</i></label>
                  </div>
                  </div>

                  <div className="row vehicleselect waves-effect waves-block waves-grey" onClick={() => this.setVehicle('2')}>
                  <div className="col s8">
                  <label>
                  <input name="group1" id="setVehicle2" type="radio"  />
                  <span>motocicleta</span>
                  </label>
                  </div>
                  <div className="col s4">
                  <label htmlFor="setVehicle2"><i className="material-icons">motorcycle</i></label>
                  </div>
                  </div>

                  <div className="row vehicleselect waves-effect waves-block waves-grey" onClick={() => this.setVehicle('3')}>
                  <div className="col s8">
                  <label>
                  <input name="group1" id="setVehicle3" type="radio"  />
                  <span>vehículo pequeño</span>
                  </label>
                  </div>
                  <div className="col s4">
                  <label htmlFor="setVehicle3"><i className="material-icons">time_to_leave</i></label>
                  </div>
                  </div>

                  <div className="row vehicleselect waves-effect waves-block waves-grey" onClick={() => this.setVehicle('4')}>
                  <div className="col s8">
                  <label>
                  <input name="group1" id="setVehicle4" type="radio"  />
                  <span>vehículo mediano</span>
                  </label>
                  </div>
                  <div className="col s4">
                  <label htmlFor="setVehicle4"><i className="material-icons">airport_shuttle</i></label>
                  </div>
                  </div>

                  <div className="row vehicleselect waves-effect waves-block waves-grey" onClick={() => this.setVehicle('5')}>
                  <div className="col s8">
                  <label>
                  <input name="group1" id="setVehicle5" type="radio"  />
                  <span>vehículo grande</span>
                  </label>
                  </div>
                  <div className="col s4">
                  <label htmlFor="setVehicle5"><i className="material-icons">local_shipping</i></label>
                  </div>
                  </div>


                  </form>


                  </div>
                </li>

                <li>
                  <div className="collapsible-header">
                  <i className="material-icons">time_to_leave</i>
                  {this.state.vehicle}
                  </div>

                  <div className="collapsible-body grey lighten-4">
                  <div className="divider"></div>
                  <span>Lorem ipsum dolor sit amet.</span>
                  </div>
                </li>
              </ul>

            </div>




<div onClick={() => this.closeSidenav(this.state.traslatenav)} >
<Mapa
watchID={this.state.watchID}
myAddressName={this.state.myAddressName}
lat={this.state.lat}
lng={this.state.lng}
gpslat={this.state.gpslat}
gpslng={this.state.gpslng}
onselectAdressoff={() => this.selectAdressoff} />

<div className="fixed-action-btn direction-top active" >
<Link className="btn-floating fixedbtnbtn teal lighten-2" to={'/about'}><i className="material-icons">add</i></Link><br/>
<Link className="btn-floating fixedbtnbtn teal lighten-2" to={'/about'}><i className="material-icons">remove</i></Link><br/><br/>
<Link className="btn-floating fixedbtnbtn red" onClick={this.watchPosition} to={'/about'}><i className="material-icons">pin_drop</i></Link>
</div>
</div>





{
//  <div className="fixed-action-btn">
//    <a href="#!" className="btn-floating teal" onClick={this.watchPosition}>
//      <i className="large material-icons">pin_drop</i>
//    </a>
//  </div>
//
//  <div className="fixed-action-btn ">
//    <a href="#!" className="btn-floating red">
//      <i className="large material-icons">remove</i>
//    </a>
//    <a href="#!" className="btn-floating red">
//      <i className="large material-icons">add</i>
//    </a>
//  </div>

}




            </div>
        );
    }
}
