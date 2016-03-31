function loadClock(){
	/* Textures */
	THREE.crossOrigin = "";


	/* MATERIALS */
	var materialScene = new THREE.MeshBasicMaterial( { color: 0x000000, shading: THREE.FlatShading } );

	var path = "textures/SwedishRoyalCastle/";
	var format = '.jpg';
	var urls = [
			path + 'px' + format, path + 'nx' + format,
			path + 'py' + format, path + 'ny' + format,
			path + 'pz' + format, path + 'nz' + format
		];

	var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
	reflectionCube.format = THREE.RGBFormat;

	var refractionCube = THREE.ImageUtils.loadTextureCube( urls );
	refractionCube.mapping = THREE.CubeRefractionMapping;
	refractionCube.format = THREE.RGBFormat;

	//var glassMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, specular:0xaa0000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.25 } );

	var cubeMaterial1 = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube } );
	var cubeMaterial2 = new THREE.MeshLambertMaterial( { color: 0xeecc00, envMap: refractionCube, refractionRatio: 0.95 } );

	var glassMaterial = new THREE.MeshPhongMaterial( {
		color: 0xaa8822,
		envMap: reflectionCube,
		combine: THREE.MixOperation,
		reflectivity: 0.7,
		opacity:0.4,
		opacityMap : THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpScale  :  0.005,
		transparent: true
	});

	var transparentMaterial = new THREE.MeshPhongMaterial( {
		color: 0xaa8822,
		envMap: reflectionCube,
		combine: THREE.MixOperation,
		reflectivity: 0.5,
		opacity:0.0,
		opacityMap : THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpScale  :  0.01,
		transparent: true
	});

	var frameMaterial = new THREE.MeshPhongMaterial( {
		color: 0x565544,
		envMap: reflectionCube,
		combine: THREE.MixOperation,
		reflectivity: 0.6,
		opacityMap : THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpScale  :  0.1
	});

	var pencilMaterial1 = new THREE.MeshPhongMaterial( {
		color: 0xc12e2e,
		envMap: reflectionCube,
		combine: THREE.MixOperation,
		reflectivity: 0.01,
		opacity:1,
		opacityMap : THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpScale  :  0.00,

	});

	var pencilMaterial2 = new THREE.MeshPhongMaterial( {
		color: 0x333333,
		envMap: reflectionCube,
		combine: THREE.MixOperation,
		reflectivity: 0.3,
		opacity:1,
		opacityMap : THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
	});

	var pencilMaterial3 = new THREE.MeshPhongMaterial( {
		color: 0x111111,
		envMap: reflectionCube,
		combine: THREE.MixOperation,
		emissive   :  new THREE.Color("rgb(0,0,0)"),
		specular   :  new THREE.Color("rgb(1,1,1)"),
		reflectivity: 0.001,
		opacity:1,
		opacityMap : THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/scratched_glass.jpg", {}, function(){}),
		bumpScale  :  0.20,
	});


	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = reflectionCube;

	var material = new THREE.ShaderMaterial( {

		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide

	} ),

	mesh = new THREE.Mesh( new THREE.BoxGeometry( 10000, 10000, 10000 ), material );
	//sceneGraph.add( mesh );
	mesh.rotation.y = Math.PI/4;



	mesh.rotation.y = Math.PI/4;

	/* Wall */
	var wallMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(50,50,30)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(19,10,4)"),
		specularMap    :  THREE.ImageUtils.loadTexture("obj/wood1.jpg", {}, function(){}),
		shininess  :  100,
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/wood1.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/wood1.jpg", {}, function(){}),
		bumpScale  :  2.5,
	});


	/* Pointers */
	var handMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(50,50,30)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(55,55,55)"),
		shininess  :  5,
		bumpMap    :  THREE.ImageUtils.loadTexture("textures/brushed_metal.png", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/blackmetal.png", {}, function(){}),
		bumpScale  :  10.1,
	});

	/* dial */
	var dialMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(100,100,100)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(20,20,20)"),
		specularMap    :  THREE.ImageUtils.loadTexture("obj/dial12.jpg", {}, function(){}),
		shininess  :  10,
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/dial12.jpg", {}, function(){}),
		bumpScale  :  2,

	});

	var dialMaterial2 = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(100,100,100)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(20,20,20)"),
		shininess  :  8,
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/dial2.jpg", {}, function(){}),
		bumpScale  :  2,

	});


	var secondFrameMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(100,100,100)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(20,20,20)"),
		shininess  :  10,
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/wood1.jpg", {}, function(){}),
		bumpScale  :  5,

	});

	var boltsMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(50,50,50)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(20,20,20)"),
		shininess  : 20,
		bumpMap    :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		map        :  THREE.ImageUtils.loadTexture("obj/copper1.jpg", {}, function(){}),
		bumpScale  :  1,

	});

	var sketchMaterial = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(50,50,50)"),
		emissive   :  new THREE.Color("rgb(7,3,5)"),
		specular   :  new THREE.Color("rgb(20,20,20)"),
		shininess  : 20,
		map        :  THREE.ImageUtils.loadTexture("obj/sketch.JPG", {}, function(){}),
		bumpScale  :  1,

	});



	onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	onError = function ( xhr ) {
		console.log("build house error " + xhr);
	};
	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

	// Loader
	loader2 = new THREE.OBJMTLLoader();

	loader2.load( "obj/hour_handle.obj", "obj/hour_handle.mtl", function(object){

		hourHand.add(object);
		object.castShadow = true;
		object.receiveShadow = false;

		object.traverse( function ( child )
	    {
	        if ( child instanceof THREE.Mesh )
	            child.material = handMaterial;
	    });


	}, onProgress, onError);

	loader2.load( "obj/minute_handle.obj", "obj/minute_handle.mtl", function(object){

		object.castShadow = true;
		object.receiveShadow = false;
		object.traverse( function ( child )
	    {
	        if ( child instanceof THREE.Mesh )
	            child.material = handMaterial;
	    });
		minuteHand.add(object);
	}, onProgress, onError);

	loader2.load( "obj/second_handle.obj", "obj/second_handle.mtl", function(object){
		secondHand.add(object);
		object.castShadow = true;
		object.receiveShadow = false;
	}, onProgress, onError);


	loader2.load( "obj/bolts.obj", "obj/bolts.mtl", function(object){

		clock.add(object);
		object.traverse( function ( child )
	    {
	        if ( child instanceof THREE.Mesh )
	            child.material = boltsMaterial;
	    });
	}, onProgress, onError);




	loader = new THREE.JSONLoader();
	//************* JSON ***********************

	loader.load("obj/clockFrame.js",

			function(geometry) {

				dial1 = new THREE.Mesh(geometry, frameMaterial);
				dial1.castShadow = false;
				dial1.receiveShadow = true;
				clock.add(dial1);

		});

	loader.load("obj/dial12.js",

			function(geometry) {

				dial1 = new THREE.Mesh(geometry, dialMaterial);
				dial1.castShadow = false;
				dial1.receiveShadow = true;
				clock.add(dial1);

		});

	loader.load("obj/dial2.js",

			function(geometry) {

				dial2 = new THREE.Mesh(geometry, dialMaterial2);
				dial2.castShadow = false;
				dial2.receiveShadow = true;


				clock.add(dial2);

		});

	loader.load("obj/secondFrame.js",

			function(geometry) {

				dial2 = new THREE.Mesh(geometry, secondFrameMaterial);
				dial2.castShadow = true;
				dial2.receiveShadow = true;


				clock.add(dial2);

		});

	loader.load("obj/glass.js",

			function(geometry) {

				dial2 = new THREE.Mesh(geometry, glassMaterial);
				dial2.castShadow = false;
				dial2.receiveShadow = false;

				clock.add(dial2);

		});



}





