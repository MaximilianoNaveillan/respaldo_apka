import React  from 'react';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

//import userLocationURL from './user_location.svg';
import roundlens from './round-lens.svg';
import baselineadjust from './baseline-adjust.svg'
//import M from 'materialize-css/dist/js/materialize.min.js';
//import 'materialize-css/dist/css/materialize.min.css';

// setup


const searchIcon = L.icon({
iconUrl:roundlens,
iconSize: [200, 200],
className: 'locationicon'
});

const myIcon = L.icon({
iconUrl:baselineadjust,
iconSize: [15, 15],
className: 'imagepulseicon'
});

//map.on('zoomend',function(e) { console.log(e.target.getZoom()); })


export default class Mapa extends React.Component {
  constructor () {
    super()
    this.state = {
    zoom: 13,
  }
this.rendermyposition = this.rendermyposition.bind(this)
this.renderOptions = this.renderOptions.bind(this)
  }

rendermyposition(){
  if(!this.props.watchID){
          return null;
      }
const myposition = [this.props.gpslat, this.props.gpslng]
return <Marker position={myposition} icon={myIcon} > </Marker>
}

renderOptions(){

  }

//  fetch('https://nominatim.openstreetmap.org/search?q=Chile[parkings]&format=json&polygon=false&addressdetails=false')
//var loc=[{}]
//fetch(`https://nominatim.openstreetmap.org/search?q=${this.props.myAddressName}&format=json&polygon=false&addressdetails=1`)
//  .then(res => res.json())
//  .then(location => {

//  });






    render(){
        const positionsearch = [this.props.lat, this.props.lng]

        return (
          <div className="contentmap">
          <Map className="map" center={positionsearch} zoom={this.state.zoom} zoomControl={false}>

            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
            position={positionsearch}
            icon={searchIcon}
            >
              <Popup>{this.props.myAddressName}</Popup>
            </Marker>

            {this.rendermyposition()}

            {this.renderOptions()}



          </Map>
          </div>
        );
    }
}
