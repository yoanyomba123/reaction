//3rd party Libraries
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux'
import Scroll from 'react-scroll';
import sortedUniq from 'lodash/sortedUniq';
import upperFirst from 'lodash/upperFirst';
import cloneDeep from 'lodash/cloneDeep';
//import { render, ReactDOM } from "react-dom"
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { fabric } from 'fabric';
import jsPDF from 'jspdf';
import FileReaderInput from 'react-file-reader-input';
//MaterialUI
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { FormControlLabel, FormGroup, FormControl } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Popover from 'material-ui/Popover';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
//Icons
import MdColorLens from 'react-icons/lib/md/color-lens'
import MdFileUpload from 'react-icons/lib/md/file-upload'
import FaSmileO from 'react-icons/lib/fa/smile-o'
import FaQrcode from 'react-icons/lib/fa/qrcode'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaExclamation from 'react-icons/lib/fa/exclamation'
import MdLineWeight from 'react-icons/lib/md/line-weight'
import MdFormatBold from 'react-icons/lib/md/format-bold';
import MdFormatUnderlined from 'react-icons/lib/md/format-underlined';
import MdFormatItalic from 'react-icons/lib/md/format-italic';
import MdCheck from 'react-icons/lib/md/check';
import MdClose from 'react-icons/lib/md/close';
import FaSquare from 'react-icons/lib/fa/square';
import MdCreate from 'react-icons/lib/md/create';
// Local imports
import globalStyles from '../../../../config/globalStyles';
import styles from "./styles"
import { combineStyles } from '../../../../config/helpers';
import { updateAlert } from '../../../Actions';
import Box from './Box/Box';
import BleedingEdge from './BleedingEdge/BleedingEdge';
import ZoomableZone from './ZoomableZone/ZoomableZone';
import ImagesModal from './ImagesModal/ImagesModal';
import AnimatedItems from '../../components/AnimatedItems/AnimatedItems';
import Loading from './Loading/Loading';
import { Dropdown, ColorPicker, IconSwitch, Range, SvgIcon } from '../../components';
//import colors from "../../../../config/colors"

//Editor global constants
const highResMultiplier = 7; // 300dpi
const lowResMultiplier = 1.2;
const pxBleedingEdge = 12;
const pxCanvasHeight = 192;
const pxCanvasWidth = 672;
const scroll = Scroll.animateScroll;
const cornerColor = '#4aabd8'
const borderColor = '#4aabd8'
const baseRotatingPointOffset = 80
const canvasHeight = pxCanvasHeight * lowResMultiplier;
const canvasWidth = pxCanvasWidth * lowResMultiplier;
const bleedingEdge = pxBleedingEdge * lowResMultiplier;
const highResBleedingEdge = pxBleedingEdge * highResMultiplier; // 1/8"
const highResCanvasHeight = pxCanvasHeight * highResMultiplier; // 2"
const highResCanvasWidth = pxCanvasWidth * highResMultiplier; // 3.5" x 2 = 7"
const CORNER_SIZE = 40;
const ONE_CLICK_FILTERS = [
  'Grayscale', 'Invert', 'Sepia', 'Brownie', 'Vintage',
  'Technicolor', 'Polaroid', 'Kodachrome',
  'BlackWhite'
];
const RANGE_FILTERS = [
  'brightness', 'contrast', 'saturation', 'hue', 'blur'
];

/**
 * Editor global variables 
 * 
 * They are used to maintain the editor state and to be functionality support, 
 * editor changes and data complexity in fabric are too much for redux state)
 */
let auxObject, watermarkImage, auxObjects = [], changeLog =[], auxProps = {}

