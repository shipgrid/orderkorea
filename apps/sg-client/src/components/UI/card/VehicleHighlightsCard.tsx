import {
  Row,
  Col,
  Card
} from 'antd'

import { 
  DashboardOutlined, 
  BranchesOutlined,
  CarOutlined,
} from '@ant-design/icons'

import {
  Vehicle
} from '../../../services/api'

import '../../../assets/index.css'

import {
  formatNumberWithCommas
} from '../../../utils/format_string'

interface VehicleHighlightsCardProps {
  vehicle: Vehicle
}

const cardStyle = {
  marginTop: 20,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  borderRadius: '5px'
}

const VehicleHighlightsCard: React.FC<VehicleHighlightsCardProps> = ({ 
  vehicle 
}) => {

  const { 
    mileage, 
    transmission_type, 
    exterior_color 
  } = vehicle

  return (
    <Card 
      title="Highlights" 
      bordered={false} 
      headStyle={{ borderBottom: 0, opacity: 0.7, fontSize: 16 }}
      style={cardStyle} 
    >
      <Row gutter={16}>
        <Col key="mileage" span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <DashboardOutlined style={{ fontSize: '24px', opacity: 0.5 }} /> 
            <div style={{ fontSize: '16px' }}>{formatNumberWithCommas(mileage)} km</div>
          </div>
        </Col>
        <Col key="transmission" span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <BranchesOutlined style={{ fontSize: '24px', opacity: 0.5 }} /> 
            <div style={{ fontSize: '16px' }}>{transmission_type}</div>
          </div>
        </Col>
        <Col key="exterior" span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CarOutlined style={{ fontSize: '24px', opacity: 0.5 }} /> 
            <div style={{ fontSize: '16px' }}>{exterior_color}</div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default VehicleHighlightsCard