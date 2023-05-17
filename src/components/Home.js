
import "leaflet/dist/leaflet.css"
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import image from "../marker.png"
import { getDatabase, ref, child, get } from "firebase/database";
// import useContext, useRef, useEffect, useCallback
import { useContext, useRef, useEffect, useCallback, useState } from 'react';
// import custom components.
import Header from './Header';
import AddressPicker from './AddressPicker';
import RideList from './RideList';
import RideDetail from './RideDetail';
import { useNavigate } from 'react-router-dom';
// import Context
import Context from '../Context';
// import leaflet
import L, { Icon, icon } from "leaflet";
import RequestRide from "./RequestRide";
var rol = null; var uid = null; var isuser = false; var usre = null;
require("leaflet-routing-machine");

const style = {
width: "100%",
height: "100vh"
};

function Home() {
  const history = useNavigate();
  const [isUser, setIsUser] = useState(null);
  const { selectedFrom, setSelectedFrom, selectedTo, setSelectedTo, user, currentRide } = useContext(Context);
  //console.log(user)
  if (user) {
    usre=user
    uid = user.uid
    //console.log(uid)
  }
  const marker = new L.Icon({
    iconUrl: image,
    iconSize: [25, 25],
    iconAnchor: [15, 25],
    popupAnchor: [0, 0],
  });
  
 
const map = useRef();
const routeControl = useRef();

useEffect(() => {
initMap();
initRouteControl();
}, []);

const drawRoute = useCallback((from, to) => {
  if (shouldRouteDraw(from, to) && routeControl && routeControl.current) {
    const fromLatLng = new L.LatLng(from.y, from.x);
    const toLatLng = new L.LatLng(to.y, to.x);

    const marker1 = new L.Marker([from.y,from.x], {
      icon: marker,
    });
    
    map.current.addLayer(marker1);

    const marker2 = new L.Marker([to.y,to.x], {
      icon: marker,
    });
    
    map.current.addLayer(marker2);
  
    routeControl.current.setWaypoints([fromLatLng, toLatLng]);

}
}, []);

useEffect(() => {
if (shouldRouteDraw(selectedFrom, selectedTo)) {
drawRoute(selectedFrom, selectedTo);
}
}, [selectedFrom, selectedTo, drawRoute]);
  
 
/**

    check a route should be drawn, or not.
    @param {*} selectedFrom
    @param {*} selectedTo
    */
  const shouldRouteDraw = (selectedFrom, selectedTo) => {
    console.log("selectedFrom ",selectedFrom)
    console.log("selectedTo ", selectedTo)
    console.log(selectedFrom && selectedTo&& selectedFrom.x && selectedTo.x &&
      selectedFrom.y && selectedTo.y)
    return selectedFrom && selectedTo&& selectedFrom.x && selectedTo.x &&
    selectedFrom.y && selectedTo.y;
    };

/**

    init leaflet map.
    */
    const initMap = () => {
    if (!map.current) {
    map.current = L.map("map", {
    center: [38.8951, -77.0364],
    zoom: 13,
    layers: [
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    })
    ]
    });
    }
    };

/**

    init route control.
    */
    const initRouteControl = () => {
      if (!routeControl.current) {
        routeControl.current = L.Routing.control({
          show: true,
          fitSelectedRoutes: true,
          plan: false,
          lineOptions: {
            styles: [
              {
                color: "yellow",
                opacity: "0.8",
                weight: 2
              }
            ]
          },
          createMarker: function (i, waypoint, n) {
            // Use the custom icon for the markers
            return L.marker(waypoint.latLng, {
              icon: marker
            });
          },
          router: L.Routing.mapbox(`${process.env.REACT_APP_MAP_BOX_API_KEY}`),
        })
        .addTo(map.current)
        .getPlan();
      }
    };
    
    

  const renderSidebar = () => {
  
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val())
        rol = snapshot.val().role;
        //console.log(rol)
        setIsUser(rol === 'user')
      } else {
        //dconsole.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

   
    // console.log(rol)
    // console.log(uid)
    //console.log(isUser);
    //console.log(currentRide)
    // console.log(currentRide.request.driver)
    // console.log(!isUser)
    if (isUser)
      isuser = true;
    if (currentRide && currentRide.status && currentRide.status === 2)
      localStorage.removeItem('currentRide');
    if (isuser && !currentRide && (!selectedFrom || !selectedTo)) {
      history('/route');
    }
    if (!selectedFrom && !selectedTo && currentRide)
    {
      //console.log(currentRide)
      //setSelectedTo(currentRide.ride.destination.raw)
      //setSelectedFrom(currentRide.ride.pickup.raw)
      console.log("destination ", currentRide.ride.destination.raw.lat)
      setSelectedFrom(() => ({
        x: currentRide.ride.pickup.raw.lon,
        y: currentRide.ride.pickup.raw.lat,
      }));
      setSelectedTo(() => ({
        x:currentRide.ride.destination.raw.lon ,
        y:currentRide.ride.destination.raw.lat,
      }));
      
    }
      
    if (selectedFrom && selectedTo&&!currentRide)
      return <RequestRide props={"was required for modal but now not req"}/>
        if (isuser && currentRide) {
        return <RideDetail user={currentRide.request.driver} isDriver={false} currentRide={currentRide} />
        }
        if (!isuser && !currentRide) {
        return <RideList />
        }
        if (!isuser && currentRide&&currentRide.ride) {
        return <RideDetail user={currentRide.ride.requestor} isDriver={true} currentRide={currentRide} />
        }
  

}

  return (
    <>
      <Header />
      <div id="map" style={style} />
      {renderSidebar()}
    </>
  );
}

export default Home;