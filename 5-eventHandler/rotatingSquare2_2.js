var gl;

var theta = 0.0;
var thetaLoc;

var delay = 100;
var direction = true;

window.onload = function init() {
  var canvas = document.getElementById('gl-canvas');

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //  Load shaders and initialize attribute buffers

  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  var vertices = [vec2(0, 1), vec2(-1, 0), vec2(1, 0), vec2(0, -1)];

  // Load the data into the GPU

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer

  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  thetaLoc = gl.getUniformLocation(program, 'theta');
  // dd

  // Initialize event handlers
  //	var myButton = document.getElementById("Direction");
  //	myButton.addEventListener("click", function() {
  //		if (event.button == 0) {
  //			direction = !direction;
  //		}
  //	});

  //    document.getElementById("Direction").onclick = function () {
  //		console.log(event.button)
  //        direction = !direction;
  //    };

  var myButton = document.getElementById('Direction');
  myButton.addEventListener('click', function () {
    if (event.shiftKey == 0) {
      direction = !direction;
    }
  });

  document.getElementById('Controls').onclick = function (event) {
    //switch( event.srcElement.index ) {
    switch (event.target.index) {
      case 0:
        direction = !direction;
        break;
      case 1:
        delay /= 2.0;
        break;
      case 2:
        delay *= 2.0;
        break;
    }
  };

  window.addEventListener('keydown', function () {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 49: // ��1�� key
        direction = !direction;
        break;
      case 50: // ��2�� key
        delay /= 2.0;
        break;
      case 51: // ��3�� key
        delay *= 2.0;
        break;
    }
  });

  /*
    window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch(key) {
          case '1':
            direction = !direction;
            break;

          case '2':
            delay /= 2.0;
            break;

          case '3':
            delay *= 2.0;
            break;
        }
    };
	*/
  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  theta += direction ? 0.1 : -0.1;
  gl.uniform1f(thetaLoc, theta);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  setTimeout(function () {
    requestAnimFrame(render);
  }, delay);
}

/*
function render() {
   	setTimeout(function() {
   		requestAnimFrame(render);
   		gl.clear(gl.COLOR_BUFFER_BIT);

   		theta += (direction ? 0.1 : -0.1);
   		gl.uniform1f(thetaLoc, theta);

   		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
   	}, delay);
}
*/
