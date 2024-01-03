import { 
  FC, 
  ReactNode 
} from 'react';

import { 
  Row, 
  Col, 
  Card 
} from 'antd';

interface GridProps {
  isHidden?: boolean;
  showHeader?: boolean;
  title?: string;
  content?: ReactNode;
  centerContent?: boolean;
  actionButtons?: ReactNode[];
}

const Grid: FC<GridProps> = ({
  isHidden = false,
  showHeader = true,
  title = '',
  content = null,
  centerContent = false,
  actionButtons = [],
}) => {
  if (isHidden) {
    return null;
  }

  return (
    <div>
      <Card headStyle={{ fontWeight: '700' }} style={{ borderRadius: '6px' }} size="small">
        {showHeader ? (
          <Row align="middle" style={{ padding: 15 }}>
            <Col flex="1 auto">
              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div> {title} </div>
              </div>
            </Col>
            <Col flex="none">
              <Row gutter={[8, 0]} align="middle" className="mr-1">
                {actionButtons.map((item, i) => {
                  return (
                    <Col flex="auto" key={i} style={{ display: 'inline-block' }}>
                      {item}
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        ) : null}
        {showHeader ? <hr className="m-0" /> : null}
        <Row>
          <Col flex="auto">
            <div style={{ margin: 10, display: centerContent ? 'flex' : '', justifyContent: 'center' }}>
              {content}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

Grid.defaultProps = {
  isHidden: false,
  showHeader: true,
  title: '',
  content: null,
  actionButtons: [],
};

export default Grid;
