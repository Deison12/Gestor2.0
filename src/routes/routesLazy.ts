import React, { LazyExoticComponent } from "react";
type JSXComponent = () => JSX.Element;

export interface LazyRoute {
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent | any;
}

const Dashboard = React.lazy(() => import("../components/Nexos/pages/Dashboard/Dashboard"));

const ConfiguracionesVentas = React.lazy(() => import("../components/Nexos/pages/Dashboard/Configuraciones/ConfVentas"));
const ConfiguracionesConfiguraciones = React.lazy(() => import("../components/Nexos/pages/Dashboard/Configuraciones/ConfConfiguraciones"));
const ConfiguracionesAgendamiento = React.lazy(() => import("../components/Nexos/pages/Dashboard/Configuraciones/ConfAgendamiento"));

//NEXOS MODULES//
const NexosVentas = React.lazy(() => import('../components/Nexos/pages/VentaConfirmaciones/VentasConfirmaciones'));
const Configuraciones = React.lazy(() => import('../components/Nexos/pages/Dashboard/Configuraciones/Configuraciones'));
const Confirmaciones = React.lazy(() => import('../components/Nexos/pages/Confirmaciones/Confirmaciones'));
const ListQuotes = React.lazy(() => import('../components/Nexos/pages/QuoteScreens/ListQuotes/ListQuotes'));
const Cotizar = React.lazy(() => import('./../components/Nexos/pages/Cotizar/Cotizar'));
const CotizarFormulario = React.lazy(() => import('../components/Nexos/pages/CotizacionFormulario/CotizacionFormulario'))
const ServiciosACotizar = React.lazy(() => import('../components/Nexos/ServiciosACotizar/ServiciosACotizar'))
const ListUsers = React.lazy(() => import('../components/Nexos/pages/UserScreens/ListUsers/ListUsers'))
const CreateUsers = React.lazy(() => import('../components/Nexos/pages/UserScreens/CreateUsers/CreateUsers'))
const ListProfiles = React.lazy(() => import('./../components/Nexos/pages/ProfileScreens/ListProfiles/ListProfiles'))
const CreateOrEditProfile = React.lazy(() => import("./../components/Nexos/pages/ProfileScreens/CreateOrEditProfile/CreateOrEditProfile"))
const FormatoBasico = React.lazy(() => import("../components/Nexos/pages/Pasos/FormatoBasico/FormatoBasico"))
const ListItems = React.lazy(() => import("./../components/Nexos/pages/ListItems/ListItems"))
const CreateOrEditItems = React.lazy(() => import("./../components/Nexos/pages/ListItems/CreateOrEditItems"))
const AllClientQuotes = React.lazy(() => import("./../components/Nexos/pages/QuoteScreens/ListQuotes/AllClientQuotes"))
const CotizacionPdf = React.lazy(() => import("./../components/Nexos/pages/QuoteScreens/ListQuotes/PreviewQuoteView"))
const ListCities = React.lazy(() => import("../components/Nexos/pages/Cities/ListCities"))
const CreateOrEdit = React.lazy(() => import("../components/Nexos/pages/Cities/CreateOrEditCities"))

const CreateServiceCotizar = React.lazy(() => import('../components/Nexos/pages/QuoteServices/CreateServiceQuotes'))
const ListarServiceCotizar = React.lazy(() => import('../components/Nexos/pages/QuoteServices/ListQuoteServices'))

const CreateCountries = React.lazy(() => import('../components/Nexos/pages/Countries/CreateOrEditCountries'))
const ListarCountries = React.lazy(() => import('../components/Nexos/pages/Countries/ListCountries'))

const CreateDiscounts = React.lazy(() => import('../components/Nexos/pages/Discounts/CreateOrEditDiscounts'))
const ListarDiscounts = React.lazy(() => import('../components/Nexos/pages/Discounts/ListDiscounts'))
// Paso 4
const Paso4 = React.lazy(() => import('../components/Nexos/pages/Pasos/ItemsSelected/ItemsSelected'));
const SeleccionarServiciosACotizar = React.lazy(() => import('../components/Nexos/pages/Pasos/ServiciosACotizar/ServiciosACotizar'));
//paso 5
const Paso5 = React.lazy(() => import('../components/Nexos/pages/DiscountsToAprove/ListDiscountsToAprove5'));

// Seguimiento
const Seguimiento = React.lazy(() => import('../components/Nexos/pages/Seguimiento/Seguimiento'));
const SeguimientoOrganizacion = React.lazy(() => import('../components/Nexos/pages/Seguimiento/SeguimientoOrganizacion'));

// Estado Cotizaciones
const QuoteState = React.lazy(() => import('../components/Nexos/pages/QuoteState/QuoteState'));
const ListQuoteState = React.lazy(() => import('../components/Nexos/pages/ListQuoteState/ListQuoteState'));
const ListQuoteStates = React.lazy(() => import('../components/Nexos/pages/QuoteState/ListQuoteStates'));

