import '../../assets/api_loader.css'

const ApiLoader = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <div className="container">
        <div className="cube"><div className="cube__inner"></div></div>
        <div className="cube"><div className="cube__inner"></div></div>
        <div className="cube"><div className="cube__inner"></div></div>
      </div>
    </div>
  );
}

export default ApiLoader;


