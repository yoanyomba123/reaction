import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { render, ReactDOM } from "react-dom";
import { createContainer } from "meteor/react-meteor-data";
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import { Link } from "react-router-dom";
import colors from "../../../../config/colors";
import globalStyles from "../../../../config/globalStyles";
import { combineStyles } from "../../../../config/helpers";
import styles from "./styles";
import CircularProgress from 'material-ui/Progress/CircularProgress';

const navHeight = 60;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserMessagesTotal: 0,
      newOrdersCount: 0,
      loadingOrdersCount: false,
      loadingMessagesCount: false,
    };
  }

  componentWillMount() {
    this.setState({
      loadingOrdersCount: !this.state.loadingOrdersCount,
      loadingMessagesCount: !this.state.loadingMessagesCount,
    });
    Meteor.call("getNewOrdersCount", (err, res) => {
      this.setState({
        loadingOrdersCount: !this.state.loadingOrdersCount,
      });
      if (err) {
        console.log(err);
      } else {
        this.setState({ newOrdersCount: res });
      }
    });
  }

  render() {
    const { userId } = this.props;
    const {
      loadingOrdersCount,
      loadingMessagesCount,
      newUserMessagesTotal,
      newOrdersCount,
    } = this.state;
    if (userId && Roles.userIsInRole(userId, "admin")) {
      return (
        <div>
          <div
            style={{
              paddingTop: navHeight,
            }}
          >
            <Grid
              container
              style={combineStyles([
                globalStyles.noPadding,
                globalStyles.noMargin,
              ])}
            >
              <Grid item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                style={styles.cont}
              >
                <Grid item xs={6} sm={3} md={3} lg={2}>
                  <Link to="/admin/orders" className="linkNoStyle">
                    <div
                      style={combineStyles([
                        globalStyles.center,
                        globalStyles.column,
                        styles.contBtn,
                      ])}
                    >
                      <p style={styles.textBtn}>Orders</p>
                      {loadingOrdersCount
                        ? <CircularProgress size={30} />
                        : <p
                            style={combineStyles([
                              globalStyles.textCenter,
                              styles.textBtnMsg,
                            ])}
                          >
                            {newOrdersCount}
                            new order
                          </p>}
                    </div>
                  </Link>
                </Grid>
                <Grid item xs={6} sm={3} md={3} lg={2}>
                  <Link to="/admin/collections" className="linkNoStyle">
                    <div
                      style={combineStyles([
                        globalStyles.center,
                        globalStyles.column,
                        styles.contBtn,
                      ])}
                    >
                      <p style={styles.textBtn}>Collections</p>
                      {loadingMessagesCount
                        ? <CircularProgress size={30} />
                        : <p
                            style={combineStyles([
                              globalStyles.textCenter,
                              styles.textBtnMsg,
                            ])}
                          >
                            Collections
                          </p>
                        }
                    </div>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default createContainer(() => {
  return {
    loggingIn: Meteor.loggingIn(),
    userId: Meteor.userId(),
  };
}, Dashboard);
