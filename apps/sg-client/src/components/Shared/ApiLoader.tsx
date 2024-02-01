import { 
  Image 
} from 'antd';

import Logo from '../../assets/images/logo-no-bg.png';
import useMobile from '../../hooks/useMobile';
import '../../assets/api_loader.css'

const ApiLoader = () => {


  const {
    isMobile
  } = useMobile();

  return (
    <div style={{ display: 'flex', width: '100vw', height: '45vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      {
        !isMobile ? <Image src={Logo} preview={false} style={{ width: 150, margin: '5px 5px' }}/> : null
      }
      <div className="api-loader"></div>
    </div>
  );
}

export default ApiLoader;
