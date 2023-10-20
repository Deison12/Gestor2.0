import React from 'react'
import { useAlert } from './useAlert';

export const useTokenQuoteCheck = () => {
  const { handleInfoAlert } = useAlert();

  const handlerRedirect = (storageQuoteId: string | null) => {
    if (!storageQuoteId) {
      handleInfoAlert("Necesitas seleccionar el tipo de cotización", `cotizar`);
    }
  }

  return { handlerRedirect };
}