// Agendamiento
const ListTypesScheduling = React.lazy(() => import('../components/Nexos/pages/schecdulle/ListTypesScheduling/ListTypesScheduling'));
const CreateOrEditScheduling = React.lazy(() => import('../components/Nexos/pages/schecdulle/ListTypesScheduling/CreateOrEditScheduling'));
const VisitsDemosMeetings = React.lazy(() => import('../components/Nexos/pages/schecdulle/VisitsDemosMeetings/VisitsDemosMeetings'));
const VisitsDemosMeetingsForms = React.lazy(() => import('../components/Nexos/pages/schecdulle/VisitsDemosMeetings/VisitsDemosMeetingsForm'));
const listaareas = React.lazy(() => import('../components/Nexos/pages/Area/ListArea'))
const creararea = React.lazy(() => import('../components/Nexos/pages/Area/CreateOrEditArea'))

// Emails
const ListEmails = React.lazy(() => import('../components/Nexos/pages/Emails/ListEmails'));
const CreateOrEditEmail = React.lazy(() => import('../components/Nexos/pages/Emails/CreateOrEditEmail'));

// verifications
const Verifications = React.lazy(() => import('../components/Nexos/pages/ContractedAssamblies/Verifications/Verifications'));

// ASAMBLEAS CONTRATADAS
const ContractedAssamblies = React.lazy(() => import('../components/Nexos/pages/ContractedAssamblies/ContractedAssamblies'));

// CONTABILIDAD
const ListBillings = React.lazy(() => import('../components/Nexos/pages/Accounting/ListBillings'));
const CreateBilling = React.lazy(() => import('../components/Nexos/pages/Accounting/CreateBilling'));
const VerifyConfirmation = React.lazy(() => import('../components/Nexos/pages/Confirmaciones/VerifyConfirmation'));

// REFACTORIZADO 2
//pages
const SignUp = React.lazy(() => import("./../components/Pages/Authentication/SignUp/SignUp"));
const SignIn = React.lazy(() =>
  import("./../components/Pages/Authentication/SignIn/SignIn")
);
const ForgotPassword = React.lazy(() =>
  import("./../components/Pages/Authentication/ForgotPassword/ForgotPassword")
);
const Lockscreen = React.lazy(() =>
  import("./../components/Pages/Authentication/Lockscreen/Lockscreen")
);
const ResetPassword = React.lazy(() =>
  import("./../components/Pages/Authentication/ResetPassword/ResetPassword")
);
const UnderConstruction = React.lazy(() =>
  import(
    "./../components/Pages/Authentication/UnderConstruction/UnderConstruction"
  )
);

//status errors 
const Error404 = React.lazy(() =>
  import("./../components/Pages/Authentication/404Error/404Error")
);
const Error500 = React.lazy(() =>
  import("./../components/Pages/Authentication/500Error/500Error")
);
const Error501 = React.lazy(() =>
  import("./../components/Pages/Authentication/501Error/501Error")
);

//Auth
const AuthLogin = React.lazy(() => import("./../Authentication/Login"));
const AuthSignup = React.lazy(() => import("./../Authentication/Signup"))
// REFACTORIZADO 2
export const authRoutes: LazyRoute[] = [
  {
    path: ``,
    Component: AuthLogin
  },
  {
    path: `login`,
    Component: AuthLogin
  },
  {
    path: `signup`,
    Component: AuthSignup
  }
]

