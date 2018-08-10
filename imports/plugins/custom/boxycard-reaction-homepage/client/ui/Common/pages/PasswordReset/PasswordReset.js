import React, { Component } from 'react';
import { render, ReactDOM } from 'react-dom';
import { Redirect } from 'react-router-dom'
import styles from './styles'
import { combineStyles, isStrongPassword } from '../../../../config/helpers'
import globalStyles from "../../../../config/globalStyles";
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux'
import { updateAlert } from "../../../Actions";

class PasswordReset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      confirmPassword: '',
      showAlert: false,
      alertMessage: "Oops, something went wrong.",
    }
    this.handleError = this.handleError.bind(this)
    this.renderInputs = this.renderInputs.bind(this)
    this.handleSubmitReset = this.handleSubmitReset.bind(this)
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
    this._isMounted = false
  }
  componentWillMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  handleError(alertMessage) {
    if (this._isMounted) {
      this.props.doUpdateAlert(alertMessage)
    }
  }
  handleOnKeyDown(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      this.handleSubmitReset()
    }
  }
  renderMain() {
    const { password, confirmPassword } = this.state
    return (
      <Grid container style={combineStyles([globalStyles.noMarginPadding, globalStyles.center, { padding: 20, paddingBottom: 40 }])}>
        <div style={{ maxWidth: 450 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={2} style={globalStyles.center}>
            <div style={{ padding: 10 }}>
              <p style={combineStyles([globalStyles.textCenter, globalStyles.textMid])}>
                Reset your password
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
            <div style={{ padding: 10 }}>
              <p style={combineStyles([globalStyles.textCenter, globalStyles.textSmall])}>Passwords must be at least 8 characters long</p>
              <p style={combineStyles([globalStyles.textCenter, globalStyles.textSmall])}>At least an uppercase letter</p>
              <p style={combineStyles([globalStyles.textCenter, globalStyles.textSmall])}>At least a number</p>
            </div>
            <div style={combineStyles([styles.contTextField, globalStyles.center, globalStyles.backgroundGrey])}>
              <TextField
                id="password"
                fullWidth
                InputProps={{ placeholder: 'Password' }}
                value={password}
                type="password"
                onChange={(e) => {
                  this.setState({ password: e.target.value })
                }}
                onKeyDown={this.handleOnKeyDown}
                style={combineStyles([globalStyles.textAvarage, { paddingLeft: 10 }])}
              />
            </div>
            <div style={combineStyles([styles.contTextField, globalStyles.center, globalStyles.backgroundGrey])}>
              <TextField
                ref={(ref) => { this.InputConfirm = ref }}
                id="confirm_password"
                fullWidth
                InputProps={{ placeholder: 'Confirm Password' }}
                value={confirmPassword}
                type="password"
                onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }}
                onKeyDown={this.handleOnKeyDown}
                style={combineStyles([globalStyles.textAvarage, { paddingLeft: 10 }])}
              />
            </div>
            <div style={combineStyles([globalStyles.center, styles.contBtn, styles.btnEmail])} onClick={this.handleSubmitReset}>
              <p style={combineStyles([styles.textBtnFb, globalStyles.textAvarage])}>Reset Password</p>
            </div>
          </Grid>
        </div>
      </Grid>
    )
  }
  renderInputs() {
    const { password, confirmPassword } = this.state
    return (
      <div style={combineStyles([globalStyles.backgroundGrey])}>
        <div style={combineStyles([styles.contTextField, globalStyles.center, globalStyles.backgroundGrey])}>
          <TextField
            id="password"
            fullWidth
            InputProps={{ placeholder: 'Password' }}
            value={password}
            type="password"
            onChange={(e) => {  this.setState({password: e.target.value}) }}
            onKeyDown={this.handleOnKeyDown}
            style={combineStyles([globalStyles.textAvarage, {paddingLeft: 10}])}
          />
        </div>
        <div style={combineStyles([styles.contTextField, globalStyles.center, globalStyles.backgroundGrey])}>
          <TextField
            id="confirm_password"
            fullWidth
            InputProps={{ placeholder: 'Confirm Password' }}
            value={confirmPassword}
            type="password"
            onChange={(e) => {  this.setState({confirmPassword: e.target.value}) }}
            onKeyDown={this.handleOnKeyDown}
            style={combineStyles([globalStyles.textAvarage, {paddingLeft: 10}])}
          />
        </div>

        <div style={{ paddingTop: 20 }}>
          <div style={combineStyles([globalStyles.center, styles.contBtn, styles.btnEmail])} onClick={this.handleSubmitReset}>
            <p style={combineStyles([styles.textBtnFb, globalStyles.textAvarage])}>Create an account</p>
          </div>
        </div>
      </div>
    )
  }
  handleSubmitReset() {
    const { password, confirmPassword } = this.state
    const token = this.props.match.params.token
    if (password === confirmPassword) {
      const isStrongPasswordObj = isStrongPassword(password)
      const { isStrong, msg } = isStrongPasswordObj
      if (isStrong) {
        Accounts.resetPassword(token, password, (err) => {
          if (err) {
            this.handleError(err);
          } else {
            this.handleError("Your password has been reset successfully.");
          }
        })
        /*
        Meteor.call('resetUserPassword', token, password, (err, res) => {
          if (err) {
            this.handleError(err);
          }
          if (res) {
            this.handleError(res.msg);
          }
        })
        */
      } else {
        this.handleError(msg);
      }
    } else {
      this.handleError("Passwords don't match!")
    }
  }
  render() {
    if (Meteor.userId()) {
      return <Redirect to="/" />
    }
    return (
      <div>
        {this.renderMain()}
      </div>
    )
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
