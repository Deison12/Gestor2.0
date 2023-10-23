"use strict";(self.webpackChunknowa=self.webpackChunknowa||[]).push([[75],{2461:function(a,e,r){r.d(e,{Z:function(){return Z}});var s=r(1413),n=r(45987),c=r(81694),i=r.n(c),t=r(72791),l=r(10162),o=r(16445),d=r(80184),f=["bsPrefix","active","children","className","as","linkAs","linkProps","href","title","target"],u=t.forwardRef((function(a,e){var r=a.bsPrefix,c=a.active,t=a.children,u=a.className,v=a.as,m=void 0===v?"li":v,p=a.linkAs,Z=void 0===p?o.Z:p,b=a.linkProps,N=a.href,x=a.title,h=a.target,P=(0,n.Z)(a,f),y=(0,l.vE)(r,"breadcrumb-item");return(0,d.jsx)(m,(0,s.Z)((0,s.Z)({ref:e},P),{},{className:i()(y,u,{active:c}),"aria-current":c?"page":void 0,children:c?t:(0,d.jsx)(Z,(0,s.Z)((0,s.Z)({},b),{},{href:N,title:x,target:h,children:t}))}))}));u.displayName="BreadcrumbItem",u.defaultProps={active:!1,linkProps:{}};var v=u,m=["bsPrefix","className","listProps","children","label","as"],p=t.forwardRef((function(a,e){var r=a.bsPrefix,c=a.className,t=a.listProps,o=a.children,f=a.label,u=a.as,v=void 0===u?"nav":u,p=(0,n.Z)(a,m),Z=(0,l.vE)(r,"breadcrumb");return(0,d.jsx)(v,(0,s.Z)((0,s.Z)({"aria-label":f,className:c,ref:e},p),{},{children:(0,d.jsx)("ol",(0,s.Z)((0,s.Z)({},t),{},{className:i()(Z,null==t?void 0:t.className),children:o}))}))}));p.displayName="Breadcrumb",p.defaultProps={label:"breadcrumb",listProps:{}};var Z=Object.assign(p,{Item:v})},9140:function(a,e,r){r.d(e,{Z:function(){return I}});var s=r(1413),n=r(45987),c=r(81694),i=r.n(c),t=r(72791),l=r(10162),o=r(66543),d=r(27472),f=r(80184),u=["bsPrefix","className","variant","as"],v=t.forwardRef((function(a,e){var r=a.bsPrefix,c=a.className,t=a.variant,o=a.as,d=void 0===o?"img":o,v=(0,n.Z)(a,u),m=(0,l.vE)(r,"card-img");return(0,f.jsx)(d,(0,s.Z)({ref:e,className:i()(t?"".concat(m,"-").concat(t):m,c)},v))}));v.displayName="CardImg";var m=v,p=r(96040),Z=["bsPrefix","className","as"],b=t.forwardRef((function(a,e){var r=a.bsPrefix,c=a.className,o=a.as,d=void 0===o?"div":o,u=(0,n.Z)(a,Z),v=(0,l.vE)(r,"card-header"),m=(0,t.useMemo)((function(){return{cardHeaderBsPrefix:v}}),[v]);return(0,f.jsx)(p.Z.Provider,{value:m,children:(0,f.jsx)(d,(0,s.Z)((0,s.Z)({ref:e},u),{},{className:i()(c,v)}))})}));b.displayName="CardHeader";var N=b,x=["bsPrefix","className","bg","text","border","body","children","as"],h=(0,d.Z)("h5"),P=(0,d.Z)("h6"),y=(0,o.Z)("card-body"),g=(0,o.Z)("card-title",{Component:h}),j=(0,o.Z)("card-subtitle",{Component:P}),w=(0,o.Z)("card-link",{Component:"a"}),C=(0,o.Z)("card-text",{Component:"p"}),E=(0,o.Z)("card-footer"),R=(0,o.Z)("card-img-overlay"),k=t.forwardRef((function(a,e){var r=a.bsPrefix,c=a.className,t=a.bg,o=a.text,d=a.border,u=a.body,v=a.children,m=a.as,p=void 0===m?"div":m,Z=(0,n.Z)(a,x),b=(0,l.vE)(r,"card");return(0,f.jsx)(p,(0,s.Z)((0,s.Z)({ref:e},Z),{},{className:i()(c,b,t&&"bg-".concat(t),o&&"text-".concat(o),d&&"border-".concat(d)),children:u?(0,f.jsx)(y,{children:v}):v}))}));k.displayName="Card",k.defaultProps={body:!1};var I=Object.assign(k,{Img:m,Title:g,Subtitle:j,Body:y,Link:w,Text:C,Header:N,Footer:E,ImgOverlay:R})},96040:function(a,e,r){var s=r(72791).createContext(null);s.displayName="CardHeaderContext",e.Z=s},2677:function(a,e,r){var s=r(29439),n=r(1413),c=r(45987),i=r(81694),t=r.n(i),l=r(72791),o=r(10162),d=r(80184),f=["as","bsPrefix","className"],u=["className"];var v=l.forwardRef((function(a,e){var r=function(a){var e=a.as,r=a.bsPrefix,s=a.className,i=(0,c.Z)(a,f);r=(0,o.vE)(r,"col");var l=(0,o.pi)(),d=(0,o.zG)(),u=[],v=[];return l.forEach((function(a){var e,s,n,c=i[a];delete i[a],"object"===typeof c&&null!=c?(e=c.span,s=c.offset,n=c.order):e=c;var t=a!==d?"-".concat(a):"";e&&u.push(!0===e?"".concat(r).concat(t):"".concat(r).concat(t,"-").concat(e)),null!=n&&v.push("order".concat(t,"-").concat(n)),null!=s&&v.push("offset".concat(t,"-").concat(s))})),[(0,n.Z)((0,n.Z)({},i),{},{className:t().apply(void 0,[s].concat(u,v))}),{as:e,bsPrefix:r,spans:u}]}(a),i=(0,s.Z)(r,2),l=i[0],v=l.className,m=(0,c.Z)(l,u),p=i[1],Z=p.as,b=void 0===Z?"div":Z,N=p.bsPrefix,x=p.spans;return(0,d.jsx)(b,(0,n.Z)((0,n.Z)({},m),{},{ref:e,className:t()(v,!x.length&&N)}))}));v.displayName="Col",e.Z=v},8116:function(a,e,r){r.d(e,{Z:function(){return g}});var s=r(1413),n=r(45987),c=r(81694),i=r.n(c),t=r(72791),l=r(10162),o=r(16445),d=r(80184),f=["active","disabled","className","style","activeLabel","children"],u=["children"],v=t.forwardRef((function(a,e){var r=a.active,c=a.disabled,t=a.className,l=a.style,u=a.activeLabel,v=a.children,m=(0,n.Z)(a,f),p=r||c?"span":o.Z;return(0,d.jsx)("li",{ref:e,style:l,className:i()(t,"page-item",{active:r,disabled:c}),children:(0,d.jsxs)(p,(0,s.Z)((0,s.Z)({className:"page-link",disabled:c},m),{},{children:[v,r&&u&&(0,d.jsx)("span",{className:"visually-hidden",children:u})]}))})}));v.defaultProps={active:!1,disabled:!1,activeLabel:"(current)"},v.displayName="PageItem";var m=v;function p(a,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a,c=t.forwardRef((function(a,c){var i=a.children,t=(0,n.Z)(a,u);return(0,d.jsxs)(v,(0,s.Z)((0,s.Z)({},t),{},{ref:c,children:[(0,d.jsx)("span",{"aria-hidden":"true",children:i||e}),(0,d.jsx)("span",{className:"visually-hidden",children:r})]}))}));return c.displayName=a,c}var Z=p("First","\xab"),b=p("Prev","\u2039","Previous"),N=p("Ellipsis","\u2026","More"),x=p("Next","\u203a"),h=p("Last","\xbb"),P=["bsPrefix","className","size"],y=t.forwardRef((function(a,e){var r=a.bsPrefix,c=a.className,t=a.size,o=(0,n.Z)(a,P),f=(0,l.vE)(r,"pagination");return(0,d.jsx)("ul",(0,s.Z)((0,s.Z)({ref:e},o),{},{className:i()(c,f,t&&"".concat(f,"-").concat(t))}))}));y.displayName="Pagination";var g=Object.assign(y,{First:Z,Prev:b,Ellipsis:N,Item:m,Next:x,Last:h})},89743:function(a,e,r){var s=r(1413),n=r(45987),c=r(81694),i=r.n(c),t=r(72791),l=r(10162),o=r(80184),d=["bsPrefix","className","as"],f=t.forwardRef((function(a,e){var r=a.bsPrefix,c=a.className,t=a.as,f=void 0===t?"div":t,u=(0,n.Z)(a,d),v=(0,l.vE)(r,"row"),m=(0,l.pi)(),p=(0,l.zG)(),Z="".concat(v,"-cols"),b=[];return m.forEach((function(a){var e,r=u[a];delete u[a],e=null!=r&&"object"===typeof r?r.cols:r;var s=a!==p?"-".concat(a):"";null!=e&&b.push("".concat(Z).concat(s,"-").concat(e))})),(0,o.jsx)(f,(0,s.Z)((0,s.Z)({ref:e},u),{},{className:i().apply(void 0,[c,v].concat(b))}))}));f.displayName="Row",e.Z=f},66543:function(a,e,r){r.d(e,{Z:function(){return v}});var s=r(1413),n=r(45987),c=r(81694),i=r.n(c),t=/-(.)/g;var l=r(72791),o=r(10162),d=r(80184),f=["className","bsPrefix","as"],u=function(a){return a[0].toUpperCase()+(e=a,e.replace(t,(function(a,e){return e.toUpperCase()}))).slice(1);var e};function v(a){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e.displayName,c=void 0===r?u(a):r,t=e.Component,v=e.defaultProps,m=l.forwardRef((function(e,r){var c=e.className,l=e.bsPrefix,u=e.as,v=void 0===u?t||"div":u,m=(0,n.Z)(e,f),p=(0,o.vE)(l,a);return(0,d.jsx)(v,(0,s.Z)({ref:r,className:i()(c,p)},m))}));return m.defaultProps=v,m.displayName=c,m}},27472:function(a,e,r){var s=r(1413),n=r(72791),c=r(81694),i=r.n(c),t=r(80184);e.Z=function(a){return n.forwardRef((function(e,r){return(0,t.jsx)("div",(0,s.Z)((0,s.Z)({},e),{},{ref:r,className:i()(e.className,a)}))}))}}}]);
//# sourceMappingURL=75.8d74b137.chunk.js.map