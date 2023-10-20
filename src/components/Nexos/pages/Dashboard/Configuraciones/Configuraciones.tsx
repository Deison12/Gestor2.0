import { Col, Row } from 'react-bootstrap';
import { BreadCrumb, TitleComponent } from '../../../Global';
import CardComponent from '../../../Global/CardComponent';
const cardsData = [
    {
        image: require('../../../../../assets/img/media/dashboard/VENTAS.png'),
        title: 'Ventas',
        link: 'nexos/configuraciones/ventas',
        description: 'Adquirir un nuevo servicio para un cliente',
    },
    {
        image: require('../../../../../assets/img/media/dashboard/CONFIGURACION.png'),
        title: 'Configuraciones',
        link: 'nexos/configuraciones/configuraciones',
        description: 'Configuraciones del sistema',
    },
    {
        image: require('../../../../../assets/img/media/dashboard/RESERVAS.png'),
        title: 'Agendamiento',
        link: 'nexos/configuraciones/agendamiento',
        description: 'Gestionar reservas de clientes',
    },
];

const Configuraciones = () => {
    return (
        <>
            {/* Breadcrumb */}
            <BreadCrumb
                items={['Inicio', 'Configuraciones']}
                baseURL={['', 'nexos/configuraciones']} />
            {/* Cards */}
            {/* <!-- row --> */}
            <TitleComponent title='Configuraciones' />

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

export default Configuraciones;
