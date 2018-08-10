import colors from "../../../../config/colors"

const navHeight = 60

const textColor = "#000"

const styles = {
  contImagesRow: {
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  contImage: {
    paddingLeft: "0.5%",
    paddingRight: "0.5%",
    paddingTop: 10
  },
  contImageBox: {
    overflow: "hidden",
    cursor: "pointer"
  },
  image: {
    width: "100%",
    height: "auto",
  },
  textOverImg: {
    position: "absolute",
    width: "100%",
    cursor: "pointer",
  },
  contAnswer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: '4%',
    paddingRight: "4%",
  },
  contBox: {
    padding: 10,
  },
  contBoxIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
  },
  contAnswerText: {
    padding: "5%",
  },
  textAnswerTitle: {
    textAlign: 'center',
  },
  contBoxElse: {
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  contTextNY: {
    paddingLeft: "1.5%",
    paddingTop: "5%",
    paddingRight: "8%",
    paddingBottom: "5%",
  },
  textHelloTitle: {
    paddingTop: 5,
    paddingBottom: 15
  },
  textHelloText: {
    paddingTop: 5,
    paddingBottom: 5
  },
  contImageNY: {
    width: "50%",
    padding: "1.5%"
  },
  imgNY: {
    height: "10%",
    width: 'auto'
  },
  contBtn: {
    width: "100%",
    paddingLeft: "15%",
    paddingTop: "8%",
    paddingRight: "15%",
    paddingBottom: "8%"
  },
  contInput: {
    borderStyle: "solid",
    borderRadius: 2,
    borderColor: colors.grey,
    borderWidth: 1,
    height: 60,
    width: "100%"
  },
  contTextField: {
    width: "80%"
  },
  contBtnGo: {
    width: "20%",
    height: "100%",
    backgroundColor: colors.grey,
    cursor: "pointer"
  }
}

export default styles