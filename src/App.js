// import useState
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
// import react router dom.
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
// import custom components.
import Home from './components/Home';
import Login from './components/Login';
import Loading from './components/Loading';
import PrivateRoute from './components/PrivateRoute';
// import global styling.
import './index.css';
// import Context
import Context from './Context';
// import realtime database from Firebase.
import { realTimeDb } from "./firebase";
import AddressPicker from './components/AddressPicker';
import OpeningScreen from './components/OpeningScreen';
import UIscreen from './components/UIscreen';
// create App components.
function App() {
  // create loading state and share to other components.
  // loading state will be used to show / hide loading indicator.
  const [isLoading, setIsLoading] = useState(false);
  // user state contains authenticated user.
  const [user, setUser] = useState(null);
  // comet chat.
  const [cometChat, setCometChat] = useState(null);
  // selected from, selected to.
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  // created ride request.
  const [rideRequest, setRideRequest] = useState(null);
  // current ride.
  const [currentRide, setCurrentRide] = useState(null);

  const lookingDriverMaxTime = 3000000;

  useEffect(() => {
    initAuthUser();
    initCometChat();
    initCurrentRide();
  }, []);

  useEffect(() => {
    if (rideRequest) {
      // create a timeout to trigger notification if there is no driver.
      const lookingDriverTimeout = setTimeout(() => {
        alert('Cannot find your driver, please re-enter your pickup location and try again');
        // remove the created ride.
        setRideRequest(null);
        // hide loading indicator.
        setIsLoading(false);
      }, lookingDriverMaxTime);
      // show loading indicator.
      setIsLoading(true);
      // check data changes from firebase real time database. If there is a driver accepted the request.
      //console.log(rideRequest)
      const db = getDatabase();
      const createdRideRef = ref(db,`rides/${rideRequest.rideUuid}`);
      onValue(createdRideRef, (snapshot) => {
        const updatedRide = snapshot.val();
        console.log("updated request ",updatedRide)
        console.log("ride request  ",rideRequest)
        if (updatedRide.request&&updatedRide.request.status===1 ) {
          // hide loading indicator.
          setIsLoading(false);
          // remove looking for driver timeout.
          clearTimeout(lookingDriverTimeout);
          // set rider request and created ride.
          setRideRequest(null);
          // set created ride.
          localStorage.setItem('currentRide', JSON.stringify(updatedRide));
          // set current Ride. 
          setCurrentRide(() => updatedRide);
        }
      });
    }
  }, [rideRequest]);

  useEffect(() => {
    if (currentRide&&currentRide.ride) {
      const db = getDatabase();
      const currentRideRef = ref(db,`rides/${currentRide.ride.rideUuid}`);
      onValue(currentRideRef, (snapshot) => {
        const updatedRide = snapshot.val();
        console.log("2nd updated ride ", updatedRide)
        console.log("2nd para currentRide ",currentRide)
        if (updatedRide && updatedRide.rideUuid === currentRide.rideUuid && updatedRide.driver && (updatedRide.ride.status === -1 || updatedRide.status === 2)) {
          // remove localStorage.
          localStorage.removeItem('currentRide');
          // remove data from context.
          setCurrentRide(null);
          // reload window 
          window.location.reload();
        }
      });
    }
  }, [currentRide]);

  /**
   * init current ride
   */
  const initCurrentRide = () => {
    const currentRide = localStorage.getItem('currentRide');
    if (currentRide) { 
      setCurrentRide(() => JSON.parse(currentRide));
    }
  }

  /**
   * init auth user
   */
  const initAuthUser = () => { 
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) { 
      setUser(JSON.parse(authenticatedUser));
    }
  };

  /**
   * init comet chat.
   */
   const initCometChat = async () => {
    const { CometChat } = await import('@cometchat-pro/chat');
    const appID = `${process.env.REACT_APP_COMETCHAT_APP_ID}`;
    const region = `${process.env.REACT_APP_COMETCHAT_REGION}`;
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    CometChat.init(appID, appSetting).then(
      () => {
        setCometChat(() => CometChat);
      },
      error => {
      }
    );
  }

  return (
    <Context.Provider value={{isLoading, setIsLoading, user, setUser, cometChat, selectedFrom, setSelectedFrom, selectedTo, setSelectedTo, rideRequest, setRideRequest, currentRide, setCurrentRide}}>
      <Router>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={ <Login/>} />
          {/* End Home Route */}
          {/* Login Route */}
          <Route path="/openingscreen" element={ <OpeningScreen/>} />  
          {/* End Login Route */}
          <Route path="/route" element={<AddressPicker />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/uiscreen" element={<UIscreen />} />
        </Routes>
      </Router>
      {isLoading && <Loading />}
    </Context.Provider>
  );
}

export default App;