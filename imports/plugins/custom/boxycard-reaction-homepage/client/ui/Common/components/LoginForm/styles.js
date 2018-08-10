import colors from "../../../../config/colors"

const height = 700
const styles = {
  cont: {
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  textField: {
    width: "100%",
    color: "#000"
  },
  separator: {
    width: "40%",
    height: 1,
    backgroundColor: "#eee",
    marginTop: 5,
    marginBottom: 5,
  },
  contOr: {
    width: "20%",
  },
  textOr: {
    fontSize: 14,
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
  contBtn: {
    marginTop: 20,
    marginBottom: 10,
    padding: 12,
    borderRadius: 2,
  },
  btnEmail: {
    backgroundColor: colors.brandColor,
  },
  btnFb: {
    backgroundColor: "#3b5998",
  },
  iconFb: {
    color: "#fff",
    fontSize: 16
  },
  textBtnFb: {
    padding: 0,
    margin: 0,
    paddingLeft: 10,
    color: "#fff",
    fontSize: 18,
    fontWidth: 300
  },
  textBtn: {
    padding: 0,
    margin: 0,
    padding: 10,
    color: "#000",
    fontSize: 18,
    fontWidth: 300,
    textDecoration: "underline"
  },

  contTextField: {
    width: "100%",
    borderStyle: "solid",
    borderRadius: 2,
    borderColor: colors.grey,
    borderWidth: 1,
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: "6%",
    marginBottom: "6%",
  },

}

export default styles