class EditorPage extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      color: 'blue',
      newObject: null,
      isEditorMode: true,
      isOutView: true,
      isVisibleSecondBar: false,
      activeBtnIndex: 0,
      text: "Edit me",
      modalImagesVisible: false,
      modalExplanationVisible: false,
      offsetX: 0,
      offsetY: 0,
      selectedObjectType: null,
      selectedObject: null,
      fontSizes: ['12px', '16px', '24px', '32px', '48px', '64px'],
      cropping: false,
      croppableImage: null,
      editingSvg: false,
      backgroundColor: '#fff',
      modalBackgroundImagesVisible: false,
      textBackgroundColor: '#fff',
      textStrokeColor: '#fff',
      filtersOpen: false,
      filters: {},
      canUndo: false,
      hasWatermark: true,
      isLoading: true
    }

    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  /**
   * Lifecycle methods
   */

  componentWillMount() {
    this._isMounted = true
  }

  componentDidMount() {
    scroll.scrollTo(0, {
      duration: 0,
      delay: 0,
      smooth: true,
    });

    const outsideView = new fabric.Canvas('outsideView', {
      width: highResCanvasWidth,
      height: highResCanvasHeight,
      enableRetinaScaling: false,
    });

    const insideView = new fabric.Canvas('insideView', {
      width: highResCanvasWidth,
      height: highResCanvasHeight,
      enableRetinaScaling: false,
    });

    fabric.Object.prototype.set({
      transparentCorners: false,
      borderColor,
      cornerColor,
      cornerSize: CORNER_SIZE,
      rotatingPointOffset: baseRotatingPointOffset,
      cornerStyle: 'circle',
    });

    fabric.Object.prototype.setControlsVisibility({
      mt: true,
      mb: true,
      ml: true,
      mr: true,
    });

    outsideView
      .on('object:selected', this.handleOnObjectSelected.bind(this, true))
      .on('group:selected', this.handleOnGroupSelected.bind(this, true))
      .on('path:created', this.handleOnPathCreated.bind(this, true))
      .on('selection:cleared', this.handleOnSelectionCleared.bind(this, true));

    insideView
      .on('object:selected', this.handleOnObjectSelected.bind(this, false))
      .on('group:selected', this.handleOnGroupSelected.bind(this, false))
      .on('path:created', this.handleOnPathCreated.bind(this, false))
      .on('selection:cleared', this.handleOnSelectionCleared.bind(this, false));

    Meteor.setInterval(() => {
      this.update4views();

      if (this.state.hasWatermark)
        this.insertWatermark();
    }, 500)

    outsideView.backgroundColor = "#ffffff";
    outsideView.renderAll();

    insideView.backgroundColor = "#ffffff";
    insideView.renderAll();

    this.outsideView = outsideView;
    this.insideView = insideView;
    
    this.changeView(true);

    const resizeContainers = element => {
      element.style.width = canvasWidth + 'px';
      element.style.height = canvasHeight + 'px';
    }

    document.querySelectorAll('.canvas-container').forEach(resizeContainers);

    document.querySelectorAll('.lower-canvas').forEach(resizeContainers);
    
    document.querySelectorAll('.upper-canvas').forEach(resizeContainers);

    setTimeout(() => {
      this.setState({
        isLoading: false
      }); 
    }, 1500);
  }

  /**
   * Editor functions and handlers
   */

  deselectAll() {
    const { isOutView } = this.state;
    const canvas = eval(isOutView ? this.outsideView : this.insideView);

    this.setState({
      selectedObject: null,
    });

    canvas.discardActiveObject().renderAll();
  }

  handleOnObjectSelected(selected, event) {
    const target = event ? event.target : selected.target;

    if (!this.state.isEditorMode || (this.state.editingSvg && target.type !== 'path')) {
      this.deselectAll();
      return;
    }
    
    if (target.type === 'i-text') {
      const text = target;
      
      this.setState({
        textStrokeColor: text.stroke,
        strokeWidth: text.strokeWidth,
        textBackgroundColor: text.backgroundColor
      });
    }

    this.setState({
      selectedObjectType: target.type,
      selectedObject: target,
    });
  }

  handleOnGroupSelected(selected, event) {
    const {target} = event;

    if (!this.state.isEditorMode) {
      this.deselectAll();
      return;
    }

    this.setState({
      selectedObjectType: 'group',
      selectedObject: target,
    });
  }

  handleOnPathCreated(selected, event) {
    this.setState({
      selectedObjectType: 'path',
      selectedObject: target,
    });
  }

  handleOnSelectionCleared() {
    this.setState({
      selectedObjectType: 'default',
      selectedObject: null,
    });
  }

  setActiveStyle(styleName, value, object, messurable = false, fromUndo = false) {
    object = object || this.fabricCanvas.getActiveObject();

    if (!object) return;

    const newValue = messurable ? value * highResMultiplier : value;
    const action = {
      object,
      styleName,
      messurable,
      prevValue: null,
      type: 'activeStyle'
    };

    if (object.setSelectionStyles && object.isEditing) {
      const style = { };

      action.prevValue = style[styleName];

      style[styleName] = newValue;
      object.setSelectionStyles(style);
      object.setCoords();
    } else {
      action.prevValue = object.get(styleName);

      object.set(styleName, newValue);
    }

    if (!fromUndo) {
      this.addActionToChangeLog(action);
    }

    object.setCoords();

    this.fabricCanvas.renderAll();
  }

  undo() {
    const [lastAction, ...actions] = changeLog;
    
    switch (lastAction.type) {
      case 'activeStyle': {
        this.setActiveStyle(lastAction.styleName, lastAction.prevValue, lastAction.object, lastAction.messurable, true);
      } break;
      case 'addObject': {
        this.fabricCanvas.remove(lastAction.object).renderAll();
      } break;
      case 'setBackgroundImage': {
        this.fabricCanvas.backgroundColor = '#ffffff';
        this.fabricCanvas.setBackgroundImage(lastAction.background).renderAll();
      } break;
      case 'setBackgroundColor': {
        this.fabricCanvas.backgroundColor = lastAction.color;
        this.fabricCanvas.setBackgroundImage(null).renderAll();
      } break;
      case 'setShadow': {
        lastAction.object.shadow = lastAction.prevValue;
        this.fabricCanvas.renderAll();
      } break;
      case 'sendBackwards': {
        this.fabricCanvas.bringForward(lastAction.object).renderAll();
      } break;
      case 'bringForward': {
        this.fabricCanvas.sendBackwards(lastAction.object).renderAll();
      } break;
      case 'removeObject': {
        this.fabricCanvas.add(lastAction.object).renderAll();
      } break;
      case 'crop': {
        this.fabricCanvas
          .remove(lastAction.actualObject)
          .add(lastAction.originalObject)
          .renderAll();
      } break;
      case 'coverPage': {
        lastAction.object.scaleX = lastAction.props.scaleX;
        lastAction.object.scaleY = lastAction.props.scaleY;
        lastAction.object.top = lastAction.props.top;
        this.fabricCanvas.renderAll();
      } break;
      case 'filter': {
        if (lastAction.prop) {
          lastAction.object.filters[lastAction.index][lastAction.prop] = lastAction.value;
        } else {
          lastAction.object.filters[lastAction.index] = lastAction.value;
        }
        lastAction.object.applyFilters();
        this.fabricCanvas.renderAll();
      } break;
      case 'editSvg': {
        lastAction.objectsToRemove.forEach(object => this.fabricCanvas.remove(object));
        this.fabricCanvas.add(lastAction.object);

        this.fabricCanvas.renderAll();
      } break;
      // case 'moveObject': {
      //   lastAction.object.set('top', lastAction.moveFrom.top);
      //   lastAction.object.set('left', lastAction.moveFrom.left);
        
      //   this.fabricCanvas.renderAll();
      // } break;
      default: return;
    }
    
    this.setState({
      canUndo: actions.length > 0
    });
    
    changeLog = actions;
  }

  getActiveStyle(styleName, messurable = false) {
    if (!this.fabricCanvas) {
      return '';
    }

    const object = this.fabricCanvas.getActiveObject();

    if (!object) {
      return '';
    }

    if (messurable) {
      return object[styleName] / highResMultiplier;
    }

    return object[styleName];
  }

  changeView(toOutsideView) {
    this.fabricCanvas = toOutsideView ? this.outsideView : this.insideView;

    this.setState({
      backgroundColor: this.fabricCanvas.backgroundColor,
      isOutView: toOutsideView
    });

    this.update4views();

    this.fabricCanvas.on('object:moving', event => {
      // const object = event.target;

      // this.addActionToChangeLog({
      //   object,
      //   moveFrom: {
      //     top: auxProps.top, 
      //     left: auxProps.left,
      //   },
      //   type: 'moveObject'
      // });

      this.update4views()
    });

    this.fabricCanvas.on('object:modified', () => {
      const activeObject = this.fabricCanvas.getActiveObject();

      if (activeObject && activeObject.type === 'i-text') {
        const scaleTemp = activeObject.scaleX;

        activeObject.scaleX = 1;
        activeObject.scaleY = 1;
        activeObject.fontSize = parseInt((activeObject.fontSize * scaleTemp), 10);

        const newSize = `${parseInt(`${activeObject.fontSize / highResMultiplier}`, 10)}px`;

        this.setState({
          fontSizes: sortedUniq([...this.state.fontSizes, newSize].sort((a, b) => parseInt(a.replace('px', ''), 10) - parseInt(b.replace('px', ''), 10))),
        }, () => this.fontSelector && this.fontSelector.setValue(newSize));

        this.fabricCanvas.renderAll();
      }
    })

    this.fabricCanvas.on('selection:cleared', (...params) => {
      this.update4views()
    });

    this.fabricCanvas.on('selection:created', event => {
      if (event.target) {
        auxProps.top = event.target.top;
        auxProps.left = event.target.left;
      }

      this.update4views();
    });

    this.fabricCanvas.on('selection:updated', event => {
      this.deselectAll();

      if (event.target) {
        this.fabricCanvas.setActiveObject(event.target);
        auxProps.top = event.target.top;
        auxProps.left = event.target.left;
      }

      this.update4views()
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addActionToChangeLog (action) {
    //we can hook up the saving functionality here.
    changeLog = [action, ...changeLog];
    
    this.setState({
      canUndo: changeLog.length > 0,
      unsavedChanges: true
    });
  }

  handleOnSave () {
    this.setState({
      unsavedChanges: false
    });

    const json = JSON.stringify({
      inside: this.insideView.toJSON(),
      outside: this.outsideView.toJSON()
    });

    this.download(json, 'export.json', 'text/plain');
  }

  download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;

    document.body.appendChild(a);
    a.setAttribute("type", "hidden");

    a.click();
  }

  handleImageUpload(event, results) {
    const { fabricCanvas } = this
    const result = results[0];
    const [e, file] = result;
    const data = e.target.result;

    fabric.Image.fromURL(data, (img) => {
      const imgHeight = img.height
      const scale = (highResCanvasHeight - (highResBleedingEdge * 2)) / imgHeight
      const oImg = img.set({
        scaleX: scale,
        scaleY: scale,
        originX: 'center',
        originY: 'center',
        left: (highResCanvasWidth / 8),
        top: (highResCanvasHeight / 2) - highResBleedingEdge,
      });

      fabricCanvas.add(oImg).setActiveObject(oImg);
      
      this.handleOnObjectSelected(true, {
        target: {
          ...img,
          type: 'image'
        }
      });

      this.addActionToChangeLog({
        object: this.fabricCanvas.getActiveObject(),
        type: 'addObject'
      });

      this.update4views();
    });
  }

  insertWatermark() {
    if (!watermarkImage) {
      fabric.Image.fromURL('/images/btn/logo_watermark.png', img => {
        img.set({
          originalScale: 1,
          cornerSize: CORNER_SIZE,
          hasBorders: false,
          originX: 'center',
          originY: 'center',
          left: ((highResCanvasWidth + (highResBleedingEdge * 2)) / 4) + ((highResCanvasWidth + (highResBleedingEdge * 2)) / 8),
          top: highResCanvasHeight - (highResBleedingEdge * 2) - 30,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          evented: false
        })
          .scale(0.9, 0.9);

        watermarkImage = img;
        
        this.insideView.add(img).bringForward(img).renderAll();
      });
    } else {
      this.insideView.bringForward(watermarkImage).renderAll();
    }
  }

  removeWatermark() {
    this.setState({
      hasWatermark: false
    }, () => this.insideView.remove(watermarkImage).renderAll());
  }

  addImage(imageName) {
    const { fabricCanvas } = this;

    fabric.loadSVGFromURL(`/images/assets/${imageName}`, (layers) => {
      const img = fabric.util.groupSVGElements(layers);
      
      img.set({
        originalScale: 1,
        cornerSize: CORNER_SIZE,
        hasBorders: true,
        originX: 'center',
        originY: 'center',
        left: (highResCanvasWidth / 8),
        top: (highResCanvasHeight / 2) - highResBleedingEdge,
      })
        .scale(2, 2);
      fabricCanvas.add(img).setActiveObject(img);
      this.handleOnObjectSelected(true, {
        target: {
          ...img,
          type: 'svg'
        }
      });

      this.addActionToChangeLog({
        object: this.fabricCanvas.getActiveObject(),
        type: 'addObject'
      });

      this.update4views();
    })
  }

  coverPage() {
    const {fabricCanvas} = this;
    const activeObject = fabricCanvas.getActiveObject();
    const objHeight = activeObject.height
    const scale = (highResCanvasHeight - (highResBleedingEdge * 2)) / objHeight;

    this.addActionToChangeLog({
      object: activeObject,
      props: {
        scaleX: activeObject.scaleX,
        scaleY: activeObject.scaleY,
        top: activeObject.top,
      },
      type: 'coverPage'
    });

    activeObject.scaleX = scale;
    activeObject.scaleY = scale;
    activeObject.top = (highResCanvasHeight / 2) - highResBleedingEdge;

    fabricCanvas.renderAll();

    this.centerPage();
  }

  addText() {
    const text = new fabric.IText('Text', {
      left: (highResCanvasWidth / 8),
      top: (highResCanvasHeight / 2) - highResBleedingEdge,
      fontFamily: 'helvetica',
      fontSize: 12 * highResMultiplier,
      lineHeight: 1,
      fill: 'rgb(35, 31, 32)',
      scaleX: 1,
      scaleY: 1,
      fontWeight: '',
      originX: 'center',
      originY: 'center',
      hasRotatingPoint: true,
      centerTransform: true,
      cornerSize: CORNER_SIZE,
    });

    this.fabricCanvas.add(text).setActiveObject(text);
    this.handleOnObjectSelected(true, {
      target: {
        ...text,
        type: 'i-text'
      }
    });

    this.addActionToChangeLog({
      object: this.fabricCanvas.getActiveObject(),
      type: 'addObject'
    });

    this.setState({
      textStrokeColor: text.stroke,
      strokeWidth: text.strokeWidth,
      textBackgroundColor: text.backgroundColor
    });

    this.update4views();
  }

  downloadPdf() {
    this.deselectAll();

    const pdf = new jsPDF('l', 'in', [7 + (1/4), 4 + (1/2)]);

    pdf.addImage(this.outsideView.toDataURL('image/png'), 'PNG', 0, 0, 7 + (1/4), 2 + (1/4));
    pdf.addImage(this.insideView.toDataURL('image/png'), 'PNG', 0, 2 + (1/4), 7 + (1/4), 2 + (1/4));
    
    pdf.save('MyBoxyCard.pdf');
  }

  changeColor() {
    if (this.state.color === 'blue') {
      this.setState({ color: 'red' });
    } else {
      this.setState({ color: 'blue' });
    }
  }

  setAnimation() {
    this.refs.canvas.getChild('circle').animate('left', '+=100', { onChange: () => this.refs.canvas.renderAll(), onComplete: () => {} });
  }

  getQuadrant(object) {
    const left = object.left;
    const quadrantWidth = (highResCanvasWidth / 4);

    if (left <= quadrantWidth + highResBleedingEdge) {
      return 1;
    } else if ((left > quadrantWidth + highResBleedingEdge) && (left <= (quadrantWidth * 2) + highResBleedingEdge)) {
      return 2;
    } else if ((left > (quadrantWidth * 2) + highResBleedingEdge) && (left <= (quadrantWidth * 3) + highResBleedingEdge)) {
      return 3;
    } else if ((left > (quadrantWidth * 3) + highResBleedingEdge)) {
      return 4;
    }

    return 0;
  }

  centerPage() {
    const activeObject = this.fabricCanvas.getActiveObject();

    activeObject.top = highResCanvasHeight / 2;

    const singleQuadrantWidth = (highResCanvasWidth - highResBleedingEdge) / 4;
    const quadrant = this.getQuadrant(activeObject);

    switch (quadrant) {
      case 1:
        activeObject.left = (singleQuadrantWidth / 2) + highResBleedingEdge;
        break;
      case 2:
        activeObject.left = (singleQuadrantWidth) + (singleQuadrantWidth / 2) + (highResBleedingEdge / 2);
        break;
      case 3:
        activeObject.left = ((singleQuadrantWidth) * 2) + (singleQuadrantWidth / 2) + (highResBleedingEdge / 2);
        break;
      case 4:
        activeObject.left = ((singleQuadrantWidth) * 3) + (singleQuadrantWidth / 2) + (highResBleedingEdge / 2);
        break;
      default:
        break;
    }

    activeObject.setCoords();

    this.fabricCanvas.renderAll();
  }

  rotate() {
    const activeObject = this.fabricCanvas.getActiveObject();
    const rotationDegrees = 45;

    if (activeObject) {
      const currentAngle = activeObject.angle;

      this.setActiveStyle('angle', currentAngle + rotationDegrees);

      this.fabricCanvas.renderAll();
    }
  }

  flipHorizontal() {
    const activeObject = this.fabricCanvas.getActiveObject();

    if (activeObject) {
      this.setActiveStyle('flipX', !activeObject.flipX);

      this.fabricCanvas.renderAll();
    }
  }

  flipVertical() {
    const activeObject = this.fabricCanvas.getActiveObject();

    if (activeObject) {
      this.setActiveStyle('flipY', !activeObject.flipY);

      this.fabricCanvas.renderAll();
    }
  }

  sendBackwards() {
    const activeObject = this.fabricCanvas.getActiveObject();

    if (activeObject) {
      this.addActionToChangeLog({
        object: activeObject,
        type: 'sendBackwards'
      });

      this.fabricCanvas.sendBackwards(activeObject);
      this.fabricCanvas.renderAll();
      this.deselectAll();
    }
  }

  bringForward() {
    const activeObject = this.fabricCanvas.getActiveObject();

    if (activeObject) {
      this.addActionToChangeLog({
        object: activeObject,
        type: 'bringForward'
      });

      this.fabricCanvas.bringForward(activeObject);
      this.fabricCanvas.renderAll();
      this.deselectAll();
    }
  }

  duplicate() {
    const newObject = fabric.util.object.clone(this.fabricCanvas.getActiveObject());

    newObject.set("top", newObject.top + 5);
    newObject.set("left", newObject.left + 5);

    this.addActionToChangeLog({
      object: newObject,
      type: 'addObject'
    });

    this.fabricCanvas.add(newObject);
  }

  delete() {
    const activeObject = this.fabricCanvas.getActiveObject();

    this.addActionToChangeLog({
      object: activeObject,
      type: 'removeObject'
    });

    this.fabricCanvas.remove(activeObject);
  }

  /**
   * Start Image crop
   */

  startCropping() {
    const image = this.fabricCanvas.getActiveObject();

    this.setState({
      cropping: true,
      croppableImage: image.getSrc(),
    });
  }

  endCropping() {
    const originalImage = this.fabricCanvas.getActiveObject();
    const newImage = new fabric.Image.fromURL(this.cropper.getCroppedCanvas().toDataURL(), (img) => {
      img.set({
        originalScale: 1,
        cornerSize: CORNER_SIZE,
        hasBorders: true,
        originX: 'center',
        originY: 'center',
        left: originalImage.left,
        top: originalImage.top,
        scaleX: originalImage.scaleX,
        scaleY: originalImage.scaleY,
      });

      this.deselectAll();
      
      this.fabricCanvas.remove(originalImage).add(img).setActiveObject(img).renderAll();

      this.addActionToChangeLog({
        originalObject: originalImage,
        actualObject: img,
        type: 'crop'
      });

      this.update4views();

      this.setState({
        cropping: false,
        croppableImage: null
      });
    });
  }

  cancelCropping() {
    this.setState({
      cropping: false,
      croppableImage: null,
    });
  }

  /**
   * Ends Image crop
   */

  handleOnUpload (event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsText(file, "UTF-8");

    reader.onload = evt => {
      const data = JSON.parse(evt.target.result);

      this.insideView.clear();
      this.outsideView.clear();
      
      this.insideView.loadFromJSON(data.inside).renderAll();
      this.outsideView.loadFromJSON(data.outside).renderAll();

      this.fabricCanvas.renderAll();
    }
    reader.onerror = evt => {
      alert("Error reading file. Please try again.");
    }
  }

  setBackgroundImage(imageName) {
    fabric.Image.fromURL(`/images/assets/${imageName}`, (image) => {
      
      if (this.fabricCanvas.backgroundImage) {
        this.addActionToChangeLog({
          background: this.fabricCanvas.backgroundImage,
          type: 'setBackgroundImage'
        });
      } else if (this.fabricCanvas.backgroundColor) {
        this.addActionToChangeLog({
          color: this.fabricCanvas.backgroundColor,
          type: 'setBackgroundColor'
        });
      }

      this.fabricCanvas.setBackgroundImage(image, this.fabricCanvas.renderAll.bind(this.fabricCanvas), {
        left: 0,
        top: 0,  
        scaleY: this.fabricCanvas.height / image.height,
        scaleX: this.fabricCanvas.width / image.width,
      });
    });
    setTimeout(() => this.fabricCanvas.renderAll(), 200);
  }

  shadow() {
    var object = this.fabricCanvas.getActiveObject();

    if (!object) return;

    this.addActionToChangeLog({
      object: object,
      prevValue: object.shadow,
      type: 'setShadow'
    });

    if (object.shadow) {
      object.shadow = null;
    } else {
      object.setShadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 10,
        offsetX: 10,
        offsetY: 10
      });
    }

    this.fabricCanvas.renderAll();
  }

  /**
   * Start Filters
   */

  handleOnToggleFilters() {
    //Set filters with active object ones
    const object = this.fabricCanvas.getActiveObject();

    this.setState({
      filters: {}
    }, () => {
      const filters = {};

      object.filters.forEach(filter => {
        const isHue = (filter.type === 'HueRotation');
        const rangeFilter = isHue ? 'rotation' : RANGE_FILTERS.find(filterName => filter.type === upperFirst(filterName));

        if (rangeFilter) {
          filters[isHue ? 'hue' : rangeFilter] = filter[rangeFilter];
        } else {
          filters[filter.type] = true;
        }
      })

      this.setState({
        filtersOpen: !this.state.filtersOpen,
        filters,
      });
    });
    
  }

  applyFilter(index, filter, prop, value) {
    const object = this.fabricCanvas.getActiveObject();

    if (object.filters[index] && prop && value) {
      this.addActionToChangeLog({
        object,
        index,
        prop,
        value: object.filters[index][prop],
        type: 'filter'
      });

      object.filters[index][prop] = value;
    } else {
      this.addActionToChangeLog({
        object,
        index,
        value: object.filters[index],
        type: 'filter'
      });

      object.filters[index] = filter;
    }
    object.applyFilters();
    this.fabricCanvas.renderAll();
  }

  /**
   * End Filters
   */

  hardReset () {
    const json = this.fabricCanvas.toJSON();

    this.fabricCanvas.clear();

    this.fabricCanvas.loadFromJSON(json, () => {
      this.fabricCanvas.setActiveObject(this.fabricCanvas._objects[0]);
      
      this.fabricCanvas.renderAll();
    });
  }

  /**
   * Starts SVG Edition
   */

  startEditingSvg () {
    const object = this.fabricCanvas.getActiveObject();

    if (!object || !object._objects) return;

    auxSvgObject = object;
    auxObjects = cloneDeep(object._objects);

    this.fabricCanvas.remove(object);

    const scale = 2;

    auxObjects.forEach(object => {
      
      object.scaleX = scale;
      object.scaleY = scale;
      object.top = auxSvgObject.top + (object.top * scale);
      object.left = auxSvgObject.left + (object.left * scale) ;
      object.hasControls = false;
      object.lockMovementX = true;
      object.lockMovementY = true;

      this.fabricCanvas.add(object).renderAll();

      this.fabricCanvas.setActiveObject(object).renderAll();
    });

    this.hardReset();

    this.fabricCanvas.getObjects().forEach(object => {
      object.set('hasControls', false).set('lockMovementX', true).set('lockMovementY', true);
    })

    this.setState({
      editingSvg: true
    });
  }

  endEditingSvg () {
    this.restoreSVGObject(modifiedPaths => {
      auxSvgObject._objects.forEach((path, index) => {
        const auxObject = modifiedPaths[index];
  
        path.fill = auxObject.fill;
      });
    }, true)
  }

  cancelEditingSvg () {
    this.restoreSVGObject();
  }

  restoreSVGObject (additionalAction, undoable = false) {
    const modifiedPaths = this.fabricCanvas._objects.filter(object => object.type === 'path');
    const undoOptions = {};

    if (undoable) {
      undoOptions = {
        object: cloneDeep(auxSvgObject),
        type: 'editSvg',
        objectsToRemove: [auxSvgObject]
      };
    }

    if (additionalAction)
      additionalAction(modifiedPaths)

    const group = fabric.util.groupSVGElements(auxSvgObject._objects);

    group.set({
      originalScale: 1,
      cornerSize: CORNER_SIZE,
      hasBorders: true,
      originX: 'center',
      originY: 'center',
      left: auxSvgObject.left,
      top: auxSvgObject.top,
      angle: auxSvgObject.angle,
      flipX: auxSvgObject.flipX,
      flipY: auxSvgObject.flipY
    })
      .scale(2, 2);
    
    modifiedPaths.forEach(object => {
      this.fabricCanvas.remove(object).renderAll();
    });

    if (undoable)
      undoOptions.objectsToRemove.push(group);

    this.addActionToChangeLog(undoOptions);
    
    this.fabricCanvas.add(group);

    this.deselectAll();

    this.fabricCanvas.renderAll();

    this.fabricCanvas.getObjects().forEach(object => {
      object.set('hasControls', true).set('lockMovementX', false).set('lockMovementY', false);
    });

    this.setState({
      editingSvg: false
    });
  }

  /**
   * Ends SVG Edition
   */

  addRect() {
    const { fabricCanvas } = this
    const rect = new fabric.Rect({
      left: (highResCanvasWidth / 8),
      top: (highResCanvasHeight / 2) - highResBleedingEdge,
      fill: 'rgb(42, 153, 149)',
      stroke: 'rgb(42, 153, 149)',
      width: 200,
      height: 200,
      opacity: 1,
      originX: 'center',
      originY: 'center',
    });

    fabricCanvas.add(rect).setActiveObject(rect);

    this.addActionToChangeLog({
      object: this.fabricCanvas.getActiveObject(),
      type: 'addObject'
    });

    this.handleOnObjectSelected(true, {
      target: {
        ...rect,
        type: 'rect'
      }
    });
  }

  /**
   * Render editor parts methods
   */

  renderEditorNav() {
    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={combineStyles([
          styles.editorNav,
          globalStyles.noMarginPadding,
          globalStyles.cont100,
          globalStyles.flex,
          globalStyles.row,
          styles.centered
        ])}
      >
        <Grid
          item
          xs={4}
          sm={3}
          md={2}
          lg={2}
          xl={2}
          style={combineStyles([
            globalStyles.noMarginPadding,
            globalStyles.center,
          ])}
        >
          <img src='/images/editorImages/logotype.jpg' style={combineStyles([{ height: 30, width: 'auto', marginLeft: 6 }])} />
        </Grid>

        <Grid
          item
          xs={3}
          sm={2}
          md={4}
          lg={4}
          xl={4}
          style={combineStyles([
            globalStyles.noMarginPadding,
            globalStyles.flex,
            globalStyles.row,
            styles.centered,
          ])}
        >
        </Grid>
        <Grid
          item
          xs={5}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          style={combineStyles([
            globalStyles.noMarginPadding,
            globalStyles.flex,
            globalStyles.row,
            styles.centered,
            styles.spaceBetween
          ])}
        >
          <Button
            onClick={() => {
              this.loadFileInput.click();
            }}
            style={combineStyles([globalStyles.textWhite, globalStyles.text14, globalStyles.textBold5])}
          >
            Upload Your Own
            <input 
              type="file" 
              style={{display: 'none'}} 
              ref={elem => this.loadFileInput = elem} 
              onChange={this.handleOnUpload.bind(this)}  
            />
          </Button>
          {this.state.unsavedChanges ? (
            <Button 
              onClick={this.handleOnSave.bind(this)}
              style={combineStyles([globalStyles.textWhite, globalStyles.text14, globalStyles.textBold5])}
            >
              Save changes
            </Button>
          ) : (
            <div
              style={combineStyles([globalStyles.textWhite, globalStyles.text14, styles.allChangesSaved])}
            >
              All Changes Saved
            </div>
          )}
          <div
            onClick={() => {
            }}
            style={combineStyles([globalStyles.textWhite, globalStyles.text14, globalStyles.textBold5])}
          >
            View Proof
          </div>
        </Grid>
        <Grid
          item
          xs={4}
          sm={3}
          md={2}
          lg={2}
          xl={2}
          style={combineStyles([
            globalStyles.noMarginPadding,
            globalStyles.center,
          ])}
        >
          <Button
            onClick={this.downloadPdf.bind(this)}
            color="primary"
            //raised
            variant="raised"
            style={combineStyles([globalStyles.text20, globalStyles.textBold5])}
          >
            Lets Print
          </Button>
        </Grid>
      </Grid>
    )
  }

  renderBtn({ imgURI, iconComp, text, isDisabled, onClick, isActive, key }) {
    return (
      <Button
        style={styles.imageButtonContainer}
        key={key}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
        disabled={isDisabled}
      >
        <div
          disabled={isDisabled}
          style={combineStyles([globalStyles.center, styles.imageButton, isActive ? styles.imageButtonActive : {}]) }
        >
          {
            imgURI ?
              <img src={imgURI} style={styles.imageButtonImage} />
              :
              iconComp
          }
          <div style={combineStyles([styles.imageButtonText, globalStyles.textWhite, globalStyles.text7, isDisabled ? styles.imageButtonTextDisabled : {}])}>
            {text}
          </div>
        </div>
      </Button>
    )
  }

  renderSideBarFirst() {
    const windowHeight = window.innerHeight;
    const { activeBtnIndex } = this.state;

    return (
      <Grid
        item
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        style={combineStyles([
          globalStyles.noMarginPadding,
          globalStyles.cont100,
          globalStyles.flex,
          globalStyles.column,
          styles.sideBarFirst,
          { height: windowHeight },
        ])}
      >
        {this.renderBtn({ 
          iconComp: <SvgIcon name="camera" size={2} color="#fff"/>, 
          text: "Insert Image", 
          onClick: () => this.setState({ activeBtnIndex: 0 }), 
          isActive: (activeBtnIndex === 0) 
        })}
        {this.renderBtn({ 
          iconComp: <SvgIcon name="text" size={2} color="#fff"/>, 
          text: "Insert Text", 
          onClick: () => { 
            this.addText(); 
            this.setState({ activeBtnIndex: 1 }) 
          }, 
          isActive: (activeBtnIndex === 1) 
        })}
        {this.renderBtn({ 
          iconComp: <SvgIcon name="background" size={2} color="#fff"/>, 
          text: "Background", 
          onClick: () => this.setState({ activeBtnIndex: 2 }),
          isActive: (activeBtnIndex === 2) 
        })}
        {this.renderBtn({ 
          iconComp: <SvgIcon name="back" size={2} color="#fff"/>, 
          text: "New Template", 
          isActive: (activeBtnIndex === 3) 
        })}
        {this.renderBtn({ 
          iconComp: <SvgIcon name="hire" size={2} color="#fff"/>, 
          text: "Hire a Pro", 
          btnIndex: 4,
          onClick: () => this.setState({hireProModal: true})
        })}
      </Grid>
    )
  }

  renderSideBarSecond() {
    const windowHeight = window.innerHeight;
    const { activeBtnIndex } = this.state;

    return (
      <Grid
        item
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        style={combineStyles([
          globalStyles.noMarginPadding,
          globalStyles.cont100,
          globalStyles.flex,
          globalStyles.column,
          styles.sideBarSecond,
          { height: windowHeight },
        ])}
      >
        {this.renderBtns(activeBtnIndex)}
      </Grid>
    )
  }

  renderBtns(activeBtnIndex) {
    let children = [];

    children.push({
      shown: activeBtnIndex === 0,
      components: [
        this.renderBtn({ key: 0, iconComp: <FaSquare size={28} color={'rgb(42, 153, 149)'} />, text: "Insert Shape", onClick: () => { this.addRect() } }),
        <div style={globalStyles.cont100} key={1}>
          <FileReaderInput
            id="my-file-input"
            onChange={this.handleImageUpload}
            style={combineStyles([globalStyles.cont100, globalStyles.center])}
          >
            <Button
              onClick={(e) => {
                e.preventDefault()
              }}
              style={combineStyles([{ margin: 0, width: '100%' }, globalStyles.center])}
            >
              <div style={combineStyles([globalStyles.center, globalStyles.column, { margin: 0, width: '100%' }])}>
                <SvgIcon name="upload" size={2} color="#fff" />
                <div style={combineStyles([{ textTransform: 'none' }, globalStyles.textWhite, globalStyles.text7, ])}>
                  Upload Image
                </div>
              </div>
            </Button>
          </FileReaderInput>
        </div>,
        this.renderBtn({
          key: 2,
          iconComp: <SvgIcon name="library" size={2} color="#fff" />,
          text: "Image Library",
          onClick: () => this.imagesModal.open() 
        }),
        this.renderBtn({ 
          key: 3,
          iconComp: <SvgIcon name="smile" size={2} color="#fff" />, 
          text: "Say Cheese", 
          isDisabled: true, onClick: () => { } 
        }),
        this.renderBtn({ 
          key: 4,
          iconComp: <SvgIcon name="qr" size={2} color="#fff" />, 
          text: "QR Code", 
          isDisabled: true, onClick: () => { }
        })
      ]
    });

    children.push({
      shown: activeBtnIndex === 1,
      components: [
        <ColorPicker 
          key={0}
          trigger={this.renderBtn({ iconComp: <FaSquare size={28} color={this.state.textStrokeColor} />, text: "Stroke Color", onClick: () => this.textStrokeColorPicker.open(100, 50) })} 
          ref={elem => this.textStrokeColorPicker = elem}
          value={this.state.textStrokeColor}
          onChange={value => {
            this.setState({
              textStrokeColor: value
            });
            this.setActiveStyle('stroke', value);
            this.fabricCanvas.renderAll();
          }}
        />,
        this.renderBtn({ 
          key: 1,
          iconComp: (
            <span>
              <div><SvgIcon name="stroke" size={2} color="#fff" /></div>
              <Range 
                value 
                inputOnly 
                value={this.state.strokeWidth || 0} 
                max={60} 
                onChange={(value) => {
                  this.setState({
                    strokeWidth: parseInt(value, 10)
                  });

                  this.setActiveStyle('strokeWidth', parseInt(value, 10))
                }} 
              />
            </span>
          ), 
          text: "Stroke Width" 
        }),
        <ColorPicker 
          key={2}
          trigger={this.renderBtn({ iconComp: <FaSquare size={28} color={this.state.textBackgroundColor} />, text: "Background Color", onClick: () => this.textBackgroundColorPicker.open(100, 50) })} 
          ref={elem => this.textBackgroundColorPicker = elem}
          value={this.state.textBackgroundColor}
          onChange={value => {
            this.setState({
              textBackgroundColor: value
            });
            this.setActiveStyle('backgroundColor', value);
            this.fabricCanvas.renderAll();
          }}
        />
      ]
    });

    children.push({
      shown: activeBtnIndex === 2,
      components: [
        <ColorPicker
          key={0} 
          trigger={this.renderBtn({ iconComp: <FaSquare size={28} color={this.state.backgroundColor} />, text: "Fill Color", onClick: () => this.backgroundColorPicker.open(100, 50) })} 
          ref={elem => this.backgroundColorPicker = elem}
          value={this.state.backgroundColor}
          onChange={value => {
            this.setState({
              backgroundColor: value
            });

            if (this.fabricCanvas.backgroundColor) {
              this.addActionToChangeLog({
                color: this.fabricCanvas.backgroundColor,
                type: 'setBackgroundColor'
              });
            } else if (this.fabricCanvas.backgroundImage) {
              this.addActionToChangeLog({
                background: this.fabricCanvas.backgroundImage,
                type: 'setBackgroundImage'
              });
            }

            this.fabricCanvas.setBackgroundImage(null);
            this.fabricCanvas.backgroundColor = value;
            this.fabricCanvas.renderAll();
          }}
        />,
        this.renderBtn({ key: 1, iconComp: <SvgIcon name="library" size={2} color="#fff" />, text: "Background Library", onClick: () => this.backgroundsModal.open()})
      ]
    });

    return (
      <div 
        style={combineStyles([
          globalStyles.noMarginPadding,
          globalStyles.cont100,
          globalStyles.flex,
          globalStyles.column,
          styles.sideBarButtonsContainer,
        ])}
      >
        {children.map(({components, shown}, index) => (
          <div style={{ opacity: shown ? 1 : 0, transform: shown ? 'scale(1)' : 'scale(2)', height: shown ? 'auto' : 0, ...styles.sideBarButtons }} key={index}>
            {components}
          </div>
        ))}
      </div>
    );
  }
  
  renderSideBar() {
    const width = window.innerWidth
    const windowHeight = window.innerHeight
    const { isVisibleSecondBar } = this.state
    return (
      <Grid
        item
        xs={3}
        sm={2}
        md={2}
        lg={2}
        xl={2}
        style={combineStyles([
          globalStyles.noMarginPadding,
          globalStyles.cont100,
          globalStyles.flex,
          globalStyles.row,
          styles.sideBar,
          {
            height: windowHeight,
          },
        ])}
      >
        <Grid container style={combineStyles([globalStyles.center, globalStyles.noMarginPadding])}>
          {this.renderSideBarFirst()}
          {this.renderSideBarSecond()}
        </Grid>
      </Grid>
    )
  }

  renderFiltersPopover() {
    const {advancedFilters} = this.state;
    const image = this.fabricCanvas.getActiveObject();
    const {filters: fabricFilters} = fabric.Image;

    return (
      <Popover
        open={this.state.filtersOpen}
        anchorEl={document.querySelector('#filters-button')}
        onClose={this.handleOnToggleFilters.bind(this)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      > 
        <section style={styles.filtersSection}>
          <Grid container>
            {ONE_CLICK_FILTERS.map((filter, index) => (
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.filters[filter]}
                      onChange={(event, checked) => {
                        this.applyFilter(index, checked && new fabricFilters[upperFirst(filter)]());
                        this.setState({ filters: {...this.state.filters, [filter]: checked }});
                      }}
                    />
                  }
                  label={filter}
                />
              </Grid>
            ))}
          </Grid>
          {advancedFilters ? (
            <Grid container>
              {RANGE_FILTERS.map((filter, index) => (
                <Grid item xs={6}>
                  <Range
                    value={this.state.filters[filter] || 0}
                    min={filter === 'hue' ? -2 : -1} 
                    max={filter === 'hue' ? 2 : 1} 
                    step={filter === 'hue' ? 0.002 : 0.1}
                    width={'100%'}
                    label={upperFirst(filter)}
                    onChange={(value) => {
                      const isHue = filter === 'hue';
                      const fixedFilter = isHue ? 'rotation' : filter;
                      const filterName = isHue ? 'HueRotation' : upperFirst(filter);
                      const cleanValue = parseFloat(value);
                      const fieldIndex = ONE_CLICK_FILTERS.length + index;

                      if (isHue) {
                        this.applyFilter(fieldIndex, new fabricFilters[filterName]({[fixedFilter]: cleanValue}), fixedFilter, cleanValue);
                      } else {
                        this.applyFilter(fieldIndex, new fabricFilters[filterName]({[fixedFilter]: cleanValue}));
                      }

                      this.setState({ filters: {...this.state.filters, [filter]: cleanValue }});
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : null}
          <Button style={styles.filtersButton} onClick={() => this.setState({advancedFilters: !advancedFilters})}>
            {advancedFilters ? 'HIDE ADVANCED FILTERS' : 'SHOW ADVANCED FILTERS'}
          </Button>
        </section>
      </Popover>
    );
  }

  renderControlsFor(type) {
    switch (type) {
      case 'path': {
        return [
          <Grid item key={0}>
            <ColorPicker
              ref={elem => this.pathColorPicker = elem}
              label={'Color'}
              value={this.getActiveStyle('fill')}
              onChange={value => this.setActiveStyle('fill', value)}
            />
          </Grid>
        ];
      } break;
      case 'i-text': {
        const fontFamilies = ["arial", "helvetica", "myriad pro", "delicious", "verdana", "georgia", "courier", "comic sans ms", "impact", "monaco", "optima", "hoefler text", "plaster", "engagement"];

        const fontStyle = this.getActiveStyle('fontStyle');

        return [
          <Grid item key={0}>
            <Dropdown
              label={'Family'}
              value={this.getActiveStyle('fontFamily')}
              onChange={value => this.setActiveStyle('fontFamily', value)}
              transform={value => <span style={{ fontFamily: value }}>{value}</span>}
              options={fontFamilies}
            />
          </Grid>,
          <Grid item key={1}>
            <Dropdown
              ref={(elem) => { this.fontSelector = elem }}
              label={'Size'}
              value={`${parseInt(this.getActiveStyle('fontSize', true), 10)}px`}
              onChange={value => this.setActiveStyle('fontSize', parseInt(value.replace('px', ''), 10), null, true)}
              options={sortedUniq(this.state.fontSizes)}
            />
          </Grid>,
          <Grid item key={2}>
            <Tooltip title="Bold">
              <IconSwitch
                onChange={isBold => this.setActiveStyle('fontWeight', isBold ? 'bold' : 'normal')}
                isStatic
              >
                <MdFormatBold />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={3}>
            <Tooltip title="Underline">
              <IconSwitch
                onChange={isUnderlined => this.setActiveStyle('underline', isUnderlined)}
                isStatic
              >
                <MdFormatUnderlined />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={4}>
            <Tooltip title="Italic">
              <IconSwitch
                onChange={isItalic => this.setActiveStyle('fontStyle', isItalic ? 'italic' : 'normal')}
                isStatic
              >
                <MdFormatItalic />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={5}>
            <ColorPicker
              ref={elem => this.textColorPicker = elem}
              label={'Color'}
              value={this.getActiveStyle('fill')}
              onChange={value => this.setActiveStyle('fill', value)}
            />
          </Grid>
        ];
      }
      case 'rect': {
        return [
          <Grid item key={0}>
            <Tooltip title="Cover to Side">
              <IconSwitch
                onChange={this.coverPage.bind(this)}
                isStatic
              >
                <SvgIcon name="cover" />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={1}>
            <ColorPicker
              ref={elem => this.rectBackgroundColorPicker = elem}
              label={'Background color'}
              value={this.getActiveStyle('fill')}
              onChange={value => this.setActiveStyle('fill', value)}
            />
          </Grid>,
          <Grid item key={2}>
            <ColorPicker
              ref={elem => this.rectStrokeColorPicker = elem}
              label={'Stroke color'}
              value={this.getActiveStyle('stroke')}
              onChange={value => this.setActiveStyle('stroke', value)}
            />
          </Grid>,
          <Grid item key={3}>
            <Range
              label={'Stroke width'}
              value={this.getActiveStyle('strokeWidth', true)}
              onChange={value => this.setActiveStyle('strokeWidth', value, null, true)}
            />
          </Grid>,
        ];
      }
      case 'svg': {
        return !this.state.editingSvg ? [
          <Grid item key={0}>
            <Tooltip title="Edit">
              <IconSwitch
                onChange={this.startEditingSvg.bind(this)}
                isStatic
              >
                <MdCreate />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={1}>
            <Tooltip title="Cover to Side">
              <IconSwitch
                onChange={this.coverPage.bind(this)}
                isStatic
              >
                <SvgIcon name="cover" />
              </IconSwitch>
            </Tooltip>
          </Grid>
        ] : [
          <Grid item key={0}>
            <Tooltip title="Save">
              <IconSwitch
                onChange={this.endEditingSvg.bind(this)}
                isStatic
              >
                <MdCheck />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={1}>
            <Tooltip title="Discard">
              <IconSwitch
                onChange={this.cancelEditingSvg.bind(this)}
                isStatic
              >
                <MdClose />
              </IconSwitch>
            </Tooltip>
          </Grid>
        ]
      }
      case 'image': {
        return !this.state.cropping ? [
          <Grid item key={0}>
            <Tooltip title="Crop">
              <IconSwitch
                onChange={this.startCropping.bind(this)}
                isStatic
              >
                <SvgIcon name='crop' />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={1}>
            <Tooltip title="Cover to Side">
              <IconSwitch
                onChange={this.coverPage.bind(this)}
                isStatic
              >
                <SvgIcon name="cover" />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={2}>
            <Tooltip title="Filters">
              <IconSwitch
                onChange={this.handleOnToggleFilters.bind(this)}
                isStatic
                id="filters-button"
              >
                <SvgIcon name="filters" />
              </IconSwitch>
            </Tooltip>
            {this.renderFiltersPopover()}
          </Grid>,
        ] : [
          <Grid item key={0}>
            <Tooltip title="Save">
              <IconSwitch
                onChange={this.endCropping.bind(this)}
                isStatic
              >
                <MdCheck />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={1}>
            <Tooltip title="Discard">
              <IconSwitch
                onChange={this.cancelCropping.bind(this)}
                isStatic
              >
                <MdClose />
              </IconSwitch>
            </Tooltip>
          </Grid>
        ]
      }
      case 'generalAlways': {
        return [
          <Grid item key={0}>
            <Tooltip title="Undo">
              <IconSwitch
                onChange={this.undo.bind(this)}
                isStatic
                disabled={!this.state.canUndo}
              >
                <SvgIcon name='undo' />
              </IconSwitch>
            </Tooltip>
          </Grid>,
        ]
      }
      case 'generalSelected': {
        return [
          <Grid item key={1}>
            <Tooltip title="Center to Side">
              <IconSwitch
                onChange={this.centerPage.bind(this)}
                isStatic
              >
                <SvgIcon name='center-to-side' />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={2}>
            <Tooltip title="Rotate 45º">
              <IconSwitch
                onChange={this.rotate.bind(this)}
                isStatic
              >
                <SvgIcon name='rotate' />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={3}>
            <Tooltip title="Flip Horizontal">
              <IconSwitch
                onChange={this.flipHorizontal.bind(this)}
                isStatic
              >
                <SvgIcon name='flip-horizontal' />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={4}>
            <Tooltip title="Flip Vertical">
              <IconSwitch
                onChange={this.flipVertical.bind(this)}
                isStatic
              >
                <SvgIcon name='flip-vertical' />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={5}>
            <Tooltip title="Bring Forward">
              <IconSwitch
                onChange={this.bringForward.bind(this)}
                isStatic
              >
                <SvgIcon name='bring-forward' />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={6}>
            <Tooltip title="Send Backwards">
              <IconSwitch
                onChange={this.sendBackwards.bind(this)}
                isStatic
              >
                <SvgIcon name='send-backwards' />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={7}>
            <Tooltip title="Duplicate">
              <IconSwitch
                onChange={this.duplicate.bind(this)}
                isStatic
              >
                <SvgIcon name='duplicate' />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={8}>
            <SvgIcon name='opacity' size={1.5} />
          </Grid>,
          <Grid item key={9} style={{ paddingLeft: 5 }}>
            <Range
              label={'Opacity'}
              value={this.getActiveStyle('opacity')}
              onChange={value => this.setActiveStyle('opacity', parseFloat(value, 10))}
              min={0}
              max={1}
              step={0.1}
            />
          </Grid>,
          <Grid item key={10}>
            <Tooltip title="Remove">
              <IconSwitch
                onChange={this.delete.bind(this)}
                isStatic
              >
                <SvgIcon name='remove' />
              </IconSwitch>
            </Tooltip>
          </Grid>,
          <Grid item key={11}>
            <Tooltip title="Shadow">
              <IconSwitch
                onChange={this.shadow.bind(this)}
                isStatic
              >
                <SvgIcon name='shadow' />
              </IconSwitch>
            </Tooltip>
          </Grid>,
        ];
      }
      default: {
        return [];
      }
    }
  }

  update4views() {
    const canvasCopyOutside = document.getElementById('outsideView');
    const canvasCopyInside = document.getElementById('insideView');
    const sideview1 = document.getElementById('sideview1');
    const sideview2 = document.getElementById('sideview2');
    const sideview3 = document.getElementById('sideview3');
    const sideview4 = document.getElementById('sideview4');
    const sideview5 = document.getElementById('sideview5');
    const ctxSideview1 = sideview1.getContext('2d');
    const ctxSideview2 = sideview2.getContext('2d');
    const ctxSideview3 = sideview3.getContext('2d');
    const ctxSideview4 = sideview4.getContext('2d');
    const ctxSideview5 = sideview5.getContext('2d');

    ctxSideview1.imageSmoothingEnabled = true;
    ctxSideview2.imageSmoothingEnabled = true;
    ctxSideview3.imageSmoothingEnabled = true;
    ctxSideview4.imageSmoothingEnabled = true;
    ctxSideview5.imageSmoothingEnabled = true;

    ctxSideview1.clearRect(0, 0, sideview1.width, sideview1.height);
    ctxSideview2.clearRect(0, 0, sideview2.width, sideview2.height);
    ctxSideview3.clearRect(0, 0, sideview3.width, sideview3.height);
    ctxSideview4.clearRect(0, 0, sideview4.width, sideview4.height);
    ctxSideview5.clearRect(0, 0, sideview5.width, sideview5.height);

    const targetCanvas = this.state.isOutView ? canvasCopyOutside : canvasCopyInside;
    const width = canvasWidth;
    const height = canvasHeight;

    ctxSideview1.drawImage(
      targetCanvas, 
      -bleedingEdge, 
      -bleedingEdge - 2, 
      width, 
      height
    );

    ctxSideview2.drawImage(
      targetCanvas, 
      -bleedingEdge - ((canvasWidth - (bleedingEdge * 2)) / 4), 
      -bleedingEdge - 2, 
      width, 
      height
    );

    ctxSideview3.drawImage(
      targetCanvas, 
      -bleedingEdge - ((canvasWidth - (bleedingEdge * 2)) / 2), 
      -bleedingEdge - 2, 
      width, 
      height
    );
    
    ctxSideview4.drawImage(
      targetCanvas, 
      -canvasWidth + ((canvasWidth - (bleedingEdge * 2)) / 4) + bleedingEdge,
      -bleedingEdge, 
      width, 
      height
    );
    
    ctxSideview5.drawImage(
      targetCanvas, 
      -bleedingEdge - 2, 
      -bleedingEdge - 2, 
      width, 
      height
    );
  }

  handleOnToggleEditorMode(isEditorMode) {
    if (!this.state.cropping){
      this.deselectAll();
      this.setState({ isEditorMode });
    }
  }

  renderSubHeader() {
    const windowHeight = window.innerHeight
    const { isOutView, selectedObject } = this.state
    return (
      <Grid
        container
        style={styles.subHeader}
      >
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          lg={8}
          xl={8}
          style={combineStyles([
            globalStyles.noMarginPadding,
          ])}
        >
          <Grid
            container
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            spacing={0}
          >
            {this.state.editingSvg ? this.renderControlsFor('svg') : null}
            {!this.state.editingSvg ? this.renderControlsFor('generalAlways') : null} 
            {!this.state.editingSvg && selectedObject ? this.renderControlsFor('generalSelected') : null}
          </Grid>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          style={combineStyles([
            globalStyles.noMarginPadding,
            globalStyles.center,
          ])}
        >
          <div>
            Need Help?
          </div>
        </Grid>
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          style={combineStyles([
            globalStyles.noMarginPadding,
            globalStyles.center
          ])}
        >
          <div style={combineStyles([globalStyles.center, { borderColor: '#45aada', borderWidth: 1, borderRadius: 5 }])}>
            <Button
              onClick={() => this.changeView(true)}
              style={combineStyles([globalStyles.noMarginPadding, { backgroundColor: isOutView ? '#45aada' : '#fff' }])}>
              <div style={combineStyles([{ paddingLeft: 15, paddingRight: 15, color: isOutView ? 'white' : '#45aada' }])}>
                Outside View
              </div>
            </Button>
            <Button
              onClick={() => this.changeView(false)}
              style={combineStyles([globalStyles.noMarginPadding, { backgroundColor: isOutView ?  '#fff' : '#45aada' }])}>
              <div style={combineStyles([{ paddingLeft: 15, paddingRight: 15, color: isOutView ? '#45aada' : 'white' }])}>
                Inner View
              </div>
            </Button>
            <div style={{ height: 36, width: 36 }}>
              <Button
                onClick={() => {
                  this.setState({ 
                    modalExplanationVisible: !this.state.modalExplanationVisible, 
                    textExplanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' 
                  })
                }}
                color="primary" 
                aria-label="add" 
                style={{ width: 36, height: 36, margin: 0, padding: 0, backgroundColor: 'yellow' }}
                //fab
                variant="fab"
              >
                <FaExclamation size={14} color='#000' />
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }

  renderContBox() {
    const windowHeight = window.innerHeight
    return (
      <Grid
        item
        width={2}
        style={combineStyles([
          globalStyles.noMarginPadding,
          globalStyles.center,
          {
            height: 0.4 * windowHeight,
            flex: 1
          },
        ])}
      >
        <div style={combineStyles([globalStyles.center, globalStyles.cont100])} id="boxContainer">
          <Box update4views={this.update4views.bind(this)} />
        </div>
      </Grid>
    )
  }

  renderContView() {
    const windowHeight = window.innerHeight;
    const { isOutView } = this.state;
    const sideViewBoxesWidth = (canvasWidth - (bleedingEdge * 2)) / 2;
    const sideViewBoxesHeight = (canvasHeight - (bleedingEdge * 2));

    return (
      <Grid
        item
        width={14}
        style={combineStyles([
          globalStyles.noMarginPadding,
          globalStyles.center,
          {
            height: 0.4 * windowHeight,
            width: '55%',
            flex: 1
          },
        ])}
      >
        <div style={{ width: '50%', transform: 'scale(0.55)', marginTop: '-200px', marginLeft: '-400px' }}>
        <div style={{ position: 'absolute' }}>
          <div className="view" style={{ width: sideViewBoxesWidth, height: sideViewBoxesHeight }}>
            <div></div>
            <canvas id="sideview1" className="sideview_canvas" width={sideViewBoxesWidth} height={sideViewBoxesHeight}></canvas>
          </div>
          <div className="view" style={{ width: sideViewBoxesWidth, height: sideViewBoxesHeight }}>
            <div></div>
            <canvas id="sideview2" className="sideview_canvas" width={sideViewBoxesWidth} height={sideViewBoxesHeight}></canvas>
          </div>
        </div>
        <div style={{ position: 'absolute', marginLeft: '410px' }}>
          <div className="view" style={{ width: sideViewBoxesWidth, height: sideViewBoxesHeight }}>
            <div></div>
            <canvas id="sideview3" className="sideview_canvas" width={sideViewBoxesWidth} height={sideViewBoxesHeight}></canvas>
          </div>
          <div className="view" style={{ width: sideViewBoxesWidth, height: sideViewBoxesHeight }}>
            <div></div>
            <canvas id="sideview4" width={sideViewBoxesWidth / 2} height={sideViewBoxesHeight} className="sideview_canvas half"></canvas>
            <canvas id="sideview5" width={sideViewBoxesWidth / 2} height={sideViewBoxesHeight} className="sideview_canvas half"></canvas>
          </div>
        </div>
      </div>
      </Grid>
    )
  }

  renderModalExplanations() {
    const { textExplanation } = this.state
    return (
      <Dialog
        open={!!this.state.modalExplanationVisible}
        onRequestClose={() => {
          this.setState({ modalExplanationVisible: !this.state.modalExplanationVisible })
        }}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <div
            style={combineStyles([globalStyles.flex, globalStyles.center, globalStyles.text18])}
          >
            {textExplanation}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.setState({ modalExplanationVisible: !this.state.modalExplanationVisible })
            }}
            color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderContCanvas() {
    const windowHeight = window.innerHeight
    const { isEditorMode } = this.state
    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={combineStyles([
          globalStyles.noMarginPadding,
          globalStyles.flex,
          {
            justifyContent: 'center',
            height: (0.6 * windowHeight) - 60 - 55,
          },
        ])}
      >
        <div>
          <ZoomableZone 
            width={canvasWidth + (bleedingEdge * 2)} 
            height={canvasHeight + (bleedingEdge * 2)}
          >
            <BleedingEdge isEditorMode={this.state.isEditorMode} bleedingEdge={bleedingEdge} canvasHeight={canvasHeight} canvasWidth={canvasWidth} />

            <div style={{ ...styles.editorContainer, width: canvasWidth, height: canvasHeight, marginLeft: 1.5 }}>
              <div
                style={{
                  display: this.state.isOutView ? 'block' : 'none',
                }}
              >
                <canvas
                  id="outsideView"
                  width={`${highResCanvasWidth}`}
                  height={`${highResCanvasHeight}`}
                  ref={(node) => {
                    this.canvas = node
                  }}
                />
              </div>
              <div
                style={{
                  display: this.state.isOutView ? 'none' : 'block',
                }}
              >
                <canvas
                  id="insideView"
                  width={`${highResCanvasWidth}`}
                  height={`${highResCanvasHeight}`}
                />
              </div>
            </div>
            {this.state.cropping ? (
              <div className="editor-crop" style={styles.editorCrop}>
                <Cropper
                  ref={(elem) => this.cropper = elem}
                  src={this.state.croppableImage}
                  style={styles.cropper}
                />
              </div>
            ) : null}
          </ZoomableZone>
          <div className="editor-progress" style={{ display: 'none' }}>
            <span>Loading Photo</span>
          </div>
          <div className="buttonsBottom">
            <div className="pull-right">
              <button id="bt_hide_safearea">Show/Hide safe area</button>
              <button id="bt_hide_cropmarks">Show/Hide crop &amp; fold marks</button>
            </div>
          </div>
          <div className="boxy_logo_advisor">
            <a href=""><img src="/images/editorImages/btn_interrogation.png"/></a>
            <div className="popup">
              <button className="close">x</button>
              <h5>REMOVE BOXY CARD LOGO</h5>
              <p>All Boxy Cards feature a small Boxy logo on the inside of your card that can easily be removed for +25% increase of overall total cost.</p>
              <button className="bt-action">KEEP IT</button>
              <button className="bt-action">PAY TO REMOVE</button>
              <div className="arrow-down inner"></div>
              <div className="arrow-down"></div>
            </div>
          </div>
          <div style={combineStyles([globalStyles.center, styles.modeButtons])}>
            <Button
              onClick={this.handleOnToggleEditorMode.bind(this, true)}
              style={combineStyles([globalStyles.noMarginPadding, { backgroundColor: isEditorMode ? '#45aada' : '#fff' }])}>
              <div style={combineStyles([styles.modeButton, { color: isEditorMode ? 'white' : '#45aada' }])}>
                Editor mode
              </div>
            </Button>
            <Button
              onClick={this.handleOnToggleEditorMode.bind(this, false)}
              style={combineStyles([globalStyles.noMarginPadding, { backgroundColor: isEditorMode ? '#fff' : '#45aada' }])}>
              <div style={combineStyles([styles.modeButton, { color: isEditorMode ? '#45aada' : 'white' }])}>
                Print mode
              </div>
            </Button>
          </div>
          <Button onClick={() => {
            this.setState({ 
              modalExplanationVisible: !this.state.modalExplanationVisible, 
              textExplanation: (
                <div
                  style={combineStyles([globalStyles.flex, globalStyles.center, globalStyles.text18])}
                >
                  <img src="/images/editorImages/safe_area_info.jpg" style={{width: '100%'}} />
                </div>
              )
            })
          }}>
            BLEED & SAFE AREA EXPLAINED
          </Button>
          {this.renderHireProModal()}
        </div>
      </Grid>
    )
  }
  
  renderHireProModal () {
    return (
      <Dialog
        open={!!this.state.hireProModal}
        onRequestClose={() => {
          this.setState({ hireProModal: false })
        }}
      >
        <DialogTitle></DialogTitle>
          <DialogContent>
            <h1>HIRE A PRO</h1>
            <h3>who fits your style and budget!</h3>
            <p>Short on time? Not a designer? Have an idea, but don’t know how to design it?</p>
            <p>NOT A PROBLEM!</p>
            <p>You might love our templates, but want your Boxy Card as unique as you are. Our HIRE A PRO option allows custom features, images and photo manipulations.</p>
            <p>A designer should know the importance of marketing as well as creativity, which is why we pair a skilled designer with the look & feel you are trying to portray.</p>
          </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.setState({ hireProModal: false })
            }}
            color="primary" autoFocus
          >
            Close
          </Button>
          <Button
            color="primary" raised autoFocus
          >
            Pair me
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderFormatHeader() {
    const { selectedObject, selectedObjectType } = this.state;
    const isSvg = selectedObject && selectedObject._objects && (selectedObjectType === 'image' || selectedObjectType === 'group');
    const controls = this.renderControlsFor(isSvg ? 'svg' : selectedObjectType);

    return (
      <Grid
        spacing={8}
        container
        style={combineStyles([
          styles.formatHeader,
          {
            padding: controls.length ? '0 10px' : 0,
            opacity: !selectedObject ? 0 : 1,
          },
          {
            position: 'absolute',
            zIndex: 9999
          }
        ])}
      >
        {controls}
      </Grid>
    );
  }

  renderMain() {
    const windowHeight = window.innerHeight;

    return (
      <Grid
        item
        xs={9}
        sm={9}
        md={10}
        lg={10}
        xl={10}
        style={combineStyles([globalStyles.noMarginPadding])}
      >
        {this.renderSubHeader()}
        {this.renderFormatHeader()}
        <Grid
          container
          style={combineStyles([globalStyles.noMarginPadding, { minWidth: '1000px' }])}
        >
          <Grid
            container
            style={styles.mainInnerContainer}
          >
            {this.renderContBox()}
            {this.renderContView()}
          </Grid>
          {this.renderContCanvas()}
          {this.state.isLoading ? <Loading /> : null}
        </Grid>
      </Grid>
    )
  }

  renderBody() {
    const windowHeight = window.innerHeight;

    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={combineStyles([styles.body, {height: windowHeight} , globalStyles.noMarginPadding, globalStyles.cont100, globalStyles.flex, globalStyles.row])}
      >
        {this.renderSideBar()}
        {this.renderMain()}
        <ImagesModal ref={elem => this.imagesModal = elem} onClick={this.addImage.bind(this)} />
        <ImagesModal ref={elem => this.backgroundsModal = elem} onClick={this.setBackgroundImage.bind(this)} kind='backgrounds' />
        {this.renderModalExplanations()}
      </Grid>
    )
  }

  render() {
    return (
      <Grid container style={styles.mainContainer}>
        {this.renderEditorNav()}
        {this.renderBody()}
      </Grid>
    );
  }
}

const MeteorLandingPage = createContainer(() => {
  return {

  }
}, EditorPage)

const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    doUpdateAlert: (alertMessage) => {
      dispatch(updateAlert(alertMessage))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeteorLandingPage);
