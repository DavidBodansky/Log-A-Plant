import { Container } from 'reactstrap';
import './Profile.css';
import pfpImage from '../images/pfp.png';

const Profile = () => {
  return (

    <div className="container">
      <div className="user-info w-full flex">
        <div className="left">
          <img 
            src={pfpImage}
            alt="Gardener" 
            className="rounded-circle pfp object-cover" 
          />
        </div>
        <div className="right">
          <div className="intro">
            <h3>Hi,</h3>
            <h1>Ares</h1>
          </div>
          <p className="with-us">
            User created two days ago
          </p>
        </div>
      </div>
      <main>

      </main>
    </div>
  );
}

export default Profile;
