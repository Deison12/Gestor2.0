import { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BreadCrumb } from '../../Global';
import CardComponent from '../../Global/CardComponent';
const cardsData = [
  {
    image: require('../../../../assets/img/media/dashboard/ventas/COTIZACIONES.png'),
    title: 'Cotizaciones',
    link: 'nexos/listarcotizaciones',
    description: 'Adquirir un nuevo servicio para un cliente',
  },
  { 
    image: require('../../../../assets/img/media/dashboard/ventas/SEGUIMIENTO.png'),
    title: 'Seguimiento',
    link: 'nexos/seguimiento',
    description: 'Seguimiento de cotización para el cliente',
  },
];

class VentasConfirmaciones extends Component {
  render() {
    return (
      <div>
        {/* Breadcrumb */}
        <BreadCrumb items={['inicio', 'Ventas']} baseURL={['inicio', 'nexos/ventasconfirmaciones']} />

        {/* <!-- row --> */}
        <Row className="row-sm">
          {cardsData.map((card, index) => (
            <Col key={index} lg={6} md={12} xl={3}>
              <CardComponent {...card} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default VentasConfirmaciones;