function setHands(){

	if(presentTime)
		secondsRot = -Math.PI*2*time.getSeconds()/60;
		//secondsRot = - Math.PI*2*new Date().getTime() / 60000;
	else
		 secondsRot = -Math.PI*2*time.getSeconds()/60 - (Date.now()-time_now)/100;


	minutesRot = -Math.PI*2*time.getMinutes()/60 + secondsRot/60;
	hoursRot = -Math.PI*2*time.getHours()/12 + minutesRot/12;

	secondHand.rotation.y = secondsRot;
	minuteHand.rotation.y = minutesRot;
	hourHand.rotation.y = hoursRot;
}


function addLights(){


var spotLight	= new THREE.SpotLight( 0x222221 );
	spotLight.target.position.set( 1, -1, -20);
	spotLight.intensity = 10;
	spotLight.shadowCameraNear	= 0.1;
	spotLight.castShadow		= true;
	spotLight.shadowDarkness	= 0.9;
	spotLight.shadowCameraVisible	= true;
	spotLight.position.set( 0, -800, 1000 );
	spotLight.shadowCameraVisible = false;

	sceneGraph.add ( spotLight );

	var spotLight2	= new THREE.SpotLight( 0x333332 );
	spotLight2.target.position.set( 1, -1, -20);
	spotLight2.intensity = 10;
	spotLight2.shadowCameraNear	= 0.1;
	spotLight2.castShadow		= true;
	spotLight2.shadowDarkness	= 0.6;
	spotLight2.shadowCameraVisible	= true;
	spotLight2.position.set( 0, 800, 1000 );
	spotLight2.shadowCameraVisible = false;

	sceneGraph.add ( spotLight2 );

	ambientLight = new THREE.AmbientLight( 0x222222 );
	//scene.add( ambientLight );

}

