// import useContext.
import { useContext } from 'react';
// import Context.
import Context from '../Context';
// import cometchat ui.
import { CometChatMessages  } from '../cometchat-pro-react-ui-kit-master/CometChatWorkspace/src';
function Chat() {

  const { user, currentRide } = useContext(Context);
  console.log("user ", user)
  console.log("curretnRide= ",currentRide)
  const findUser = () => {
    if (user && currentRide) { 
      if (currentRide.driver && currentRide.driver.uid) {
        return currentRide.driver.uid;
      } else if (currentRide.request&& currentRide.request.ride.requestor && currentRide.request.ride.requestor.uid) {
        return currentRide.request.ride.requestor.uid;
      }
    }
  }

  return (
    <div style={{width: '100vw', height:'100vh' }}>
      <CometChatMessages  chatWithUser={findUser()} />
    </div>
  );
}

export default Chat;