import './Box.css';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/* global THREE */

// const OrbitControls = require('three-orbit-controls')(THREE);
// onst MTLLoader = require('three-mtl-loader');

// require('three-obj-loader')(THREE);

let scene, camera, renderer, controls, cardCopyOutside,
canvasOutside, ctxOutside, cardCopyInside, canvasInside,
ctxInside, textureOutside, textureInside;

export default class Box extends PureComponent {

  constructor(props) {
    super(props);

    this.initializeModel = this.initializeModel.bind(this);
  }

  componentDidMount() {
    setTimeout(this.initializeModel, 1000);
  }

  initializeModel() {
    const threejsWindowWidth = 600;
    const threejsWindowHeight = 460;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, threejsWindowWidth / threejsWindowHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(threejsWindowWidth, threejsWindowHeight);
    renderer.setClearColor(0xffffff, 0);
    document.querySelector('#boxContainer').appendChild(renderer.domElement);

    renderer.domElement.id = 'box';

    const arealight = new THREE.AmbientLight(0x666666);
    scene.add(arealight);

    const frontlight = new THREE.PointLight(0xffffff, 0.5);
    frontlight.position.set(0, 0, 80);
    scene.add(frontlight);

    const rightlight = new THREE.PointLight(0xffffff, 0.4);
    rightlight.position.set(80, 0, 0);
    scene.add(rightlight);

    const leftlight = new THREE.PointLight(0xffffff, 0.4);
    leftlight.position.set(-80, 0, 0);
    scene.add(leftlight);

    const backlight = new THREE.PointLight(0xffffff, 0.5);
    backlight.position.set(0, 0, -80);
    scene.add(backlight);

    camera.position.set(5, 5, 8);
    camera.translateY(1);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.addEventListener('change', () => renderer.render(scene, camera));

    document.querySelector('html').addEventListener('keyup', () => {
      controls.enabled = true;
    });

    document.querySelector('html').addEventListener('keydown', () => {
      controls.enabled = false;
    });

    cardCopyOutside = document.querySelector("#outsideView");
    canvasOutside = document.createElement('canvas');
    canvasOutside.id = 'copy';
    canvasOutside.width = cardCopyOutside.width;
    canvasOutside.height = cardCopyOutside.height;
    ctxOutside = canvasOutside.getContext('2d');

    cardCopyInside = document.querySelector("#insideView");
    canvasInside = document.createElement('canvas');
    canvasInside.id = 'copy';
    canvasInside.width = cardCopyInside.width;
    canvasInside.height = cardCopyInside.height;
    ctxInside = canvasInside.getContext('2d');

    textureOutside = new THREE.Texture(cardCopyOutside);
    textureOutside.needsUpdate = true;
    textureOutside.wrapS = THREE.RepeatWrapping;
    textureOutside.wrapT = THREE.RepeatWrapping;

    textureOutside.repeat.x = 0.980;
    textureOutside.offset.x = 0.011;

    textureOutside.repeat.y = (textureOutside.repeat.x - 0.110) * 4;
    textureOutside.offset.y = -0.170;

    textureInside = new THREE.Texture(cardCopyInside);
    textureInside.needsUpdate = true;
    textureInside.wrapS = THREE.RepeatWrapping;
    textureInside.wrapT = THREE.RepeatWrapping;

    textureInside.repeat.x = 0.980;
    textureInside.offset.x = 0.011;

    textureInside.repeat.y = (textureInside.repeat.x - 0.110) * 4;
    textureInside.offset.y = 0.460;

    const phongMaterialOutside = new THREE.MeshLambertMaterial({ color: 0xffffff, map: textureOutside });
    phongMaterialOutside.map.needsUpdate = true;
    phongMaterialOutside.needsUpdate = true;

    const phongMaterialInside = new THREE.MeshLambertMaterial({ color: 0xffffff, map: textureInside });
    phongMaterialInside.map.needsUpdate = true;
    phongMaterialInside.needsUpdate = true;

    const onProgress = () => {};
    const onError = () => {};

    const mtlLoader = new THREE.MTLLoader();
    const randomNumber = Math.random();
    mtlLoader.load(`/images/assets/3d/box.mtl?rnd=${randomNumber}`, (materials) => {
      materials.preload();

      const objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(`/images/assets/3d/box.obj?rnd=${randomNumber}`, (object) => {
        scene.add(object);
        object.scale.x = 1;
        object.scale.y = 1.05;
        object.scale.z = 1;
        object.children[0].material = phongMaterialOutside;
        object.children[1].material = phongMaterialInside;
        object.position.y += 0.4;
      }, onProgress, onError);
    });

    const updateCanvas = () => {
      ctxOutside.drawImage(cardCopyOutside, 0, 0, cardCopyOutside.width, cardCopyOutside.width);
      textureOutside.needsUpdate = true;
      ctxInside.drawImage(cardCopyInside, 0, 0, cardCopyInside.width, cardCopyInside.width);
      textureInside.needsUpdate = true;

      this.props.update4views();
    };

    const animate = () => {
      controls.update();

      updateCanvas();

      renderer.render(scene, camera)
    };

    setInterval(animate.bind(this), 500);
  }

  render() {
    return <span />;
  }
}

Box.propTypes = {
  update4views: PropTypes.func,
  movingFlag: PropTypes.bool,
}

Box.defaultProps = {
  update4views: () => {},
}
