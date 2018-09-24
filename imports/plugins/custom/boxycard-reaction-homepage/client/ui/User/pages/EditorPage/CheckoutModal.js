import React, { Component } from "react";
import "./CheckoutModal.css";
import Modal from 'material-ui/Modal';

class CheckoutModal extends Component {
  render() {
    return (
      <Modal open={this.props.open}>
        <div style={{ top: '10%', margin: '0 auto'}}>
          <div role="dialog" className="modal-dialog">
            <header>
              <span>{this.props.header}</span>
              <button
                onClick={() => this.props.onClose()}
                type="button"
                aria-label="close"
              >
                CLOSE
              </button>
            </header>
            <div className="modal-content">{this.props.children}</div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default CheckoutModal;
