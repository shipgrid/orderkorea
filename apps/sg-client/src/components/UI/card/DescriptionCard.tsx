import {
  Card
} from 'antd'

const cardStyle = {
  marginTop: 20,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  borderRadius: '5px'
}

const DescriptionCard: React.FC<{description: string}> = ({ description }) => {
  return (
    <Card 
      title="Description" 
      bordered={false} 
      headStyle={{ borderBottom: 0, opacity: 0.7, fontSize: 16 }}
      style={cardStyle} 
    >
      <p style={{ fontSize: '16px'}}>  
        {description}
      </p>
    </Card>
  )
}

export default DescriptionCard