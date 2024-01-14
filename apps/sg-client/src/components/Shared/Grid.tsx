import { FC, ReactNode } from 'react';
import { Row, Col, Card, Divider } from 'antd';

interface GridProps {
  isHidden?: boolean;
  showHeader?: boolean;
  title?: string;
  subtitle?: string; // new prop for subtitle content
  subtitleSize?: string; // new prop for subtitle size
  subtitleColor?: string; // new prop for subtitle color
  content?: ReactNode;
  centerContent?: boolean;
  actionButtons?: ReactNode[];
  titleSize?: string;
  boldTitle?: boolean;
}

const Grid: FC<GridProps> = ({
  isHidden = false,
  showHeader = true,
  title = '',
  subtitle = '', // default empty subtitle
  subtitleSize = '14px', // default subtitle size
  subtitleColor = '#000', // default subtitle color, black
  content = null,
  centerContent = false,
  actionButtons = [],
  titleSize = '16px',
  boldTitle = false,
  ...props
}) => {
  if (isHidden) {
    return null;
  }

  const titleStyle = {
    fontWeight: boldTitle ? '700' : 'normal',
    fontSize: titleSize
  };

  const subtitleStyle = {
    fontSize: subtitleSize,
    color: subtitleColor,
  };

  return (
    <div {...props}>
      <Card headStyle={{ fontWeight: '700' }} style={{ borderRadius: '6px' }} size="small">
        {showHeader ? (
          <Row align="middle" justify="space-between" style={{ padding: '0 15px' }}>
            <Col>
              <span style={titleStyle}>{title}</span>
            </Col>
            <Col>
              <Col>
                <Row gutter={[8, 0]} align="middle">
                  {actionButtons.map((item, i) => (
                    <Col key={i}>
                      {item}
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col>
                {subtitle && <span style={subtitleStyle}>{subtitle}</span>}
              </Col>
            </Col>
          </Row>
        ) : null}
        {showHeader ? <Divider> </Divider>: null}
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
  subtitle: '',
  subtitleSize: '14px',
  subtitleColor: '#000',
  content: null,
  actionButtons: [],
  titleSize: '16px',
  boldTitle: false,
};

export default Grid;
