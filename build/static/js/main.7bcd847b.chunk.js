(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{19:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t.n(c),a=t(14),o=t.n(a),u=(t(19),t(3)),i=t(0),d=function(e){var n=e.name,t=e.number,c=e.deletePerson,r=e.id;return Object(i.jsxs)("p",{children:[n," ",t," ",Object(i.jsx)("button",{onClick:function(){return c(r)},children:"Delete"})]})},s=function(e){var n=e.handleSearchChange,t=e.searchResults;return Object(i.jsxs)("div",{children:["Search: ",Object(i.jsx)("input",{onChange:n}),t.map((function(e){return Object(i.jsxs)("p",{children:[e.name," ",e.number]},e.name)}))]})},l=function(e){var n=e.addPerson,t=e.newName,c=e.handleNameChange,r=e.newNumber,a=e.handleNumberChange;return Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Add a new person"}),"name: ",Object(i.jsx)("input",{value:t,onChange:c})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:r,onChange:a})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.message;return Object(i.jsx)(i.Fragment,{children:n&&Object(i.jsx)("div",{style:{color:"green",fontStyle:"italic",fontSize:16,background:"lightgrey",border:"solid",borderRadius:5,padding:10,marginBottom:10},children:n})})},h=t(4),j=t.n(h),f="/api/persons",m={getAll:function(){return j.a.get(f).then((function(e){return e.data}))},create:function(e){return j.a.post(f,e).then((function(e){return e.data}))},update:function(e,n){return j.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},deleteContact:function(e){return j.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))}},O=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),o=Object(u.a)(a,2),h=o[0],j=o[1],f=Object(c.useState)(""),O=Object(u.a)(f,2),g=O[0],x=O[1],p=Object(c.useState)([]),v=Object(u.a)(p,2),w=v[0],C=v[1],S=Object(c.useState)(""),N=Object(u.a)(S,2),y=N[0],k=N[1];Object(c.useEffect)((function(){m.getAll().then((function(e){r(e)}))}),[]);var P=function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&m.deleteContact(e).then((function(n){r(t.filter((function(n){return n.id!==e})))})).catch((function(e){return console.log(e)}))};return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(b,{message:y}),Object(i.jsx)("div",{children:Object(i.jsx)(s,{handleSearchChange:function(e){var n=e.target.value,c=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));C(c)},searchResults:w})}),Object(i.jsx)(l,{addPerson:function(e){e.preventDefault(),function(e){return t.filter((function(n){return n.name===e}))}(h).length>0?function(e,n){var c=t.find((function(n){return n.name===e}));window.confirm("".concat(e," already exists. Do you want to update phone number?"))&&m.update(c.id,{name:e,number:n}).then((function(e){console.log(e),j(""),x("")})).catch((function(e){console.log("failed",e),k("".concat(c.name," has already been removed from the server")),r(t.filter((function(e){return e.id!==c.id})))}))}(h,g):m.create({name:h,number:g}).then((function(e){r(e),j(""),x(""),k("".concat(h," has been created!")),setTimeout((function(){k(null)}),5e3)})).catch((function(e){console.log(e)}))},newName:h,handleNameChange:function(e){j(e.target.value)},newNumber:g,handleNumberChange:function(e){x(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)("div",{children:t.map((function(e){return Object(i.jsx)(d,{id:e.id,name:e.name,number:e.number,deletePerson:P},e.id)}))})]})};o.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(O,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.7bcd847b.chunk.js.map