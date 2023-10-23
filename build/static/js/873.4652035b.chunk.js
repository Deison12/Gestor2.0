"use strict";(self.webpackChunknowa=self.webpackChunknowa||[]).push([[873],{22021:function(n,e,t){t.d(e,{gP:function(){return c}});var r=t(72791),o={prefix:String(Math.round(1e10*Math.random())),current:0},i=r.createContext(o);var a=Boolean("undefined"!==typeof window&&window.document&&window.document.createElement);function c(n){var e=(0,r.useContext)(i);return e!==o||a||console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server."),(0,r.useMemo)((function(){return n||"react-aria".concat(e.prefix,"-").concat(++e.current)}),[n])}},53649:function(n,e,t){t.d(e,{Z:function(){return o}});var r=t(72791);function o(){return(0,r.useReducer)((function(n){return!n}),!1)[1]}},73201:function(n,e,t){var r=t(72791),o=function(n){return n&&"function"!==typeof n?function(e){n.current=e}:n};e.Z=function(n,e){return(0,r.useMemo)((function(){return function(n,e){var t=o(n),r=o(e);return function(n){t&&t(n),r&&r(n)}}(n,e)}),[n,e])}},71306:function(n,e,t){t.d(e,{$F:function(){return o},PB:function(){return r}});function r(n){return"".concat("data-rr-ui-").concat(n)}function o(n){return"".concat("rrUi").concat(n)}},74784:function(n,e,t){var r=t(72791).createContext(null);r.displayName="NavContext",e.Z=r},78633:function(n,e,t){t.d(e,{h:function(){return o}});var r=t(72791).createContext(null),o=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return null!=n?String(n):e||null};e.Z=r},3070:function(n,e,t){var r=t(97357),o=!1,i=!1;try{var a={get passive(){return o=!0},get once(){return i=o=!0}};r.Z&&(window.addEventListener("test",a,a),window.removeEventListener("test",a,!0))}catch(c){}e.ZP=function(n,e,t,r){if(r&&"boolean"!==typeof r&&!i){var a=r.once,c=r.capture,u=t;!i&&a&&(u=t.__once||function n(r){this.removeEventListener(e,n,c),t.call(this,r)},t.__once=u),n.addEventListener(e,u,o?r:c)}n.addEventListener(e,t,r)}},97357:function(n,e){e.Z=!("undefined"===typeof window||!window.document||!window.document.createElement)},92899:function(n,e,t){var r=t(3070),o=t(36382);e.Z=function(n,e,t,i){return(0,r.ZP)(n,e,t,i),function(){(0,o.Z)(n,e,t,i)}}},78376:function(n,e,t){function r(n){return n&&n.ownerDocument||document}t.d(e,{Z:function(){return r}})},13808:function(n,e,t){t.d(e,{Z:function(){return o}});var r=Function.prototype.bind.call(Function.prototype.call,[].slice);function o(n,e){return r(n.querySelectorAll(e))}},36382:function(n,e){e.Z=function(n,e,t,r){var o=r&&"boolean"!==typeof r?r.capture:r;n.removeEventListener(e,t,o),t.__once&&n.removeEventListener(e,t.__once,o)}},92176:function(n){n.exports=function(n,e,t,r,o,i,a,c){if(!n){var u;if(void 0===e)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[t,r,o,i,a,c],s=0;(u=new Error(e.replace(/%s/g,(function(){return l[s++]})))).name="Invariant Violation"}throw u.framesToPop=1,u}}},2461:function(n,e,t){t.d(e,{Z:function(){return h}});var r=t(1413),o=t(45987),i=t(81694),a=t.n(i),c=t(72791),u=t(10162),l=t(16445),s=t(80184),f=["bsPrefix","active","children","className","as","linkAs","linkProps","href","title","target"],d=c.forwardRef((function(n,e){var t=n.bsPrefix,i=n.active,c=n.children,d=n.className,p=n.as,m=void 0===p?"li":p,v=n.linkAs,h=void 0===v?l.Z:v,y=n.linkProps,g=n.href,Z=n.title,b=n.target,w=(0,o.Z)(n,f),x=(0,u.vE)(t,"breadcrumb-item");return(0,s.jsx)(m,(0,r.Z)((0,r.Z)({ref:e},w),{},{className:a()(x,d,{active:i}),"aria-current":i?"page":void 0,children:i?c:(0,s.jsx)(h,(0,r.Z)((0,r.Z)({},y),{},{href:g,title:Z,target:b,children:c}))}))}));d.displayName="BreadcrumbItem",d.defaultProps={active:!1,linkProps:{}};var p=d,m=["bsPrefix","className","listProps","children","label","as"],v=c.forwardRef((function(n,e){var t=n.bsPrefix,i=n.className,c=n.listProps,l=n.children,f=n.label,d=n.as,p=void 0===d?"nav":d,v=(0,o.Z)(n,m),h=(0,u.vE)(t,"breadcrumb");return(0,s.jsx)(p,(0,r.Z)((0,r.Z)({"aria-label":f,className:i,ref:e},v),{},{children:(0,s.jsx)("ol",(0,r.Z)((0,r.Z)({},c),{},{className:a()(h,null==c?void 0:c.className),children:l}))}))}));v.displayName="Breadcrumb",v.defaultProps={label:"breadcrumb",listProps:{}};var h=Object.assign(v,{Item:p})},9140:function(n,e,t){t.d(e,{Z:function(){return R}});var r=t(1413),o=t(45987),i=t(81694),a=t.n(i),c=t(72791),u=t(10162),l=t(66543),s=t(27472),f=t(80184),d=["bsPrefix","className","variant","as"],p=c.forwardRef((function(n,e){var t=n.bsPrefix,i=n.className,c=n.variant,l=n.as,s=void 0===l?"img":l,p=(0,o.Z)(n,d),m=(0,u.vE)(t,"card-img");return(0,f.jsx)(s,(0,r.Z)({ref:e,className:a()(c?"".concat(m,"-").concat(c):m,i)},p))}));p.displayName="CardImg";var m=p,v=t(96040),h=["bsPrefix","className","as"],y=c.forwardRef((function(n,e){var t=n.bsPrefix,i=n.className,l=n.as,s=void 0===l?"div":l,d=(0,o.Z)(n,h),p=(0,u.vE)(t,"card-header"),m=(0,c.useMemo)((function(){return{cardHeaderBsPrefix:p}}),[p]);return(0,f.jsx)(v.Z.Provider,{value:m,children:(0,f.jsx)(s,(0,r.Z)((0,r.Z)({ref:e},d),{},{className:a()(i,p)}))})}));y.displayName="CardHeader";var g=y,Z=["bsPrefix","className","bg","text","border","body","children","as"],b=(0,s.Z)("h5"),w=(0,s.Z)("h6"),x=(0,l.Z)("card-body"),E=(0,l.Z)("card-title",{Component:b}),N=(0,l.Z)("card-subtitle",{Component:w}),P=(0,l.Z)("card-link",{Component:"a"}),S=(0,l.Z)("card-text",{Component:"p"}),_=(0,l.Z)("card-footer"),C=(0,l.Z)("card-img-overlay"),U=c.forwardRef((function(n,e){var t=n.bsPrefix,i=n.className,c=n.bg,l=n.text,s=n.border,d=n.body,p=n.children,m=n.as,v=void 0===m?"div":m,h=(0,o.Z)(n,Z),y=(0,u.vE)(t,"card");return(0,f.jsx)(v,(0,r.Z)((0,r.Z)({ref:e},h),{},{className:a()(i,y,c&&"bg-".concat(c),l&&"text-".concat(l),s&&"border-".concat(s)),children:d?(0,f.jsx)(x,{children:p}):p}))}));U.displayName="Card",U.defaultProps={body:!1};var R=Object.assign(U,{Img:m,Title:E,Subtitle:N,Body:x,Link:P,Text:S,Header:g,Footer:_,ImgOverlay:C})},96040:function(n,e,t){var r=t(72791).createContext(null);r.displayName="CardHeaderContext",e.Z=r},17858:function(n,e,t){t.d(e,{Z:function(){return E}});var r=t(1413),o=t(45987),i=t(4942),a=t(81694),c=t.n(a),u=t(75427),l=t(72791),s=t(18875),f=t(71380);var d,p=function(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return e.filter((function(n){return null!=n})).reduce((function(n,e){if("function"!==typeof e)throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");return null===n?e:function(){for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];n.apply(this,r),e.apply(this,r)}}),null)},m=t(67202),v=t(85007),h=t(80184),y=["onEnter","onEntering","onEntered","onExit","onExiting","className","children","dimension","getDimensionValue"],g={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};function Z(n,e){var t=e["offset".concat(n[0].toUpperCase()).concat(n.slice(1))],r=g[n];return t+parseInt((0,u.Z)(e,r[0]),10)+parseInt((0,u.Z)(e,r[1]),10)}var b=(d={},(0,i.Z)(d,s.Wj,"collapse"),(0,i.Z)(d,s.Ix,"collapsing"),(0,i.Z)(d,s.d0,"collapsing"),(0,i.Z)(d,s.cn,"collapse show"),d),w={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,getDimensionValue:Z},x=l.forwardRef((function(n,e){var t=n.onEnter,i=n.onEntering,a=n.onEntered,u=n.onExit,s=n.onExiting,d=n.className,g=n.children,w=n.dimension,x=void 0===w?"height":w,E=n.getDimensionValue,N=void 0===E?Z:E,P=(0,o.Z)(n,y),S="function"===typeof x?x():x,_=(0,l.useMemo)((function(){return p((function(n){n.style[S]="0"}),t)}),[S,t]),C=(0,l.useMemo)((function(){return p((function(n){var e="scroll".concat(S[0].toUpperCase()).concat(S.slice(1));n.style[S]="".concat(n[e],"px")}),i)}),[S,i]),U=(0,l.useMemo)((function(){return p((function(n){n.style[S]=null}),a)}),[S,a]),R=(0,l.useMemo)((function(){return p((function(n){n.style[S]="".concat(N(S,n),"px"),(0,m.Z)(n)}),u)}),[u,N,S]),W=(0,l.useMemo)((function(){return p((function(n){n.style[S]=null}),s)}),[S,s]);return(0,h.jsx)(v.Z,(0,r.Z)((0,r.Z)({ref:e,addEndListener:f.Z},P),{},{"aria-expanded":P.role?P.in:null,onEnter:_,onEntering:C,onEntered:U,onExit:R,onExiting:W,childRef:g.ref,children:function(n,e){return l.cloneElement(g,(0,r.Z)((0,r.Z)({},e),{},{className:c()(d,g.props.className,b[n],"width"===S&&"collapse-horizontal")}))}}))}));x.defaultProps=w;var E=x},5715:function(n,e,t){var r=t(72791).createContext(null);r.displayName="NavbarContext",e.Z=r},89743:function(n,e,t){var r=t(1413),o=t(45987),i=t(81694),a=t.n(i),c=t(72791),u=t(10162),l=t(80184),s=["bsPrefix","className","as"],f=c.forwardRef((function(n,e){var t=n.bsPrefix,i=n.className,c=n.as,f=void 0===c?"div":c,d=(0,o.Z)(n,s),p=(0,u.vE)(t,"row"),m=(0,u.pi)(),v=(0,u.zG)(),h="".concat(p,"-cols"),y=[];return m.forEach((function(n){var e,t=d[n];delete d[n],e=null!=t&&"object"===typeof t?t.cols:t;var r=n!==v?"-".concat(n):"";null!=e&&y.push("".concat(h).concat(r,"-").concat(e))})),(0,l.jsx)(f,(0,r.Z)((0,r.Z)({ref:e},d),{},{className:a().apply(void 0,[i,p].concat(y))}))}));f.displayName="Row",e.Z=f},27472:function(n,e,t){var r=t(1413),o=t(72791),i=t(81694),a=t.n(i),c=t(80184);e.Z=function(n){return o.forwardRef((function(e,t){return(0,c.jsx)("div",(0,r.Z)((0,r.Z)({},e),{},{ref:t,className:a()(e.className,n)}))}))}},23688:function(n,e,t){function r(){var n=this.constructor.getDerivedStateFromProps(this.props,this.state);null!==n&&void 0!==n&&this.setState(n)}function o(n){this.setState(function(e){var t=this.constructor.getDerivedStateFromProps(n,e);return null!==t&&void 0!==t?t:null}.bind(this))}function i(n,e){try{var t=this.props,r=this.state;this.props=n,this.state=e,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(t,r)}finally{this.props=t,this.state=r}}function a(n){var e=n.prototype;if(!e||!e.isReactComponent)throw new Error("Can only polyfill class components");if("function"!==typeof n.getDerivedStateFromProps&&"function"!==typeof e.getSnapshotBeforeUpdate)return n;var t=null,a=null,c=null;if("function"===typeof e.componentWillMount?t="componentWillMount":"function"===typeof e.UNSAFE_componentWillMount&&(t="UNSAFE_componentWillMount"),"function"===typeof e.componentWillReceiveProps?a="componentWillReceiveProps":"function"===typeof e.UNSAFE_componentWillReceiveProps&&(a="UNSAFE_componentWillReceiveProps"),"function"===typeof e.componentWillUpdate?c="componentWillUpdate":"function"===typeof e.UNSAFE_componentWillUpdate&&(c="UNSAFE_componentWillUpdate"),null!==t||null!==a||null!==c){var u=n.displayName||n.name,l="function"===typeof n.getDerivedStateFromProps?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n"+u+" uses "+l+" but also contains the following legacy lifecycles:"+(null!==t?"\n  "+t:"")+(null!==a?"\n  "+a:"")+(null!==c?"\n  "+c:"")+"\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks")}if("function"===typeof n.getDerivedStateFromProps&&(e.componentWillMount=r,e.componentWillReceiveProps=o),"function"===typeof e.getSnapshotBeforeUpdate){if("function"!==typeof e.componentDidUpdate)throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");e.componentWillUpdate=i;var s=e.componentDidUpdate;e.componentDidUpdate=function(n,e,t){var r=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:t;s.call(this,n,e,r)}}return n}t.r(e),t.d(e,{polyfill:function(){return a}}),r.__suppressDeprecationWarning=!0,o.__suppressDeprecationWarning=!0,i.__suppressDeprecationWarning=!0},32592:function(n,e,t){t.d(e,{Ch:function(){return l},$c:function(){return u}});var r=t(87462),o=t(63366),i=t(72791);t(92176);function a(n){return"default"+n.charAt(0).toUpperCase()+n.substr(1)}function c(n){var e=function(n,e){if("object"!==typeof n||null===n)return n;var t=n[Symbol.toPrimitive];if(void 0!==t){var r=t.call(n,e||"default");if("object"!==typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(n)}(n,"string");return"symbol"===typeof e?e:String(e)}function u(n,e,t){var r=(0,i.useRef)(void 0!==n),o=(0,i.useState)(e),a=o[0],c=o[1],u=void 0!==n,l=r.current;return r.current=u,!u&&l&&a!==e&&c(e),[u?n:a,(0,i.useCallback)((function(n){for(var e=arguments.length,r=new Array(e>1?e-1:0),o=1;o<e;o++)r[o-1]=arguments[o];t&&t.apply(void 0,[n].concat(r)),c(n)}),[t])]}function l(n,e){return Object.keys(e).reduce((function(t,i){var l,s=t,f=s[a(i)],d=s[i],p=(0,o.Z)(s,[a(i),i].map(c)),m=e[i],v=u(d,f,n[m]),h=v[0],y=v[1];return(0,r.Z)({},p,((l={})[i]=h,l[m]=y,l))}),n)}t(23688)}}]);
//# sourceMappingURL=873.4652035b.chunk.js.map