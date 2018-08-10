import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render, ReactDOM } from 'react-dom';
import { updateAlert } from "../../../Actions";
import { connect } from "react-redux";
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
} from 'material-ui/Dialog';

class Alert extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render() {
    const { alertObject, doUpdateAlert } = this.props
    return (
      <div>
        <Dialog
          open={!!alertObject.alertVisible}
          onRequestClose={() => {
            doUpdateAlert()
          }}
        >
          <DialogContent style={{ minWidth: 400 }}>
            <DialogContentText>
              { (alertObject && alertObject.alertMessage) || "" }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                doUpdateAlert()
              }}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const alertObject = state.reducers.alertObject
  return { alertObject }
}
const mapDispatchToProps = (dispatch) => {
  return {
    doUpdateAlert: () => {
      dispatch(updateAlert())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)
