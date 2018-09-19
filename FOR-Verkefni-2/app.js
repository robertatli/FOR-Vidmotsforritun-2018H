let vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'',
'void main()',
'{',
'	gl_Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

let fragmentShaderText = 
[
'precision mediump float;',
' void main()',
'{',
'	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
'}'
].join('\n');


let InitDemo = function () {
	console.log("this is working");

	let canvas = document.getElementById('game-surface');
	let gl = canvas.getContext('webgl');

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	let vertexShader = gl.createShader(gl.VERTEX_SHADER);
	let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}
	gl.compileShader(fragmentShader);
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	let program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

	// 
	// Create buffer
	// 
	let triangleVertices =
	[ // X, Y
		0.0,0.5,
		-0.5,-0.5,
		0.5,-0.5
	];

	let triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

	let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	gl.vertexAttribPointer(
		positionAttribLocation, // staðsetning Attribute
		2, // magn elementa i attributi
		gl.FLOAT, // tegund elementa
		gl.FALSE, 
		2 * Float32Array.BYTES_PER_ELEMENT,// stærð einstaklings vertexi
		0// offset milli vertexi og attributi
	);

	gl.enableVertexAttribArray(positionAttribLocation);

	//
	// Main render loop
	//
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, 3);

};

