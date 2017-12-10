!function(t){function e(s){if(n[s])return n[s].exports;var a=n[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,s){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(t,e,n){"use strict";class s{static get TEXT_NODE_NAME(){return"#text"}static get NAMESPACES(){return{svg:"http://www.w3.org/2000/svg"}}static createTemplate(t,e=""){const n=t[0];let a=null,o=0;if("string"==typeof n&&n!==s.TEXT_NODE_NAME){if(o++,n.includes(":")){const t=n.indexOf(":");e=s.NAMESPACES[n.slice(0,t)],a=document.createElementNS(e,n.slice(t+1))}else a=document.createElement(n);if("[object Object]"===Object.prototype.toString.call(t[1])){o++;var r=t[1];if(r)for(var i in r)"string"==typeof r[i]&&a.setAttribute(i,r[i])}}else n===s.TEXT_NODE_NAME&&o++,a=document.createDocumentFragment();for(;o<t.length;o++)"string"==typeof t[o]?a.appendChild(document.createTextNode(t[o])):t[o]&&a.appendChild(this.createTemplate(t[o]),e);return a}}DocumentFragment.prototype.appendTemplate=Element.prototype.appendTemplate=function(t){return this.appendChild(s.createTemplate(t))},DocumentFragment.prototype.cleanAppendTemplate=Element.prototype.cleanAppendTemplate=function(t){return this.textContent="",this.appendTemplate(t)},e.a=s},function(t,e,n){"use strict";function*s(t,e=0,n=1){for(let s=e;s<t;s+=n)yield s}e.a=s,e.b=function(t,e){const n=t.length;return Array.from(s(n)).map(s=>t[(s+e)%n])}},function(t,e,n){"use strict";e.a=class{constructor(t){this.holidays_=new Map(t.map(([t,e])=>{const[n,s,a]=t.split(".").map(t=>"yyyy"===t?0:Number.parseInt(t,10));return[this.toKey_(a,s-1,n),e]}))}isHoliday(t,e,n){return this.holidays_.has(this.toKey_(t,e,n))||this.holidays_.has(this.toKey_(0,e,n))}getHolidays(t,e){const n=[];for(const[s,a]of this.holidays_){const[o,r,i]=this.fromKey_(s);o!==t&&0!==o||r!==e||n.push([i,a])}return n.sort((t,e)=>t[0]-e[0])}toKey_(t,e,n){return t<<9|e<<5|n}fromKey_(t){return[t>>9,t>>5&15,31&t]}}},function(t,e,n){"use strict";e.a=[["01.01.yyyy","New Year's Day"],["01.05.yyyy","Labor Day"],["17.05.yyyy","Constitution Day"],["25.12.yyyy","Christmas Day"],["26.12.yyyy","Second Day of Christmas"],["21.04.2011","Maundy Thursday"],["22.04.2011","Good Friday"],["25.04.2011","Easter Monday"],["02.06.2011","Ascension Day"],["14.06.2011","Pentecost Monday"],["05.04.2012","Maundy Thursday"],["06.04.2012","Good Friday"],["09.04.2012","Easter Monday"],["17.05.2012","Ascension Day"],["28.05.2012","Pentecost Monday"],["28.03.2013","Maundy Thursday"],["29.03.2013","Good Friday"],["01.04.2013","Easter Monday"],["09.05.2013","Ascension Day"],["20.05.2013","Pentecost Monday"],["17.04.2014","Maundy Thursday"],["18.04.2014","Good Friday"],["21.04.2014","Easter Monday"],["29.05.2014","Ascension Day"],["09.06.2014","Pentecost Monday"],["02.04.2015","Maundy Thursday"],["03.04.2015","Good Friday"],["06.04.2015","Easter Monday"],["14.05.2015","Ascension Day"],["25.05.2015","Pentecost Monday"],["24.03.2016","Maundy Thursday"],["25.03.2016","Good Friday"],["28.03.2016","Easter Monday"],["05.05.2016","Ascension Day"],["16.05.2016","Pentecost Monday"],["13.04.2017","Maundy Thursday"],["14.04.2017","Good Friday"],["17.04.2017","Easter Monday"],["25.05.2017","Ascension Day"],["05.06.2017","Pentecost Monday"],["29.03.2018","Maundy Thursday"],["30.03.2018","Good Friday"],["02.04.2018","Easter Monday"],["10.05.2018","Ascension Day"],["21.05.2018","Pentecost Monday"],["18.04.2019","Maundy Thursday"],["19.04.2019","Good Friday"],["22.04.2019","Easter Monday"],["30.05.2019","Ascension Day"],["10.06.2019","Pentecost Monday"],["09.04.2020","Maundy Thursday"],["10.04.2020","Good Friday"],["13.04.2020","Easter Monday"],["21.05.2020","Ascension Day"],["01.06.2020","Pentecost Monday"]]},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(5);window.addEventListener("load",()=>{(new s.a).render(document.body),window.__supportsNewJS__=!0})},function(t,e,n){"use strict";n(0);var s=n(6),a=n(2),o=n(3),r=n(1),i=n(8);class l{constructor(){this.container_=null,this.timeDisplay_=null,this.holidays_=new a.a(o.a),document.addEventListener("display-time",t=>this.displayTime_(t.detail)),new i.a(document.querySelector("h3"))}render(t){this.container_=t,this.container_.appendTemplate(l.Templates.testButtons()),this.timeDisplay_=this.container_.querySelector("#time-display"),this.container_.querySelector("#test-buttons").addEventListener("click",t=>{const e=t.target;if("button"===e.nodeName.toLowerCase()){const t=window.performance.now();this.displayCalendars_(Number.parseInt(e.value,10)),setTimeout(()=>this.displayTime_(window.performance.now()-t),1)}}),this.displayCalendars_(1)}displayCalendars_(t){Array.from(this.container_.querySelectorAll(".calendar")).forEach(t=>t.remove()),Array.from(Object(r.a)(t)).forEach(()=>this.container_.appendChild(new s.a(this.holidays_).getElement()))}displayTime_(t){document.dispatchEvent(new CustomEvent("log-time",{detail:t})),this.timeDisplay_.textContent=t>0?`${t.toFixed(2)} milliseconds`:""}}l.Templates=class{static testButton(t){return["button",{value:String(t),title:`Display ${t} calendars`},`${t}`]}static testButtons(){return["div",{id:"test-buttons"},[0,1,2,3,5,10,50,100].map(t=>this.testButton(t)),["div",{id:"time-display"}]]}},e.a=l},function(t,e,n){"use strict";var s=n(0),a=n(1),o=n(7);n(2),n(3);class r{static get WEEK_DAYS_SHORT(){return["Su","Mo","Tu","We","Th","Fr","Sa"]}static get WEEK_DAYS_LONG(){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]}static get MONTH_NAMES(){return["January","February","March","April","May","June","July","August","September","October","November","December"]}static getToday(){const t=new Date;return{year:t.getFullYear(),month:t.getMonth(),date:t.getDate(),day:t.getDay()}}constructor(t){this.holidays_=t,this.today_=r.getToday(),this.year_=this.today_.year,this.element_=null}getElement(){return null===this.element_&&(this.element_=s.a.createTemplate(r.Templates.calendar(this.year_,this.today_,this.holidays_)),this.element_.addEventListener("click",t=>{const e=window.performance.now(),n=t.target.closest("[data-handler]");if(null!==n){const t="next-year"===n.dataset.handler?1:-1;this.year+=t,this.updateView_()}setTimeout(()=>document.dispatchEvent(new CustomEvent("display-time",{detail:window.performance.now()-e})),1)})),this.element_}get year(){return this.year_}set year(t){this.year_=t}updateView_(){null!==this.element_&&(this.element_.querySelector("section").remove(),this.element_.appendTemplate(r.Templates.year(this.year_,this.today_,this.holidays_)))}}r.Templates=class{static calendar(t,e,n){return["div",{class:"calendar"},this.today(e),this.year(t,e,n)]}static today(t){return["header",["span",{"data-handler":"previous-year"},"<"],["h1",`${r.WEEK_DAYS_LONG[t.day]}`+` ${r.MONTH_NAMES[t.month]} ${t.date}`],["span",{"data-handler":"next-year"},">"]]}static year(t,e,n){return["section",...Array.from(Object(a.a)(12)).map(s=>this.month(t,s,e,n))]}static month(t,e,n,s,i=!0){const l=Object(o.a)(t,e),d=["table"];d.push(["caption",["span",{class:"month-name"},r.MONTH_NAMES[e]],["span",{class:"year-number"},String(t)]]);const c=[];i&&c.push(["th","Week"]);const u=Object(a.b)(r.WEEK_DAYS_SHORT,1);return c.push(...u.map(t=>["th",t])),d.push(["thead",["tr",...c]]),d.push(["tbody",...l.map(a=>this.week(t,e,a,n,s))]),d.push(this.holidays(t,e,s)),d}static week(t,e,n,s,a,o=!0){const[r,i]=n,l=["tr"];return o&&l.push(["td",["span",{class:"week-number"},String(r)]]),l.push(...i.map((n,o)=>{const r=s.year===t&&s.month===e&&s.date===n,i=6===o||a.isHoliday(t,e,n);return["td",{class:`${r?"today":""} ${i?"holiday":""}`.trim()},n>0?String(n):""]})),l}static holidays(t,e,n,s=!0){const a=n.getHolidays(t,e);return 0===a.length?[]:["tfoot",["tr",["td",{colspan:s?"8":"7"},["ul",{class:"holidays"},...a.map(([t,e])=>["li",`${t}. ${e}`])]]]]}},e.a=r},function(t,e,n){"use strict";function s(t){const e=new Date(t.getFullYear(),t.getMonth(),t.getDate());e.setDate(e.getDate()+3-(e.getDay()+6)%7);const n=new Date(e.getFullYear(),0,4);return 1+Math.round((e.getTime()-n.getTime())/6048e5)}e.a=function(t,e,n=!0){let a=1;const o=new Date(t,e,a);let r=(o.getDay()+(n?6:0))%7,i=28;for(;o.setDate(i+1),o.getMonth()===e;)i++;const l=[];let d=[];for(;r-- >0;)d.push(0);for(o.setYear(t),o.setMonth(e);a<=i;)o.setDate(a),console.assert(o.getMonth()===e),d.push(a++),7===d.length&&(l.push([s(o),d]),d=[]);if(d.length){for(;d.length<7;)d.push(0);l.push([s(o),d])}return l}},function(t,e,n){"use strict";n(0);var s=n(1);const a=4,o=5,r={1:"Update single componenet",3:"Test clear view",2:"Create new view"},i=new Map([[1,{selector:'[data-handler="next-year"]',type:1}],[2,{selector:'[data-handler="previous-year"]',type:1}],[a,{selector:'button[value="0"]',ignore:!0}],[3,{selector:'button[value="10"]',type:2}],[o,{selector:'button[value="1"]',ignore:!0}]]),l=[...Array.from(Object(s.a)(5)).map(()=>[1,1,1,2,2,2,2,2,2,2,2,1,1,1]),...Array.from(Object(s.a)(20)).map(()=>[a,3]),[a,o]].reduce((t,e)=>(t.push(...e),t));class d{constructor(t){this.libLabelElement_=t,t.addEventListener("click",t=>this.start()),this.tests_=null,this.pointer_=0,this.results_=null,this.handleLogTime=this.handleLogTime.bind(this)}start(){this.tests_=l,this.pointer_=0,this.results_=new Map,document.addEventListener("log-time",this.handleLogTime),requestAnimationFrame(()=>this.startTest_())}startTest_(){if(this.pointer_<this.tests_.length){const t=i.get(this.tests_[this.pointer_]),e=document.querySelector(t.selector);requestAnimationFrame(()=>e.dispatchEvent(new Event("click",{bubbles:!0})))}else{document.removeEventListener("log-time",this.handleLogTime);const t=[];for(const[e,n]of this.results_){const s=n.reduce((t,e)=>t+e);t.push({label:r[e],time:Math.round(s/n.length)})}this.showResults(t)}}showResults(t){this.closeDialog_();document.body.appendTemplate(d.Templates.resultDialog(t)).querySelector(".close-button").addEventListener("click",()=>this.closeDialog_())}closeDialog_(){const t=document.querySelector("#result-dialog");null!==t&&t.remove()}handleLogTime(t){const e=i.get(this.tests_[this.pointer_]);if(!0!==e.ignore){const n=e.type;this.results_.has(n)||this.results_.set(n,[]),this.results_.get(n).push(t.detail)}this.pointer_++,this.startTest_()}}d.Templates=class{static resultDialog(t){return["div",{id:"result-dialog"},["div",{class:"close-button"},"x"],["ul",...t.map(t=>["li",`${t.label}: ${t.time}ms`])],["style","\n            #result-dialog {\n              background-color: hsla(0, 0%, 0%, .3);\n              border: 1px solid hsla(0, 0%, 100%, .7);\n              font-size: 16px;\n              left: 10px;\n              padding: 5px 10px;\n              position: fixed;\n              top: 100px;\n            }\n\n            #result-dialog ul {\n              clear: both;\n              list-style: none;\n              margin: 0;\n              padding: 0;\n            }\n\n            #result-dialog .close-button {\n              cursor: pointer;\n              float: right;\n              height: 20px;\n              line-height: 20px;\n              text-align: center;\n              padding: 0 5px;\n              margin-right: -5px;\n            }\n            "]]}},e.a=d}]);