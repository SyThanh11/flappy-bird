(()=>{"use strict";class t{constructor(){this.isMouseDown=!1,this.listObject=[],this.listScene=[]}static getInstance(){return this.instance}addObject(t){this.listObject.push(t)}addScene(t){this.listScene.push(t)}addEvent(t){"mousedown"==t?window.addEventListener(t,this.handleMouseDown.bind(this)):"mouseup"==t?window.addEventListener(t,this.handleMouseUp.bind(this)):"contextmenu"===t&&window.addEventListener(t,this.handleContextMenu.bind(this))}handleMouseDown(t){this.isMouseDown=!0,this.listObject.forEach((e=>{e.handleInput(t)})),this.listScene.forEach((e=>{e.handleInput(t)}))}handleMouseUp(t){this.isMouseDown=!1,this.listObject.forEach((e=>{e.handleInput(t)})),this.listScene.forEach((e=>{e.handleInput(t)}))}handleContextMenu(t){t.preventDefault()}isMousePressed(){return this.isMouseDown}}t.instance=new t;const e=t,s=["../../../assets/images/0.png","../../../assets/images/1.png","../../../assets/images/2.png","../../../assets/images/3.png","../../../assets/images/4.png","../../../assets/images/5.png","../../../assets/images/6.png","../../../assets/images/7.png","../../../assets/images/8.png","../../../assets/images/9.png","../../../assets/images/background-night.png","../../../assets/images/background-night.png","../../../assets/images/base.png","../../../assets/images/gameover.png","../../../assets/images/message.png","../../../assets/images/pipe-green-down.png","../../../assets/images/pipe-green.png","../../../assets/images/sprite.png","../../../assets/images/yellowbird-downflap.png","../../../assets/images/yellowbird-midflap.png","../../../assets/images/yellowbird-upflap.png"];class i{constructor(){this.listImage=[],this.listImage=[],s.forEach((t=>{this.loadImage(t)}))}static getInstance(){return this.instance}loadImage(t){const e=new Image;e.src=t,this.listImage.push(e)}getImage(t){return this.listImage[t]}get length(){return this.listImage.length}}i.instance=new i;const n=i,a=class{constructor(){this.isActive=!1,this.listOfGameObjects=[]}addGameObject(t){t.start(),this.listOfGameObjects.push(t)}removeGameObject(t){t.destroy(),this.listOfGameObjects.splice(this.listOfGameObjects.indexOf(t),1)}findGameObject(t){return this.listOfGameObjects.find((e=>e===t))}setIsActive(t){this.isActive=t}getIsActive(){return this.isActive}addListOfGameObjects(t){t.forEach((t=>{this.addGameObject(t)}))}update(t){this.listOfGameObjects.forEach((e=>{e.update(t)}))}sortLayer(){this.listOfGameObjects.sort(((t,e)=>t.getLayer()-e.getLayer()))}start(){this.listOfGameObjects.forEach((t=>{t.start()}))}draw(t,e){this.sortLayer(),this.listOfGameObjects.forEach((s=>{s.draw(t,e)}))}destroy(){this.listOfGameObjects.forEach((t=>{t.destroy()}))}deleteScene(){this.destroy(),this.listOfGameObjects=[]}handleInput(t){}};class o{constructor(){this.listOfScenes=new Map}static getInstance(){return o.instance||(o.instance=new o),o.instance}addScene(t,e){this.listOfScenes.set(t,e)}getScene(t){return this.listOfScenes.get(t)||new a}setCurrentScene(t){this.currentScene=this.getScene(t)}getCurrentScene(){return this.currentScene}removeScene(t){this.listOfScenes.delete(t)}updateScene(t,e){this.listOfScenes.set(t,e)}update(t){this.listOfScenes.forEach(((e,s)=>{e.getIsActive()&&e.update(t)}))}draw(t,e){t.clearRect(0,0,e.width,e.height),this.listOfScenes.forEach(((s,i)=>{s.getIsActive()&&s.draw(t,e)}))}start(){this.listOfScenes.forEach(((t,e)=>{t.getIsActive()&&t.start()}))}}const r=o,h=class{constructor(t){this.clear=()=>{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},this.getCanvas=()=>this.canvas,this.getCtx=()=>this.ctx,this.canvas=document.querySelector(t),this.ctx=this.canvas.getContext("2d")}},c=class{constructor(t,s){this.lastTime=0,this.deltaTime=0,this.sceneManager=r.getInstance(),this.resourceManager=n.getInstance(),this.gameLoop=()=>{let t=performance.now();this.deltaTime=(t-this.lastTime)/1e3,this.lastTime=t,this.update(this.deltaTime),this.draw(),window.requestAnimationFrame(this.gameLoop)},this.createCanvas(t,s),this.view=new h("canvas"),this.mouseEventHandler=e.getInstance(),this.sceneManager=r.getInstance(),this.resourceManager=n.getInstance(),this.start()}createCanvas(t,e){const s=document.createElement("canvas");s.setAttribute("id","canvas"),s.height=e,s.width=t,document.body.appendChild(s)}start(){this.setUp(),r.getInstance().start(),this.lastTime=window.performance.now(),window.requestAnimationFrame(this.gameLoop)}update(t){r.getInstance().update(t)}draw(){r.getInstance().draw(this.view.getCtx(),this.view.getCanvas())}setUp(){}};class g{constructor(t,e){this.x=t,this.y=e}getX(){return this.x}getY(){return this.y}setX(t){this.x=t}setY(t){this.y=t}add(t){return new g(this.x+t.getX(),this.y+t.getY())}subtract(t){return new g(this.x-t.getX(),this.y-t.getY())}multiplyScalar(t){return new g(this.x*t,this.y*t)}divideScalar(t){if(0===t)throw new Error("Cannot divide by zero.");return new g(this.x/t,this.y/t)}Up(){return new g(0,-1)}Down(){return new g(0,1)}Left(){return new g(-1,0)}Right(){return new g(1,0)}}const d=g,l=class{constructor(t,e,s){this.degree=Math.PI/180,this.position=t||new d(0,0),this.rotation=e||0,this.scale=s||new d(1,1)}getPosition(){return this.position}getRotation(){return this.rotation}getScale(){return this.scale}getDegree(){return this.degree}getMaxRotation(){return this.maxRotation}getRadian(){return this.rotation*this.degree}getRadianMax(){return this.maxRotation*this.degree}getRotationMax(){return this.maxRotation}setPosition(t){this.position=t}setRotation(t){this.rotation=t}setScale(t){this.scale=t}setMaxRotation(t){this.maxRotation=t}rotate(t){this.rotation+=t,this.maxRotation&&(this.rotation>this.maxRotation?this.rotation=this.maxRotation:this.rotation<-this.maxRotation&&(this.rotation=-this.maxRotation))}reset(){this.position=new d(0,0),this.rotation=0,this.scale=new d(1,1)}},f=class{constructor(t,e,s){this.position=t,this.width=e,this.height=s}getPosition(){return this.position}getWidth(){return this.width}getHeight(){return this.height}setPosition(t){this.position=t}setWidth(t){this.width=t}setHeight(t){this.height=t}draw(t){t.strokeStyle="black",t.strokeRect(this.position.getX(),this.position.getY(),this.width,this.height)}isColliding(t){const e=this.position.getX(),s=this.position.getX()+this.width,i=this.position.getY(),n=this.position.getY()+this.height,a=t.getPosition().getX(),o=t.getPosition().getX()+t.getWidth(),r=t.getPosition().getY(),h=t.getPosition().getY()+t.getHeight();return s>=a&&e<=o&&n>=r&&i<=h}},u=class{constructor(){this.listeners=[]}subscribe(t){this.listeners.push(t)}notify(t){this.listeners.forEach((e=>e(t)))}},m=class{constructor(t,e,s,i,n,a,o){this.image=t,this.transform=e,this.width=s,this.height=i,this.canvasTransform=n,this.canvasWidth=a,this.canvasHeight=o,this.positionChangeEvent=new u,this.isStatic=!1,this.isActive=!1,this.layer=0,this.image=t,this.transform=e,this.width=s*this.transform.getScale().getX(),this.height=i*this.transform.getScale().getY(),this.canvasTransform=n,this.canvasWidth=a*this.transform.getScale().getX(),this.canvasHeight=o*this.transform.getScale().getY(),this.collider=new f(this.getCanvasPosition(),this.getCanvasWidth(),this.getCanvasHeight()),this.positionChangeEvent.subscribe((t=>{this.collider.setPosition(t)}))}getImage(){return this.image}getTransform(){return this.transform}getCanvasTransform(){return this.canvasTransform}getWidth(){return this.width}getHeight(){return this.height}getCanvasWidth(){return this.canvasWidth}getCanvasHeight(){return this.canvasHeight}getLayer(){return this.layer}getIsStatic(){return this.isStatic}getIsActive(){return this.isActive}getPosition(){return this.transform.getPosition()}getCanvasPosition(){return this.canvasTransform.getPosition()}getCollider(){return this.collider}setLayer(t){this.layer=t}setIsStatic(t){this.isStatic=t}setActive(t){this.isActive=t}setScale(t){this.transform.setScale(t),this.width=this.width*this.transform.getScale().getX(),this.height=this.height*this.transform.getScale().getY()}setWidth(t){this.width=t}setHeight(t){this.height=t}setCanvasWidth(t){this.canvasWidth=t}setCanvasHeight(t){this.canvasHeight=t}setPosition(t){this.transform.setPosition(t)}setCanvasPosition(t){this.canvasTransform.setPosition(t),this.positionChangeEvent.notify(t)}setImage(t){this.image=t}setCollider(t){this.collider.setPosition(t)}start(){}handleInput(t){}draw(t,e){}update(t){}destroy(){}},p=class extends m{constructor(){super(...arguments),this.view=new h("canvas")}draw(){this.getCollider()&&this.getCollider().draw(this.view.getCtx()),this.view.getCtx().drawImage(this.getImage(),this.getPosition().getX(),this.getPosition().getY(),this.getWidth(),this.getHeight(),this.getCanvasPosition().getX(),this.getCanvasPosition().getY(),this.getCanvasWidth(),this.getCanvasHeight())}},I=class extends p{constructor(){super(...arguments),this.isClicked=!1}getIsClicked(){return this.isClicked}setIsClicked(t){this.isClicked=t}handleInput(t){"mousedown"===t.type?this.checkClickButton(t)&&this.setIsClicked(!0):this.setIsClicked(!1)}checkClickButton(t){return t.clientX<=this.getCanvasPosition().getX()+this.getCanvasWidth()&&t.clientX>=this.getCanvasPosition().getX()&&t.clientY<=this.getCanvasPosition().getY()+this.getCanvasHeight()&&t.clientY>=this.getCanvasPosition().getY()}},O=(t,e)=>Math.floor(Math.random()*(e-t+1)+t),v={listOfGroundsInfo:{numberOfGrounds:4,groundInfo:{path:"../assets/images/base.png",position:new l,width:336,height:112,canvasPosition:new l(new d(200,398)),canvasWidth:336,canvasHeight:112,speed:100},indexStart:0},listOfBackgroundsInfo:{numberOfBackgrounds:3,backgroundInfo:{path:"../assets/images/background-night.png",position:new d(0,0),width:288,height:512,canvasPosition:new d(288,0),canvasWidth:288,canvasHeight:512,speed:0},indexStart:0},listOfPipesInfo:{numberOfPipes:4,pipeInfo:{pathUp:"../../assets/images/pipe-green.png",pathDown:"../../assets/images/pipe-green-down.png",position:new l,width:52,height:320,canvasPosition:new l(new d(O(800,820),O(-100,-200))),canvasWidth:52,canvasHeight:320,speed:200,space:70},indexStart:1},birdInfo:{path:"../../assets/images/yellowbird-midflap.png",position:new l,width:34,height:24,canvasWidth:34,canvasHeight:24,speed:0,jumpSpeed:200},messageInfo:{path:"../assets/images/message.png",position:new l,width:184,height:267,canvasWidth:184,canvasHeight:267,speed:0,dY:80},gameOverMessageInfo:{path:"../../assets/images/sprite.png",position:new l(new d(194,231)),width:184,height:33,canvasWidth:243.1,canvasHeight:42.9,speed:0,dY:50},boardInfo:{path:"../../assets/images/sprite.png",position:new l(new d(175,272)),width:225,height:116,canvasWidth:292.5,canvasHeight:150.8,speed:0,dY:-3},buttonInfo:{path:"../../assets/images/sprite.png",position:new l(new d(246,400)),width:82,height:28,canvasWidth:123,canvasHeight:45,speed:0,dY:70},scoreInfo:{path:"",position:new l,width:0,height:0,canvasPosition:new l,canvasWidth:24,canvasHeight:36}},w=class{constructor(){this.button=new I(n.getInstance().getImage(17),v.buttonInfo.position,v.buttonInfo.width,v.buttonInfo.height,new l(new d((800-v.buttonInfo.canvasWidth)/2,(510+v.buttonInfo.canvasHeight+v.buttonInfo.dY)/2)),v.buttonInfo.canvasWidth,v.buttonInfo.canvasHeight)}build(){return this.button}addToScene(t){t.addGameObject(this.button)}},b=class extends p{},S=class{constructor(){this.gameOverMessage=new b(n.getInstance().getImage(17),v.gameOverMessageInfo.position,v.gameOverMessageInfo.width,v.gameOverMessageInfo.height,new l(new d((800-v.gameOverMessageInfo.canvasWidth)/2,v.gameOverMessageInfo.canvasHeight+v.gameOverMessageInfo.dY)),v.gameOverMessageInfo.canvasWidth,v.gameOverMessageInfo.canvasHeight)}build(){return this.gameOverMessage}addToScene(t){t.addGameObject(this.gameOverMessage)}},C=class extends p{},P=class{constructor(){this.board=new C(n.getInstance().getImage(17),v.boardInfo.position,v.boardInfo.width,v.boardInfo.height,new l(new d((800-v.boardInfo.canvasWidth)/2,v.boardInfo.canvasHeight+v.boardInfo.dY)),v.boardInfo.canvasWidth,v.boardInfo.canvasHeight)}build(){return this.board}addToScene(t){t.addGameObject(this.board)}},G=new Map;function y(t){const e=new Image;return e.src=t,e}G.set("0",y("../../../assets/images/0.png")),G.set("1",y("../../../assets/images/1.png")),G.set("2",y("../../../assets/images/2.png")),G.set("3",y("../../../assets/images/3.png")),G.set("4",y("../../../assets/images/4.png")),G.set("5",y("../../../assets/images/5.png")),G.set("6",y("../../../assets/images/6.png")),G.set("7",y("../../../assets/images/7.png")),G.set("8",y("../../../assets/images/8.png")),G.set("9",y("../../../assets/images/9.png"));const j=G,H=class extends m{constructor(t,e,s,i,n,a,o,r){super(t,e,s,i,n,a,o),this.resultImages=new Map,this.positionOffset=r}setContent(t){this.content=t,this.loadImage()}loadImage(){if(this.content&&0!==this.content.length)for(let t=0;t<this.content.length;t++){const e=this.content.charAt(t);if(!this.resultImages.has(e)&&j.has(e)){const t=j.get(e);t instanceof HTMLImageElement?this.resultImages.set(e,t):console.warn(`Image for character '${e}' is not an instance of HTMLImageElement.`)}}}addImage(t,e){this.resultImages.set(t,e)}setPositionOffset(t){this.positionOffset=t}start(){}draw(t,e){if(!this.content||0===this.content.length)return;let s=this.positionOffset.getX();const i=this.positionOffset.getY();for(let e=0;e<this.content.length;e++){const n=this.content.charAt(e),a=this.resultImages.get(n);a&&(t.drawImage(a,this.getPosition().getX(),this.getPosition().getY(),a.width,a.height,s,i,this.getCanvasWidth(),this.getCanvasHeight()),s+=this.getCanvasWidth())}}},x=class extends H{constructor(t,e,s,i,n,a,o,r){super(t,e,s,i,n,a,o,r),this.isScore=!0,this.score=0,this.isScore=!0,this.score=0,this.setContent(String(this.score))}setScore(t){this.score=t,this.setContent(String(this.score))}getScore(){return this.score}setIsScore(t){this.isScore=t}getIsScore(){return this.isScore}addToScene(t){t.addGameObject(this)}},k=class{constructor(t,e){this.getMass=()=>this.mass,this.getGravity=()=>this.gravity,this.getForce=()=>this.getMass()*this.getGravity(),this.getAcceleration=()=>this.getForce()/this.getMass(),this.destroy=()=>{this.mass=0,this.gravity=0},this.mass=t,this.gravity=e}},W=class{constructor(){this.fps=60,this.currentFrameIndex=0,this.lastFrameTime=0,this.listOfImages=[]}getFps(){return this.fps}setFps(t){this.fps=t}addImage(t){this.listOfImages.push(t)}getImage(){return this.listOfImages[this.currentFrameIndex]}playAnimation(){const t=1e3/this.fps;requestAnimationFrame((e=>{e-this.lastFrameTime>=t&&(this.currentFrameIndex=(this.currentFrameIndex+1)%this.listOfImages.length,this.lastFrameTime=e)}))}},L=class extends p{constructor(t,e,s,i,n,a,o,r,h){super(t,e,s,i,n,a,o),this.speed=r,this.jumpSpeed=h,this.sprite=new W,this.isJumping=!1,this.mouseUp=!1,this.mouseDown=!1,this.rigid=new k(1,9.8),this.initSpriteAnimation()}setSpeed(t){this.speed=t}setJumpSpeed(t){this.jumpSpeed=t}initSpriteAnimation(){[n.getInstance().getImage(18),n.getInstance().getImage(19),n.getInstance().getImage(20)].forEach((t=>{this.sprite.addImage(t)})),this.sprite.setFps(10)}update(t){if(this.sprite.playAnimation(),this.setImage(this.sprite.getImage()),this.rigid){const e=this.getCanvasPosition().Down();this.speed+=this.rigid.getGravity(),this.setCanvasPosition(this.getCanvasPosition().add(e.multiplyScalar(t*this.speed)))}if(this.isJumping){const e=this.getCanvasPosition().Up();this.setCanvasPosition(this.getCanvasPosition().add(e.multiplyScalar(t*this.jumpSpeed))),this.speed=-this.jumpSpeed,this.isJumping=!1}}handleInput(t){"mousedown"===t.type&&(this.mouseDown=!0),"mouseup"===t.type&&(this.mouseUp=!0),this.mouseUp&&this.mouseDown&&(this.isJumping=!this.isJumping,this.mouseUp=!1,this.mouseDown=!1)}destroy(){this.speed=0,this.jumpSpeed=0,this.rigid.destroy()}},T=class{constructor(){this.bird=new L(n.getInstance().getImage(18),v.birdInfo.position,v.birdInfo.width,v.birdInfo.height,new l(new d(200,(510-v.birdInfo.height)/2)),v.birdInfo.canvasWidth,v.birdInfo.canvasHeight,v.birdInfo.speed,v.birdInfo.jumpSpeed)}build(){return this.bird}addToScene(t){t.addGameObject(this.bird)}},A=class extends p{},E=class{constructor(){this.background=new A(n.getInstance().getImage(10),new l(new d(v.listOfBackgroundsInfo.backgroundInfo.position.getX(),v.listOfBackgroundsInfo.backgroundInfo.position.getY())),v.listOfBackgroundsInfo.backgroundInfo.width,v.listOfBackgroundsInfo.backgroundInfo.height,new l(new d(v.listOfBackgroundsInfo.backgroundInfo.canvasPosition.getX(),v.listOfBackgroundsInfo.backgroundInfo.canvasPosition.getY())),v.listOfBackgroundsInfo.backgroundInfo.canvasWidth,v.listOfBackgroundsInfo.backgroundInfo.canvasHeight)}build(){return this.background}},M=class{constructor(t,e,s,i,n){this.listOfGameObjects=[];for(let a=s;a<t;a++){let t=new l(new d(a*n.getX(),n.getY())),s=new i(e.getImage(),e.getTransform(),e.getWidth(),e.getHeight(),t,e.getCanvasWidth(),e.getCanvasHeight(),e.getIsStatic());this.listOfGameObjects.push(s)}}getListOfGameObjects(){return this.listOfGameObjects}setListOfGameObjects(t){this.listOfGameObjects=t}setAllLayer(t){this.listOfGameObjects.forEach((e=>e.setLayer(t)))}setAllActive(t){this.listOfGameObjects.forEach((e=>e.setActive(t)))}draw(t){}update(t){}},Y=class extends M{},X=class{constructor(){const t=new E;this.listOfBackgrounds=new Y(v.listOfBackgroundsInfo.numberOfBackgrounds,t.build(),v.listOfBackgroundsInfo.indexStart,A,new d(v.listOfBackgroundsInfo.backgroundInfo.canvasWidth,v.listOfBackgroundsInfo.backgroundInfo.canvasPosition.getY()))}build(){return this.listOfBackgrounds}addToScene(t){t.addListOfGameObjects(this.listOfBackgrounds.getListOfGameObjects())}},R=class extends m{constructor(){super(new Image,new l,0,0,new l,0,0)}update(t){this.listOfGrounds.update(t),this.listOfPipes.update(t)}setGameManager(t,e){this.listOfGrounds=t,this.listOfPipes=e}getListOfGrounds(){return this.listOfGrounds}getListOfPipes(){return this.listOfPipes}addToScene(t){t.addGameObject(this)}},B=class extends p{constructor(){super(...arguments),this.speed=0}setSpeed(t){this.speed=t}getSpeed(){return this.speed}update(t){const e=this.getCanvasPosition().Left();this.setCanvasPosition(this.getCanvasPosition().add(e.multiplyScalar(t*this.speed)))}destroy(){this.speed=0}},D=class extends M{setAllSpeed(t){this.listOfGameObjects.forEach((e=>e.setSpeed(t)))}findLastGround(t){for(let e=t.listOfGameObjects.length-1;e>=0;e--)if(t.listOfGameObjects[e]instanceof B)return e;return 0}findFirstGround(t){for(let e=0;e<t.listOfGameObjects.length;e++)if(t.listOfGameObjects[e]instanceof B)return e;return 0}update(t){const e=this.findLastGround(r.getInstance().getScene("gamePlay")),s=this.findFirstGround(r.getInstance().getScene("gamePlay")),i=r.getInstance().getScene("gamePlay").listOfGameObjects[s],n=r.getInstance().getScene("gamePlay").listOfGameObjects[e];if(i.getCanvasPosition().getX()+i.getCanvasWidth()<=0){this.listOfGameObjects.splice(0,1);const t=new B(i.getImage(),i.getTransform(),i.getWidth(),i.getHeight(),new l(new d(n.getCanvasPosition().getX()+i.getCanvasWidth(),510-i.getCanvasHeight())),i.getCanvasWidth(),i.getCanvasHeight());t.setSpeed(i.getSpeed()),t.setLayer(i.getLayer()),this.listOfGameObjects.push(t),r.getInstance().getScene("gamePlay").addGameObject(t),r.getInstance().getScene("gamePlay").removeGameObject(i)}}destroy(){this.listOfGameObjects.forEach((t=>t.destroy()))}},F=class{constructor(){this.listOfGrounds=new D(v.listOfGroundsInfo.numberOfGrounds,new B(n.getInstance().getImage(12),v.listOfGroundsInfo.groundInfo.position,v.listOfGroundsInfo.groundInfo.width,v.listOfGroundsInfo.groundInfo.height,v.listOfGroundsInfo.groundInfo.canvasPosition,v.listOfGroundsInfo.groundInfo.canvasWidth,v.listOfGroundsInfo.groundInfo.canvasHeight),v.listOfGroundsInfo.indexStart,B,new d(v.listOfGroundsInfo.groundInfo.canvasWidth,v.listOfGroundsInfo.groundInfo.canvasPosition.getPosition().getY())),this.listOfGrounds.setAllSpeed(v.listOfGroundsInfo.groundInfo.speed)}build(){return this.listOfGrounds}addToScene(t){t.addListOfGameObjects(this.listOfGrounds.getListOfGameObjects())}},U=class extends p{constructor(){super(...arguments),this.speed=0}setSpeed(t){this.speed=t}getSpeed(){return this.speed}update(t){const e=this.getCanvasPosition().Left();this.setCanvasPosition(this.getCanvasPosition().add(e.multiplyScalar(t*this.speed)))}destroy(){this.speed=0}},_=class extends M{constructor(t,e,s,i,n,a,o){super(t,e,s,i,n),this.isDestroyed=!1;for(let r=s;r<t;r++){let t=new l(new d(r*n.getX(),n.getY()+e.getHeight()+a)),s=new i(o,e.getTransform(),e.getWidth(),e.getHeight(),t,e.getCanvasWidth(),e.getCanvasHeight());this.listOfGameObjects.push(s)}this.sortCanvasPosition()}sortCanvasPosition(){this.listOfGameObjects.sort(((t,e)=>t.getCanvasPosition().getX()-e.getCanvasPosition().getX()))}getIsDestroyed(){return this.isDestroyed}setIsDestroyed(t){this.isDestroyed=t}setAllSpeed(t){this.listOfGameObjects.forEach((e=>e.setSpeed(t)))}findFirstPipes(t){for(let e=0;e<t.listOfGameObjects.length;e++)if(t.listOfGameObjects[e]instanceof U)return e;return 0}findLastPipes(t){for(let e=t.listOfGameObjects.length-1;e>=0;e--)if(t.listOfGameObjects[e]instanceof U)return e;return 0}update(t){const e=this.findFirstPipes(r.getInstance().getScene("gamePlay")),s=this.findLastPipes(r.getInstance().getScene("gamePlay")),i=r.getInstance().getScene("gamePlay").listOfGameObjects[e],n=r.getInstance().getScene("gamePlay").listOfGameObjects[e+1],a=r.getInstance().getScene("gamePlay").listOfGameObjects[s-1],o=r.getInstance().getScene("gamePlay").listOfGameObjects[s];if(i.getCanvasPosition().getX()<=-i.getCanvasWidth()){this.listOfGameObjects.splice(0,2),this.isDestroyed=!0;const t=new U(i.getImage(),i.getTransform(),i.getWidth(),i.getHeight(),new l(new d(o.getCanvasPosition().getX()+O(500,600),O(-200,-100))),i.getCanvasWidth(),i.getCanvasHeight());t.setSpeed(i.getSpeed()),t.setLayer(i.getLayer()),t.setActive(i.getIsActive());const e=new U(n.getImage(),n.getTransform(),n.getWidth(),n.getHeight(),new l(new d(t.getCanvasPosition().getX(),t.getCanvasPosition().getY()+t.getCanvasHeight()+O(50,70))),n.getCanvasWidth(),n.getCanvasHeight());e.setSpeed(a.getSpeed()),e.setLayer(a.getLayer()),e.setActive(a.getIsActive()),this.listOfGameObjects.push(t),this.listOfGameObjects.push(e),r.getInstance().getScene("gamePlay").addGameObject(t),r.getInstance().getScene("gamePlay").addGameObject(e),r.getInstance().getScene("gamePlay").removeGameObject(i),r.getInstance().getScene("gamePlay").removeGameObject(n)}}},J=class{constructor(){this.listOfPipes=new _(v.listOfPipesInfo.numberOfPipes,new U(n.getInstance().getImage(15),v.listOfPipesInfo.pipeInfo.position,v.listOfPipesInfo.pipeInfo.width,v.listOfPipesInfo.pipeInfo.height,v.listOfPipesInfo.pipeInfo.canvasPosition,v.listOfPipesInfo.pipeInfo.canvasWidth,v.listOfPipesInfo.pipeInfo.canvasHeight),v.listOfPipesInfo.indexStart,U,v.listOfPipesInfo.pipeInfo.canvasPosition.getPosition(),v.listOfPipesInfo.pipeInfo.space,n.getInstance().getImage(16)),this.listOfPipes.setAllSpeed(v.listOfPipesInfo.pipeInfo.speed)}build(){return this.listOfPipes}addToScene(t){t.addListOfGameObjects(this.listOfPipes.getListOfGameObjects())}},q=class{constructor(){this.score=new x(new Image,v.scoreInfo.position,v.scoreInfo.width,v.scoreInfo.height,v.scoreInfo.canvasPosition,v.scoreInfo.canvasWidth,v.scoreInfo.canvasHeight,new d(400,25.5))}build(){return this.score}addToScene(t){t.addGameObject(this.score)}},N=class extends a{constructor(){super(),this.createObjects()}createObjects(){const t=new T,s=new X,i=new F,n=new J;this.scoreBuilder=new q;const a=new R;a.setGameManager(i.build(),n.build()),t.addToScene(this),s.addToScene(this),i.addToScene(this),n.addToScene(this),a.addToScene(this),this.scoreBuilder.addToScene(this),t.build().setLayer(2),s.build().setAllLayer(0),i.build().setAllLayer(2),n.build().setAllLayer(1),this.scoreBuilder.build().setLayer(2),e.getInstance().addObject(t.build())}update(t){this.checkCollision()?(localStorage.setItem("SCORE",String(this.scoreBuilder.build().getScore())),r.getInstance().getScene("gameOver").setIsActive(!0),this.removeScore()):(super.update(t),this.caculateScore())}checkCollision(){for(let t=0;t<this.listOfGameObjects.length-1;t++){const e=this.listOfGameObjects[t];for(let s=t+1;s<this.listOfGameObjects.length;s++){const t=this.listOfGameObjects[s];if(e instanceof L&&t instanceof B){if(e.getCollider().isColliding(t.getCollider()))return!0}else if(e instanceof B&&t instanceof L&&e.getCollider().isColliding(t.getCollider()))return!0;if(e instanceof L&&t instanceof U){if(e.getCollider().isColliding(t.getCollider()))return!0}else if(e instanceof U&&t instanceof L&&e.getCollider().isColliding(t.getCollider()))return!0}}return!1}caculateScore(){let t,e,s;for(let i=0;i<this.listOfGameObjects.length;i++){const n=this.listOfGameObjects[i];n instanceof R?t=n:n instanceof x?e=n:n instanceof L&&(s=n)}if(t){t.getListOfPipes().getIsDestroyed()&&(null==e||e.setIsScore(!0));const i=this.listOfGameObjects[t.getListOfPipes().findFirstPipes(this)];e&&s&&e.getIsScore()&&s.getCanvasPosition().getX()>i.getCanvasPosition().getX()+i.getCanvasWidth()&&(e.setScore(e.getScore()+1),e.setIsScore(!1),t.getListOfPipes().setIsDestroyed(!1))}}removeScore(){for(let t=0;t<this.listOfGameObjects.length;t++)this.listOfGameObjects[t]instanceof x&&this.listOfGameObjects.splice(t,1)}},z=class extends a{constructor(){super(),this.createObjects()}createObjects(){const t=new S,s=new P,i=new w;this.score=new x(new Image,new l,0,0,new l,20,25,new d(482,190)),this.highScore=new x(new Image,new l,0,0,new l,20,25,new d(482,245)),localStorage.getItem("HIGH_SCORE")&&this.highScore.setScore(Number(localStorage.getItem("HIGH_SCORE"))),t.addToScene(this),s.addToScene(this),i.addToScene(this),this.score.addToScene(this),this.highScore.addToScene(this),this.score.setLayer(1),this.highScore.setLayer(1),e.getInstance().addObject(i.build())}start(){console.log("Hi")}update(t){super.update(t),localStorage.getItem("SCORE")&&this.score.setScore(Number(localStorage.getItem("SCORE"))),null!=localStorage.getItem("HIGH_SCORE")?Number(localStorage.getItem("HIGH_SCORE"))<this.score.getScore()&&(localStorage.setItem("HIGH_SCORE",this.score.getScore().toString()),this.highScore.setScore(this.score.getScore())):(localStorage.setItem("HIGH_SCORE",this.score.getScore().toString()),this.highScore.setScore(Number(localStorage.getItem("HIGH_SCORE")))),this.checkIsClicked()&&(r.getInstance().getScene("gameOver").setIsActive(!1),r.getInstance().updateScene("gamePlay",new N),r.getInstance().getScene("gamePlay").setIsActive(!0))}checkIsClicked(){let t;for(let e=0;e<this.listOfGameObjects.length;e++)if(this.listOfGameObjects[e]instanceof I){t=this.listOfGameObjects[e];break}return!(!t||!t.getIsClicked())}},$=class extends p{},K=class{constructor(){this.message=new $(n.getInstance().getImage(14),v.messageInfo.position,v.messageInfo.width,v.messageInfo.height,new l(new d((800-v.messageInfo.canvasWidth)/2,(510-v.messageInfo.canvasHeight-v.messageInfo.dY)/2)),v.messageInfo.canvasWidth,v.messageInfo.canvasHeight)}build(){return this.message}addToScene(t){t.addGameObject(this.message)}},Q=class extends a{constructor(){super(),this.createObjects()}createObjects(){const t=new T,e=new X,s=new F,i=new K;t.addToScene(this),e.addToScene(this),s.addToScene(this),i.addToScene(this),t.build().setLayer(2),e.build().setAllLayer(0),s.build().setAllLayer(2),i.build().setLayer(3),t.build().destroy(),s.build().setAllSpeed(0)}update(t){super.update(t)}handleInput(t){r.getInstance().getScene("gamePlay").setIsActive(!0),r.getInstance().getScene("ready").setIsActive(!1)}},V=class extends c{setUp(){e.getInstance().addEvent("mousedown"),e.getInstance().addEvent("mouseup");const t=new N,s=new Q,i=new z;r.getInstance().addScene("gamePlay",t),r.getInstance().addScene("ready",s),r.getInstance().addScene("gameOver",i),e.getInstance().addScene(t),e.getInstance().addScene(s),e.getInstance().addScene(i),r.getInstance().getScene("ready").setIsActive(!0)}};new class{constructor(){new V(800,510)}}})();