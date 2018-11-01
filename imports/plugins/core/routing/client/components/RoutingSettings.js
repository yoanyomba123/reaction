import React, { Component } from "react";
import { registerComponent, Components } from "@reactioncommerce/reaction-components";
import { i18next } from "/client/api";
import { redirectRuleQuery } from "../../lib/queries";

class RoutingSettings extends Component {
  renderTable() {
    const filteredFields = ["from", "to", "status", "enabled"];
    const noDataMessage = i18next.t("admin.routing.tableText.noDataMessage");

    // helper adds a class to every grid row
    const customRowMetaData = {
      bodyCssClassName: () => "email-grid-row"
    };

    // add i18n handling to headers
    const customColumnMetadata = [];
    filteredFields.forEach((field) => {
      let colWidth;
      let colStyle;
      let colClassName;

      if (field === "status") {
        colWidth = 70;
        colStyle = { textAlign: "center" };
        colClassName = "email-log-status";
      }
      // https://react-table.js.org/#/story/cell-renderers-custom-components
      const columnMeta = {
        accessor: field,
        Header: i18next.t(`admin.routing.headers.${field}`),
        Cell: (row) => (
          <Components.RoutingTableColumn row={row} />
        ),
        className: colClassName,
        width: colWidth,
        style: colStyle
      };
      customColumnMetadata.push(columnMeta);
    });

    return (
      <Components.SortableTableApollo
        query={redirectRuleQuery}
        dataKey="redirectRules"
        showFilter={true}
        rowMetadata={customRowMetaData}
        filteredFields={filteredFields}
        noDataMessage={noDataMessage}
        columnMetadata={customColumnMetadata}
        externalLoadingComponent={Components.Loading}
      />
    );
  }

  render() {
    return (
      <Components.CardGroup>
        <Components.Card>
          <Components.CardBody>
            {this.renderTable()}
          </Components.CardBody>
        </Components.Card>
      </Components.CardGroup>
    );
  }
}

registerComponent("RoutingSettings", RoutingSettings);

export default RoutingSettings;
