import {
  Card
} from 'antd'

const cardStyle = {
  marginTop: 20,
  transition: '0.3s',
  borderRadius: '5px'
}

const DescriptionCard: React.FC<{description: string}> = ({ description }) => {
  return (
    <Card 
      title="Description" 
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