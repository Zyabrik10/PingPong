let e,o,t,i,r={w:!1,s:!1,ArrowUp:!1,ArrowDown:!1};const h=(e,o)=>Math.floor(Math.random()*(o-e+1)+e),c=(...e)=>e[Math.floor(Math.random()*e.length)];class s{constructor({name:e,color:o}){this.name=e,this.color=o,this.size={width:10,height:140},this.vy=30,this.score=0}init({coor:e,scoreElement:o}){this.coor=e,this.scoreElement=o}draw(){let{x:e,y:t}=this.coor,{width:i,height:r}=this.size;o.beginPath(),o.fillStyle=this.color,o.fillRect(e,t,i,r),this.scoreElement.innerText=this.score}}let n=new s({name:"Player1",color:"white"}),y=new s({name:"Player1",color:"white"}),d=new class{constructor({color:e}){this.color=e,this.size={width:10,height:10},this.v={x:h(10,20)*c(-1,1),y:h(10,20)*c(-1,1)}}init({coor:e}){this.coor=e}draw(){let{x:e,y:t}=this.coor,{width:i}=this.size;o.beginPath(),o.fillStyle=this.color,o.arc(e,t,i,0,2*Math.PI,!1),o.fill()}}({color:"white"});function w(){r.w&&n.coor.y>=0?n.coor.y+=-n.vy:r.s&&n.coor.y+n.size.height<=e.height&&(n.coor.y+=n.vy),r.ArrowUp&&y.coor.y>=0?y.coor.y+=-y.vy:r.ArrowDown&&y.coor.y+y.size.height<=e.height&&(y.coor.y+=y.vy),d.coor.y+=d.v.y,d.coor.x+=d.v.x,(d.coor.y-d.size.height<0||d.coor.y+d.size.height>e.height)&&(d.v.y*=-1),d.coor.x-d.size.width<0&&(d.v.x*=-1,d.coor.x=e.width/2,d.coor.y=e.height/2,d.v.y=10,d.v.y*=c(-1,1),y.score++),d.coor.x+d.size.width>e.width&&(d.coor.x=e.width-d.size.width,d.v.x*=-1,d.coor.x=e.width/2,d.coor.y=e.height/2,d.v.y=10,d.v.y*=c(-1,1),n.score++),(d.coor.x-d.size.width<=n.coor.x+n.size.width&&d.coor.y-d.size.height>=n.coor.y&&d.coor.y+d.size.height<=n.coor.y+n.size.height||d.coor.x+d.size.width>=y.coor.x&&d.coor.y-d.size.height>=y.coor.y&&d.coor.y+d.size.height<=y.coor.y+y.size.height)&&(d.v.x*=-1,d.v.y*=1.2),n.draw(),y.draw(),d.draw()}let l=0,a=0,g=0;window.addEventListener("load",function(){t=document.querySelector(".start-game-button"),i=document.querySelector(".screen.start-game"),o=(e=document.querySelector("canvas")).getContext("2d"),e.width=innerWidth,e.height=innerHeight;let h=e.width/2,c=e.height/2;n.init({coor:{x:0,y:c-n.size.height/2},scoreElement:document.querySelector(".player1-score")}),y.init({coor:{x:e.width-y.size.width,y:c-y.size.height/2},scoreElement:document.querySelector(".player2-score")}),d.init({coor:{x:h,y:c}}),w(),window.addEventListener("resize",()=>{e.width=innerWidth,e.height=innerHeight;let o=e.height/2;n.init({coor:{x:0,y:o-n.size.height/2}}),y.init({coor:{x:e.width-y.size.width,y:o-y.size.height/2}})}),window.addEventListener("keydown",({key:e})=>{r.hasOwnProperty(e)&&(r[e]=!0)}),window.addEventListener("keyup",({key:e})=>{r.hasOwnProperty(e)&&(r[e]=!1)}),t.addEventListener("click",()=>{(function t(i){(g=i-a,a=i,l>=10)?(o.clearRect(0,0,e.width,e.height),w(),l=0):l+=g,requestAnimationFrame(t)})(0),i.classList.add("hidden")})});
//# sourceMappingURL=index.375d90b9.js.map
