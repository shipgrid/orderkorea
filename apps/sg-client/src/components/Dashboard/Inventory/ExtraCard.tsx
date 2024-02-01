import {
  Button
} from 'antd';

import '../../../assets/inventory.css'

interface ExtraCardProps {
  title: string;
  description: string;
  link?: string; 
}

const ExtraCard = ({
  title,
  description,
  link
}: ExtraCardProps) => {

  return (
    <div className='request-car-card'>
      <div className='request-car-content'>
        <div>
          <div style={{ fontWeight: 600, fontSize: 24, margin: '12px 0px' }}>{ title }</div>
          <div style={{ fontWeight: 400, fontSize: 16, margin: '12px 0px', color: '#5c5e62' }}> { description} </div>
          <a
            href={link}                    
            rel="noopener noreferrer"
          >
            <Button type='primary' style={{ width: '100%', height: 45, margin: '12px 0px' }}>
              { title }
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ExtraCard;