function loadDust(){
	materials = [];
	flakes = [];
	cloudGroup =new THREE.Object3D;
	geometry = new THREE.Geometry();
	var sunRadius = 5.3;
	sprite1 = THREE.ImageUtils.loadTexture( "textures/dust1.png", null);
	sprite2 = THREE.ImageUtils.loadTexture( "textures/dust2.png", null);
	sprite3 = THREE.ImageUtils.loadTexture( "textures/dust3.png", null);
	sprite4 = THREE.ImageUtils.loadTexture( "textures/dust2.png", null);
	sprite5 = THREE.ImageUtils.loadTexture( "textures/dust1.png", null);

	for ( i = 0; i < 1000; i ++ ) {

		var vertex = new THREE.Vector3();


		vertex.x = Math.random()* 4000 - 2000;
		vertex.y = Math.random() * 4000 - 2000;
		vertex.z = Math.random() * 4000 + 20;



		//if(Math.abs(vertex.x) > 1000 || Math.abs(vertex.y) > 1000 || Math.abs(vertex.z) > 1000) {
			geometry.vertices.push( vertex );
		//}
	}

	parameters = [ [ [0.0, 0.0, 0.0], sprite1, 1 ],
					 [ [0.0, 0.0, 0.0], sprite2, 3 ],
					 [ [0.0, 0.0, 1.0], sprite3, 5 ],
					 [ [1.0, 1.0, 0.0], sprite4, 10],
					 [ [1.0, 0.0, 0.0], sprite5, 20 ]];

	var particles = [];

	for ( i = 0; i < parameters.length; ++i ) {
		color  = parameters[i][0];
		sprite = parameters[i][1];
		size   = parameters[i][2];



		materials[i] = new THREE.PointCloudMaterial( { size: 20, map: sprite, blending: THREE.AdditiveBlending,
			depthTest: false, transparent : true, opacity : 0.1} );

		materials[i].color.setHSL( color[0], color[1], color[2] );

		particles = new THREE.PointCloud( geometry, materials[i] );



		flakes.push(particles);

	}

	for (var i = 0; i < flakes.length; ++i){cloudGroup.add(flakes[i]);}
			cloud.add(cloudGroup);
}
