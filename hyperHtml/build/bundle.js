!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){"use strict";var r=function(t){var e=document.defaultView,n=/^area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr$/i,r="ownerSVGElement",o="http://www.w3.org/2000/svg",i="connected",a="dis"+i,s=/^style|textarea$/i,u="_hyper: "+(Math.random()*new Date|0)+";",c="\x3c!--"+u+"--\x3e",l=e.Event;try{new l("Event")}catch(t){l=function(t){var e=document.createEvent("Event");return e.initEvent(t,!1,!1),e}}var d,h=e.Map||function(){var t=[],e=[];return{get:function(n){return e[t.indexOf(n)]},set:function(n,r){e[t.push(n)-1]=r}}},f=0,p=e.WeakMap||function(){var t=u+f++;return{get:function(e){return e[t]},set:function(e,n){Object.defineProperty(e,t,{configurable:!0,value:n})}}},y=e.WeakSet||function(){var t=new p;return{add:function(e){t.set(e,!0)},has:function(e){return!0===t.get(e)}}},m=Array.isArray||(d={}.toString,function(t){return"[object Array]"===d.call(t)}),v=u.trim||function(){return this.replace(/^\s+|\s+$/g,"")};function g(){return this}var b=function(t,e){var n="_"+t+"$";return{get:function(){return this[n]||w(this,n,e.call(this,t))},set:function(t){w(this,n,t)}}},w=function(t,e,n){return Object.defineProperty(t,e,{configurable:!0,value:"function"==typeof n?function(){return t._wire$=n.apply(this,arguments)}:n})[e]},_={},x=[],T=_.hasOwnProperty,E=0,N=function(t,e){for(var n=0;n<E;n++){var r=x[n];if(T.call(t,r))return _[r](t[r],e)}},M=function(t,e){return C(t).createElement(e)},C=function(t){return t.ownerDocument||t},D=function(t){return C(t).createDocumentFragment()},$=function(t,e){return C(t).createTextNode(e)},S=" \\f\\n\\r\\t",O="[^ "+S+"\\/>\"'=]+",A="[ "+S+"]+"+O,j="<([A-Za-z]+[A-Za-z0-9:_-]*)((?:",k="(?:=(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+O+"))?)",L=new RegExp(j+A+k+"+)([ "+S+"]*/?>)","g"),P=new RegExp(j+A+k+"*)([ "+S+"]*/>)","g"),F=D(document),H="append"in F,B="content"in M(document,"template");F.appendChild($(F,"g")),F.appendChild($(F,""));var G=1===F.cloneNode(!0).childNodes.length,R="importNode"in document,I=H?function(t,e){t.append.apply(t,e)}:function(t,e){for(var n=e.length,r=0;r<n;r++)t.appendChild(e[r])},K=new RegExp("("+A+"=)(['\"]?)"+c+"\\2","gi"),W=function(t,e,n,r){return"<"+e+n.replace(K,Y)+r},Y=function(t,e,n){return e+(n||'"')+u+(n||'"')},q=function(t,e){return(r in t?Q:X)(t,e.replace(L,W))},z=G?function(t){for(var e=t.cloneNode(),n=t.childNodes||[],r=n.length,o=0;o<r;o++)e.appendChild(z(n[o]));return e}:function(t){return t.cloneNode(!0)},J=R?function(t,e){return t.importNode(e,!0)}:function(t,e){return z(e)},Z=[].slice,V=function(t){return U(t)},U=function(t){if(t.propertyIsEnumerable("raw")||/Firefox\/(\d+)/.test((e.navigator||{}).userAgent)&&parseFloat(RegExp.$1)<55){var n={};U=function(t){var e="^"+t.join("^");return n[e]||(n[e]=t)}}else U=function(t){return t};return U(t)},X=B?function(t,e){var n=M(t,"template");return n.innerHTML=e,n.content}:function(t,e){var n=M(t,"template"),r=D(t);if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var o=RegExp.$1;n.innerHTML="<table>"+e+"</table>",I(r,Z.call(n.querySelectorAll(o)))}else n.innerHTML=e,I(r,Z.call(n.childNodes));return r},Q=B?function(t,e){var n=D(t),r=C(t).createElementNS(o,"svg");return r.innerHTML=e,I(n,Z.call(r.childNodes)),n}:function(t,e){var n=D(t),r=M(t,"div");return r.innerHTML='<svg xmlns="'+o+'">'+e+"</svg>",I(n,Z.call(r.firstChild.childNodes)),n};function tt(t){this.childNodes=t,this.length=t.length,this.first=t[0],this.last=t[this.length-1]}tt.prototype.insert=function(){var t=D(this.first);return I(t,this.childNodes),t},tt.prototype.remove=function(){var t=this.first,e=this.last;if(2===this.length)e.parentNode.removeChild(e);else{var n=C(t).createRange();n.setStartBefore(this.childNodes[1]),n.setEndAfter(e),n.deleteContents()}return t};var et=function(t,e,n){t.unshift(t.indexOf.call(e.childNodes,n))},nt=function(t,e,n){return{type:t,name:n,node:e,path:function(t){var e=[],n=void 0;switch(t.nodeType){case 1:case 11:n=t;break;case 8:n=t.parentNode,et(e,n,t);break;default:n=t.ownerElement}for(t=n;n=n.parentNode;t=n)et(e,n,t);return e}(e)}},rt=function(t,e){for(var n=e.length,r=0;r<n;r++)t=t.childNodes[e[r]];return t},ot=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,it=function(t,e){var n=void 0,r=void 0;return function(o){switch(typeof o){case"object":if(o){if("object"===n){if(!e&&r!==o)for(var i in r)i in o||(t[i]="")}else e?t.value="":t.cssText="";var a=e?{}:t;for(var s in o){var u=o[s];a[s]="number"!=typeof u||ot.test(s)?u:u+"px"}n="object",e?t.value=ut(r=a):r=o;break}default:r!=o&&(n="string",r=o,e?t.value=o||"":t.cssText=o||"")}}},at=/([^A-Z])([A-Z]+)/g,st=function(t,e,n){return e+"-"+n.toLowerCase()},ut=function(t){var e=[];for(var n in t)e.push(n.replace(at,st),":",t[n],";");return e.join("")},ct=function(t,e){return t==e},lt=function(t){return t},dt=function(t,e,n,r){if(null==r)e.removeChild(t(n,-1));else{var o=e.ownerDocument.createRange();o.setStartBefore(t(n,-1)),o.setEndAfter(t(r,-1)),o.deleteContents()}},ht=function(t,e,n,r){r||(r={});for(var o=r.compare||ct,i=r.node||lt,a=null==r.before?null:i(r.before,0),s=0,u=0,c=e.length-1,l=e[0],d=e[c],h=n.length-1,f=n[0],p=n[h];s<=c&&u<=h;)if(null==l)l=e[++s];else if(null==d)d=e[--c];else if(null==f)f=n[++u];else if(null==p)p=n[--h];else if(o(l,f))l=e[++s],f=n[++u];else if(o(d,p))d=e[--c],p=n[--h];else if(o(l,p))t.insertBefore(i(l,1),i(d,-0).nextSibling),l=e[++s],p=n[--h];else if(o(d,f))t.insertBefore(i(d,1),i(l,0)),d=e[--c],f=n[++u];else{var y=e.indexOf(f);if(y<0)t.insertBefore(i(f,1),i(l,0)),f=n[++u];else{for(var m=y,v=u;m<=c&&v<=h&&e[m]===n[v];)m++,v++;if(1<m-y)--y===s?t.removeChild(i(l,-1)):dt(i,t,l,e[y]),u=v,l=e[s=m],f=n[v];else{var g=e[y];e[y]=null,t.insertBefore(i(g,1),i(l,0)),f=n[++u]}}}if(s<=c||u<=h)if(c<s){var b=n[h+1],w=null==b?a:i(b,0);if(u===h)t.insertBefore(i(n[u],1),w);else{for(var _=t.ownerDocument.createDocumentFragment();u<=h;)_.appendChild(i(n[u++],1));t.insertBefore(_,w)}}else null==e[s]&&s++,s===c?t.removeChild(i(e[s],-1)):dt(i,t,e[s],e[c]);return n},ft=new y;function pt(){}pt.prototype=Object.create(null);var yt=function(t){return{html:t}},mt=function t(e,n){return"ELEMENT_NODE"in e?e:e.constructor===tt?1/n<0?n?e.remove():e.last:n?e.insert():e.first:t(e.render(),n)},vt=function(t,e,n){for(var r=new pt,o=t.attributes,i=Z.call(o),a=[],s=i.length,c=0;c<s;c++){var l=i[c];if(l.value===u){var d=l.name;if(!(d in r)){var h=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/,"$1");r[d]=o[h]||o[h.toLowerCase()],e.push(nt("attr",r[d],h))}a.push(l)}}for(var f=a.length,p=0;p<f;p++){var y=a[p];/^id$/i.test(y.name)?t.removeAttribute(y.name):t.removeAttributeNode(a[p])}var m=t.nodeName;if(/^script$/i.test(m)){for(var v=document.createElement(m),g=0;g<o.length;g++)v.setAttributeNode(o[g].cloneNode(!0));v.textContent=t.textContent,t.parentNode.replaceChild(v,t)}},gt=function(t,e){e(t.placeholder),"text"in t?Promise.resolve(t.text).then(String).then(e):"any"in t?Promise.resolve(t.any).then(e):"html"in t?Promise.resolve(t.html).then(yt).then(e):Promise.resolve(N(t,e)).then(e)},bt=function(t){return null!=t&&"then"in t},wt=function(t,e){var n={node:mt,before:t},r=!1,o=void 0;return function i(a){switch(typeof a){case"string":case"number":case"boolean":r?o!==a&&(o=a,e[0].textContent=a):(r=!0,o=a,e=ht(t.parentNode,e,[$(t,a)],n));break;case"object":case"undefined":if(null==a){r=!1,e=ht(t.parentNode,e,[],n);break}default:if(r=!1,m(o=a))if(0===a.length)e.length&&(e=ht(t.parentNode,e,[],n));else switch(typeof a[0]){case"string":case"number":case"boolean":i({html:a});break;case"object":if(m(a[0])&&(a=a.concat.apply([],a)),bt(a[0])){Promise.all(a).then(i);break}default:e=ht(t.parentNode,e,a,n)}else"ELEMENT_NODE"in(s=a)||s instanceof tt||s instanceof g?e=ht(t.parentNode,e,11===a.nodeType?Z.call(a.childNodes):[a],n):bt(a)?a.then(i):"placeholder"in a?gt(a,i):"text"in a?i(String(a.text)):"any"in a?i(a.any):"html"in a?e=ht(t.parentNode,e,Z.call(q(t,[].concat(a.html).join("")).childNodes),n):i("length"in a?Z.call(a):N(a,i))}var s}},_t=function(t,e,n){var o=r in t,s=void 0;if("style"===e)return function(t,e,n){if(n){var r=e.cloneNode(!0);return r.value="",t.setAttributeNode(r),it(r,n)}return it(t.style,n)}(t,n,o);if(/^on/.test(e)){var u=e.slice(2);return u===i||u===a?(Et&&(Et=!1,function(){var t=function(t,n){for(var r=new l(n),o=t.length,i=0;i<o;i++){var a=t[i];1===a.nodeType&&e(a,r)}},e=function t(e,n){ft.has(e)&&e.dispatchEvent(n);for(var r=e.children||function(t){for(var e=[],n=t.childNodes,r=n.length,o=0;o<r;o++)1===n[o].nodeType&&e.push(n[o]);return e}(e),o=r.length,i=0;i<o;i++)t(r[i],n)};try{new MutationObserver(function(e){for(var n=e.length,r=0;r<n;r++){var o=e[r];t(o.removedNodes,a),t(o.addedNodes,i)}}).observe(document,{subtree:!0,childList:!0})}catch(e){document.addEventListener("DOMNodeRemoved",function(e){t([e.target],a)},!1),document.addEventListener("DOMNodeInserted",function(e){t([e.target],i)},!1)}}()),ft.add(t)):e.toLowerCase()in t&&(u=u.toLowerCase()),function(e){s!==e&&(s&&t.removeEventListener(u,s,!1),(s=e)&&t.addEventListener(u,e,!1))}}if("data"===e||!o&&e in t)return function(n){s!==n&&(s=n,t[e]!==n&&null==(t[e]=n)&&t.removeAttribute(e))};var c=!1,d=n.cloneNode(!0);return function(e){s!==e&&(s=e,d.value!==e&&(null==e?(c&&(c=!1,t.removeAttributeNode(d)),d.value=e):(d.value=e,c||(c=!0,t.setAttributeNode(d)))))}},xt=function(t){var e=void 0;return function n(r){e!==r&&("object"==typeof(e=r)&&r?bt(r)?r.then(n):"placeholder"in r?gt(r,n):n("text"in r?String(r.text):"any"in r?r.any:"html"in r?[].concat(r.html).join(""):"length"in r?Z.call(r).join(""):N(r,n)):t.textContent=null==r?"":r)}},Tt={create:function(t,e){for(var n=[],r=e.length,o=0;o<r;o++){var i=e[o],a=rt(t,i.path);switch(i.type){case"any":n.push(wt(a,[]));break;case"attr":n.push(_t(a,i.name,i.node));break;case"text":n.push(xt(a)),a.textContent=""}}return n},find:function t(e,n,r){for(var o=e.childNodes,i=o.length,a=0;a<i;a++){var l=o[a];switch(l.nodeType){case 1:vt(l,n,r),t(l,n,r);break;case 8:l.textContent===u&&(r.shift(),n.push(s.test(e.nodeName)?nt("text",e):nt("any",l)));break;case 3:s.test(e.nodeName)&&v.call(l.textContent)===c&&(r.shift(),n.push(nt("text",e)))}}}},Et=!0,Nt=new p,Mt=function(){try{var t=new p,e=Object.freeze([]);if(t.set(e,!0),!t.get(e))throw e;return t}catch(e){return new h}}();function Ct(t){var e=Nt.get(this);return e&&e.template===V(t)?Dt.apply(e.updates,arguments):function(t){t=V(t);var e=Mt.get(t)||function(t){var e=[],n=t.join(c).replace(jt,kt),r=q(this,n);Tt.find(r,e,t.slice());var o={fragment:r,paths:e};return Mt.set(t,o),o}.call(this,t),n=J(this.ownerDocument,e.fragment),r=Tt.create(n,e.paths);Nt.set(this,{template:t,updates:r}),Dt.apply(r,arguments),this.textContent="",this.appendChild(n)}.apply(this,arguments),this}function Dt(){for(var t=arguments.length,e=1;e<t;e++)this[e-1](arguments[e])}var $t,St,Ot,At,jt=P,kt=function(t,e,r){return n.test(e)?t:"<"+e+r+"></"+e+">"},Lt=new p,Pt=function(t){var e=void 0,n=void 0,r=void 0,i=void 0,a=void 0;return function(s){s=V(s);var u=i!==s;return u&&(i=s,r=D(document),n="svg"===t?document.createElementNS(o,"svg"):r,a=Ct.bind(n)),a.apply(null,arguments),u&&("svg"===t&&I(r,Z.call(n.childNodes)),e=Ht(r)),e}},Ft=function(t,e){var n=e.indexOf(":"),r=Lt.get(t),o=e;return-1<n&&(o=e.slice(n+1),e=e.slice(0,n)||"html"),r||Lt.set(t,r={}),r[o]||(r[o]=Pt(e))},Ht=function(t){for(var e=t.childNodes,n=e.length,r=[],o=0;o<n;o++){var i=e[o];1!==i.nodeType&&0===v.call(i.textContent).length||r.push(i)}return 1===r.length?r[0]:new tt(r)},Bt=function(t,e){t in _||(E=x.push(t)),_[t]=e};function Gt(t){return arguments.length<2?null==t?Pt("html"):"string"==typeof t?Gt.wire(null,t):"raw"in t?Pt("html")(t):"nodeType"in t?Gt.bind(t):Ft(t,"html"):("raw"in t?Pt("html"):Gt.wire).apply(null,arguments)}return Gt.Component=g,Gt.bind=function(t){return Ct.bind(t)},Gt.define=Bt,Gt.diff=ht,(Gt.hyper=Gt).wire=function(t,e){return null==t?Pt(e||"html"):Ft(t,e||"html")},$t=Pt,St=new p,Ot=Object.create,At=function(t,e){var n={w:null,p:null};return e.set(t,n),n},Object.defineProperties(g,{for:{configurable:!0,value:function(t,e){return function(t,e,n,r){var o,i,a,s=e.get(t)||At(t,e);switch(typeof r){case"object":case"function":var u=s.w||(s.w=new p);return u.get(r)||(o=u,i=r,a=new t(n),o.set(i,a),a);default:var c=s.p||(s.p=Ot(null));return c[r]||(c[r]=new t(n))}}(this,St.get(t)||(n=t,r=new h,St.set(n,r),r),t,null==e?"default":e);var n,r}}}),Object.defineProperties(g.prototype,{handleEvent:{value:function(t){var e=t.currentTarget;this["getAttribute"in e&&e.getAttribute("data-call")||"on"+t.type](t)}},html:b("html",$t),svg:b("svg",$t),state:b("state",function(){return this.defaultState}),defaultState:{get:function(){return{}}},dispatch:{value:function(t,e){var n=this._wire$;if(n){var r=new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:e});return r.component=this,(n.dispatchEvent?n:n.childNodes[0]).dispatchEvent(r)}return!1}},setState:{value:function(t,e){var n=this.state,r="function"==typeof t?t.call(this,n):t;for(var o in r)n[o]=r[o];return!1!==e&&this.render(),this}}}),Gt}(window);e.a=r;const{Component:o,bind:i,define:a,diff:s,hyper:u,wire:c}=r},function(t,e,n){"use strict";function*r(t,e=0,n=1){for(let r=e;r<t;r+=n)yield r}e.a=r,e.b=function(t,e){const n=t.length;return Array.from(r(n)).map(r=>t[(r+e)%n])}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=n(3);console.log(">>>",r.a),r["a"].bind(document.getElementById("root"))`${new o.a}`,window.__supportsNewJS__=!0},function(t,e,n){"use strict";var r=n(4),o=(n(1),n(9)),i=n(0);const{wire:a,Component:s}=i.a;class u extends s{constructor(){super(),this.state={time:0}}showTime(t){this.setState({time:t})}render(){return this.html`<div key="time-display" id="time-display">${this.state.time>0?`${this.state.time.toFixed(2)} milliseconds`:""}</div>`}}e.a=class extends s{constructor(){super(),this.state={count:1,time:0},this.handleClick=this.handleClick.bind(this),this.showTime=this.showTime.bind(this),this.calendars_=[],this.timeDisplay_=new u,new o.a(document.querySelector("h3"))}handleClick(t){const e=window.performance.now();this.setState({count:Number.parseInt(t.target.value,10)}),setTimeout(()=>this.showTime(window.performance.now()-e),1)}showTime(t){document.dispatchEvent(new CustomEvent("log-time",{detail:t})),this.timeDisplay_.showTime(t)}render(){const t=[0,1,2,3,5,10,50,100].map(t=>this.renderButton(t));for(this.state.time>0&&this.state.time.toFixed(2);this.calendars_.length<this.state.count;)this.calendars_.push(new r.a(this.showTime));for(;this.calendars_.length>this.state.count;)this.calendars_.pop();return this.html`
        <div key="test-buttons" id="test-buttons">
          ${t}
          ${this.timeDisplay_}
        </div>
        ${this.calendars_.slice()}
        `}renderButton(t){return a(this,`:test-button-${t}`)`
        <button onClick=${this.handleClick}
                value=${t}
                title=${`Display ${t} calendars`} >
          ${String(t)}
        </button>`}}},function(t,e,n){"use strict";var r=n(5),o=n(6),i=n(7),a=n(8),s=n(1),u=n(0);const{wire:c,Component:l}=u.a;e.a=class extends l{constructor(t){super(),this.showTime_=t,this.today=this.getToday(),this.holidays=new o.a(i.a),this.state={year:this.today.year},this.handleClick=this.handleClick.bind(this)}handleClick(t){const e=window.performance.now(),n="next-year"===t.target.dataset.handler?1:-1;this.setState(t=>({year:t.year+n})),setTimeout(()=>this.showTime_(window.performance.now()-e),1)}render(){return this.html`${this.renderToday()}${this.renderYear()}`}renderToday(){const t=[a.b[this.today.day],a.a[this.today.month],String(this.today.date)].join(" ");return c(this,":today")`
      <header>
        <span data-handler="previous-year" onClick=${this.handleClick}>
          <i class="material-icons">chevron_left</i>
        </span>
        <h1>${t}</h1>
        <span data-handler="next-year" onClick=${this.handleClick}>
          <i class="material-icons">chevron_right</i>
        </span>
      </header>
    `}renderYear(){return c(this,":year")`<section>${Array.from(Object(s.a)(12)).map(t=>this.renderMonth(t))}</section>`}renderMonth(t){const e=Object(r.a)(this.state.year,t),n=Object(s.b)(a.c,1).map(e=>c(this,`:${t}-wday-${e}`)`<th>${e}</th>`),o=e.map((e,n)=>this.renderWeek(t,e,n)),i=this.renderHolidays(t);return c(this,`:month-${t}`)`
        <table>
          <caption>
            <span class='month-name'>${a.a[t]}</span>
            <span class="year-number">${String(this.state.year)}</span>
          </caption>
          <thead>
            <tr>
              <th>Week</th>
              ${n}
            </tr>
          </thead>
          <tbody>${o}</tbody>
          <tfoot>
            <tr>
              <td colSpan="8">${i}</td>
            </tr>
          </tfoot>
        </table>
        `}renderWeek(t,e,n){const[r,o]=e;return c(this,`:${t}-week-${n}`)`
        <tr>
          <td>
            <span class="week-number">${r}</span>
          </td>
          ${o.map((e,r)=>{const o=this.today.year===this.state.year&&this.today.month===t&&this.today.date===e,i=6===r||this.holidays.isHoliday(this.state.year,t,e);return c(this,`:${t}-week-day-${n}-${r}`)`
          <td class="${`${o?"today":""} ${i?"holiday":""}`.trim()}">${e>0?e:""}</td>
          `})}
        </tr>
        `}renderHolidays(t){const e=this.holidays.getHolidays(this.state.year,t);return 0===e.length?null:c(this,`:holiday-list-${t}`)`
        <ul class="holidays">${e.map(([t,e])=>`<li>${t}. ${e}</li>`)}</ul>
        `}getToday(){const t=new Date;return{year:t.getFullYear(),month:t.getMonth(),date:t.getDate(),day:t.getDay()}}}},function(t,e,n){"use strict";function r(t){const e=new Date(t.getFullYear(),t.getMonth(),t.getDate());e.setDate(e.getDate()+3-(e.getDay()+6)%7);const n=new Date(e.getFullYear(),0,4);return 1+Math.round((e.getTime()-n.getTime())/6048e5)}e.a=function(t,e,n=!0){let o=1;const i=new Date(t,e,o);let a=(i.getDay()+(n?6:0))%7,s=28;for(;i.setDate(s+1),i.getMonth()===e;)s++;const u=[];let c=[];for(;a-- >0;)c.push(0);i.setYear(t),i.setMonth(e);for(;o<=s;)i.setDate(o),console.assert(i.getMonth()===e),c.push(o++),7===c.length&&(u.push([r(i),c]),c=[]);if(c.length){for(;c.length<7;)c.push(0);u.push([r(i),c])}return u}},function(t,e,n){"use strict";e.a=class{constructor(t){this.holidays_=new Map(t.map(([t,e])=>{const[n,r,o]=t.split(".").map(t=>"yyyy"===t?0:Number.parseInt(t,10));return[this.toKey_(o,r-1,n),e]}))}isHoliday(t,e,n){return this.holidays_.has(this.toKey_(t,e,n))||this.holidays_.has(this.toKey_(0,e,n))}getHolidays(t,e){const n=[];for(const[r,o]of this.holidays_){const[i,a,s]=this.fromKey_(r);i!==t&&0!==i||a!==e||n.push([s,o])}return n.sort((t,e)=>t[0]-e[0])}toKey_(t,e,n){return t<<9|e<<5|n}fromKey_(t){return[t>>9,t>>5&15,31&t]}}},function(t,e,n){"use strict";e.a=[["01.01.yyyy","New Year's Day"],["01.05.yyyy","Labor Day"],["17.05.yyyy","Constitution Day"],["25.12.yyyy","Christmas Day"],["26.12.yyyy","Second Day of Christmas"],["21.04.2011","Maundy Thursday"],["22.04.2011","Good Friday"],["25.04.2011","Easter Monday"],["02.06.2011","Ascension Day"],["14.06.2011","Pentecost Monday"],["05.04.2012","Maundy Thursday"],["06.04.2012","Good Friday"],["09.04.2012","Easter Monday"],["17.05.2012","Ascension Day"],["28.05.2012","Pentecost Monday"],["28.03.2013","Maundy Thursday"],["29.03.2013","Good Friday"],["01.04.2013","Easter Monday"],["09.05.2013","Ascension Day"],["20.05.2013","Pentecost Monday"],["17.04.2014","Maundy Thursday"],["18.04.2014","Good Friday"],["21.04.2014","Easter Monday"],["29.05.2014","Ascension Day"],["09.06.2014","Pentecost Monday"],["02.04.2015","Maundy Thursday"],["03.04.2015","Good Friday"],["06.04.2015","Easter Monday"],["14.05.2015","Ascension Day"],["25.05.2015","Pentecost Monday"],["24.03.2016","Maundy Thursday"],["25.03.2016","Good Friday"],["28.03.2016","Easter Monday"],["05.05.2016","Ascension Day"],["16.05.2016","Pentecost Monday"],["13.04.2017","Maundy Thursday"],["14.04.2017","Good Friday"],["17.04.2017","Easter Monday"],["25.05.2017","Ascension Day"],["05.06.2017","Pentecost Monday"],["29.03.2018","Maundy Thursday"],["30.03.2018","Good Friday"],["02.04.2018","Easter Monday"],["10.05.2018","Ascension Day"],["21.05.2018","Pentecost Monday"],["18.04.2019","Maundy Thursday"],["19.04.2019","Good Friday"],["22.04.2019","Easter Monday"],["30.05.2019","Ascension Day"],["10.06.2019","Pentecost Monday"],["09.04.2020","Maundy Thursday"],["10.04.2020","Good Friday"],["13.04.2020","Easter Monday"],["21.05.2020","Ascension Day"],["01.06.2020","Pentecost Monday"]]},function(t,e,n){"use strict";e.c=["Su","Mo","Tu","We","Th","Fr","Sa"];e.b=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];e.a=["January","February","March","April","May","June","July","August","September","October","November","December"]},function(t,e,n){"use strict";var r=n(10),o=(n.n(r),n(1));const i=4,a=5,s=6,u=9,c=4,l={1:"Update single component",2:"Create new view",3:"Update composite view",[c]:"Total"},d=new Map([[1,{selector:'[data-handler="next-year"]',type:1}],[2,{selector:'[data-handler="previous-year"]',type:1}],[i,{selector:'button[value="0"]'}],[3,{selector:'button[value="10"]',type:2}],[a,{selector:'button[value="1"]'}],[s,{selector:'button[value="5"]'}],[7,{selector:'[data-handler="next-year"]',type:3}],[8,{selector:'[data-handler="previous-year"]',type:3}],[u,{profile:!0}]]),h=[[u],...Array.from(Object(o.a)(5)).map(()=>[1,1,1,2,2,2,2,2,2,1,1,1]),[u],...Array.from(Object(o.a)(20)).map(()=>[i,3]),[u],[i,s],...Array.from(Object(o.a)(5)).map(()=>[7,7,7,8,8,8,8,8,8,7,7,7]),[i,a],[u]].reduce((t,e)=>(t.push(...e),t)),f=[1,2,3],p=10;class y{constructor(t,e,n,r=1){this.labelId=t,this.time=e,this.average=n,this.count=r}}class m{constructor(t){this.libLabelElement_=t,t.addEventListener("click",t=>this.start()),this.tests_=null,this.pointer_=0,this.results_=null,this.handleLogTime=this.handleLogTime.bind(this),this.tiemstamps_=[],this.count_=0,document.addEventListener("keydown",t=>{t.altKey&&"t"===t.key&&(t.preventDefault(),this.start(p))})}start(t=1){this.count_>0||(this.count_=t,this.results_=[],this.start_())}start_(){this.closeDialog_(),this.tiemstamps_=[],this.tests_=h,this.pointer_=0,document.addEventListener("log-time",this.handleLogTime),this.startTest_()}startTest_(){if(this.pointer_<this.tests_.length){const t=d.get(this.tests_[this.pointer_]);if(!0===t.profile)this.handleLogTime();else{document.querySelector(t.selector).dispatchEvent(new Event("click",{bubbles:!0}))}}else{document.removeEventListener("log-time",this.handleLogTime);const t=[];for(let e=0;e<this.tiemstamps_.length-1;e++){const n=h.filter(t=>d.get(t).type===f[e]).length,r=this.tiemstamps_[e+1]-this.tiemstamps_[e];t.push(new y(f[e],r,r/n,n))}const e=this.tiemstamps_[this.tiemstamps_.length-1]-this.tiemstamps_[0];t.push(new y(c,e,e)),this.results_.push(t),this.count_--,this.count_>0?setTimeout(()=>this.start_(),500):this.showResults()}}showResults(){this.closeDialog_();const t=this.results_[0];if(this.results_.length>1)for(let e=0;e<t.length;e++){const n=this.results_.reduce((t,n)=>t+=n[e].time,0)/this.results_.length,r=(this.results_.reduce((t,r)=>t+=(r[e].time-n)**2,0)/this.results_.length)**.5;t[e].time=n,t[e].value=`${n.toFixed(1)} ±${r.toFixed(1)}`,t[e].count=`${this.results_.length} * ${t[e].count}`}Object(r.render)(m.Templates.resultDialog(t),document.body).querySelector(".close-button").addEventListener("click",()=>this.closeDialog_())}closeDialog_(){const t=document.querySelector("#result-dialog");null!==t&&t.remove()}handleLogTime(t){!0===d.get(this.tests_[this.pointer_]).profile&&this.tiemstamps_.push(Date.now()),this.pointer_++,document.body.offsetHeight,this.startTest_()}}m.Templates=class{static resultDialog(t){return["div",{id:"result-dialog"},["div",{class:"close-button"},"x"],["table",["thead",["tr",["th"],["th","Iterations"],["th","Average time per iteration in ms"],["th","Total time in ms"]]],["tbody",...t.map(t=>{const e=1===t.count;return["tr",["td",l[t.labelId]],["td",e?"":String(t.count)],["td",e?"":t.average.toFixed(1)],["td",String(Math.round(t.time))]]})]],["style","\n            #result-dialog {\n              background-color: hsla(0, 0%, 0%, .7);\n              background-color: white;\n              border: 1px solid hsla(0, 0%, 100%, .7);\n              border: 1px solid hsla(0, 0%, 0%, .7);\n              font-size: 12px;\n              left: 10px;\n              padding: 5px 10px;\n              position: fixed;\n              top: 58px;\n              color: black;\n            }\n\n            #result-dialog table {\n              clear: both;\n            }\n\n            #result-dialog th,\n            #result-dialog td {\n              vertical-align: bottom;\n              padding: 0 5px;\n            }\n\n            #result-dialog .close-button {\n              cursor: pointer;\n              float: right;\n              height: 20px;\n              line-height: 20px;\n              text-align: center;\n              padding: 0 5px;\n              margin-right: -5px;\n            }\n            "]]}},e.a=m},function(t,e,n){"use strict";(function(e){"production"===e.env.NODE_ENV?t.exports=n(12):t.exports=n(13)}).call(e,n(11))},function(t,e){var n,r,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(t){if(n===setTimeout)return setTimeout(t,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(t){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(t){r=a}}();var u,c=[],l=!1,d=-1;function h(){l&&u&&(l=!1,u.length?c=u.concat(c):d=-1,c.length&&f())}function f(){if(!l){var t=s(h);l=!0;for(var e=c.length;e;){for(u=c,c=[];++d<e;)u&&u[d].run();d=-1,e=c.length}u=null,l=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function y(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];c.push(new p(t,e)),1!==c.length||l||s(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=y,o.addListener=y,o.once=y,o.off=y,o.removeListener=y,o.removeAllListeners=y,o.emit=y,o.prependListener=y,o.prependOnceListener=y,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(t,e){t.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o={svg:"http://www.w3.org/2000/svg"},i=Function.prototype.call.bind(Object.prototype.toString),a=function(t){return"string"===(void 0===t?"undefined":r(t))},s=function(t){return"#text"===t},u=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=e[0],u=null,c=0;if(a(r)&&!s(r)){if(c++,r.includes(":")){var l=r.indexOf(":");n=o[r.slice(0,l)],u=document.createElementNS(n,r.slice(l+1))}else u=document.createElement(r);var d=e[1];if("[object Object]"===i(d))for(var h in c++,d){var f=d[h];a(f)&&u.setAttribute(h,f)}}else s(r)&&c++,u=document.createDocumentFragment();for(;c<e.length;c++){var p=e[c];a(p)?u.appendChild(document.createTextNode(p)):p&&u.appendChild(t(p),n)}return u},c=function(t,e){return e.appendChild(u(t))};e.NAMESPACES=o,e.TEXT_NODE_NAME="#text",e.createDom=u,e.render=c,e.renderClean=function(t,e){return e.textContent="",c(t,e)}}])},function(t,e){t.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o={svg:"http://www.w3.org/2000/svg"},i=Function.prototype.call.bind(Object.prototype.toString),a=function(t){return"string"===(void 0===t?"undefined":r(t))},s=function(t){return"#text"===t},u=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=e[0],u=null,c=0;if(a(r)&&!s(r)){if(c++,r.includes(":")){var l=r.indexOf(":");n=o[r.slice(0,l)],u=document.createElementNS(n,r.slice(l+1))}else u=document.createElement(r);var d=e[1];if("[object Object]"===i(d))for(var h in c++,d){var f=d[h];a(f)&&u.setAttribute(h,f)}}else s(r)&&c++,u=document.createDocumentFragment();for(;c<e.length;c++){var p=e[c];a(p)?u.appendChild(document.createTextNode(p)):p&&u.appendChild(t(p),n)}return u},c=function(t,e){return e.appendChild(u(t))};e.NAMESPACES=o,e.TEXT_NODE_NAME="#text",e.createDom=u,e.render=c,e.renderClean=function(t,e){return e.textContent="",c(t,e)}}])}]);