import React, { useEffect, useRef } from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { ItemCotizacionByNit } from '../Interfaces/Pages/CotizacionFormulario.interface';

interface Props {
  listMenu: ItemCotizacionByNit[];
  showListMenu: boolean;
  selectedSearchResult: (item: ItemCotizacionByNit) => void;
  setShowListMenu: (item: boolean) => void;
}

export const ListResults = ({ listMenu, selectedSearchResult, showListMenu, setShowListMenu }: Props) => {

  const searchInputRef: any = useRef();

  const handleOutsideClick = (event: any) => {
    if (showListMenu && searchInputRef.current && !searchInputRef.current.contains(event.target)) {
      setShowListMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showListMenu]);


  return (
    <Card style={{
      position: "absolute",
      left: "0",
      width: "100%",
      overflow: "hidden",
      top: "110%",
      zIndex: 1000,
      border: "1px solid #9c9ca1"
    }}
      ref={searchInputRef}
    >
      <Card.Body>
        <ListGroup className="overflow-auto" style={{
          maxHeight: "200px"
        }}>
          {
            listMenu?.map((item: ItemCotizacionByNit) => (
              <Card.Text
                key={item.id}
                className="px-3 py-2 cursor-pointer hover_selected_bg"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #9c9ca1"
                }}
                onClick={() => selectedSearchResult(item)}
              >
                {item.name}
              </Card.Text>
            ))
          }
        </ListGroup>
      </Card.Body>
    </Card>
  )
}
