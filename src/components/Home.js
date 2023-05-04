
import "leaflet/dist/leaflet.css"
import { getDatabase, ref, child, get } from "firebase/database";
// import useContext, useRef, useEffect, useCallback
import { useContext, useRef, useEffect, useCallback, useState } from 'react';
// import custom components.
import Header from './Header';
import AddressPicker from './AddressPicker';
import RideList from './RideList';
import RideDetail from './RideDetail';
// import Context
import Context from '../Context';
// import leaflet
import L from "leaflet";
var rol = null;var uid=null;var usre = null;
require("leaflet-routing-machine");

const style = {
width: "100%",
height: "100vh"
};

function Home() {
  const [isUser, setIsUser] = useState(null);
  const { selectedFrom, selectedTo, user, currentRide } = useContext(Context);
  //console.log(user)
  if (user) {
    usre=user
    uid = user.uid
    //console.log(uid)
  }
  
 
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
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
    setIsUser(rol==='user')
  } else {
    //dconsole.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

   
     // console.log(rol)
     // console.log(uid)
      //console.log(isUser);
     console.log(currentRide)
      
      if (isUser && !currentRide) {
        return <AddressPicker />
        }
        if (isUser && currentRide) {
        return <RideDetail user={currentRide.driver} isDriver={false} currentRide={currentRide} />
        }
        if (!isUser && !currentRide) {
        return <RideList />
        }
        if (!isUser && currentRide) {
        return <RideDetail user={currentRide.requestor} isDriver={true} currentRide={currentRide} />
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