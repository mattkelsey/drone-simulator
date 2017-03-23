var scene, camera, renderer;

init();
animate();


// initialize scene
function init() {
    scene = new THREE.Scene();

    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer = new THREE.WebGLRenderer({
        antialias:true
    });

    renderer.setSize(width, height);

    // Materials
	var material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
    var green = new THREE.MeshPhongMaterial( { color: 0xAAFFAA, specular: 0x111111, shininess: 200 } );
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material);

    plane.position.set(0, 4, 0);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // var loader = new THREE.STLLoader();
	// loader.load( './Drone_v1-8.stl', function ( geometry ) {
	// 	var mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
    //
	// 	mesh.position.set( 0, 10, 6 );
	// 	mesh.rotation.set( -Math.PI / 2, 0, -Math.PI / 2 );
	// 	mesh.scale.set( .07, .07, .07 );
    //
	// 	mesh.castShadow = true;
	// 	mesh.receiveShadow = true;
    //
	// 	scene.add( mesh );
	// } );

    document.body.appendChild(renderer.domElement);


    var torus = new THREE.Mesh(new THREE.TorusGeometry(5, 5, 80, 60, Math.PI * 2), new THREE.MeshNormalMaterial());
    torus.position.set(0, 12, 0);
    torus.rotation.x = Math.PI / 2;
    // add the torus to the scene
    scene.add(torus);


    // Movement controls
    window.addEventListener("keydown", function(event) {
        switch (event.keyCode) {
            case 87: //w
                torus.position.x += 1;
                break;
            case 83: //s
                torus.position.x -= 1;
                break;
            case 65:
                torus.position.z -= 1;
                break;
            case 68:
                torus.position.z += 1;
                break;
            case 81:
                torus.position.y += 1;
                break;
            case 69:
                torus.position.y -= 1;
                break;
            case 192:
                console.log("Camera Position:", camera.position.x + " " + camera.position.y + " " + camera.position.z)
                break;
        }
    });

    // create camera and position in the scene
    camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 20000);
    camera.position.set(-70,50,-10);
    scene.add(camera);

    renderer.setClearColor(0x3f4a51, 1);

    // light source
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);

    //SPHERE
    // var sphere = new THREE.Mesh(new THREE.SphereGeometry(4,40,40), new THREE.MeshNormalMaterial(), .4, .4);
    // sphere.overdraw = true;
    // //sphere.position.set(0,0,-2);
    // sphere.position.set(0,15,2);
    // scene.add(sphere);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

}
// threejs updater
function animate() {
    requestAnimationFrame(animate);
    // render scene
    renderer.render(scene, camera);
}
