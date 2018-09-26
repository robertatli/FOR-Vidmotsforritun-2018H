let vertexShaderText = //vertex shader sem stjórnar stærð og staðsetningu því sem við erum að teikna
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'	fragColor = vertColor;',
'	gl_Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

let fragmentShaderText = //framgent shader sem stjórnar litinum á því sem við erum að teikna
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
' void main()',
'{',
'	gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');


let InitDemo = function () {
	console.log("this is working");// lætur vita að það kom engin villa

	let canvas = document.getElementById('game-surface'); // nær í canvas elementið
	let gl = canvas.getContext('webgl'); // lætur vita að við ætlum að nota webGL

	if (!gl) { // ef gl er ekki supported, notaðu backup experimental version (fyrir microsoft edge t.d.)
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) { // ef browserinn supportar ekki WebGL (Internet Explorer t.d.)
		alert('Your browser does not support WebGL');
	}

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	let vertexShader = gl.createShader(gl.VERTEX_SHADER);
	let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader); // compilear vertexshaderinn
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) { //hendir út error ef compilerinn fékk error
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}
	gl.compileShader(fragmentShader);
	gl.compileShader(fragmentShader); // compilear fragmentshaderinn
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {// hendir út error ef compilerinn fékk error
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	let program = gl.createProgram(); //býr til program til að nota fragment og vertex shaderina saman.
	gl.attachShader(program, vertexShader); //tengir vertex shaderinn við programið
	gl.attachShader(program, fragmentShader); // tengir fragment shaderinn við programið
	gl.linkProgram(program); //linkar allt saman.
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { // hendir út error ef gekk ekki að linka saman
		console.error('ERROR linking program', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program); // validatar programið
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) { //hendir ut error ef validator naði ekki að validata
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

	// 
	// Bufferinn
	// 

	let angle = 0;// býr til angle variable sem mun vera notuð til að snua myndinni
function draw() { // function sem teiknar á skjáinn þríhyrninginn
	let triangleVertices =
	[ // X, Y                        R   G   B
		0.0,0.5 * Math.cos(angle),   1.0,1.0,0.0, //teiknar punkt sem færist upp og niður
		-0.5,-0.5 * Math.cos(angle), 0.7,0.0,1.0, //teiknar punkt sem færist upp og niður
		0.5 * Math.cos(angle),-0.5,  0.1,1.0,0.6 //teiknar punkt sem færist til hliðar fram og til baka.
	];

	let triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

	let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	let colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		positionAttribLocation, // staðsetning Attribute
		2, // magn elementa i attributi
		gl.FLOAT, // tegund elementa
		gl.FALSE, 
		5 * Float32Array.BYTES_PER_ELEMENT,// stærð einstaklings vertexi
		0// offset milli vertexi og attributi
	);
	gl.vertexAttribPointer(
		colorAttribLocation, // staðsetning Attribute
		3, // magn elementa i attributi
		gl.FLOAT, // tegund elementa
		gl.FALSE, 
		5 * Float32Array.BYTES_PER_ELEMENT,// stærð einstaklings vertexi
		2 * Float32Array.BYTES_PER_ELEMENT// offset milli vertexi og attributi
	);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);

	//
	// aðal render loopan
	//
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	angle += 0.005; // bætir smá við "angle-ið" í hverjum frame
	requestAnimationFrame(draw); // teiknar nýja mynd á hverjum frame
}
requestAnimationFrame(draw);

};

