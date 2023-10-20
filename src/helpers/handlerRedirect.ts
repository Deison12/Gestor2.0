import React from 'react'
import { useNavigate } from 'react-router-dom'

export const handlerRedirect = (token: string, path: string) => {
  const navigate = useNavigate();
  if (!token) {
    navigate(`${process.env.PUBLIC_URL}/nexos/${path}`);
  }
}
