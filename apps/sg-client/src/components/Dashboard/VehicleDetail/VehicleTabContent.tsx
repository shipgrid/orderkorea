import {
  Tabs,
  Divider,
} from 'antd'

import type { 
  TabsProps 
} from 'antd';

import {
  Vehicle,
} from '../../../services/api'

import { 
  formatNumberWithCommas
} from '../../../utils/format_string'

import '../../../assets/index.css'
import '../../../assets/vehicle_detail.css'

interface VehicleDetailProps {
  vehicle: Vehicle
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({
  vehicle
}) => {

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Specs',
      children: <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 16, fontWeight: 'bold' }}> VIN </div>
            <div style={{ fontSize: 16, fontWeight: 'bold' }}> { vehicle.vin_number } </div>
          </div>
          <Divider style={{ margin: '10px 0px 10px' }}/>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '5px 0px 0px', justifyContent: 'space-between' }}>
            <div> Exterior </div>
            <div> { vehicle.exterior_color.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Interior </div>
            <div> { vehicle.interior_color.name } </div>
          </div>
          <Divider style={{ margin: '10px 0px 10px' }}/>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Mileage </div>
            <div> { formatNumberWithCommas(vehicle.mileage) } km</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Year </div>
            <div> { vehicle.year } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '5px 0px 0px', justifyContent: 'space-between' }}>
            <div> Make </div>
            <div> { vehicle.make.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Model </div>
            <div> { vehicle.model.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Trim </div>
            <div> { vehicle.trim.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Body Style </div>
            <div> { vehicle.body_style.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Doors </div>
            <div> { vehicle.doors.name } </div>
          </div>
          <Divider style={{ margin: '10px 0px 10px' }}/>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Transmission </div>
            <div> { vehicle.transmission.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Cylinders </div>
            <div> { vehicle.cylinders.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Drivetrain </div>
            <div> { vehicle.drivetrain.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Fuel Type </div>
            <div> { vehicle.fuel_type.name } </div>
          </div>
        </div>
      </div>
    },
    // {
    //   key: '2',
    //   label: 'Pricing (USD)',
    //   children: <div style={{ flex: 1 }}>
    //     <div style={{ display: 'flex', flexDirection: 'column' }}>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div> Vehicle Price </div>
    //         <div> ${ formatNumberWithCommas(vehicle.fees.vehicle_price) } </div>
    //       </div>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div> Service Fee </div>
    //         <div> ${ vehicle.fees.service_fee } </div>
    //       </div>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div> Delivery Fee </div>
    //         <div> { vehicle.fees.delivery_fee ? `$${vehicle.fees.delivery_fee}` : `TBD` } </div>
    //       </div>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div style={{ fontWeight: 'bold' }}> Subtotal </div>
    //         <div> TBD + Delivery </div>
    //       </div>
    //       <Divider style={{ margin: '20px 0px 20px' }}> Due Now </Divider>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div> Deposit </div>
    //         <div> ${ formatNumberWithCommas(vehicle.fees.deposit_fee) } </div>
    //       </div>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div> Service Fee </div>
    //         <div> ${ formatNumberWithCommas(vehicle.fees.service_fee) } </div>
    //       </div>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div style={{ fontWeight: 'bold' }}> Total Due </div>
    //         <div> ${ formatNumberWithCommas((vehicle.fees.deposit_fee) + vehicle.fees.service_fee*1) } </div>
    //       </div>
    //     </div>
    //   </div>
    // },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ margin: '24px 0px'}}/>
    </>
  )
}

export default VehicleDetail
