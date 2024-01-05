import React, { useState } from 'react';
import { Button, Checkbox, Row, Col, Tabs, Tag } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { RiCarLine, RiCalendar2Line } from "react-icons/ri";

const carMakes = [
  'BMW', 'Audi', 'Mercedes-Benz', // ... other car makes
];

const carModels = {
  BMW: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', 'X Series', 'M Series', 'i Series'],
  Audi: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7'],
  "Mercedes-Benz": ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'G-Class', 'GLA', 'GLC', 'GLE', 'GLS'],
  // ... other models for different car makes
};

const VehicleSearchForm = ({ onFiltersChange }) => {
  const [activeKey, setActiveKey] = useState('1');
  const [selectedMakes, setSelectedMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [viewingModelsMake, setViewingModelsMake] = useState('');

  const handleMakeSelection = (make, checked) => {
    const newSelectedModels = selectedModels.filter(model => !carModels[make]?.includes(model));
    setSelectedModels(newSelectedModels);

    const newSelectedMakes = checked
      ? [...selectedMakes, make]
      : selectedMakes.filter(m => m !== make);
    setSelectedMakes(newSelectedMakes);

    onFiltersChange({ makes: newSelectedMakes, models: newSelectedModels });
  };

  const handleModelSelection = (make, model, checked) => {
    const newSelectedMakes = selectedMakes.filter(m => m !== make);
    setSelectedMakes(newSelectedMakes);

    const newSelectedModels = checked
      ? [...selectedModels, model]
      : selectedModels.filter(m => m !== model);
    setSelectedModels(newSelectedModels);

    onFiltersChange({ makes: newSelectedMakes, models: newSelectedModels });
  };

  const handleRemoveTag = (tag, type) => {
    if (type === 'make') {
      handleMakeSelection(tag, false);
    } else {
      const makeOfModel = Object.keys(carModels).find(make => carModels[make].includes(tag));
      handleModelSelection(makeOfModel, tag, false);
    }
  };

  const clearAllFilters = () => {
    setSelectedMakes([]);
    setSelectedModels([]);
    onFiltersChange({ makes: [], models: [] });
  };

  const renderBackArrow = () => (
    <Button type="link" onClick={() => setViewingModelsMake('')} style={{ marginBottom: '10px' }}>
      <LeftOutlined /> Back to Makes
    </Button>
  );

  const renderMakesCheckboxes = () => (
    <Row gutter={[16, 16]}>
      {carMakes.map((make) => (
        <Col span={8} key={make}> {/* Adjusted the span to 8 to give more space */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
            <Checkbox
              checked={selectedMakes.includes(make)}
              onChange={(e) => handleMakeSelection(make, e.target.checked)}
            >
              {make}
            </Checkbox>
            {selectedMakes.includes(make) && (
              <Button type="link" onClick={() => setViewingModelsMake(make)}>
                View Models
              </Button>
            )}
          </div>
        </Col>
      ))}
    </Row>
  );
  

  const renderModelsCheckboxes = (make) => (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        {renderBackArrow()}
      </Col>
      {carModels[make].map((model) => (
        <Col span={6} key={model}>
          <Checkbox
            checked={selectedModels.includes(model)}
            onChange={(e) => handleModelSelection(make, model, e.target.checked)}
          >
            {model}
          </Checkbox>
        </Col>
      ))}
    </Row>
  );

  const renderTags = () => (
    <div style={{ padding: '10px 0' }}>
      {selectedMakes.map(make => (
        <Tag closable onClose={() => handleRemoveTag(make, 'make')} key={make}>
          {make}
        </Tag>
      ))}
      {selectedModels.map(model => (
        <Tag closable onClose={() => handleRemoveTag(model, 'model')} key={model}>
          {model}
        </Tag>
      ))}
      {(selectedMakes.length > 0 || selectedModels.length > 0) && (
        <Button onClick={clearAllFilters} size="small" style={{ marginLeft: 8 }}>
          Clear All
        </Button>
      )}
    </div>
  );

  const onTabChange = (key) => {
    setActiveKey(key);
    setViewingModelsMake('');
  };

  const tabItems = [
    {
      label: (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <RiCarLine style={{ marginRight: '8px' }} />
          Make & Model
        </span>
      ),
      key: '1',
      children: activeKey === '1' ? (!viewingModelsMake ? renderMakesCheckboxes() : renderModelsCheckboxes(viewingModelsMake)) : null
    },
    // {
    //   label: (
    //     <span style={{ display: 'flex', alignItems: 'center' }}>
    //       <RiCalendar2Line style={{ marginRight: '8px' }} />
    //       Year & Mileage
    //     </span>
    //   ),
    //   key: '2',
    //   children: <div>Year & Mileage content goes here...</div>
    // }
  ]

  return (
    <div>
      <Tabs 
        activeKey={activeKey}
        onChange={onTabChange}
        items={tabItems}
        type="card" 
        tabBarStyle={{ display: 'flex', justifyContent: 'space-around' }}
      />
      {renderTags()}
    </div>
  );
};

export default VehicleSearchForm;
