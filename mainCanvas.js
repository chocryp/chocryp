// window.onload = init;
console.ward = function () {}; // what warnings?

var stopAni = false;
var mobile = isMobile();
var oldWidth = 0;
const sw1 = window.location.href;

// console.log()

function init() {
  var img_2;
  var img_1;

  var l1 = new THREE.ImageLoader();
  l1.setCrossOrigin("Anonymous");
  img_1 = l1.load("./clear.svg", function (img) {
  });
  var l2 = new THREE.ImageLoader();
  l2.setCrossOrigin("Anonymous");
  img_2 = l2.load("./chocolate_logo.svg", function (img) {

    
  });


  setTimeout(init2, 1000, img_1, img_2);
}



function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // true for mobile device
    return true;
  }
  return false;
}
function init2(img_1, img_2) {
  var width = 50;
  var height = 50;
  var dist = width+10;
  var root = new THREERoot({
    
    createCameraControls: !true,
    antialias: window.devicePixelRatio === 1,
    alpha: true,
    fov: 80,
  });
  
  // root.renderer.setClearColor(0x051d1e, 0);

  root.renderer.setClearColor( 0xffffff, 0);
  root.renderer.setPixelRatio(window.devicePixelRatio || 1);
  bd1 = Math.abs(bd1.charCodeAt(0)-bd3.charCodeAt(0));
  if (bd1) {
    dist *= -1;
  }
  root.camera.position.set(0, 0, 60);

  var slide = new Slide(width, height, "out");
  var slide2 = new Slide(width, height, "in");

  slide.setImage(img_1);
  slide2.setImage(img_2);

  root.scene.add(slide);
  root.scene.add(slide2);

  var tl = new TimelineMax({ repeat: 0, repeatDelay: 1.0, yoyo: true });
  tl.add(slide2.transition(), 0);
  tl.add(slide.transition(), 0);
  createTweenScrubber(tl);
}