export const mainRoutes: LazyRoute[] = [
  {
    path: `nexos/configuraciones/ventas`,
    Component: ConfiguracionesVentas
  },
  {
    path: `nexos/configuraciones/configuraciones`,
    Component: ConfiguracionesConfiguraciones
  },
  {
    path: `nexos/configuraciones/agendamiento`,
    Component: ConfiguracionesAgendamiento
  },
  {
    path: `nexos/ventasconfirmaciones`,
    Component: NexosVentas
  }, {
    path: `nexos/configuraciones`,
    Component: Configuraciones
  },
  {
    path: `nexos/confirmaciones`,
    Component: Confirmaciones
  },
  {
    path: `nexos/listarcotizaciones`,
    Component: ListQuotes
  },
  {
    path: `nexos/cotizar`,
    Component: Cotizar
  },
  {
    path: `nexos/cotizacionformulario`,
    Component: CotizarFormulario
  },
  {
    path: `nexos/serviciosacotizar`,
    Component: ServiciosACotizar
  },
  {
    path: `nexos/listarperfiles`,
    Component: ListProfiles
  },
  {
    path: `nexos/createprofile`,
    Component: CreateOrEditProfile
  },
  {
    path: `nexos/editprofile`,
    Component: CreateOrEditProfile
  },
  {
    path: `nexos/listarusuarios`,
    Component: ListUsers
  },
  {
    path: `nexos/crearusuarios`,
    Component: CreateUsers
  },
  {
    path: `nexos/editarusuarios`,
    Component: CreateUsers
  },
  {
    path: `nexos/listaritems`,
    Component: ListItems
  },
  {
    path: `nexos/crearitem`,
    Component: CreateOrEditItems
  },
  {
    path: `nexos/editaritem`,
    Component: CreateOrEditItems
  },
  {
    path: `nexos/formatobasico`,
    Component: FormatoBasico
  },
  {
    path: 'nexos/cotizacionescliente/:id',
    Component: AllClientQuotes,
  },
  {
    path: `nexos/cotizacionpdf`,
    Component: CotizacionPdf
  },
  {
    path: `nexos/listarciudades`,
    Component: ListCities
  },
  {
    path: `nexos/crearciudad`,
    Component: CreateOrEdit
  },
  {
    path: `nexos/editarciudad`,
    Component: CreateOrEdit
  },
  {//servicios
    path: `nexos/listarservicioscotizar`,
    Component: ListarServiceCotizar
  },
  {
    path: `nexos/crearserviciocotizar`,
    Component: CreateServiceCotizar
  },
  {
    path: `nexos/editarserviciocotizar/:id`,
    Component: CreateServiceCotizar
  },
  {//countries
    path: `nexos/listarpaises`,
    Component: ListarCountries
  },
  {
    path: `nexos/crearpais`,
    Component: CreateCountries
  },
  {
    path: `nexos/editarpais`,
    Component: CreateCountries
  },
  {//descuentos
    path: `nexos/listardescuentos`,
    Component: ListarDiscounts
  },
  {
    path: `nexos/creardescuento`,
    Component: CreateDiscounts
  },
  {
    path: `nexos/editardescuento`,
    Component: CreateDiscounts
  },
  { //seleccionados
    path: `nexos/seleccionados`,
    Component: Paso4
  },
  {
    path: `nexos/seleccionarserviciosacotizar`,
    Component: SeleccionarServiciosACotizar
  },
  { //paso 5
    path: `nexos/descuentosaaplicar`,
    Component: Paso5
  },
  { // Seguimiento
    path: `nexos/seguimiento`,
    Component: Seguimiento
  },
  {
    path: `nexos/seguimientoorganizacion`,
    Component: SeguimientoOrganizacion
  },
  {
    path: `nexos/estadocotizacion`,
    Component: QuoteState
  },
  {
    path: `nexos/listaestadoscotizacion`,
    Component: ListQuoteState
  },
  {
    path: `nexos/listatiposestadoscotizacion`,
    Component: ListQuoteStates
  },
  {
    path: `nexos/listatiposagendamiento`,
    Component: ListTypesScheduling
  },
  {
    path: `nexos/tipoagendamiento`,
    Component: CreateOrEditScheduling
  },
  {
    path: `nexos/visitasdemosreuniones`,
    Component: VisitsDemosMeetings
  },
  {
    path: `nexos/visitasdemosreunionesform`,
    Component: VisitsDemosMeetingsForms
  },
  {
    path: `nexos/listaareas`,
    Component: listaareas
  },
  {
    path: `nexos/creararea`,
    Component: creararea
  },
  {
    path: `nexos/listacorreos`,
    Component: ListEmails
  },
  {
    path: `nexos/crearcorreo`,
    Component: CreateOrEditEmail
  },
  {
    path: `nexos/editarcorreo`,
    Component: CreateOrEditEmail
  },
  {
    path: `nexos/verificaciones`,
    Component: Verifications
  },
  {
    path: 'nexos/asambleascontratadas',
    Component: ContractedAssamblies
  },
  { // CONTABILIDAD
    path: 'nexos/facturaciones',
    Component: ListBillings
  },
  { 
    path: 'nexos/crearfacturacion',
    Component: CreateBilling
  },
  {
    path: 'nexos/verificarconfirmacion',
    Component: VerifyConfirmation
  }
]

export const appRoutes: LazyRoute[] = [
  {
    path: ``,
    Component: Dashboard
  },
  {
    path: `inicio`,
    Component: Dashboard
  }
]

export const customPagesRoutes: LazyRoute[] = [
  {
    path: `pages/Authentication/sigin`,
    Component: SignIn
  },
  {
    path: `pages/Authentication/sigup`,
    Component: SignUp
  },
  {
    path: `pages/Authentication/forgotpassword`,
    Component: ForgotPassword
  },
  {
    path: `pages/Authentication/resetpassword`,
    Component: ResetPassword
  },
  {
    path: `pages/Authentication/lockscreen`,
    Component: Lockscreen
  },
  {
    path: `pages/Authentication/underconstruction`,
    Component: UnderConstruction
  },
  {
    path: `pages/Authentication/404error`,
    Component: Error404
  },
  {
    path: `pages/Authentication/500error`,
    Component: Error500
  },
  {
    path: `*`,
    Component: Error404
  }
];