"use strict";(self["webpackChunklde_ui"]=self["webpackChunklde_ui"]||[]).push([[620],{2620:function(e,t,o){o.r(t),o.d(t,{default:function(){return y}});var n=o(4108),a=o(9096),l=o(7764);const r=(0,n.QD)("br",null,null,-1),s={action:""},u={key:0},d=(0,n.QD)("label",{for:"destina"},"Nom du destinataire",-1),i=(0,n.QD)("input",{type:"text",placeholder:"Nom du destinataire"},null,-1),p=(0,n.QD)("br",null,null,-1),b=(0,n.QD)("label",{for:"numero"},"numero de telephone",-1),c=(0,n.QD)("br",null,null,-1),m=(0,n.QD)("label",{for:"montat"},"Montant",-1),_=(0,n.QD)("br",null,null,-1),h=(0,n.QD)("label",{for:"password"},"Mot de Passe",-1);function w(e,t,o,w,D,f){return(0,n.Wz)(),(0,n.An)("div",null,[(0,n.mY)((0,a.WA)(this.$store.state.action)+" sur : ",1),r,(0,n.QD)("form",s,["Transfer"==this.$store.state.action?((0,n.Wz)(),(0,n.An)("div",u,[d,i,(0,n.mY)(),p])):(0,n.g1)("",!0),b,(0,n.wt)((0,n.QD)("input",{type:"text",placeholder:"Numero du destinataire","onUpdate:modelValue":t[0]||(t[0]=e=>D.number_to_deb=e)},null,512),[[l.Og,D.number_to_deb]]),c,m,(0,n.wt)((0,n.QD)("input",{type:"number",placeholder:"montant","onUpdate:modelValue":t[1]||(t[1]=e=>D.amount_to_deb=e)},null,512),[[l.Og,D.amount_to_deb]]),_,h,(0,n.wt)((0,n.QD)("input",{type:"password",placeholder:"Votre mot de passe","onUpdate:modelValue":t[2]||(t[2]=e=>D.password=e)},null,512),[[l.Og,D.password]]),(0,n.QD)("input",{type:"button",value:"SEND",onClick:t[3]||(t[3]=(...e)=>f.send&&f.send(...e))})])])}var D={data(){return{number_to_deb:"",amount_to_deb:"",password:""}},methods:{async send(){console.log("You want to send : ",this.amount_to_deb);try{const e=await fetch("http://127.0.0.1:8000/jov/api/reque/notOwner/",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.$store.state.user.access},body:JSON.stringify({number_to_deb:this.number_to_deb,amount_to_deb:this.amount_to_deb,password:this.password})}),t=await e.json();console.log("THe Answer is : ",t)}catch(e){console.log("The erro is : ",e)}finally{console.log("TermiNATED to SEND")}}}},f=o(4100);const Q=(0,f.c)(D,[["render",w]]);var y=Q}}]);
//# sourceMappingURL=620.9581555b.js.map