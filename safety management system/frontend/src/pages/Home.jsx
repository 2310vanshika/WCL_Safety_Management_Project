import { useNavigate } from 'react-router-dom';
import bg1 from './bg1.mp4';
import wcl_logo from './wcl_logo.png';

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); 
  };
  const handleLoginClick = () =>{
    navigate('/login');
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      <video autoPlay muted loop id="video" className="absolute top-0 left-0 w-full h-full object-cover">
        <source src={bg1} type="video/mp4" />
      </video>

      <div className="flex-row absolute items-center top-20 z-50 right-20 bg-white shadow-lg p-8 rounded-lg">
        <div className="flex-col justify-center">
        <div className="mb-4 flex justify-center"> 
            <img src={wcl_logo} alt="WCL Logo" className="w-32 " />
          </div>

          <div className="info-card bg-white p-4 rounded shadow">
            <h5 className="card-title text-xl font-bold mb-2">WCL Safety Management Platform</h5>
            <p className="card-text">
              Tagline: Your Partner in Workplace Safety<br />
              Key Features:<br />
              🚧 Incident Reporting<br />
              🎓 Safety Training<br />
              🛡️ Risk Assessment
            </p>
            <p className="text">
              Not a user?{' '}
              <button onClick={handleRegisterClick} className="text-blue-500 underline">
                Register
              </button>
            </p>
            <p className="text">
              Already Registered?{' '}
              <button onClick={handleLoginClick} className="text-blue-500 underline">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
