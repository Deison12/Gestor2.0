"use strict";(self.webpackChunknowa=self.webpackChunknowa||[]).push([[3720],{66599:function(e,r,n){n.r(r);var a=n(74165),t=n(15861),s=n(29439),c=n(72791),i=n(65209),o=n(43504),l=n(45644),u=n(42713),d=n(80184);r.default=function(){var e=(0,c.useState)([]),r=(0,s.Z)(e,2),n=r[0],v=r[1],p=(0,c.useState)([]),f=(0,s.Z)(p,2),x=f[0],h=f[1],m=(0,l.i)(),g=m.getAllData,b=m.isLoading,w=m.error,j=function(){var e=(0,t.Z)((0,a.Z)().mark((function e(){var r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g("api/services/activeTypes");case 3:r=e.sent,h(r),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=(0,t.Z)((0,a.Z)().mark((function e(){var r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g("api/email/list");case 3:r=e.sent,v(r),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();(0,c.useEffect)((function(){j(),k()}),[]);var Z=[{Header:"N\xb0",accessor:"",className:"wd-5p borderrigth",Cell:function(e){var r=e.row.index+1;return(0,d.jsx)("span",{children:r})}},{Header:"Tipo de Agendamiento",accessor:"name_email",className:"wd-25p borderrigth",Cell:function(e){var r=e.value;return(0,d.jsx)("span",{children:r})}},{Header:"Area",accessor:"service_id",className:"wd-25p borderrigth",Cell:function(e){var r=e.value,n=x.find((function(e){return e.id===r}));return(0,d.jsx)("span",{children:null!==n&&void 0!==n&&n.id?null===n||void 0===n?void 0:n.name:"Ninguna"})}},{Header:"Estado",accessor:"status_id",className:"wd-20p borderrigth",Cell:function(e){return 1===e.value?(0,d.jsx)(i.Z,{label:"Activo",color:"success",variant:"outlined"}):(0,d.jsx)(i.Z,{label:"Inactivo",color:"error",variant:"outlined"})}},{Header:"Accion",accessor:"",className:"wd-15p borderrigth",Cell:function(e){var r=e.row;return(0,d.jsx)(o.rU,{to:"".concat("","/nexos/editarcorreo"),state:r.original,children:(0,d.jsx)("span",{className:"material-icons md-5 md-dark",children:"\ue3c9"})})}}];return(0,d.jsxs)("div",{children:[(0,d.jsx)(u.cI,{items:["inicio","Configuraciones","lista correos"],baseURL:["inicio","nexos/configuraciones","nexos/listacorreos"]}),(0,d.jsx)(u.r3,{title:"LISTA DE EMAILS"}),w&&(0,d.jsx)(u.bI,{baseURL:"#",title:"Error",subtitle:"".concat(null===w||void 0===w?void 0:w.message)}),!w&&(0,d.jsx)(u.L4,{columns:Z,data:n,addButtonLink:"".concat("","/nexos/crearcorreo"),isLoading:b})]})}}}]);
//# sourceMappingURL=3720.5bfc1c5f.chunk.js.map