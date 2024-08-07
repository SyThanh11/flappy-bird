(()=>{"use strict";class t{constructor(){this.isMouseDown=!1,this.listObject=[],this.listScene=[],window.addEventListener("contextmenu",(t=>{t.preventDefault()}))}static getInstance(){return this.instance}addObject(t){this.listObject.push(t)}addScene(t){this.listScene.push(t)}addEvent(t){"mousedown"==t?window.addEventListener(t,this.handleMouseDown.bind(this)):"mouseup"==t&&window.addEventListener(t,this.handleMouseUp.bind(this))}handleMouseDown(t){this.isMouseDown=!0,this.listObject.forEach((e=>{e.handleInput(t)})),this.listScene.forEach((e=>{e.handleInput(t)}))}handleMouseUp(t){this.isMouseDown=!1,this.listObject.forEach((e=>{e.handleInput(t)})),this.listScene.forEach((e=>{e.handleInput(t)}))}isMousePressed(){return this.isMouseDown}}t.instance=new t;const e=t;class s{constructor(){this.mapImage=new Map}static getInstance(){return this.instance}loadImageKey(t,e){const s=new Image;s.src=e,this.mapImage.set(t,s)}getImageByKey(t){return this.mapImage.get(t)}getMapImage(){return this.mapImage}}s.instance=new s;const i=s,a=class{constructor(){this.isActive=!1,this.listOfGameObjects=[],this.init(),this.create()}init(){}create(){}addGameObject(t){t.start(),this.listOfGameObjects.push(t)}removeGameObject(t){t.destroy(),this.listOfGameObjects.splice(this.listOfGameObjects.indexOf(t),1)}findGameObject(t){return this.listOfGameObjects.find((e=>e===t))}setIsActive(t){this.isActive=t}getIsActive(){return this.isActive}getListOfGameObjects(){return this.listOfGameObjects}addListOfGameObjects(t){t.forEach((t=>{this.addGameObject(t)}))}update(t){this.listOfGameObjects.forEach((e=>{e.update(t)}))}sortLayer(){this.listOfGameObjects.sort(((t,e)=>t.getLayer()-e.getLayer()))}start(){this.listOfGameObjects.forEach((t=>{t.start()}))}draw(t,e){this.sortLayer(),this.listOfGameObjects.forEach((s=>{s.draw(t,e)}))}destroy(){this.listOfGameObjects.forEach((t=>{t.destroy()}))}deleteScene(){this.destroy(),this.listOfGameObjects=[]}handleInput(t){}};class n{constructor(){this.listOfScenes=new Map}static getInstance(){return n.instance||(n.instance=new n),n.instance}addScene(t,e){this.listOfScenes.set(t,e)}getScene(t){return this.listOfScenes.get(t)||new a}setCurrentScene(t){this.currentScene=this.getScene(t)}getCurrentScene(){return this.currentScene}removeScene(t){this.listOfScenes.delete(t)}updateScene(t,e){this.listOfScenes.set(t,e)}update(t){this.listOfScenes.forEach(((e,s)=>{e.getIsActive()&&e.update(t)}))}pauseScene(t){const e=this.listOfScenes.get(t);e&&e.setIsActive(!1)}resumeScene(t){const e=this.listOfScenes.get(t);e&&e.setIsActive(!0)}draw(t,e){t.clearRect(0,0,e.width,e.height),this.listOfScenes.forEach(((s,i)=>{s.getIsActive()&&s.draw(t,e)}))}start(){this.listOfScenes.forEach(((t,e)=>{t.getIsActive()&&t.start()}))}}const o=n,g=class{constructor(t){this.clear=()=>{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},this.getCanvas=()=>this.canvas,this.getCtx=()=>this.ctx,this.canvas=document.querySelector(t),this.ctx=this.canvas.getContext("2d")}},r=class{constructor(t,s){this.lastTime=0,this.deltaTime=0,this.sceneManager=o.getInstance(),this.resourceManager=i.getInstance(),this.gameLoop=()=>{const t=performance.now();this.deltaTime=(t-this.lastTime)/1e3,this.lastTime=t,this.update(this.deltaTime),this.draw(),window.requestAnimationFrame(this.gameLoop)},this.createCanvas(t,s),this.view=new g("canvas"),this.mouseEventHandler=e.getInstance(),this.sceneManager=o.getInstance(),this.resourceManager=i.getInstance(),this.start()}createCanvas(t,e){const s=document.createElement("canvas");s.setAttribute("id","canvas"),s.height=e,s.width=t,s.style.background="white",document.body.appendChild(s)}start(){this.setUp(),o.getInstance().start(),this.lastTime=window.performance.now(),window.requestAnimationFrame(this.gameLoop)}update(t){o.getInstance().update(t)}draw(){o.getInstance().draw(this.view.getCtx(),this.view.getCanvas())}setUp(){}};class h{constructor(t,e){this.x=t,this.y=e}getX(){return this.x}getY(){return this.y}setX(t){this.x=t}setY(t){this.y=t}add(t){return new h(this.x+t.getX(),this.y+t.getY())}subtract(t){return new h(this.x-t.getX(),this.y-t.getY())}multiplyScalar(t){return new h(this.x*t,this.y*t)}divideScalar(t){if(0===t)throw new Error("Cannot divide by zero.");return new h(this.x/t,this.y/t)}Up(){return new h(0,-1)}Down(){return new h(0,1)}Left(){return new h(-1,0)}Right(){return new h(1,0)}}const c=h,I=class{constructor(t,e,s){this.maxRotation=120,this.position=t||new c(0,0),this.rotation=e||0,this.scale=s||new c(1,1)}getPosition(){return this.position}getRotation(){return this.rotation}getScale(){return this.scale}getMaxRotation(){return this.maxRotation}getRotationMax(){return this.maxRotation}setPosition(t){this.position=t}setRotation(t){this.rotation=t}setScale(t){this.scale=t}setMaxRotation(t){this.maxRotation=t}rotate(t){this.rotation+=t,this.maxRotation&&(this.rotation>this.maxRotation?this.rotation=this.maxRotation:this.rotation<-this.maxRotation&&(this.rotation=-this.maxRotation))}reset(){this.position=new c(0,0),this.rotation=0,this.scale=new c(1,1)}},d=(t,e)=>Math.floor(Math.random()*(e-t+1)+t),O={LIST_OF_GROUNDS_INFO:{NUMBER_OF_GROUNDS:4,GROUND_INFO:{PATH:"../assets/images/base.png",POSITION:new I,WIDTH:336,HEIGHT:112,CANVAS_POSITION:new I(new c(200,398)),CANVAS_WIDTH:336,CANVAS_HEIGHT:112,SPEED:100},INDEX_START:0},LIST_OF_BACKGROUNDS_INFO:{NUMBER_OF_BACKGROUNDS:3,BACKGROUND_INFO:{PATH:"../assets/images/background-night.png",POSITION:new c(0,0),WIDTH:288,HEIGHT:512,CANVAS_POSITION:new c(288,0),CANVAS_WIDTH:288,CANVAS_HEIGHT:512,SPEED:0},INDEX_START:0},LIST_OF_PIPES_INFO:{NUMBER_OF_PIPES:4,PIPE_INFO:{PATH_UP:"../../assets/images/pipe-green.png",PATH_DOWN:"../../assets/images/pipe-green-down.png",POSITION:new I,WIDTH:52,HEIGHT:320,CANVAS_POSITION:new I(new c(d(800,820),d(-100,-200))),CANVAS_WIDTH:52,CANVAS_HEIGHT:320,SPEED:200,SPACE:80},INDEX_START:1},BIRD_INFO:{PATH:"../../assets/images/yellowbird-midflap.png",POSITION:new I,WIDTH:34,HEIGHT:24,CANVAS_WIDTH:33,CANVAS_HEIGHT:30,SPEED:0,JUMP_SPEED:250},MESSAGE_INFO:{PATH:"../assets/images/message.png",POSITION:new I,WIDTH:184,HEIGHT:267,CANVAS_WIDTH:184,CANVAS_HEIGHT:267,SPEED:0,DY:80},GAME_OVER_MESSAGE_INFO:{PATH:"../../assets/images/sprite.png",POSITION:new I(new c(194,231)),WIDTH:184,HEIGHT:33,CANVAS_WIDTH:243.1,CANVAS_HEIGHT:42.9,SPEED:0,DY:50},BOARD_INFO:{PATH:"../../assets/images/sprite.png",POSITION:new I(new c(175,272)),WIDTH:225,HEIGHT:116,CANVAS_WIDTH:292.5,CANVAS_HEIGHT:150.8,SPEED:0,DY:-3},BUTTON_INFO:{PATH:"../../assets/images/sprite.png",POSITION:new I(new c(246,400)),WIDTH:82,HEIGHT:28,CANVAS_WIDTH:123,CANVAS_HEIGHT:45,SPEED:0,DY:70},SCORE_INFO:{PATH:"",POSITION:new I,WIDTH:0,HEIGHT:0,CANVAS_POSITION:new I,CANVAS_WIDTH:24,CANVAS_HEIGHT:36}},l=class{constructor(t,e,s){this.position=t,this.isDebug=!1,this.width=e,this.height=s}getPosition(){return this.position}getWidth(){return this.width}getHeight(){return this.height}getDebug(){return this.isDebug}setPosition(t){this.position=t}setWidth(t){this.width=t}setHeight(t){this.height=t}draw(t){this.isDebug&&(t.strokeStyle="black",t.strokeRect(this.position.getX(),this.position.getY(),this.width,this.height))}isColliding(t){const e=this.position.getX(),s=this.position.getX()+this.width,i=this.position.getY(),a=this.position.getY()+this.height,n=t.getPosition().getX(),o=t.getPosition().getX()+t.getWidth(),g=t.getPosition().getY(),r=t.getPosition().getY()+t.getHeight();return s>=n&&e<=o&&a>=g&&i<=r}clamp(t,e,s){return Math.max(e,Math.min(s,t))}},S=class extends l{constructor(t,e){super(t,0,0),this.radius=e}getRadius(){return this.radius}setRadius(t){this.radius=t}draw(t){this.getDebug()&&(t.strokeStyle="black",t.beginPath(),t.arc(this.getPosition().getX()+this.radius,this.getPosition().getY()+this.radius,this.radius,0,2*Math.PI),t.stroke())}isColliding(t){const e=t.getPosition().getX(),s=t.getPosition().getX()+t.getWidth(),i=t.getPosition().getY(),a=t.getPosition().getY()+t.getHeight(),n=new c(this.getPosition().getX()+this.radius,this.getPosition().getY()+this.radius),o=new c(e+(s-e)/2,i+(a-i)/2),g=Math.abs(n.getX()-o.getX()),r=Math.abs(n.getY()-o.getY());return!(g>t.getWidth()/2+this.radius)&&(!(r>t.getHeight()/2+this.radius)&&(g<=t.getWidth()/2||(r<=t.getHeight()/2||Math.pow(g-t.getWidth()/2,2)+Math.pow(r-t.getHeight(),2)<=Math.pow(this.radius,2))))}},u=class{constructor(){this.listeners=[]}subscribe(t){this.listeners.push(t)}notify(t){this.listeners.forEach((e=>e(t)))}},m=class{constructor(t,e,s,i,a,n,o,g=!1,r=0){this.image=t,this.transform=e,this.width=s,this.height=i,this.canvasTransform=a,this.canvasWidth=n,this.canvasHeight=o,this.isColliderCircle=g,this.radius=r,this.positionChangeEvent=new u,this.isStatic=!1,this.isActive=!1,this.layer=0,this.image=t,this.transform=e,this.width=s*this.transform.getScale().getX(),this.height=i*this.transform.getScale().getY(),this.canvasTransform=a,this.canvasWidth=n*this.transform.getScale().getX(),this.canvasHeight=o*this.transform.getScale().getY(),this.collider=g?new S(this.getCanvasPosition(),this.radius):new l(this.getCanvasPosition(),this.getCanvasWidth(),this.getCanvasHeight()),this.positionChangeEvent.subscribe((t=>{this.collider.setPosition(t)}))}getImage(){return this.image}getTransform(){return this.transform}getCanvasTransform(){return this.canvasTransform}getWidth(){return this.width}getHeight(){return this.height}getCanvasWidth(){return this.canvasWidth}getCanvasHeight(){return this.canvasHeight}getLayer(){return this.layer}getIsStatic(){return this.isStatic}getIsActive(){return this.isActive}getPosition(){return this.transform.getPosition()}getCanvasPosition(){return this.canvasTransform.getPosition()}getCollider(){return this.collider}getRadius(){return this.radius}setLayer(t){this.layer=t}setIsStatic(t){this.isStatic=t}setActive(t){this.isActive=t}setScale(t){this.transform.setScale(t),this.width=this.width*this.transform.getScale().getX(),this.height=this.height*this.transform.getScale().getY()}setWidth(t){this.width=t}setHeight(t){this.height=t}setCanvasWidth(t){this.canvasWidth=t}setCanvasHeight(t){this.canvasHeight=t}setPosition(t){this.transform.setPosition(t)}setCanvasPosition(t){this.canvasTransform.setPosition(t),this.positionChangeEvent.notify(t)}setImage(t){this.image=t}setCollider(t){this.collider.setPosition(t)}setRadius(t){this.radius=t}start(){}handleInput(t){}draw(t,e){this.collider.draw(t)}update(t){}destroy(){}},_=class extends m{constructor(){super(...arguments),this.view=new g("canvas")}draw(){super.draw(this.view.getCtx(),this.view.getCanvas()),this.view.getCtx().drawImage(this.getImage(),this.getPosition().getX(),this.getPosition().getY(),this.getWidth(),this.getHeight(),this.getCanvasPosition().getX(),this.getCanvasPosition().getY(),this.getCanvasWidth(),this.getCanvasHeight())}getView(){return this.view}},p=class extends _{constructor(){super(...arguments),this.isMouseDown=!1,this.isClicked=!1}getIsClicked(){return this.isClicked}setIsClicked(t){this.isClicked=t}handleInput(t){this.setIsClicked(!1),"mousedown"===t.type?this.checkClickButton(t)&&(this.isMouseDown=!0):"mouseup"===t.type&&this.checkClickButton(t)&&this.isMouseDown&&(this.isMouseDown=!1,this.setIsClicked(!0))}checkClickButton(t){return t.clientX<=this.getCanvasPosition().getX()+this.getCanvasWidth()&&t.clientX>=this.getCanvasPosition().getX()&&t.clientY<=this.getCanvasPosition().getY()+this.getCanvasHeight()&&t.clientY>=this.getCanvasPosition().getY()}},N=class{constructor(){this.button=new p(i.getInstance().getImageByKey("sprite"),O.BUTTON_INFO.POSITION,O.BUTTON_INFO.WIDTH,O.BUTTON_INFO.HEIGHT,new I(new c((800-O.BUTTON_INFO.CANVAS_WIDTH)/2,(510+O.BUTTON_INFO.CANVAS_HEIGHT+O.BUTTON_INFO.DY)/2)),O.BUTTON_INFO.CANVAS_WIDTH,O.BUTTON_INFO.CANVAS_HEIGHT),this.button.setActive(!1)}build(){return this.button}addToScene(t){t.addGameObject(this.button)}},T=class{constructor(){this.gameOverMessage=new _(i.getInstance().getImageByKey("sprite"),O.GAME_OVER_MESSAGE_INFO.POSITION,O.GAME_OVER_MESSAGE_INFO.WIDTH,O.GAME_OVER_MESSAGE_INFO.HEIGHT,new I(new c((800-O.GAME_OVER_MESSAGE_INFO.CANVAS_WIDTH)/2,O.GAME_OVER_MESSAGE_INFO.CANVAS_HEIGHT+O.GAME_OVER_MESSAGE_INFO.DY)),O.GAME_OVER_MESSAGE_INFO.CANVAS_WIDTH,O.GAME_OVER_MESSAGE_INFO.CANVAS_HEIGHT)}build(){return this.gameOverMessage}addToScene(t){t.addGameObject(this.gameOverMessage)}},f=class{constructor(){this.board=new _(i.getInstance().getImageByKey("sprite"),O.BOARD_INFO.POSITION,O.BOARD_INFO.WIDTH,O.BOARD_INFO.HEIGHT,new I(new c((800-O.BOARD_INFO.CANVAS_WIDTH)/2,O.BOARD_INFO.CANVAS_HEIGHT+O.BOARD_INFO.DY)),O.BOARD_INFO.CANVAS_WIDTH,O.BOARD_INFO.CANVAS_HEIGHT)}build(){return this.board}addToScene(t){t.addGameObject(this.board)}},A=class extends m{constructor(t,e,s,i,a,n,o,g){super(t,e,s,i,a,n,o),this.resultImages=new Map,this.positionOffset=g}addImage(t,e){this.resultImages.set(t,e)}setPositionOffset(t){this.positionOffset=t}start(){}draw(t,e){if(!this.content||0===this.content.length)return;let s=this.positionOffset.getX();const i=this.positionOffset.getY();for(let e=0;e<this.content.length;e++){const a=this.content.charAt(e),n=this.resultImages.get(a);n&&(t.drawImage(n,this.getPosition().getX(),this.getPosition().getY(),n.width,n.height,s,i,this.getCanvasWidth(),this.getCanvasHeight()),s+=this.getCanvasWidth())}}},C=class extends A{constructor(t,e,s,i,a,n,o,g){super(t,e,s,i,a,n,o,g),this.isScore=!0,this.score=0,this.isScore=!0,this.score=0,this.setContent(String(this.score))}setScore(t){this.score=t,this.setContent(String(this.score))}getScore(){return this.score}setIsScore(t){this.isScore=t}getIsScore(){return this.isScore}addToScene(t){t.addGameObject(this)}setContent(t){this.content=t,this.loadImage()}loadImage(){if(this.content&&0!==this.content.length)for(let t=0;t<this.content.length;t++){const e=this.content.charAt(t);if(!this.resultImages.has(e)&&i.getInstance().getMapImage().has(e)){const t=i.getInstance().getMapImage().get(e);t instanceof HTMLImageElement?this.resultImages.set(e,t):console.warn(`Image for character '${e}' is not an instance of HTMLImageElement.`)}}}},w=class{constructor(t,e){this.getMass=()=>this.mass,this.getGravity=()=>this.gravity,this.getForce=()=>this.getMass()*this.getGravity(),this.getAcceleration=()=>this.getForce()/this.getMass(),this.destroy=()=>{this.mass=0,this.gravity=0},this.mass=t,this.gravity=e}},G=class{constructor(){this.fps=60,this.currentFrameIndex=0,this.lastFrameTime=0,this.listOfImages=[]}getFps(){return this.fps}setFps(t){this.fps=t}addImage(t){this.listOfImages.push(t)}getImage(){return this.listOfImages[this.currentFrameIndex]}update(t){const e=1e3/this.fps;this.lastFrameTime+=1e3*t,this.lastFrameTime>=e&&(this.currentFrameIndex=(this.currentFrameIndex+1)%this.listOfImages.length,this.lastFrameTime=0)}},P=Math.PI/180,E=class extends _{constructor(t,e,s,i,a,n,o,g,r){super(t,e,s,i,a,n,o,!0,15),this.speed=g,this.jumpSpeed=r,this.sprite=new G,this.isJumping=!1,this.mouseUp=!1,this.mouseDown=!1,this.rigid=new w(1,9.8),this.initSpriteAnimation()}setSpeed(t){this.speed=t}setJumpSpeed(t){this.jumpSpeed=t}initSpriteAnimation(){[i.getInstance().getImageByKey("yellowbird-downflap"),i.getInstance().getImageByKey("yellowbird-midflap"),i.getInstance().getImageByKey("yellowbird-upflap")].forEach((t=>{this.sprite.addImage(t)})),this.sprite.setFps(10)}update(t){if(this.sprite.update(t),this.setImage(this.sprite.getImage()),this.rigid){const e=this.getCanvasPosition().Down();this.speed+=this.rigid.getGravity(),this.setCanvasPosition(this.getCanvasPosition().add(e.multiplyScalar(t*this.speed)))}if(this.isJumping){const e=this.getCanvasPosition().Up();this.setCanvasPosition(this.getCanvasPosition().add(e.multiplyScalar(t*this.jumpSpeed))),this.speed=-this.jumpSpeed,this.isJumping=!1}this.speed>this.jumpSpeed?this.getCanvasTransform().getRotation()>=90*P?this.getCanvasTransform().setRotation(90*P):this.getCanvasTransform().setRotation(this.getCanvasTransform().getRotation()+P*t*500):this.speed&&this.jumpSpeed&&this.getCanvasTransform().setRotation(-30*P)}handleInput(t){"mousedown"===t.type&&(this.mouseDown=!0),"mouseup"===t.type&&(this.mouseUp=!0),this.mouseUp&&this.mouseDown&&(this.isJumping=!this.isJumping,this.mouseUp=!1,this.mouseDown=!1)}draw(){const t=this.getView().getCtx();t.save(),t.translate(this.getCanvasPosition().getX()+this.getCanvasWidth()/2,this.getCanvasPosition().getY()+this.getCanvasHeight()/2),t.rotate(this.getCanvasTransform().getRotation()),t.drawImage(this.getImage(),this.getPosition().getX(),this.getPosition().getY(),this.getWidth(),this.getHeight(),-this.getWidth()/2,-this.getHeight()/2,this.getCanvasWidth(),this.getCanvasHeight()),t.restore()}destroy(){this.speed=0,this.jumpSpeed=0,this.rigid.destroy()}},H=class{constructor(){this.bird=new E(i.getInstance().getImageByKey("yellowbird-downflap"),O.BIRD_INFO.POSITION,O.BIRD_INFO.WIDTH,O.BIRD_INFO.HEIGHT,new I(new c(200,(510-O.BIRD_INFO.HEIGHT)/2)),O.BIRD_INFO.CANVAS_WIDTH,O.BIRD_INFO.CANVAS_HEIGHT,O.BIRD_INFO.SPEED,O.BIRD_INFO.JUMP_SPEED)}build(){return this.bird}addToScene(t){t.addGameObject(this.bird)}},F=class{constructor(t,e,s,i,a){this.listOfGameObjects=[];for(let n=s;n<t;n++){const t=new I(new c(n*a.getX(),a.getY())),s=new i(e.getImage(),e.getTransform(),e.getWidth(),e.getHeight(),t,e.getCanvasWidth(),e.getCanvasHeight(),e.getIsStatic());this.listOfGameObjects.push(s)}}getListOfGameObjects(){return this.listOfGameObjects}setListOfGameObjects(t){this.listOfGameObjects=t}setAllLayer(t){this.listOfGameObjects.forEach((e=>e.setLayer(t)))}setAllActive(t){this.listOfGameObjects.forEach((e=>e.setActive(t)))}draw(t){}update(t){}},b=class{constructor(){this.background=new _(i.getInstance().getImageByKey("background-day"),new I(new c(O.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.POSITION.getX(),O.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.POSITION.getY())),O.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.WIDTH,O.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.HEIGHT,new I(new c(O.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_POSITION.getX(),O.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_POSITION.getY())),O.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_WIDTH,O.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_HEIGHT)}build(){return this.background}},v=class{constructor(){const t=new b;this.listOfBackgrounds=new F(O.LIST_OF_BACKGROUNDS_INFO.NUMBER_OF_BACKGROUNDS,t.build(),O.LIST_OF_BACKGROUNDS_INFO.INDEX_START,_,new c(O.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_WIDTH,O.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_POSITION.getY()))}build(){return this.listOfBackgrounds}addToScene(t){t.addListOfGameObjects(this.listOfBackgrounds.getListOfGameObjects())}},D=class extends m{constructor(){super(new Image,new I,0,0,new I,0,0),this.listOfGameObjects=[]}update(t){this.listOfGameObjects.forEach((e=>{e.update(t)}))}addToContainer(t){this.listOfGameObjects.push(t)}},y=class extends D{constructor(){super()}setGameManager(t,e){this.listOfGrounds=t,this.listOfPipes=e,this.addToContainer(this.listOfGrounds),this.addToContainer(this.listOfPipes)}getListOfGrounds(){return this.listOfGrounds}getListOfPipes(){return this.listOfPipes}addToScene(t){t.addGameObject(this)}},R=class extends _{constructor(){super(...arguments),this.speed=0}setSpeed(t){this.speed=t}getSpeed(){return this.speed}update(t){const e=this.getCanvasPosition().Left();this.setCanvasPosition(this.getCanvasPosition().add(e.multiplyScalar(t*this.speed)))}destroy(){this.speed=0}},L=class extends F{setAllSpeed(t){this.getListOfGameObjects().forEach((e=>e.setSpeed(t)))}findLastGround(t){for(let e=t.getListOfGameObjects().length-1;e>=0;e--)if(t.getListOfGameObjects()[e]instanceof R)return e;return 0}findFirstGround(t){for(let e=0;e<t.getListOfGameObjects().length;e++)if(t.getListOfGameObjects()[e]instanceof R)return e;return 0}update(t){const e=this.findLastGround(o.getInstance().getScene("gamePlay")),s=this.findFirstGround(o.getInstance().getScene("gamePlay")),i=o.getInstance().getScene("gamePlay").getListOfGameObjects()[s],a=o.getInstance().getScene("gamePlay").getListOfGameObjects()[e];if(i.getCanvasPosition().getX()+i.getCanvasWidth()<=0){this.getListOfGameObjects().splice(0,1);const t=new R(i.getImage(),i.getTransform(),i.getWidth(),i.getHeight(),new I(new c(a.getCanvasPosition().getX()+i.getCanvasWidth(),510-i.getCanvasHeight())),i.getCanvasWidth(),i.getCanvasHeight());t.setSpeed(i.getSpeed()),t.setLayer(i.getLayer()),this.getListOfGameObjects().push(t),o.getInstance().getScene("gamePlay").addGameObject(t),o.getInstance().getScene("gamePlay").removeGameObject(i)}}destroy(){this.getListOfGameObjects().forEach((t=>t.destroy()))}},j=class{constructor(){this.listOfGrounds=new L(O.LIST_OF_GROUNDS_INFO.NUMBER_OF_GROUNDS,new R(i.getInstance().getImageByKey("ground"),O.LIST_OF_GROUNDS_INFO.GROUND_INFO.POSITION,O.LIST_OF_GROUNDS_INFO.GROUND_INFO.WIDTH,O.LIST_OF_GROUNDS_INFO.GROUND_INFO.HEIGHT,O.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_POSITION,O.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_WIDTH,O.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_HEIGHT),O.LIST_OF_GROUNDS_INFO.INDEX_START,R,new c(O.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_WIDTH,O.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_POSITION.getPosition().getY())),this.listOfGrounds.setAllSpeed(O.LIST_OF_GROUNDS_INFO.GROUND_INFO.SPEED)}build(){return this.listOfGrounds}addToScene(t){t.addListOfGameObjects(this.listOfGrounds.getListOfGameObjects())}},B=class extends _{constructor(){super(...arguments),this.speed=0}setSpeed(t){this.speed=t}getSpeed(){return this.speed}update(t){const e=this.getCanvasPosition().Left();this.setCanvasPosition(this.getCanvasPosition().add(e.multiplyScalar(t*this.speed)))}destroy(){this.speed=0}},M=class extends F{constructor(t,e,s,i,a,n,o){super(t,e,s,i,a),this.internalTimer=0,this.speed=0,this.isDestroyed=!1;for(let g=s;g<t;g++){const t=new I(new c(g*a.getX(),a.getY()+e.getHeight()+n)),s=new i(o,e.getTransform(),e.getWidth(),e.getHeight(),t,e.getCanvasWidth(),e.getCanvasHeight());this.getListOfGameObjects().push(s)}this.speed=O.LIST_OF_PIPES_INFO.PIPE_INFO.SPEED,this.sortCanvasPosition()}sortCanvasPosition(){this.getListOfGameObjects().sort(((t,e)=>t.getCanvasPosition().getX()-e.getCanvasPosition().getX()))}getIsDestroyed(){return this.isDestroyed}setIsDestroyed(t){this.isDestroyed=t}setAllSpeed(t){this.getListOfGameObjects().forEach((e=>e.setSpeed(t)))}findFirstPipes(t){for(let e=0;e<t.getListOfGameObjects().length;e++)if(t.getListOfGameObjects()[e]instanceof B)return e;return 0}findLastPipes(t){for(let e=t.getListOfGameObjects().length-1;e>=0;e--)if(t.getListOfGameObjects()[e]instanceof B)return e;return 0}update(t){this.internalTimer+=t,2==this.internalTimer&&(this.speed+=50,this.internalTimer=0);const e=this.findFirstPipes(o.getInstance().getScene("gamePlay")),s=this.findLastPipes(o.getInstance().getScene("gamePlay")),i=o.getInstance().getScene("gamePlay").getListOfGameObjects()[e],a=o.getInstance().getScene("gamePlay").getListOfGameObjects()[e+1],n=o.getInstance().getScene("gamePlay").getListOfGameObjects()[s-1],g=o.getInstance().getScene("gamePlay").getListOfGameObjects()[s];if(i.getCanvasPosition().getX()<=-i.getCanvasWidth()){this.getListOfGameObjects().splice(0,2),this.isDestroyed=!0;const t=new B(i.getImage(),i.getTransform(),i.getWidth(),i.getHeight(),new I(new c(g.getCanvasPosition().getX()+d(500,600),d(-200,-100))),i.getCanvasWidth(),i.getCanvasHeight());t.setSpeed(this.speed),t.setLayer(i.getLayer()),t.setActive(i.getIsActive());const e=new B(a.getImage(),a.getTransform(),a.getWidth(),a.getHeight(),new I(new c(t.getCanvasPosition().getX(),t.getCanvasPosition().getY()+t.getCanvasHeight()+d(75,80))),a.getCanvasWidth(),a.getCanvasHeight());e.setSpeed(this.speed),e.setLayer(n.getLayer()),e.setActive(n.getIsActive()),this.getListOfGameObjects().push(t),this.getListOfGameObjects().push(e),o.getInstance().getScene("gamePlay").addGameObject(t),o.getInstance().getScene("gamePlay").addGameObject(e),o.getInstance().getScene("gamePlay").removeGameObject(i),o.getInstance().getScene("gamePlay").removeGameObject(a)}}},W=class{constructor(){this.listOfPipes=new M(O.LIST_OF_PIPES_INFO.NUMBER_OF_PIPES,new B(i.getInstance().getImageByKey("pipe-green-down"),O.LIST_OF_PIPES_INFO.PIPE_INFO.POSITION,O.LIST_OF_PIPES_INFO.PIPE_INFO.WIDTH,O.LIST_OF_PIPES_INFO.PIPE_INFO.HEIGHT,O.LIST_OF_PIPES_INFO.PIPE_INFO.CANVAS_POSITION,O.LIST_OF_PIPES_INFO.PIPE_INFO.CANVAS_WIDTH,O.LIST_OF_PIPES_INFO.PIPE_INFO.CANVAS_HEIGHT),O.LIST_OF_PIPES_INFO.INDEX_START,B,O.LIST_OF_PIPES_INFO.PIPE_INFO.CANVAS_POSITION.getPosition(),O.LIST_OF_PIPES_INFO.PIPE_INFO.SPACE,i.getInstance().getImageByKey("pipe-green")),this.listOfPipes.setAllSpeed(O.LIST_OF_PIPES_INFO.PIPE_INFO.SPEED)}build(){return this.listOfPipes}addToScene(t){t.addListOfGameObjects(this.listOfPipes.getListOfGameObjects())}},U=class{constructor(){this.score=new C(new Image,O.SCORE_INFO.POSITION,O.SCORE_INFO.WIDTH,O.SCORE_INFO.HEIGHT,O.SCORE_INFO.CANVAS_POSITION,O.SCORE_INFO.CANVAS_WIDTH,O.SCORE_INFO.CANVAS_HEIGHT,new c(400,25.5))}build(){return this.score}addToScene(t){t.addGameObject(this.score)}},V=class extends a{constructor(){super()}create(){const t=new H;this.listOfBackgroundsBuilder=new v;const s=new j,i=new W;this.scoreBuilder=new U;const a=new y;a.setGameManager(s.build(),i.build()),t.addToScene(this),this.listOfBackgroundsBuilder.addToScene(this),s.addToScene(this),i.addToScene(this),a.addToScene(this),this.scoreBuilder.addToScene(this),t.build().setLayer(2),this.listOfBackgroundsBuilder.build().setAllLayer(0),s.build().setAllLayer(2),i.build().setAllLayer(1),this.scoreBuilder.build().setLayer(2),e.getInstance().addObject(t.build())}update(t){this.checkCollision()?(localStorage.setItem("SCORE",String(this.scoreBuilder.build().getScore())),o.getInstance().getScene("gameOver").setIsActive(!0),this.removeScore()):(super.update(t),this.calculateScore())}checkCollision(){for(let t=0;t<this.getListOfGameObjects().length-1;t++){const e=this.getListOfGameObjects()[t];for(let s=t+1;s<this.getListOfGameObjects().length;s++){const t=this.getListOfGameObjects()[s];if(e instanceof E&&t instanceof R){if(e.getCollider().isColliding(t.getCollider()))return!0}else if(e instanceof R&&t instanceof E&&t.getCollider().isColliding(e.getCollider()))return!0;if(e instanceof E&&t instanceof B){if(e.getCollider().isColliding(t.getCollider()))return!0}else if(e instanceof B&&t instanceof E&&t.getCollider().isColliding(e.getCollider()))return!0;if(e instanceof E&&e.getCollider().getPosition().getY()<-e.getCanvasHeight())return!0}}return!1}calculateScore(){let t,e,s;for(let i=0;i<this.getListOfGameObjects().length;i++){const a=this.getListOfGameObjects()[i];a instanceof y?t=a:a instanceof C?e=a:a instanceof E&&(s=a)}if(t){t.getListOfPipes().getIsDestroyed()&&(null==e||e.setIsScore(!0));const i=this.getListOfGameObjects()[t.getListOfPipes().findFirstPipes(this)];e&&s&&e.getIsScore()&&s.getCanvasPosition().getX()>i.getCanvasPosition().getX()+i.getCanvasWidth()&&(e.setScore(e.getScore()+1),e.setIsScore(!1),t.getListOfPipes().setIsDestroyed(!1))}}removeScore(){for(let t=0;t<this.getListOfGameObjects().length;t++)this.getListOfGameObjects()[t]instanceof C&&this.getListOfGameObjects().splice(t,1)}},K=class extends a{constructor(){super()}create(){const t=new T,s=new f,i=new N;this.score=new C(new Image,new I,0,0,new I,20,25,new c(482,190)),this.highScore=new C(new Image,new I,0,0,new I,20,25,new c(482,245)),localStorage.getItem("HIGH_SCORE")&&this.highScore.setScore(Number(localStorage.getItem("HIGH_SCORE"))),t.addToScene(this),s.addToScene(this),i.addToScene(this),this.score.addToScene(this),this.highScore.addToScene(this),this.score.setLayer(1),this.highScore.setLayer(1),this.button=i.build(),e.getInstance().addObject(this.button)}update(t){super.update(t),localStorage.getItem("SCORE")&&this.score.setScore(Number(localStorage.getItem("SCORE"))),null!=localStorage.getItem("HIGH_SCORE")?Number(localStorage.getItem("HIGH_SCORE"))<this.score.getScore()&&(localStorage.setItem("HIGH_SCORE",this.score.getScore().toString()),this.highScore.setScore(this.score.getScore())):(localStorage.setItem("HIGH_SCORE",this.score.getScore().toString()),this.highScore.setScore(Number(localStorage.getItem("HIGH_SCORE")))),this.checkIsClicked()&&(o.getInstance().getScene("gameOver").setIsActive(!1),o.getInstance().updateScene("gamePlay",new V),o.getInstance().getScene("gamePlay").setIsActive(!0))}checkIsClicked(){return!(!this.button||!this.button.getIsClicked())}},x=class extends a{constructor(){super()}create(){i.getInstance().loadImageKey("0","../../../assets/images/0.png"),i.getInstance().loadImageKey("1","../../../assets/images/1.png"),i.getInstance().loadImageKey("2","../../../assets/images/2.png"),i.getInstance().loadImageKey("3","../../../assets/images/3.png"),i.getInstance().loadImageKey("4","../../../assets/images/4.png"),i.getInstance().loadImageKey("5","../../../assets/images/5.png"),i.getInstance().loadImageKey("6","../../../assets/images/6.png"),i.getInstance().loadImageKey("7","../../../assets/images/7.png"),i.getInstance().loadImageKey("8","../../../assets/images/8.png"),i.getInstance().loadImageKey("9","../../../assets/images/9.png"),i.getInstance().loadImageKey("ground","../../../assets/images/base.png"),i.getInstance().loadImageKey("yellowbird-downflap","../../../assets/images/yellowbird-downflap.png"),i.getInstance().loadImageKey("yellowbird-midflap","../../../assets/images/yellowbird-midflap.png"),i.getInstance().loadImageKey("yellowbird-upflap","../../../assets/images/yellowbird-upflap.png"),i.getInstance().loadImageKey("pipe-green-down","../../../assets/images/pipe-green-down.png"),i.getInstance().loadImageKey("pipe-green","../../../assets/images/pipe-green.png"),i.getInstance().loadImageKey("message","../../../assets/images/message.png"),i.getInstance().loadImageKey("background-day","../../../assets/images/background-day.png"),i.getInstance().loadImageKey("background-night","../../../assets/images/background-night.png"),i.getInstance().loadImageKey("gameover","../../../assets/images/gameover.png"),i.getInstance().loadImageKey("sprite","../../../assets/images/sprite.png")}update(t){super.update(t)}},X=class{constructor(){this.message=new _(i.getInstance().getImageByKey("message"),O.MESSAGE_INFO.POSITION,O.MESSAGE_INFO.WIDTH,O.MESSAGE_INFO.HEIGHT,new I(new c((800-O.MESSAGE_INFO.CANVAS_WIDTH)/2,(510-O.MESSAGE_INFO.CANVAS_HEIGHT-O.MESSAGE_INFO.DY)/2)),O.MESSAGE_INFO.CANVAS_WIDTH,O.MESSAGE_INFO.CANVAS_HEIGHT)}build(){return this.message}addToScene(t){t.addGameObject(this.message)}},Y=class extends a{constructor(){super()}create(){const t=new H,e=new v,s=new j,i=new X;t.addToScene(this),e.addToScene(this),s.addToScene(this),i.addToScene(this),t.build().setLayer(2),e.build().setAllLayer(0),s.build().setAllLayer(2),i.build().setLayer(3),t.build().destroy(),s.build().setAllSpeed(0)}update(t){super.update(t)}handleInput(t){o.getInstance().getScene("gamePlay").setIsActive(!0),o.getInstance().getScene("ready").setIsActive(!1)}},k=class extends r{setUp(){e.getInstance().addEvent("mousedown"),e.getInstance().addEvent("mouseup");const t=new x,s=new V,i=new Y,a=new K;o.getInstance().addScene("preload",t),o.getInstance().addScene("ready",i),o.getInstance().addScene("gamePlay",s),o.getInstance().addScene("gameOver",a),e.getInstance().addScene(s),e.getInstance().addScene(i),e.getInstance().addScene(a),o.getInstance().getScene("preload").setIsActive(!0),o.getInstance().getScene("ready").setIsActive(!0)}};new class{constructor(){new k(800,510)}}})();