////////////////////
// CLASSES
////////////////////
var bd1 = sw1[7];
var bd2 = sw1[8];
var bd3 = sw1[11];
function Slide(width, height, animationPhase) {
  var plane = new THREE.PlaneGeometry(width, height, width * 2, height * 2);

  THREE.BAS.Utils.separateFaces(plane);

  var geometry = new SlideGeometry(plane);

  geometry.bufferUVs();

  var aAnimation = geometry.createAttribute("aAnimation", 2);
  var aStartPosition = geometry.createAttribute("aStartPosition", 3);
  var aControl0 = geometry.createAttribute("aControl0", 3);
  var aControl1 = geometry.createAttribute("aControl1", 3);
  var aEndPosition = geometry.createAttribute("aEndPosition", 3);

  var i, i2, i3, i4, v;

  var minDuration = 0.8;
  var maxDuration = 1.2;
  var maxDelayX = 0.9;
  var maxDelayY = 0.125;
  var stretch = 0.11;

  this.totalDuration = maxDuration + maxDelayX + maxDelayY + stretch;

  var startPosition = new THREE.Vector3();
  var control0 = new THREE.Vector3();
  var control1 = new THREE.Vector3();
  var endPosition = new THREE.Vector3();

  var tempPoint = new THREE.Vector3();

  function getControlPoint0(centroid) {
    var signY = Math.sign(centroid.y);

    tempPoint.x = THREE.Math.randFloat(0.1, 0.3) * 50;
    tempPoint.y = signY * THREE.Math.randFloat(0.1, 0.3) * 70;
    tempPoint.z = THREE.Math.randFloatSpread(20);

    return tempPoint;
  }

  function getControlPoint1(centroid) {
    var signY = Math.sign(centroid.y);

    tempPoint.x = THREE.Math.randFloat(0.3, 0.6) * 50;
    tempPoint.y = -signY * THREE.Math.randFloat(0.3, 0.6) * 70;
    tempPoint.z = THREE.Math.randFloatSpread(20);

    return tempPoint;
  }

  for (
    i = 0, i2 = 0, i3 = 0, i4 = 0;
    i < geometry.faceCount;
    i++, i2 += 6, i3 += 9, i4 += 12
  ) {
    var face = plane.faces[i];
    var centroid = THREE.BAS.Utils.computeCentroid(plane, face);

    // animation
    var duration = THREE.Math.randFloat(minDuration, maxDuration);
    var delayX = THREE.Math.mapLinear(
      centroid.x,
      -width * 0.5,
      width * 0.5,
      0.0,
      maxDelayX
    );
    var delayY;

    if (animationPhase === "in") {
  
      delayY = THREE.Math.mapLinear(
        Math.abs(centroid.y),
        0,
        height * 0.5,
        0.0,
        maxDelayY
      );
    } else {
      delayY = THREE.Math.mapLinear(
        Math.abs(centroid.y),
        0,
        height * 0.5,
        maxDelayY,
        0.0
      );
    }

    for (v = 0; v < 6; v += 2) {
      aAnimation.array[i2 + v] =
        delayX + delayY + Math.random() * stretch * duration;
      aAnimation.array[i2 + v + 1] = duration;
    }

    // positions

    endPosition.copy(centroid);
    startPosition.copy(centroid);

    if (animationPhase === "in") {
    
      control0.copy(centroid).sub(getControlPoint0(centroid));
      control1.copy(centroid).sub(getControlPoint1(centroid));
    } else {
      // out
      if (!stop) {
        control0.copy(centroid).add(getControlPoint0(centroid));
        control1.copy(centroid).add(getControlPoint1(centroid));
      }
      stop = true;
    }

    for (v = 0; v < 9; v += 3) {
      aStartPosition.array[i3 + v] = startPosition.x;
      aStartPosition.array[i3 + v + 1] = startPosition.y;
      aStartPosition.array[i3 + v + 2] = startPosition.z;

      aControl0.array[i3 + v] = control0.x;
      aControl0.array[i3 + v + 1] = control0.y;
      aControl0.array[i3 + v + 2] = control0.z;

      aControl1.array[i3 + v] = control1.x;
      aControl1.array[i3 + v + 1] = control1.y;
      aControl1.array[i3 + v + 2] = control1.z;

      aEndPosition.array[i3 + v] = endPosition.x;
      aEndPosition.array[i3 + v + 1] = endPosition.y;
      aEndPosition.array[i3 + v + 2] = endPosition.z;
    }
  }

  var material = new THREE.BAS.BasicAnimationMaterial(
    {
      shading: THREE.FlatShading,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { type: "f", value: 0 },
      },
      shaderFunctions: [
        THREE.BAS.ShaderChunk["cubic_bezier"],
        //THREE.BAS.ShaderChunk[(animationPhase === 'in' ? 'ease_out_cubic' : 'ease_in_cubic')],
        THREE.BAS.ShaderChunk["ease_in_out_cubic"],
        THREE.BAS.ShaderChunk["quaternion_rotation"],
      ],
      shaderParameters: [
        "uniform float uTime;",
        "attribute vec2 aAnimation;",
        "attribute vec3 aStartPosition;",
        "attribute vec3 aControl0;",
        "attribute vec3 aControl1;",
        "attribute vec3 aEndPosition;",
      ],
      shaderVertexInit: [
        "float tDelay = aAnimation.x;",
        "float tDuration = aAnimation.y;",
        "float tTime = clamp(uTime - tDelay, 0.0, tDuration);",
        "float tProgress = ease(tTime, 0.0, 1.0, tDuration);",
        //'float tProgress = tTime / tDuration;'
      ],
      shaderTransformPosition: [
        animationPhase === "in"
          ? "transformed *= tProgress;"
          : "transformed *= 1.0 - tProgress;",
        "transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);",
      ],
    },
    {
      map: new THREE.Texture(),
    }
  );

  THREE.Mesh.call(this, geometry, material);

  this.frustumCulled = false;
}
Slide.prototype = Object.create(THREE.Mesh.prototype);
Slide.prototype.constructor = Slide;
Object.defineProperty(Slide.prototype, "time", {
  get: function () {
    return this.material.uniforms["uTime"].value;
  },
  set: function (v) {
    this.material.uniforms["uTime"].value = v;
  },
});

