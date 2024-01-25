import { Image } from 'antd';
import Logo from '../../assets/images/logo-no-bg.png';
import '../../assets/api_loader.css'

const ApiLoader = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '45vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <Image src={Logo} preview={false} style={{ width: 150, margin: '5px 5px' }}/>
      <div className="api-loader"></div>
    </div>
  );
}

export default ApiLoader;
