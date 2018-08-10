import React, { Component } from 'react'
import globalStyles from "../../../../config/globalStyles"
import colors from "../../../../config/colors"
import { combineStyles } from "../../../../config/helpers"

export default class SummaryRow extends Component {
  render() {
    const { text1, text2, highLighted } = this.props
    return (
      <div style={combineStyles([{ paddingTop: '2.5%', paddingBottom: '2.5%' }, globalStyles.flex, globalStyles.row, globalStyles.cont100])}>
        <div style={{ width: "70%" }}>
          <p style={ combineStyles([{ textAlign: "left" }, globalStyles.textSmall, globalStyles.textGrey, globalStyles.noMargin, highLighted ? { color: colors.brandColor } : {}]) }>{text1}</p>
        </div>
        <div style={{ width: "30%" }}>
          <p style={combineStyles([{ textAlign: "right" }, globalStyles.textSmall, globalStyles.textGrey, globalStyles.textNormal, globalStyles.noMargin, highLighted ? { color: colors.brandColor } : {}])}>{text2}</p>
        </div>
      </div>
    )
  }
}