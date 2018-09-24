export default {
  //General
  centered: { 
    alignItems: 'center' 
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  //Custom
  mainContainer: { 
    backgroundColor: '#eee' 
  },
  body: {
    position: 'fixed',
    top: 60,
    left: 0,
    minWidth: 1000
  },
  mainInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  formatHeader: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    margin: 0
  },
  editorCrop: {
    position: 'absolute',
    marginTop: -218,
    marginLeft: 17
  },
  cropper: {
    height: 205, width: 777
  },
  modeButtons: {
    borderColor: '#45aada',
    borderWidth: 1,
    borderRadius: 5
  },
  modeButton: { paddingLeft: 15, paddingTop: 5, paddingRight: 15, paddingBottom: 5 },
  editorContainer: { background: '#fff', zIndex: 1, overflow: 'hidden' },
  subHeader: {
    height: 50,
    backgroundColor: '#d0d3d5',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  filtersSection: {padding: 20, maxWidth: 900},
  filtersButton: {float: 'right', marginBottom: 20},
  sideBar: { backgroundColor: '#eee' }, 
  sideBarButtons: {width: '100%', overflow: 'hidden', transition: 'height 0s, opacity .5s ease-in-out, transform .3s linear'},
  sideBarButtonsContainer: { alignItems: 'center' },
  sideBarFirst: { backgroundColor: '#272c33', paddingBottom: '15%' },
  sideBarSecond: { backgroundColor: '#3f4751', paddingBottom: '15%' },
  imageButton: { flexDirection: 'column', width: '100%', paddingTop: 10, paddingBottom: 10 },
  imageButtonContainer: { margin: 0, padding: 0, width: "100%" },
  imageButtonActive: { backgroundColor: '#3f4751' },
  imageButtonImage: { width: '90%', height: 'auto', maxWidth: 32 },
  imageButtonText: { textTransform: 'none' },
  imageButtonTextDisabled: { color: '#eee' },
  allChangesSaved: { fontStyle: 'italic' },
  editorNav: {
    height: 60,
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#000',
  }
}