// import useContext.
import { useContext, useState } from 'react';
// import firebase authentication.
import { realTimeDb } from "../firebase";
// import Context
import Context from '../Context';
// import react router. 
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set,remove } from "firebase/database";

function RideDetail(props) { 
  const { user, isDriver, currentRide } = props;
  console.log(user)

  const { setCurrentRide, setIsLoading } = useContext(Context);

  const history = useNavigate();

  /**
   * remove ride from storage and context
   */
  const removeRideFromStorageAndContext = () => {
    // remove localStorage.
    localStorage.removeItem('currentRide');
    // remove data from context.
    setCurrentRide(null);
    // reload window 
    window.location.reload();
  }

  const updateRide = (ryde) => { 
    // show loading indicator.
    setIsLoading(true);
    // update data on Firebase.
    const db = getDatabase();
    remove(ref(db, "rides")).then(() => {
      setIsLoading(false);
      removeRideFromStorageAndContext();
    })
  }

  /**
   * cancel ride
   */
  const cancelRide = () => {
    const isCancel = window.confirm('Do you want to cancel this ride?');
    if (isCancel) {
      // update data on Firebase.
      currentRide.status = -1;
      updateRide(currentRide);
    }
  };

  /**
   * finish ride
   */
  const finishRide = () => {
    const isFinish = window.confirm('Do you want to finish this ride?');
    if (isFinish) {
      // update data on Firebase.
      currentRide.status = 2;
      updateRide(currentRide);
    }
  };

  /**
   * talk to user
   */
  const talkToUser = () => {
    history('/chat');
  };

  const [marginTop, setMarginTop] = useState(232);
  const [options, setOptions] = useState("Hide Options");
  const moveDown = () => {
    if (marginTop === 232) {
      setMarginTop(395);
      setOptions("Show Options")
    }
    else {
      setMarginTop(232);
      setOptions("Hide Options")
    }
  };
  
  return (
    <div className="ride-detail"
      style={{
      marginTop: `${marginTop}px`,
      transition: 'margin-top 1s ease',
      }}>
      <button onClick={moveDown} style={{marginLeft:"39%",padding:"0.1rem"}}>{options}</button>
      <div className="ride-detail__user-avatar">
        <img src={user.avatar} alt={user.email} />
      </div>
      <p className="ride-detail__user-info">{user.name}</p>
      <div className="ride-detail__actions">
        {currentRide.ride&&currentRide.ride.pickup&&<p className="ride-detail__result-label"><span>From: </span>{currentRide.ride.pickup && currentRide.ride.pickup.label ? currentRide.ride.pickup.label.substring(0, 40) + "..." : ''}</p>}
        {currentRide.request&&<p className="ride-detail__result-label"><span>From: </span>{currentRide.request.ride.pickup && currentRide.request.ride.pickup.label ? currentRide.request.ride.pickup.label.substring(0, 40) + "..." : ''}</p>}
        {currentRide.ride&&currentRide.ride.destination && <p className="ride-detail__result-label"><span>To: </span>{currentRide.ride.destination && currentRide.ride.destination.label ? currentRide.ride.destination.label.substring(0, 40) + "..." : ''}</p>}
        {currentRide.request&& <p className="ride-detail__result-label"><span>To: </span>{currentRide.request.ride.destination && currentRide.request.ride.destination.label ? currentRide.request.ride.destination.label.substring(0, 40) + "..." : ''}</p>}
        <button className="ride-detail__btn" onClick={talkToUser}>{isDriver ? 'Talk to User' : 'Talk to Driver'}</button>
        <button className="ride-detail__btn" onClick={cancelRide}>Cancel the Ride</button>
        {<button className="ride-detail__btn" onClick={finishRide}>Finish the Ride</button>}
      </div>
    </div>
  );
}

export default RideDetail;