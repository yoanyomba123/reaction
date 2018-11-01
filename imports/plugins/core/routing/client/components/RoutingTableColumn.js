import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components, registerComponent, withMoment } from "@reactioncommerce/reaction-components";

class RoutingTableColumn extends Component {
  static propTypes = {
    data: PropTypes.object,
    moment: PropTypes.func,
    row: PropTypes.object
  }

  render() {
    const { row } = this.props;

    const renderColumn = row.column.id;

    if (renderColumn === "enabled") {
      return (
        <span>
          <Components.Icon icon="fa fa-circle" className={row.value ? "valid" : "error"} />
          <span>{row.value}</span>
        </span>
      );
    }
    if (renderColumn === "updated") {
      const { moment } = this.props;
      const createdDate = (moment && moment(row.value).format("LLL")) || row.value.toLocaleString();
      return (
        <span>{createdDate}</span>
      );
    }
    return (
      <span>{row.value}</span>
    );
  }
}

registerComponent("RoutingTableColumn", RoutingTableColumn, withMoment);

export default withMoment(RoutingTableColumn);
