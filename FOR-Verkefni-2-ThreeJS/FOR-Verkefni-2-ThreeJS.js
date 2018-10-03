//scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//renderer
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// creating a cube
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry,material);
scene.add(cube);

camera.position.z = 5;

//resize projection on window resize
window.addEventListener('resize', function() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

//Set background color
renderer.setClearColor(0x333F47, 1);

//Create a light, set its position and add it to the scene
var light = new THREE.PointLight(0xffffff);
light.position.set(1,1,2);
scene.add(light);

//controls
controls = new THREE.OrbitControls(camera,renderer.domElement);


function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
	controls.update();
}
animate();