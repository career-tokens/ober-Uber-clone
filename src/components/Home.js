
import "leaflet/dist/leaflet.css"
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
import L, { Icon } from "leaflet";
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
  const { selectedFrom, selectedTo, user, currentRide } = useContext(Context);
  //console.log(user)
  if (user) {
    usre=user
    uid = user.uid
    //console.log(uid)
  }
  const customIcon = new Icon({
        iconUrl: "https://as2.ftcdn.net/v2/jpg/02/98/28/57/1000_F_298285715_ct4qtZOJH119A39TdMrbkLsfziVCX1Rz.jpg",
        iconSize: [40,40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
  })
  
 
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
      console.log(selectedFrom)
    return selectedFrom && selectedTo && selectedFrom.label &&
    selectedTo.label && selectedFrom.x && selectedTo.x &&
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
    color: "blue",
    opacity: "0.7",
    weight: 6
    }
    ]
    },
    router: L.Routing.mapbox(`${process.env.REACT_APP_MAP_BOX_API_KEY}`)
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