import { Col, Row } from 'react-bootstrap';
import { BreadCrumb, TitleComponent } from '../../../../Global';
import CardComponent from '../../../../Global/CardComponent';
const cardsData = [
    {
        image: require('../../../../../../assets/img/media/dashboard/ITEMS.png'),
        title: 'Items',
        link: 'nexos/listaritems',
        description: 'Explora y gestiona los diferentes ítems disponibles.'
    },
    {
        title: 'Servicios a Cotizar',
        image: require('../../../../../../assets/img/media/dashboard/SERVICIOS-A-COTIZAR.png'),
        link: `nexos/listarservicioscotizar`,
        description: 'Visualiza y administra los servicios que se pueden cotizar.'
    },
    {
        title: 'Descuentos',
        image: require('../../../../../../assets/img/media/dashboard/DESCUENTOS.png'),
        link: `nexos/listardescuentos`,
        description: 'Gestiona los descuentos disponibles en la plataforma.'
    },
    {
        title: 'Usuarios',
        image: require('../../../../../../assets/img/media/dashboard/USUARIOS.png'),
        link: `nexos/listarusuarios`,
        description: 'Accede a la lista de usuarios y sus detalles correspondientes.'
    },
    {
        title: 'Perfiles',
        image: require('../../../../../../assets/img/media/dashboard/PERFILES.png'),
        link: `nexos/listarperfiles`,
        description: 'Gestiona los perfiles de usuario y sus configuraciones.'
    },
    {
        title: 'Ciudades',
        image: require('../../../../../../assets/img/media/dashboard/CIUDADES.png'),
        link: `nexos/listarciudades`,
        description: 'Explora y administra las ciudades disponibles en la plataforma.'
    },
    {
        title: 'Paises',
        image: require('../../../../../../assets/img/media/dashboard/PAISES.png'),
        link: `nexos/listarpaises`,
        description: 'Visualiza y gestiona los diferentes países registrados.'
    },
    //---------------------------------------------------------------------------------------
    {
        title: 'Areas',
        image: require('../../../../../../assets/img/media/dashboard/blank.jpg'),
        link: `nexos/listaareas`,
        description: 'Visualiza y gestiona las diferentes areas registradas.'
    },
    {
        title: 'Estados Cotización',
        image: require('../../../../../../assets/img/media/dashboard/blank.jpg'),
        link: `nexos/listaestadoscotizacion`,
        description: 'Visualiza y gestiona los diferentes estados de cotización.'
    },
    {
        title: 'Tipos Agendamiento',
        image: require('../../../../../../assets/img/media/dashboard/blank.jpg'),
        link: `nexos/listatiposagendamiento`,
        description: 'Visualiza y gestiona los diferentes tipos de agendamiento.'
    },
    {
        title: 'Emails',
        image: require('../../../../../../assets/img/media/dashboard/blank.jpg'),
        link: `nexos/listacorreos`,
        description: 'Visualiza y gestiona los diferentes tipos de emails.'
    },
];

const ConfAgendamiento = () => {
    return (
        <>
            {/* Breadcrumb */}
            <BreadCrumb
                items={['Inicio', 'Configuraciones', 'Agendamiento']}
                baseURL={['', 'nexos/configuraciones', '']} />
            {/* Cards */}
            {/* <!-- row --> */}
            <TitleComponent title='Configuraciones - Agendamiento' />

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

export default ConfAgendamiento;