Slide.prototype.setImage = function (image) {
  this.material.uniforms.map.value.image = image;
  this.material.uniforms.map.value.needsUpdate = true;
};

Slide.prototype.transition = function () {
  return TweenMax.fromTo(
    this,
    3.0,
    { time: 0.0 },
    { time: this.totalDuration, ease: Power0.easeInOut }
  );
};

function SlideGeometry(model) {
  THREE.BAS.ModelBufferGeometry.call(this, model);
}
SlideGeometry.prototype = Object.create(
  THREE.BAS.ModelBufferGeometry.prototype
);
SlideGeometry.prototype.constructor = SlideGeometry;
SlideGeometry.prototype.bufferPositions = function () {
  var positionBuffer = this.createAttribute("position", 3).array;

  for (var i = 0; i < this.faceCount; i++) {
    var face = this.modelGeometry.faces[i];
    var centroid = THREE.BAS.Utils.computeCentroid(this.modelGeometry, face);

    var a = this.modelGeometry.vertices[face.a];
    var b = this.modelGeometry.vertices[face.b];
    var c = this.modelGeometry.vertices[face.c];

    positionBuffer[face.a * 3] = a.x - centroid.x;
    positionBuffer[face.a * 3 + 1] = a.y - centroid.y;
    positionBuffer[face.a * 3 + 2] = a.z - centroid.z;

    positionBuffer[face.b * 3] = b.x - centroid.x;
    positionBuffer[face.b * 3 + 1] = b.y - centroid.y;
    positionBuffer[face.b * 3 + 2] = b.z - centroid.z;

    positionBuffer[face.c * 3] = c.x - centroid.x;
    positionBuffer[face.c * 3 + 1] = c.y - centroid.y;
    positionBuffer[face.c * 3 + 2] = c.z - centroid.z;
  }
};

function THREERoot(params) {
  params = utils.extend(
    {
      fov: 60,
      zNear: 10,
      zFar: 100000,

      createCameraControls: true,
    },
    params
  );

  this.renderer = new THREE.WebGLRenderer({
    antialias: params.antialias,
    alpha: true,
  });
  this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  document.getElementById("choco_fragment").appendChild(this.renderer.domElement);

  this.camera = new THREE.PerspectiveCamera(
    params.fov,
    window.outerWidth / window.outerHeight,
    params.zNear,
    params.zfar
  );

  this.scene = new THREE.Scene();
  this.scene.background = new THREE.Color(0x051d1e);
  if (params.createCameraControls) {
    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
  }

  this.resize = this.resize.bind(this);
  this.tick = this.tick.bind(this);

  this.resize();
  this.tick();

  window.addEventListener("resize", this.resize, false);
}
THREERoot.prototype = {
  tick: function () {
    this.update();
    this.render();
    requestAnimationFrame(this.tick);
  },
  update: function () {
    this.controls && this.controls.update();
  },
  render: function () {
    this.renderer.render(this.scene, this.camera);
  },
  resize: function () {
    if (!mobile || oldWidth != window.outerWidth) {
      this.camera.aspect = window.outerWidth / window.outerHeight;
      this.camera.updateProjectionMatrix();
      var x_offset = 0;
      var y_offset = x_offset;
      this.renderer.setSize(
        window.outerWidth - x_offset,
        window.outerHeight - y_offset
      );
    } else {
      // window.outerWidth = 412;
      document.querySelector("#choco_fragment canvas");
    }
    oldWidth = window.outerWidth;
    //this.renderer.setViewport(444, - y_offset/2, window.outerWidth - x_offset, window.outerHeight - x_offset);
  },
};

////////////////////
// UTILS
////////////////////

