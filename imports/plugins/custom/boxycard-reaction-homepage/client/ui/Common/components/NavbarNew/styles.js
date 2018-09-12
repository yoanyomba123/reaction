import colors from "../../../../config/colors"

const navHeight = 60

const textColor = "black"

const styles = {
  row: {
    backgroundColor: "#fff",
    width: "100%",
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    borderBottomStyle: "solid",
  },
  cont: {
    padding: 0,
    margin: 0,
    borderRadius: 0,
    height: navHeight,
  },
  contName: {
    padding: 0,
    paddingTop: 0.15 * navHeight,
    paddingBottom: 0.15 * navHeight,
    height: 40,
  },
  contSearch: {
    padding: 0,
    paddingTop: 0.15 * navHeight,
    paddingBottom: 0.15 * navHeight,
    height: navHeight,
  },
  textName: {
    color: textColor,
    fontSize: 0.3 * navHeight,
  },
  contMenus: {
    flexDirection: "row",
    padding: 0,
    height: navHeight,
  },
  contMenuItem: {
    paddingLeft: 10,
    paddingRight: 10,
    cursor: "pointer"
  },
  textMenu: {
    color: textColor,
    fontWeight: "400",
    margin: 0
  },
  contGridMenu: {
    flexDirection: "row",
    padding: 0,
    position: "absolute",
    zIndex: 100,
    top: 75
  },
  icon: {
    color: "#000"
  },

  contInput: {
    width: "100%",
    height: navHeight,
    paddingTop: 0.15 * navHeight,
    paddingBottom: 0.15 * navHeight,
    paddingLeft: "5%",
    position: "absolute",
    zIndex: 110
  },
  input: {
    width: "100%",
    height: "100%",
    paddingLeft: "5%",
    paddingTop: "2%",
    paddingBottom: "2%",
    backgroundColor: colors.veryLightGrey,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRightWidth: 0,
    borderStyle: "solid",
    fontSize: 16,
  },
  inputOpen: {
    backgroundColor: "#fff",

  },
  inputFocused: {
    outline: "none",
  },
  suggestionsList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderTopWidth: 0,
    borderStyle: "solid",
  },
  suggestionHighlighted:{
    backgroundColor: colors.veryLightGrey
  },
  contSuggestion: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    padding: 10,
    paddingLeft: "5%",
    cursor: "pointer",
  },
  textSuggestion: {
    margin: 0,
    padding: 0,
  },
  contBtnSearch: {
    backgroundColor: colors.veryLightGrey,
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderStyle: "solid",
    borderLeftWidth: 0,
  },
  iconCart: {
    color: textColor,
    marginBottom: 5
  },
  textMessage: {
    margin: 0,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: "center"
  },

  contInputZip: {
    width: "100%",
    maxWidth: 350
  },
  contTextField: {
    width: "100%",
    borderStyle: "solid",
    borderRadius: 2,
    borderColor: colors.grey,
    borderWidth: 1,
    height: 50,
    marginTop: "6%",
    marginBottom: "6%",
  },
  contBtnGo: {
    marginTop: "5%",
    marginBottom: "5%",
    height: 50,
    width: "100%",
    backgroundColor: colors.grey,
    cursor: "pointer"
  },
  badgeStyle: {
    top: 16,
    right: 15,
    width: 18,
    height: 18,
    backgroundColor: colors.brandColor
  }
}

export default styles
