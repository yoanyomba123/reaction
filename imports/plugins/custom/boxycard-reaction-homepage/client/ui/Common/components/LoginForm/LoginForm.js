import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { render, ReactDOM } from "react-dom";
import isEmail from "validator/lib/isEmail";
import FaFacebook from "react-icons/lib/fa/facebook";
import colors from "../../../../config/colors";
import globalStyles from "../../../../config/globalStyles";
import { appName, logoURI512 } from "../../../../config/globalConsts";
import { combineStyles, isStrongPassword } from "../../../../config/helpers";
import CircularProgress from 'material-ui/Progress/CircularProgress';
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import styles from "./styles";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    const { signUp } = this.props;
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      confirmPasswordVisible: signUp,
      loadingBtn: false,
      showAlert: false,
      alertMessage: "Oops, something went wrong.",
      isForgotPassword: false,
    };
    this.loginEmail = this.loginEmail.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.renderConfirmPassword = this.renderConfirmPassword.bind(this);
    this.renderStateBtns = this.renderStateBtns.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.renderForgotPassword = this.renderForgotPassword.bind(this);
    this.handleOnKeyDownForgot = this.handleOnKeyDownForgot.bind(this);
    this._isMounted = false;
  }
  componentWillMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleOnKeyDown(event) {
    if (event.keyCode === 13 && event.shiftKey === false) {
      if (this.state.confirmPasswordVisible) {
        this.handleCreateAccount();
      } else {
        this.loginEmail();
      }
    }
  }
  handleError(alertMessage) {
    if (this._isMounted) this.setState({ showAlert: !this.state.showAlert, alertMessage });
  }
  loginEmail() {
    const { email, password } = this.state;
    if (
      email &&
      email.length > 3 &&
      password &&
      password.length > 3 &&
      this._isMounted
    ) {
      this.setState({ loadingBtn: !this.state.loadingBtn });
      Meteor.loginWithPassword(email, password, (error) => {
        if (this._isMounted) { this.setState({ loadingBtn: !this.state.loadingBtn }); }
        if (error) {
          this.handleError(error.message);
        }
      });
    } else {
      this.handleError("Your email or password is too short!");
    }
  }

  loginFb() {
    if (this._isMounted) this.setState({ loadingBtn: !this.state.loadingBtn });
    Meteor.loginWithFacebook({}, function (err) {
      if (this._isMounted) { this.setState({ loadingBtn: !this.state.loadingBtn }); }
      if (err) {
        throw new Meteor.Error("Facebook login failed");
      }
    });
  }

  handleCreateAccount() {
    const {
      email,
      password,
      confirmPassword,
    } = this.state;
    this.setState({ loadingBtn: !this.state.loadingBtn });
    if (password === confirmPassword) {
      const isStrongPasswordObj = isStrongPassword(password);
      const { isStrong, msg } = isStrongPasswordObj;
      if (isStrong) {
        Accounts.createUser({ email, password }, (err) => {
          this.setState({ loadingBtn: !this.state.loadingBtn });
          if (err) {
            this.handleError(err.reason);
          } else {
            this.loginEmail();
          }
        });
      } else {
        this.setState({ loadingBtn: false });
        this.handleError(msg);
      }
    } else {
      this.setState({ loadingBtn: false });
      this.handleError("Passwords don't match!");
    }
  }
  renderHeader() {
    const { isForgotPassword } = this.state;
    return (
      <div style={globalStyles.widthFull}>
        <div
          style={combineStyles([
            globalStyles.widthFull,
            globalStyles.center,
            { paddingTop: "1%", paddingBottom: "3%" },
          ])}
        >
          <div>
            <img src={logoURI512} style={{ width: 40, height: 40 }} />
          </div>
          <div>
            <p
              style={combineStyles([
                globalStyles.textBig1,
                globalStyles.textMavenPro,
                globalStyles.textBrand,
                globalStyles.textCenter,
                { paddingLeft: 8 },
              ])}
            >
              {isForgotPassword ? "Password Reset" : appName}
            </p>
          </div>
        </div>
        <div style={combineStyles([globalStyles.widthFull])}>
          { isForgotPassword ?
            <p
              style={combineStyles([
                globalStyles.textAvarage,
                globalStyles.textGrey,
                globalStyles.textCenter,
                { paddingTop: 5 },
              ])}
            >
              Please enter the email address for your MyEtherShop account and we'll send you an message with a link to reset your password.
            </p>
            :
            <p
              style={combineStyles([
                globalStyles.textAvarage,
                globalStyles.textGrey,
                globalStyles.textCenter,
                { paddingTop: 5 },
              ])}
            >
              { this.props.signUp ?
                "Sign up with your email."
                :
                "Log in with your email"
              }
            </p>
          }
        </div>
      </div>
    );
  }
  renderInputs() {
    const {
      email,
      password,
      confirmPasswordVisible,
      confirmPassword,
    } = this.state;
    return (
      <div style={globalStyles.widthFull}>
        <div
          style={combineStyles([
            styles.contTextField,
            globalStyles.center,
            globalStyles.backgroundGrey,
          ])}
        >
          <TextField
            id="emailForgot"
            fullWidth
            InputProps={{ placeholder: 'Email Address' }}
            value={email}
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
            onKeyDown={this.handleOnKeyDown}
            style={combineStyles([
              globalStyles.textAvarage,
            ])}
          />
        </div>
        <div
          style={combineStyles([
            styles.contTextField,
            globalStyles.center,
            globalStyles.backgroundGrey,
          ])}
        >
          <TextField
            id="password"
            fullWidth
            InputProps={{ placeholder: 'Password' }}
            value={password}
            type="password"
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
            onKeyDown={this.handleOnKeyDown}
            style={combineStyles([
              globalStyles.textAvarage,
            ])}
          />
        </div>
        {this.renderConfirmPassword(confirmPasswordVisible, confirmPassword)}
      </div>
    );
  }
  renderConfirmPassword() {
    const { confirmPasswordVisible, confirmPassword } = this.state;
    if (confirmPasswordVisible) {
      return (
        <div>
          <div
            style={combineStyles([
              styles.contTextField,
              globalStyles.center,
              globalStyles.backgroundGrey,
            ])}
          >
            <TextField
              id="confirm_password"
              fullWidth
              InputProps={{ placeholder: 'Confirm Password' }}
              value={confirmPassword}
              type="password"
              onChange={(e) => {
                this.setState({ confirmPassword: e.target.value });
              }}
              onKeyDown={this.handleOnKeyDown}
              style={combineStyles([
                globalStyles.textAvarage,
              ])}
            />
          </div>
          <div style={{ padding: 10 }}>
            <p
              style={combineStyles([
                globalStyles.textCenter,
                globalStyles.textSmall,
                { padding: 5 },
              ])}
            >
              Passwords must be at least 8 characters long
            </p>
            <p
              style={combineStyles([
                globalStyles.textCenter,
                globalStyles.textSmall,
                { padding: 5 },
              ])}
            >
              At least an uppercase letter
            </p>
            <p
              style={combineStyles([
                globalStyles.textCenter,
                globalStyles.textSmall,
                { padding: 5 },
              ])}
            >
              At least a number
            </p>
          </div>
        </div>
      );
    }
    return false;
  }
  renderLogRegBtn() {
    const { confirmPasswordVisible, loadingBtn } = this.state;
    if (confirmPasswordVisible) {
      return (
        <div
          style={combineStyles([
            globalStyles.center,
            styles.contBtn,
            styles.btnEmail,
          ])}
          onClick={this.handleCreateAccount}
        >
          <p
            style={combineStyles([styles.textBtnFb, globalStyles.textAvarage])}
          >
            Create an account
          </p>
        </div>
      );
    }
    return (
      <div
        style={combineStyles([
          globalStyles.center,
          styles.contBtn,
          styles.btnEmail,
        ])}
        onClick={this.loginEmail}
      >
        { loadingBtn ?
          <CircularProgress size={20} />
          :
          <p
            style={combineStyles([
              styles.textBtnFb,
              globalStyles.textAvarage,
            ])}
          >
            Log In
          </p>
        }
      </div>
    );
  }
  renderStateBtns() {
    const { confirmPasswordVisible, loadingBtn } = this.state;
    return (
      <div>
        <div
          style={combineStyles([
            globalStyles.center,
            { padding: 10, marginTop: 20 },
          ])}
          onClick={() => {
            this.setState({
              confirmPasswordVisible: !this.state.confirmPasswordVisible,
            });
          }}
        >
          {loadingBtn
            ? <CircularProgress size={20} />
            : <p
                style={combineStyles([
                  styles.textBtnFb,
                  globalStyles.textAvarage,
                  globalStyles.textBlack,
                  globalStyles.textUnderline,
                  { cursor: "pointer" },
                ])}
              >
                {!confirmPasswordVisible ? "Create an account" : "Log in"}
              </p>}
        </div>
        <div
          style={combineStyles([
            globalStyles.center,
            { padding: 10, marginBottom: 10 },
          ])}
          onClick={() => {
            this.setState({ isForgotPassword: !this.state.isForgotPassword });
          }}
        >
          <p
            style={combineStyles([
              styles.textBtnFb,
              globalStyles.textSmall,
              globalStyles.textBlack,
              globalStyles.textUnderline,
              { cursor: "pointer" },
            ])}
          >
            Forgot Password?
          </p>
        </div>
      </div>
    );
  }
  renderOr() {
    return (
      <div style={globalStyles.center}>
        <div style={styles.separator} />
        <div style={combineStyles([styles.contOr, globalStyles.center])}>
          <p style={combineStyles([styles.textOr, globalStyles.textAvarage])}>
            or
          </p>
        </div>
        <div style={styles.separator} />
      </div>
    );
  }
  handleOnKeyDownForgot(event, email) {
    if (event.keyCode === 13 && event.shiftKey === false) {
      this.resetUserPassword(email);
    }
  }
  resetUserPassword(email) {
    if (isEmail(email)) {
      Meteor.call("sendResetPasswordEmail", email, (err, res) => {
        if (err) console.log(err);
        if (res) {
          const msg = res.success ? "We sent you an email." : res.msg;
          this.handleError(msg);
        }
      });
    } else {
      this.handleError("Please, enter a valid email");
    }
  }
  renderForgotPassword(email) {
    return (
      <div style={globalStyles.widthFull}>
        <div
          style={combineStyles([
            styles.contTextField,
            globalStyles.center,
            globalStyles.backgroundGrey,
          ])}
        >
          <TextField
            id="email"
            fullWidth
            InputProps={{ placeholder: 'Email Address' }}
            value={email}
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
            onKeyDown={(e) => {
              this.handleOnKeyDownForgot(e, email);
            }}
            style={combineStyles([
              globalStyles.textAvarage,
            ])}
          />
        </div>
        <div>
          <div
            style={combineStyles([globalStyles.center, { padding: 10 }])}
            onClick={() => {
              this.resetUserPassword(email);
            }}
          >
            <p
              style={combineStyles([
                styles.textBtnFb,
                globalStyles.textAvarage,
                globalStyles.textBlack,
                globalStyles.textUnderline,
                { cursor: "pointer" },
              ])}
            >
              Reset Password
            </p>
          </div>
          <div
            style={combineStyles([globalStyles.center, { padding: 10 }])}
            onClick={() => {
              this.setState({
                isForgotPassword: !this.state.isForgotPassword,
                confirmPasswordVisible: !this.state.confirmPasswordVisible,
              });
            }}
          >
            <p
              style={combineStyles([
                styles.textBtnFb,
                globalStyles.textAvarage,
                globalStyles.textBlack,
                globalStyles.textUnderline,
                { cursor: "pointer" },
              ])}
            >
              Log in
            </p>
          </div>
          <div
            style={combineStyles([globalStyles.center, { padding: 10 }])}
            onClick={() => {
              this.setState({
                isForgotPassword: !this.state.isForgotPassword,
                confirmPasswordVisible: !this.state.confirmPasswordVisible,
              });
            }}
          >
            <p
              style={combineStyles([
                styles.textBtnFb,
                globalStyles.textAvarage,
                globalStyles.textBlack,
                globalStyles.textUnderline,
                { cursor: "pointer" },
              ])}
            >
              Create an account
            </p>
          </div>
        </div>
      </div>
    );
  }
  renderLoginFB() {
    return (
      <div>
        {Meteor.loggingIn()
          ? <CircularProgress size={20} />
          : <div
              style={combineStyles([
                globalStyles.center,
                styles.contBtn,
                styles.btnFb,
              ])}
              onClick={this.loginFb}
            >
              <FaFacebook style={styles.iconFb} />
              <p
                style={combineStyles([
                  styles.textBtnFb,
                  globalStyles.textAvarage,
                ])}
              >
                Login with Facebook
              </p>
            </div>}
      </div>
    );
  }
  render() {
    const {
      email,
      isForgotPassword,
    } = this.state;
    return (
      <div
        style={combineStyles([
          globalStyles.fullWidth,
          globalStyles.flex,
          globalStyles.row,
          globalStyles.centerHorizontal,
          { minWidth: 250, maxWidth: 500 },
        ])}
      >
        {this.renderHeader(isForgotPassword)}
        { isForgotPassword ?
          <div>
            {this.renderForgotPassword(email)}
          </div>
          :
          <div>
            {this.renderInputs()}
            {this.renderLogRegBtn()}
            {this.renderStateBtns()}
            {this.renderOr()}
            {this.renderLoginFB()}
          </div>
        }
        <Dialog
          open={!!this.state.showAlert}
          onRequestClose={() => {
            this.setState({ showAlert: !this.state.showAlert })
          }}
        >
          <DialogContent style={{ minWidth: 400 }}>
            <DialogContentText>
              {this.state.alertMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ showAlert: !this.state.showAlert })
              }}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
