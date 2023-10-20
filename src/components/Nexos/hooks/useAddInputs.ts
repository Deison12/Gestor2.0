import { useState } from "react";
import { useAlert } from "./useAlert";

interface UiInput {
  value: string;
  showRemove: boolean;
  isDisabled: boolean;
}

export const useAddInputs = (errors: any, setData: any, setErrors: any, setHasErrors: any) => {
  const [inputs, setInputs] = useState<UiInput[]>([
    { value: "", showRemove: false, isDisabled: true },
  ]);
  const { handleEditConfirmation } = useAlert();

  const mapInputArray = (array: any[]) => {
    console.log({array})

    const arreglo = ["s@gmail.com", "x@gmail.com", "z@gmail.com"]

    handleChangeInput(0, arreglo[0]);
    changeIsDisabled(0, false)

    console.log("ARREGLO:::", arreglo)

    arreglo.forEach((value, index) => {
        if (index > 0) {
          handleAddInput(value);
        }
    });
  }

  const handleAddInput = (value = "") => {
    // Límite de 3 correos
    if (inputs.length > 2) {
      return;
    }
    const updatedInputs = [...inputs];

    console.log("handleAddInput agregando nuevo input:", {updatedInputs}, { value })

    // Mostrar el botón de eliminar en el último input agregado
    updatedInputs[updatedInputs.length - 1].showRemove = true;
    if (updatedInputs.length === 2) {
      // Mostrar el botón de eliminar en el elemento número 3 del arreglo
      setInputs([
        ...updatedInputs,
        { value: (value.length > 0)? value : "", showRemove: true, isDisabled: false },
      ]);
    } else {
      // Mostrar el botón de agregar en el nuevo input por agregar.
      setInputs([
        ...updatedInputs,
        { value: (value.length > 0)? value : "", showRemove: false, isDisabled: (value.length > 0 ? false : true) },
      ]);
    }
  };

  const changeIsDisabled = (index: number, isDisabled: boolean) => {
    // Crea una copia del arreglo para evitar mutar el estado directamente
    const updatedItems = [...inputs];
    // Actualiza el valor de isDisabled en el elemento correspondiente
    updatedItems[index].isDisabled = isDisabled;
    // Establece el nuevo arreglo actualizado como el estado
    setInputs(updatedItems);
  };

  const handleRemoveInput = async (name: string) => {
    const printName = name === "email" ? "correo" : "teléfono";
    const updatedInputs: any = [...inputs];

    const validationErrors = {...errors};
    console.log("REMOVES INPOUTS:", updatedInputs);
    
    // Si el campo viene vacío se elimina sin mostrar la alerta
    if (updatedInputs[updatedInputs.length - 1].value === "") {
      // Remover el input seleccionado del estado
      if (updatedInputs.length === 2) {
        setData((prev: any) => ({ ...prev, [`${name}2`]: "" }));
        delete validationErrors[`${name}2`];
      }
      if (updatedInputs.length === 3) {
        setData((prev: any) => ({ ...prev, [`${name}3`]: "" }));
        delete validationErrors[`${name}3`];
      }
      updatedInputs.splice(updatedInputs.length - 1, 1);
      // Mostrar el botón de eliminar en el último input restante
      if (updatedInputs.length > 0) {
        updatedInputs[updatedInputs.length - 1].showRemove = false;
      }
      setInputs(updatedInputs);
      setErrors(validationErrors);
      console.log({validationErrors})
    } else {
      // Si el campo no viene vacío se elimina sin mostrar la alerta
      const result = await handleEditConfirmation(
        `¿Desea eliminar el ${printName} ${inputs.length}?`
      );

      if (result.isConfirmed) {
        // Remover el input seleccionado del estado
        if (updatedInputs.length === 2) {
          setData((prev: any) => ({ ...prev, [`${name}2`]: "" }));
          delete validationErrors[`${name}2`];

        }
        if (updatedInputs.length === 3) {
          setData((prev: any) => ({ ...prev, [`${name}3`]: "" }));
          delete validationErrors[`${name}3`];
        }
        updatedInputs.splice(updatedInputs.length - 1, 1);
        // Mostrar el botón de eliminar en el último input restante
        if (updatedInputs.length > 0) {
          updatedInputs[updatedInputs.length - 1].showRemove = false;
        }
        setInputs(updatedInputs);
      }
    }

    // Si hay errores, actualiza el estado con ellos
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setHasErrors(true);
    } else {
      setErrors({});
      setHasErrors(false);
    }


  };

  const handleChangeInput = (index: number, value: string) => {
    // Actualizar el valor del input correspondiente en el estado
    const updatedInputs = [...inputs];
    updatedInputs[index].value = value;
    setInputs(updatedInputs);
  };

  const handleResetInputs = () => {
    // Reiniciar estado de los inputs
    setInputs([
      { value: "", showRemove: false, isDisabled: true },
    ]);
  };

  return {
    // Method
    handleAddInput,
    handleRemoveInput,
    handleChangeInput,
    changeIsDisabled,
    handleResetInputs,
    setInputs,
    mapInputArray,
    // Properties
    inputs,
  };
};
