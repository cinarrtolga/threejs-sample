var scene, camera, renderer, canvasArea, car, raycaster, 
mouse, modelLoader, controls, loadingManager, mouseXLoc, 
mouseYLoc;

//This block for model loading control. 
//After the load method completely, It calls canvas on screen. 
loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = function () {
    getCanvas();
};

//This is like my artboard. I putted all of my objects there and render all of them together.
scene = new THREE.Scene();

//This camera is like a eye. Shows 3D models.
//After defining the camera, I defined the location for it.
camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight);
camera.position.set(40, 20, -50);

renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

//With the following code block, I defined click event and choose the section from html for my canvas. 
renderer.domElement.addEventListener("click", objectClickEvent, true);
canvasArea = document.getElementById("canvas");
canvasArea.appendChild(renderer.domElement);

//After resizing my browser, I calculate the following parts for a responsive canvas.
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
});

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

//This section for using the mouse on my canvas as a controller. It is possible to define it like a click event.
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

//Following lines for scene lights. I defined it as an external method. Light color is standart. Just positions are dynamic.
//If I do not define this, my model appears dark. I used 4 different lights for better visibility. 
addPointLight(0, 300, 500);
addPointLight(500, 100, 0);
addPointLight(0, 100, -500);
addPointLight(-500, 300, 0);

load3DModel();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

//In this section, I loaded my car model. I downloaded this model from Sketchfab. 
//For loading this model, I used GLTF Loader. GLTF Loader JS included on my html document.
function load3DModel(){
    modelLoader = new THREE.GLTFLoader(loadingManager);
    modelLoader.load('assets/models/substance_futuristic_sports_car/scene.gltf', function (gltf) {
        car = gltf.scene;
        const model = car.children[0]
        scene.add(car);
    
        //I defined 3 sample points on my 3D model via the following external method.
        createMarker(model, new THREE.Vector3(1.8, 2.5, 1.5), "tire");
        createMarker(model, new THREE.Vector3(0, -3.5, 1.5), "engine");
        createMarker(model, new THREE.Vector3(0, -0.7, 0.3), "power");
    });
}

//With the following method I defined hot-spots on my 3D model. 
//I defined 2 visibility for every spot. It is like an active/passive.
//Passive one has transparency. I already defined the name for the click event.
function createMarker(model, position, key) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = "";
    const map = textureLoader.load("assets/images/marker.png");
    map.encoding = THREE.sRGBEncoding;

    const spriteMaterialFront = new THREE.SpriteMaterial({ map });

    const spriteFront = new THREE.Sprite(spriteMaterialFront);
    spriteFront.position.copy(position)
    spriteFront.name = key;
    spriteFront.scale.x = 0.4;
    spriteFront.scale.y = 0.4;
    spriteFront.scale.z = 0.4;

    const spriteMaterialRear = new THREE.SpriteMaterial({
        map,
        opacity: 0.1,
        transparent: true,
        depthTest: false
    });

    const spriteRear = new THREE.Sprite(spriteMaterialRear);
    spriteRear.position.copy(position)
    spriteRear.name = key;
    spriteRear.scale.x = 0.4;
    spriteRear.scale.y = 0.4;
    spriteRear.scale.z = 0.4;

    model.add(spriteFront, spriteRear)
}

//The following method is the click method for my canvas. 
//I filtered the clicked area via name property which I defined on the marker create method. 
//If clicked location is one of the filtered hotspot location, I triggered the get modal method from actions.js file.
function objectClickEvent(event) {
    mouseXLoc = event.clientX;
    mouseYLoc = event.clientY;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(car.children, true);

    intersects.forEach(function (element) {
        switch (element.object.name) {
            case "tire":
                getModal(element.object.name, mouseXLoc, mouseYLoc);
                break;
            case "engine":
                getModal(element.object.name, mouseXLoc, mouseYLoc);
                break;
            case "power":
                getModal(element.object.name, mouseXLoc, mouseYLoc);
                break;
            default:
            console.log("You clicked to empty place.");
        }
    });
}

function addPointLight(position1, position2, position3) {
    var light = new THREE.PointLight(0xc4c4c4, 2);
    light.position.set(position1, position2, position3);
    scene.add(light);
}