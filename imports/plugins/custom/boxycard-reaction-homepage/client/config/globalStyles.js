import colors from "./colors";

const globalStyles = {
  bgBrand: {
    backgroundColor: colors.brandColor,
  },
  left: {
    alignItems: "flex-start",
  },
  right: {
    alignItems: "flex-end",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  textMargin5: {
    marginTop: 5,
    marginBottom: 5,
  },
  textAlert: {
    color: 'red',
  },
  textBrand: {
    color: colors.brandColor,
  },
  textBlue: {
    color: colors.blue,
  },
  textGrey: {
    color: colors.darkGrey,
  },
  textMidGrey: {
    color: colors.darkGrey,
  },
  textBlack: {
    color: 'black',
  },
  textDark: {
    color: '#040d14',
  },
  textWhite: {
    color: "white",
  },
  textPurple: {
    color: colors.purple,
  },
  textRed: {
    color: colors.red,
  },
  textRed: {
    color: colors.red,
  },
  textLeft: {
    textAlign: "left",
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
  textItalic: {
    fontStyle: "italic",
  },
  textLineThrough: {
    textDecorationLine: "line-through",
  },
  textUnderline: {
    textDecorationLine: "underline",
  },
  textThin: {
    fontWeight: 300,
  },
  textNormal: {
    fontWeight: 400,
  },
  textBold5: {
    fontWeight: 600,
  },
  textBold6: {
    fontWeight: 600,
  },
  textBold7: {
    fontWeight: 700,
  },
  textBold8: {
    fontWeight: 800,
  },
  textBig2: {
    fontSize: 28,
    margin: 0,
  },
  textBig1: {
    fontSize: 24,
    margin: 0,
  },
  textBig: {
    fontSize: 20,
    margin: 0,
  },
  textMid: {
    fontSize: 16,
    margin: 0,
  },
  textAvarage: {
    fontSize: 15,
    margin: 0,
  },
  textSmall: {
    fontSize: 14,
    margin: 0,
  },
  textSmaller: {
    fontSize: 12,
    margin: 0,
  },
  textMini: {
    fontSize: 10,
    margin: 0,
  },
  text45: {
    fontSize: 45,
  },
  text40: {
    fontSize: 40,
  },
  text35: {
    fontSize: 35,
  },
  text28: {
    fontSize: 28,
  },
  text26: {
    fontSize: 26,
  },
  text24: {
    fontSize: 24,
  },
  text22: {
    fontSize: 22,
  },
  text20: {
    fontSize: 20,
  },
  text18: {
    fontSize: 18,
  },
  text17: {
    fontSize: 17,
  },
  text16: {
    fontSize: 16,
  },
  text14: {
    fontSize: 14,
  },
  text12: {
    fontSize: 12,
  },
  text10: {
    fontSize: 10,
  },
  text8: {
    fontSize: 8,
  },
  text7: {
    fontSize: 7,
  },
  text6: {
    fontSize: 6,
  },
  textShadow: {
    textShadow: "0 0 5px #000",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  centerHorizontal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  centerVertical: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  flex: {
    display: "flex",
  },
  column: {
    display: "flex",
    flexDirection: 'column',
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  noMargin: {
    margin: 0,
  },
  noPadding: {
    padding: 0,
  },
  noMarginPadding: {
    margin: 0,
    padding: 0,
  },
  widthFull: {
    width: "100%",
  },
  sizeFull: {
    width: "100%",
    height: "100%",
  },
  borderLeft: {
    borderLeftStyle: "solid",
    borderLeftWidth: 1,
    borderLeftColor: colors.grey,
  },
  borderTop: {
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
  borderBottom: {
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  borderRight: {
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: colors.grey,
  },
  borderGrey: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderStyle: "solid",
  },
  borderBrand: {
    borderColor: colors.brandColor,
    borderWidth: 1,
    borderStyle: "solid",
  },
  shadowGrey: {
    boxShadow: '0px 0px 5px #afafaf',
  },
  shadowDark: {
    boxShadow: '0px 0px 5px #000',
  },
  borderRadius2: {
    borderRadius: 2,
  },
  borderRadius5: {
    borderRadius: 5,
  },
  backgroundBlue: {
    backgroundColor: colors.blue,
  },
  backgroundLight: {
    backgroundColor: colors.lightGrey,
  },
  backgroundGrey: {
    backgroundColor: colors.grey,
  },
  backgroundBrandLight: {
    backgroundColor: colors.brandColorLight,
  },
  backgroundBrand: {
    backgroundColor: colors.brandColor,
  },
  backgroundBrandDark: {
    backgroundColor: colors.brandColorDark,
  },
  contNav: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 10,
    width: "100%",
  },
  contBody: {
    zIndex: 9,
  },
  cont5: {
    width: '5%',
  },
  cont10: {
    width: '10%',
  },
  cont15: {
    width: '15%',
  },
  cont20: {
    width: '20%',
  },
  cont25: {
    width: '25%',
  },
  cont30: {
    width: '30%',
  },
  cont35: {
    width: '35%',
  },
  cont40: {
    width: '40%',
  },
  cont45: {
    width: '45%',
  },
  cont50: {
    width: '50%',
  },
  cont60: {
    width: '60%',
  },
  cont70: {
    width: '70%',
  },
  cont80: {
    width: '80%',
  },
  cont90: {
    width: '90%',
  },
  cont95: {
    width: '95%',
  },
  cont100: {
    width: '100%',
  },
  padding5: {
    padding: 5,
  },
  paddingTop5: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  paddingBottom5: {
    paddingBottom: 5,
  },
  paddingLeft5: {
    paddingLeft: 5,
  },
  paddingRight5: {
    paddingRight: 5,
  },
  paddingTopBottom5: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  padding10: {
    padding: 10,
  },
  paddingTopBottom10: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  paddingTop10: {
    paddingTop: 10,
  },
  paddingBottom10: {
    paddingBottom: 10,
  },
}

export default globalStyles;
