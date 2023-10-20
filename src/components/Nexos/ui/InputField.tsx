import React from "react";
import { Form } from "react-bootstrap";
import { SeleccionarServiciosACotizarUI } from "../Interfaces/Pages/SeleccionarServiciosACotizar.interface";

const InputCheckbox = ({ item, handleSelectedServices }: { item: SeleccionarServiciosACotizarUI, handleSelectedServices: any }) => {
  return (
    <div className="w-100 mb-2 p-2 bg-white rounded shadow-sm" style={{
      border: `3px solid ${(item?.quotes! > 0) ? "#fd7e14" : "#cdd4e2"}`
    }}>
      <Form.Label
        className="custom-control custom-checkbox"
      >
        <Form.Control
          type="checkbox"
          className="custom-control-input"
          name="profiles"
          value={item?.id}
          checked={item?.quotes! > 0}
          // user?.profiles?.some((obj: any) => obj.profile_id == item?.id)
          onChange={() => handleSelectedServices(item)}
        />
        <span className="custom-control-label font-weight-bold" style={{ color: "#4A4A69" }}>{item?.name}</span>
      </Form.Label>
    </div>
  );
};

const InputNumber = ({ item, handleSelectedServices }: { item: SeleccionarServiciosACotizarUI, handleSelectedServices: any }) => {
  return (
    <div className="w-100 d-flex justify-content-between align-items-center gap-2 mb-2 bg-white rounded p-2 shadow-sm" style={{
      border: `3px solid ${(item?.quotes! > 0) ? "#fd7e14" : "#cdd4e2"}`
    }}>
      <Form.Label className="font-weight-bold" style={{ color: "#4A4A69" }}>
        {item.name}
      </Form.Label>
      <input
        type="number"
        className="text-center py-2 rounded"
        style={{ width: "80px", border: `2px solid ${(item?.quotes! > 0) ? "#fd7e14" : "#cdd4e2"}` }}
        name="sort"
        value={item?.quotes || 0}
        onChange={(e: any) => handleSelectedServices(item, e)}
      />
    </div>
  );
};

export const InputField = ({ inputData, handleSelectedServices }: { inputData: SeleccionarServiciosACotizarUI, handleSelectedServices: any }) => {
  if (inputData.contable === 1) {
    return <InputNumber item={inputData} handleSelectedServices={handleSelectedServices} />;
  } else {
    return <InputCheckbox item={inputData} handleSelectedServices={handleSelectedServices} />;
  }
};
