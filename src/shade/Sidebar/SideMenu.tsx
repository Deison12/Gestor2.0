
export const MENUITEMS = [
  //Nexos
  {
    menutitle: "Main",
    Items: [
      {
        title: "INICIO NEXOS",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"><path d="M11.2917 3.81415L13.3102 9.52081L13.7059 10.6371L13.7132 5.82625L13.7222 1.00908H17.9931L18.0004 11.8713C18.0031 17.8519 17.9967 22.7617 17.9849 22.7708C17.9731 22.7798 17.7762 22.7708 17.5493 22.7435C16.5601 22.6256 15.2596 22.5076 14.2096 22.4622C13.8629 22.4459 13.5761 22.4277 13.5725 22.4241C13.5698 22.4205 13.3002 21.6618 12.7966 20.2397L12.7967 20.2359C12.3051 18.8476 11.5851 16.8121 10.653 14.1746L10.3126 13.2214L10.3054 17.8066C10.299 22.1718 10.2954 22.4168 10.2482 22.4168C10.0849 22.4168 8.67819 22.5076 8.20809 22.553C7.89953 22.5802 7.28241 22.6437 6.83772 22.6982C6.39212 22.749 6.02185 22.7835 6.01459 22.7762C6.00733 22.7689 6.00098 17.8674 6.00098 11.8831V1.00182H6.00615L6.00551 1H10.2936L10.3217 1.08077C10.3288 1.09558 10.3865 1.25644 10.479 1.51683L11.1204 3.29515L11.2928 3.79066L11.2917 3.81415Z"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        path: `${process.env.PUBLIC_URL}`,
      },
    ],
  },
  //Nexos
  {
    menutitle: "NEXOS",
    Items: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6ZM6.9998 11V13H12.9998V11H6.9998ZM6.9998 15V17H12.9998V15H6.9998Z">
            </path>
          </svg>),
        type: "sub",
        selected: false,
        active: false,
        title: "VENTAS",
        children: [
          {
            path: `${process.env.PUBLIC_URL}/nexos/listarcotizaciones`,
            type: "link",
            active: false,
            selected: false,
            title: "COTIZACIONES",
          },
          {
            path: `${process.env.PUBLIC_URL}/nexos/seguimiento`,
            type: "link",
            selected: false,
            active: false,
            title: "SEGUIMIENTO",
          },
          {
            path: `${process.env.PUBLIC_URL}/nexos/visitasdemosreuniones`,
            type: "link",
            selected: false,
            active: false,
            title: "AGENDAMIENTO",
          },
        ],
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"><path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"></path></svg>
        ),
        type: "sub",
        selected: false,
        active: false,
        title: "CONFIGURACIONES",
        children: [
          {
            path: `${process.env.PUBLIC_URL}/nexos/listaritems`,
            type: "link",
            selected: false,
            active: false,
            title: "ITEMS",
          }, {
            path: `${process.env.PUBLIC_URL}/nexos/listarservicioscotizar`,
            type: "link",
            selected: false,
            active: false,
            title: "TIPOS DE COTIZACION",
          },
          {
            path: `${process.env.PUBLIC_URL}/nexos/listardescuentos`,
            type: "link",
            selected: false,
            active: false,
            title: "DESCUENTOS",
          },
          /*  {
             path: `${process.env.PUBLIC_URL}/nexos/listartiposcotizacion`,
             type: "link",
             selected: false,
             active: false,
             title: "TIPO COTIZACIÓN",
           }, */
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM17.7929 19.9142L21.3284 16.3787L22.7426 17.7929L17.7929 22.7426L14.2574 19.2071L15.6716 17.7929L17.7929 19.9142Z"></path></svg>
            ),
            type: "sub",
            selected: false,
            active: false,
            title: "USUARIOS",
            children: [
              {
                path: `${process.env.PUBLIC_URL}/nexos/listarusuarios`,
                type: "link",
                selected: false,
                active: false,
                title: "LISTA DE USUARIOS",
              },
              {
                path: `${process.env.PUBLIC_URL}/nexos/crearusuarios`,
                type: "link",
                selected: false,
                active: false,
                title: "AGREGAR USUARIOS",
              },
            ],
          },
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"><path d="M21.0082 3C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM20 5H4V19H20V5ZM18 15V17H6V15H18ZM12 7V13H6V7H12ZM18 11V13H14V11H18ZM10 9H8V11H10V9ZM18 7V9H14V7H18Z"></path></svg>
            ),
            type: "sub",
            selected: false,
            active: false,
            title: "PERFILES",
            children: [
              {
                path: `${process.env.PUBLIC_URL}/nexos/listarperfiles`,
                type: "link",
                selected: false,
                active: false,
                title: "LISTA PERFILES",
              },
            ],
          },
          {
            path: `${process.env.PUBLIC_URL}/nexos/listarciudades`,
            type: "link",
            selected: false,
            active: false,
            title: "CIUDADES",
          },
          {
            path: `${process.env.PUBLIC_URL}/nexos/listarpaises`,
            type: "link",
            selected: false,
            active: false,
            title: "PAISES",
          },

        ],
      },
    ]
  },
  //Desarrollo
  {
    menutitle: "Desarrollo",
    Items: [
      {
        path: `${process.env.PUBLIC_URL}/nexos/asambleascontratadas`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "LISTA DE ASAMBLEAS CONTRATADAS",
      },
      {
        path: `${process.env.PUBLIC_URL}/nexos/listaareas`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "LISTA AREAS",
      },
      {
        path: `${process.env.PUBLIC_URL}/nexos/visitasdemosreuniones`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "VISITAS, DEMOS, REUNIONES",
      },
      {
        path: `${process.env.PUBLIC_URL}/nexos/listatiposestadoscotizacion`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "LISTA TIPOS ESTADOS COTIZACIONES",
      },
      {
        path: `${process.env.PUBLIC_URL}/nexos/listaestadoscotizacion`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "LISTA ESTADOS COTIZACIONES",
      },
      {
        path: `${process.env.PUBLIC_URL}/nexos/estadocotizacion`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "ESTADO COTIZACIONES",
      },
      {
        path: `${process.env.PUBLIC_URL}/nexos/listatiposagendamiento`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "LISTA DE TIPOS DE AGENDAMIENTO",
      },
      {
        path: `${process.env.PUBLIC_URL}/nexos/tipoagendamiento`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "CREAR TIPO DE AGENDAMIENTO",
      },
      {
        path: `${process.env.PUBLIC_URL}/nexos/listacorreos`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "LISTA DE CORREOS",
      },
      {
        path: `${process.env.PUBLIC_URL}/nexos/facturaciones`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "LISTA DE FACTURACIONES",
      },
      {
        path: `${process.env.PUBLIC_URL}/nexos/crearfacturacion`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "FACTURACIÓN",
      },
      {
        path: `${process.env.PUBLIC_URL}/nexos/confirmaciones`,
        icon: (
          <svg className="side-menu__icon"
            width="24"
            height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z" fill="rgba(234,113,46,1)"></path></svg>
        ),
        type: "link",
        selected: false,
        active: false,
        title: "CONFIRMACIONES",
      },
    ],
  },
];
