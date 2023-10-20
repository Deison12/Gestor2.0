import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { TitleComponent, BreadCrumb } from '../Global';


const ServiciosACotizar = () => {
  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={['inicio', 'CONFIRMACIONES', 'VENTAS', 'COTIZACIONES', 'NUEVO']}
        baseURL={['inicio', 'nexos/ventasconfirmaciones', 'nexos/vistalistadocotizaciones', 'nexos/vistalistadocotizaciones', 'nexos/serviciosacotizar']}
      />
      {/* Componente Titulo  */}
      <TitleComponent title='PASO 3' subtitle='SELECCIONE LOS SERVICIOS A COTIZAR' align='center' />
      {/* container */}
      <div id="container" style={{ width: "100%", height: "400px" }}></div>
      {/* Button to continue */}
      <Row>
        <Col>
          <div className='d-flex justify-content-end'>
            <Link to={`${process.env.PUBLIC_URL}/nexos/resumendeservicios`} className="text-muted">
              <Button variant="" className="btn me-5 mt-3 px-5 py-3 btn-primary">
                CONTINUAR
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ServiciosACotizar