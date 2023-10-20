import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { BreadCrumb, TitleComponent } from '../../Global';
import CardComponent from '../../Global/CardComponent';

const cardsData = [
  {
    image: require('../../../../assets/img/media/dashboard/VENTAS.png'),
    title: 'Ventas',
    link: 'nexos/ventasconfirmaciones',
    description: 'Adquirir un nuevo servicio para un cliente',
  },
  {
    image: require('../../../../assets/img/media/dashboard/CONFIGURACION.png'),
    title: 'Configuraciones',
    link: 'nexos/configuraciones', 
    description: 'Configuraciones del sistema',
  },
  {
    image: require('../../../../assets/img/media/dashboard/RESERVAS.png'),
    title: 'Agendamiento',
    link: 'nexos/visitasdemosreuniones',
    description: 'Gestionar agendamiento de clientes',
  },
  {
    image: require('../../../../assets/img/media/dashboard/blank.jpg'),
    title: 'Reservas',
    link: 'nexos/asambleascontratadas',
    description: 'Gestionar verificaciones de clientes',
  },
];

const Dashboard = () => {
  return (
    <>
      {/* Breadcrumb */}
      <BreadCrumb items={['Inicio']} baseURL={['/inicio']} />
      <TitleComponent title='Dashboard' />
      <Row className="row-sm">
        {cardsData.map((card, index) => (
          <Col key={index} lg={6} md={12} xl={3}>
            <CardComponent {...card} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Dashboard;
