import React, { Component } from "react";
import PropTypes from "prop-types";
import { i18next } from "/client/api";
import { Components, registerComponent, withMoment } from "@reactioncommerce/reaction-components";
import styled from "styled-components";

const EnabledLabel = styled.span`
  padding-left: 8px;
`;

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
          <EnabledLabel>{i18next.t(row.value ? "admin.routing.enabled" : "admin.routing.disabled")}</EnabledLabel>
        </span>
      );
    }
    if (renderColumn === "edit") {
      return (
        <span>
          <Components.Icon icon="fa fa-pencil" />
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
