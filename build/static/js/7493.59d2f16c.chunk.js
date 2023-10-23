"use strict";(self.webpackChunknowa=self.webpackChunknowa||[]).push([[7493],{13659:function(e,t,n){n.r(t);var a=n(45987),s=n(74165),r=n(15861),i=n(4942),o=n(1413),l=n(29439),c=n(20160),d=n(79627),u=n(2677),m=n(89743),p=n(323),x=n(43360),v=n(72791),h=n(16871),f=n(45644),Z=n(24490),g=n(42713),j=n(82570),N=n.n(j),b=n(78983),E=n(80184),y=["id"],k={id:0,name:"",status_id:1};t.default=function(){var e,t,n,j,w,C=(0,v.useState)(k),I=(0,l.Z)(C,2),A=I[0],D=I[1],O=(0,f.i)(),L=O.postData,_=O.putData,F=(0,h.TH)(),T=F.state,S=(0,Z.VY)(),q=S.handleEditConfirmation,B=S.handleErrorAlert,G=(0,v.useState)(!1),M=(0,l.Z)(G,2),P=M[0],R=M[1],z=(0,v.useState)(!0),H=(0,l.Z)(z,2),U=H[0],V=H[1],Y=(0,Z.pN)(),J=Y.errors,K=Y.setError,Q=function(e){var t=e.target,n=t.name,a=t.value,s="radio"===t.type?parseInt(a):a;"name"===n&&P&&(""===(a=a.trim())||N().isEmpty(a)?(K("name",["El campo nombre es obligatorio"]),V(!0)):(K("name",[""]),V(!1)),D((function(e){return(0,o.Z)((0,o.Z)({},e),{},(0,i.Z)({},n,s))}))),"status_id"===n&&D((function(e){return(0,o.Z)((0,o.Z)({},e),{},(0,i.Z)({},n,s))}))},W=function(){R(!0)},X=function(){var e;null!=(null===F||void 0===F||null===(e=F.state)||void 0===e?void 0:e.id)?ee():$()},$=function(){var e=(0,r.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,L(A,"residential/scheduling/type/create",!1,"listatiposagendamiento");case 3:e.next=9;break;case 5:e.prev=5,e.t0=e.catch(0),console.error("Error en createForm:",e.t0),B("Error al crear el form.");case 9:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}(),ee=function(){var e=(0,r.Z)((0,s.Z)().mark((function e(){var t,n,r;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,q("\xbfEst\xe1s seguro que deseas editar este servicio?");case 3:if(!e.sent.isConfirmed){e.next=9;break}return A.id,n=(0,a.Z)(A,y),r=(0,o.Z)((0,o.Z)({},n),{},{id:null===F||void 0===F||null===(t=F.state)||void 0===t?void 0:t.id}),e.next=9,_(r,"residential/scheduling/type/edit","listatiposagendamiento");case 9:e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),console.error("Error en editForm:",e.t0),B("Error al editar el form.");case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}();return(0,v.useEffect)((function(){T&&(D(T),V(!1))}),[T]),(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(g.cI,{items:["INICIO","TIPO DE AGENDAMIENTO",null!==F&&void 0!==F&&null!==(e=F.state)&&void 0!==e&&e.id?"Editar tipo de agendamiento":"Agregar tipo de agendamiento"],baseURL:["inicio","nexos/tipoagendamiento",null!==F&&void 0!==F&&null!==(t=F.state)&&void 0!==t&&t.id?"tipoagendamiento/"+(null===F||void 0===F||null===(n=F.state)||void 0===n?void 0:n.id):"tipoagendamiento"]}),(0,E.jsx)(g.r3,{title:null!==F&&void 0!==F&&null!==(j=F.state)&&void 0!==j&&j.id?"Editar tipo de agendamiento":"Agregar tipo de agendamiento"}),(0,E.jsx)(c.Z,{className:"form-horizontal",onSubmit:function(e){e.preventDefault(),X()},children:(0,E.jsx)(d.Z,{className:"w-100",children:(0,E.jsx)(d.Z.Body,{className:"w-100",children:(0,E.jsxs)(u.Z,{sm:12,md:12,lg:6,xl:6,className:"mx-auto",children:[(0,E.jsx)(m.Z,{className:"justify-content-center mt-5 mb-3",children:(0,E.jsx)(u.Z,{sm:12,md:12,lg:12,xl:12,children:(0,E.jsxs)(p.Z,{className:"form-group w-100  text-center m-0",children:[(0,E.jsx)(c.Z.Label,{className:"mb-3",children:"NOMBRE DEL TIPO DE AGENDAMIENTO"}),(0,E.jsx)(g.fm,{message:null===J||void 0===J||null===(w=J.name)||void 0===w?void 0:w[0],inputFocus:P,children:(0,E.jsx)(b.jO,{className:"text-center",type:"text",id:"quote-autocomplete",name:"name",onChange:Q,onBlur:Q,onFocus:W,value:A.name?A.name:"",required:!0})})]})})}),(0,E.jsx)(m.Z,{className:"mb-2",children:(0,E.jsx)(u.Z,{xs:12,sm:12,md:12,lg:12,xl:12,children:(0,E.jsxs)(p.Z,{className:"form-group text-center",children:[(0,E.jsx)(c.Z.Label,{className:"form-label",children:"Estado"}),(0,E.jsxs)("div",{className:"custom-controls-stacked d-flex justify-content-center gap-5",children:[(0,E.jsxs)(c.Z.Label,{className:"custom-control custom-radio",children:[(0,E.jsx)(c.Z.Control,{type:"radio",className:"custom-control-input",name:"status_id",value:1,checked:1===(null===A||void 0===A?void 0:A.status_id),onChange:Q,onClick:W}),(0,E.jsx)("span",{className:"custom-control-label",children:"Activo"})]}),(0,E.jsxs)(c.Z.Label,{className:"custom-control custom-radio",children:[(0,E.jsx)(c.Z.Control,{type:"radio",className:"custom-control-input",name:"status_id",value:0,checked:0===(null===A||void 0===A?void 0:A.status_id),onChange:Q,onClick:W}),(0,E.jsx)("span",{className:"custom-control-label",children:"Inactivo"})]})]})]})})}),(0,E.jsx)(m.Z,{className:"mb-4",children:(0,E.jsx)(u.Z,{xs:12,sm:12,md:12,lg:12,xl:12,children:(0,E.jsx)(x.Z,{variant:"",className:"btn btn-primary",style:{width:"100%"},type:"submit",disabled:U,children:T?"Guardar cambios":"Editar cambios"})})})]})})})})]})}}}]);
//# sourceMappingURL=7493.59d2f16c.chunk.js.map