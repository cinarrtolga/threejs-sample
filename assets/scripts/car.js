var scene, camera, renderer, canvasArea, car, raycaster, mouse, loader, controls, loadingManager, mouseXLoc, mouseYLoc;

loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = function () {
    getCanvas();
};

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight);
camera.position.set(40, 20, -50);

renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.domElement.addEventListener("click", objectClickEvent, true);
canvasArea = document.getElementById("canvas");
canvasArea.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
});

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

addPointLight(0, 300, 500);
addPointLight(500, 100, 0);
addPointLight(0, 100, -500);
addPointLight(-500, 300, 0);

loader = new THREE.GLTFLoader(loadingManager);
loader.load('assets/models/substance_futuristic_sports_car/scene.gltf', function (gltf) {
    car = gltf.scene;
    const model = car.children[0]
    scene.add(car);

    createMarker(model, new THREE.Vector3(1.8, 2.5, 1.5), "tire");
    createMarker(model, new THREE.Vector3(0, -3.5, 1.5), "engine");
    createMarker(model, new THREE.Vector3(0, -0.7, 0.3), "power");
});

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();

function createMarker(model, position, key) {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    const map = loader.load("assets/images/marker.png");
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
                //console.log("You clicked randomly");
        }
    });
}

function addPointLight(position1, position2, position3) {
    var light = new THREE.PointLight(0xc4c4c4, 2);
    light.position.set(position1, position2, position3);
    scene.add(light);
}