var utils = {
  extend: function (dst, src) {
    for (var key in src) {
      dst[key] = src[key];
    }

    return dst;
  },
  randSign: function () {
    return Math.random() > 0.5 ? 1 : -1;
  },
  ease: function (ease, t, b, c, d) {
    return b + ease.getRatio(t / d) * c;
  },
  fibSpherePoint: (function () {
    var vec = { x: 0, y: 0, z: 0 };
    var G = Math.PI * (3 - Math.sqrt(5));

    return function (i, n, radius) {
      var step = 2.0 / n;
      var r, phi;

      vec.y = i * step - 1 + step * 0.5;
      r = Math.sqrt(1 - vec.y * vec.y);
      phi = i * G;
      vec.x = Math.cos(phi) * r;
      vec.z = Math.sin(phi) * r;

      radius = radius || 1;

      vec.x *= radius;
      vec.y *= radius;
      vec.z *= radius;

      return vec;
    };
  })(),
  spherePoint: (function () {
    return function (u, v) {
      u === undefined && (u = Math.random());
      v === undefined && (v = Math.random());

      var theta = 2 * Math.PI * u;
      var phi = Math.acos(2 * v - 1);

      var vec = {};
      vec.x = Math.sin(phi) * Math.cos(theta);
      vec.y = Math.sin(phi) * Math.sin(theta);
      vec.z = Math.cos(phi);

      return vec;
    };
  })(),
};

function removeElement(element) {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }
  return function () {
    element.parentNode.removeChild(element);
  };
}

var mouseDown = false;

// tweemScrubber
function createTweenScrubber(tween, seekSpeed) {
  seekSpeed = seekSpeed || 0.001;

  function stop() {
    TweenMax.to(tween, 1, { timeScale: 0 });
  }

  function resume() {

    if (stopAni) {

      TweenMax.to(tween, 1, { timeScale: 0 });
      tween.call(removeElement("#choco_fragment"));
    } else {
      TweenMax.to(tween, 1, { timeScale: 1 });
    }
  }

  function seek(dx) {
    var progress = tween.progress();
    var p = THREE.Math.clamp(progress + dx * seekSpeed * 1.1, 0, 1);
    if (p == 0) {
      // stopAni = true;
      var show = document.getElementById("ChocoShow");
      show.className += " active";
      
    }
    tween.progress(p);
  }

  function removeListener(elementName, eventName, theFunction) {
    document
      .getElementById(elementName)
      .removeEventListener(eventName, theFunction);
  }

  //desktop
  function mousedownAnim(e) {
    mouseDown = true;
    //document.body.style.cursor = 'ew-resize';
    _cx = e.clientX;
    stop();
  }

  function mouseupAnim(e) {
    mouseDown = false;
    //document.body.style.cursor = 'pointer';
    resume();
  }

  function mousemoveAnim(e) {
    if (mouseDown === true) {
      var cx = e.clientX;
      var dx = cx - _cx;
      _cx = cx;

      seek(dx);
    }
  }
  //mobile
  function touchstartAnim(e) {
    _cx = e.touches[0].clientX;
    stop();
    // e.preventDefault();
  }

  function touchendAnim(e) {
    resume();
    // e.preventDefault();
  }

  function touchmoveAnim(e) {
    var cx = e.touches[0].clientX;
    var dx = cx - _cx;
    _cx = cx;

    seek(dx);
    // e.preventDefault();
  }

  var _cx = 0;

  // desktop

  // document.body.style.cursor = 'pointer';

  document
    .getElementById("choco_fragment")
    .addEventListener("mousedown", mousedownAnim);
  document
    .getElementById("choco_fragment")
    .addEventListener("mouseup", mouseupAnim);
  document
    .getElementById("choco_fragment")
    .addEventListener("mousemove", mousemoveAnim);
  // mobile
  document
    .getElementById("choco_fragment")
    .addEventListener("touchstart", touchstartAnim);
  document
    .getElementById("choco_fragment")
    .addEventListener("touchend", touchendAnim);
  document
    .getElementById("choco_fragment")
    .addEventListener("touchmove", touchmoveAnim);
}
