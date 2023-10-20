import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { SeleccionarServiciosACotizarUI } from '../components/Nexos/Interfaces/Pages/SeleccionarServiciosACotizar.interface'
import { InputField } from '../components/Nexos/ui';

export const InputContainer = ({ inputsData, handleSelectedServices }: any) => {

  const itemsPorColumna = 8;
  const columnas = Math.ceil(inputsData.length / itemsPorColumna);
  const orderedItems = [
    ...inputsData.filter((item: SeleccionarServiciosACotizarUI) => item.contable === 1),
    ...inputsData.filter((item: SeleccionarServiciosACotizarUI) => item.contable === 0),
  ];
  const columnasDeItems = [];

  for (let columna = 0; columna < columnas; columna++) {
    const inicio = columna * itemsPorColumna;
    const fin = inicio + itemsPorColumna;
    const itemsEnColumna = orderedItems.slice(inicio, fin);

    const columnaDeInputs = itemsEnColumna.map((item: any) => {
      return (
        <InputField key={item.id} inputData={item} handleSelectedServices={handleSelectedServices} />
      )
    });

    columnasDeItems.push(
      <Col key={`column-${columna}`} className='w-100 d-flex flex-column justify-content-start align-items-start gap-1 my-3' lg={4} xl={4} md={6} sm={6}>
        {columnaDeInputs}
      </Col>
    );
  }

  return (
    <Row className='w-100'>
      {/* 14 items por columna */}
      {
        columnasDeItems
      }
    </Row>
  )
}
