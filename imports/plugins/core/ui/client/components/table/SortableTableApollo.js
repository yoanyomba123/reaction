import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import matchSorter from "match-sorter";
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { SortableTablePagination } from "./sortableTableComponents";
import styled from "styled-components";
import Select from "@reactioncommerce/components/Select/v1";
import TextInput from "@reactioncommerce/components/TextInput/v1";
import { i18next } from "/client/api";

const CheckboxTable = checkboxHOC(ReactTable);

const TableHeader = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const FilterTextInput = styled.div`
  display: flex;
  flex: 1;

  > div {
    width: 100%;
  }
`;

const BulkActionsSelect = styled.div`
  min-width: 150px;
  margin-left: 20px;
`;

/**
 * @file SortableTable is a React Component wrapper around {@link https://react-table.js.org} ReactTable.
 * Any functionality from ReactTable should be available in SortableTable out of the box, but may require styling.
 * For more, see {@link https://react-table.js.org/#/story/readme ReactTable docs}
 *
 * @module SortableTable
 * @extends Component
 * @returns {Class} class
 */
class SortableTableApollo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      filterInput: "",
      maxPages: 0,
      selection: [],
      query: props.query || {}
    };
  }

  /**
   * @name customFilter
   * @method
   * @summary Replace default filter with customized filter, custom filter is case insensitive
   * custom filter searches entire string, not just from string start
   * @param {Object} filter user-typed data
   * @param {Object} row row info for associated filter
   * @returns {String|Boolean} replacement filter
   */
  customFilter = (filter, row) => {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null && typeof row[id] === "string") {
      return (row[id] !== undefined
        ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
        : true);
    }
  }

  /**
   * @name handleFilterInput
   * @summary Update state when filter is changed
   * @param {string} value text field input
   * @return {function} state for field value
   */
  handleFilterInput = (value) => {
    this.setState({
      filterInput: value
    });
  }

  /**
   * @name filterData
   * @method
   * @summary Filter supplied data if needed, or spit out raw if no filter
   * @param {Array} data An array of objects
   * @returns {Object} data filed (string), translated header (string), and minWidth (number / undefined)
   */
  filterData(data) {
    const { filteredFields, filterType } = this.props;
    const { filterInput } = this.state;
    const originalData = [...data];

    if (filterType === "both" || filterType === "table") {
      const filteredData = matchSorter(originalData, filterInput, { keys: filteredFields });
      return filteredData;
    }

    return originalData;
  }

  /**
   * @name handleClick
   * @summary Handle click on table row
   * @param {object} rowInfo row data passed in from ReactTable
   * @return {function} return onRowClick function prop, or undefined if not supplied
   */
  handleClick(rowInfo) {
    const { onRowClick } = this.props;

    if (typeof onRowClick === "function") {
      onRowClick({
        className: "sortable-table-row",
        props: {
          data: {
            ...rowInfo.original
          }
        }
      });
    }
  }

  /**
   * @name renderColumns
   * @method
   * @summary Absorb columnMetadata information from props, output columns to display
   * @prop {String} columnMetadata - Object of data field, column header
   * @returns {Object} data filed (string), translated header (string), and minWidth (number / undefined)
   */
  renderColumns() {
    const { columnMetadata } = this.props;

    // Add minWidth = undefined to override 100px default set by ReactTable
    const displayColumns = columnMetadata.map((element) => Object.assign({}, element, {
      minWidth: undefined
    }));

    return displayColumns;
  }

  /**
   * @name renderColumnFilter
   * @summary Uses props to determine if Column Filters should be shown
   * @returns {Bool} returns true or false for column filters
   */
  renderColumnFilter() {
    const { filterType } = this.props;

    if (filterType === "both" || filterType === "column") {
      return true;
    }

    return false;
  }

  /**
   * @name renderTableFilter
   * @method
   * @summary Uses props to determine if a Table Filter should be shown
   * @param {Number} numRows Number of rows in current set of data
   * @returns {node} returns JSX node or null
   */
  renderTableFilter(numRows) {
    const { filterType } = this.props;

    if (numRows !== 0) {
      if (filterType === "both" || filterType === "table") {
        return (
          <FilterTextInput>
            <TextInput
              placeholder={i18next.t("reactionUI.components.sortableTable.filterPlaceholder", { defaultValue: "Filter Data" })}
              onChanging={this.handleFilterInput}
              value={this.state.filterInput}
              name="filterInput"
            />
          </FilterTextInput>

        );
      }
    }

    return null;
  }

  /**
   * @name handleBulkActionsSelect
   * @method
   * @summary Handle bulk action select
   * @param {String} action Bulk action name
   * @returns {undefined} No return value
   */
  handleBulkActionsSelect = (action) => {
    this.setState({ selectedBulkAction: action });

    if (action) {
      const { bulkActions } = this.props;
      const selection = [...this.state.selection];
      const option = bulkActions.find((opt) => opt.value === action);

      Alerts.alert({
        title: `${option.label} ${selection.length} item(s)`,
        type: "warning",
        showCancelButton: true
      }, async (isConfirm) => {
        if (isConfirm) {
          try {
            const result = await this.props.onBulkAction(action, selection);
            this.props.onBulkActionSuccess(result);
          } catch (error) {
            this.props.onBulkActionError(error);
          }
        }

        // Reset selection state
        this.setState({
          selection: [],
          selectedBulkAction: null
        });
      });
    }
  }

  /**
   * @name renderBulkActionsSelect
   * @method
   * @summary Renders the bulk action select component
   * @returns {Node} React node
   */
  renderBulkActionsSelect() {
    const { bulkActions } = this.props;
    const { selection, selectedBulkAction } = this.state;

    if (Array.isArray(bulkActions) && bulkActions.length) {
      const actions = Array.isArray(selection) && selection.length ? bulkActions : [];

      if (actions.length) {
        return (
          <BulkActionsSelect>
            <Select
              key="enabled-actions"
              onChange={this.handleBulkActionsSelect}
              options={actions}
              placeholder="Actions"
              value={selectedBulkAction}
            />
          </BulkActionsSelect>
        );
      }

      return (
        <BulkActionsSelect>
          <Select
            key="disabled-actions"
            placeholder="Actions"
            isReadOnly={true}
          />
        </BulkActionsSelect>
      );
    }

    return null;
  }

  /**
   * @name selectedRowsClassName
   * @method
   * @summary If any rows are selected, give them a className of "selected-row"
   * @param {object} rowInfo row data passed in from ReactTable
   * @returns {String} className to apply to row that is selected, or empty string if no row is selected
   */
  selectedRowsClassName(rowInfo) {
    const { selectedRows } = this.props;
    let className = "";

    if (selectedRows && selectedRows.length) {
      if (rowInfo !== undefined && selectedRows.includes(rowInfo.row._id)) {
        className = "selected-row";
      }
    }

    return className;
  }

  /**
   * @name displayNoResultsFound
   * @method
   * @summary This function displays a 'No Results Found' when there is no data to populate the table
   * @param {Number} numRows Number of rows in current set of data
   * @return {node} returns a JSX node or empty string
   */
  displayNoResultsFound(numRows) {
    let displayText = "";
    if (numRows === 0) {
      displayText = <span className="sortableTable-noDataText">{this.props.noDataMessage}</span>;
    }
    return displayText;
  }

  /**
   * @name isRowSelected
   * @method
   * @summary Return selected state for a given row key
   * @param {String} key Row key field value
   * @returns {Boolean} A boolean value for the selected state of the row
   */
  isRowSelected = (key) => (
    this.state.selection.find((element) => element._id === key) !== undefined
  )

  /**
   * @name handleToggleSelection
   * @method
   * @summary Return selected state for a given row key
   * @param {String} key Row key field value
   * @param {Boolean} shift Shift key was pressed
   * @param {Object} row Row data
   * @returns {undefined} No return value
   */
  handleToggleSelection = (key, shift, row) => {
    // update the state
    this.setState((prevState) => {
      // start off with the existing state
      let selection = [...prevState.selection];
      // let selectedObjects = { ...prevState.selectedObjects }

      const keyIndex = selection.findIndex((element) => element._id === key);

      // check to see if the key exists
      if (keyIndex >= 0) {
        // it does exist so we will remove it using destructing
        selection = [
          ...selection.slice(0, keyIndex),
          ...selection.slice(keyIndex + 1)
        ];
      } else {
        // it does not exist so add it
        selection.push(row);
      }

      return {
        selection,
        selectedBulkAction: selection.length === 0 ? undefined : prevState.selectedBulkAction
      };
    });
  }

  /**
   * @name handleToggleAll
   * @method
   * @summary Toggle selection state for all rows on the current page
   * @returns {undefined} No return value
   */
  handleToggleAll = () => {}

  render() {
    const { ...otherProps } = this.props;
    const defaultClassName = "-striped -highlight";

    const checkboxProps = {
      selectType: "checkbox",
      selectAll: false,
      isSelected: this.isRowSelected,
      toggleSelection: this.handleToggleSelection,
      toggleAll: this.handleToggleAll
    };


    // All available props: https://github.com/tannerlinsley/react-table#props
    return (
      <Query query={otherProps.query} variables={otherProps.variables}>
        {({ loading, data }) => {
          // No more

          if (loading) return null;

          const result = data[otherProps.dataKey] || [];
          const resultCount = (Array.isArray(result) && result.length) || 0;

          return (
            <div className="rui rui-sortable-table">
              <TableHeader>
                {this.renderTableFilter(resultCount)}
                {this.renderBulkActionsSelect()}
              </TableHeader>
              <CheckboxTable
                {...checkboxProps}
                className={otherProps.tableClassName || defaultClassName}
                columns={this.renderColumns()}
                data={this.filterData(result)}
                defaultFilterMethod={this.customFilter}
                defaultPageSize={otherProps.defaultPageSize}
                filterable={this.renderColumnFilter()}
                minRows={resultCount === 0 ? 3 : 0}
                previousText={otherProps.previousText}
                nextText={otherProps.nextText}
                loadingText={otherProps.loadingText}
                noDataText={this.displayNoResultsFound(resultCount)}
                pageText={otherProps.pageText}
                ofText={otherProps.ofText}
                rowsText={otherProps.rowsText}
                showPaginationTop={otherProps.showPaginationTop}
                sortable={otherProps.isSortable}
                PaginationComponent={SortableTablePagination}
                showPaginationBottom={resultCount !== 0}
                getTrProps={(state, rowInfo, column, instance) => { // eslint-disable-line no-unused-vars
                  if (otherProps.getTrProps) {
                    return otherProps.getTrProps();
                  }

                  return {
                    onClick: () => { // eslint-disable-line no-unused-vars
                      this.handleClick(rowInfo);
                    },
                    className: this.selectedRowsClassName(rowInfo)
                  };
                }}
                getTableProps={otherProps.getTableProps}
                getTrGroupProps={otherProps.getTrGroupProps}
                getTheadProps={otherProps.getTheadProps}
                getPaginationProps={otherProps.getPaginationProps}
                pages={otherProps.pages}
                onPageChange={otherProps.onPageChange}
                onPageSizeChange={otherProps.onPageSizeChange}
                page={otherProps.page}
                manual={otherProps.manual}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

/**
  * @name SortableTable propTypes
  * @type {propTypes}
  * @param {Object} props - React PropTypes
  * @property {Object} collection collection to get data from
  * @property {Array} columnMetadata provides filtered columns with i18n headers
  * @property {Number} defaultPageSize how many results per page
  * @property {Boolean} filterType filter by table, column, or both
  * @property {Array} filteredFields provides filtered columns, use columnMetadata instead
  * @property {Boolean} isFilterable show / hide column filter
  * @property {Boolean} isResizeable allow resizing of table columns
  * @property {Boolean} isSortable allow column sorting
  * @property {String} matchingResultsCount provides Count publication to get count from
  * @property {Number} minRows minimum amount of rows to display in table
  * @property {String} noDataMessage text to display when no data is available
  * @property {Function} onRowClick provides function / action when clicking on row
  * @property {object} query GraphQL query object
  * @property {Array} selectedRows provides selected rows in the table
  * @property {Function} transform transform of collection for grid results
  * @return {Array} React propTypes
  */
SortableTableApollo.propTypes = {
  bulkActions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),
  collection: PropTypes.object,
  columnMetadata: PropTypes.array,
  dataKey: PropTypes.string,
  defaultPageSize: PropTypes.number,
  filterType: PropTypes.string,
  filteredFields: PropTypes.array,
  isFilterable: PropTypes.bool,
  isResizeable: PropTypes.bool,
  isSortable: PropTypes.bool,
  matchingResultsCount: PropTypes.string,
  minRows: PropTypes.number,
  noDataMessage: PropTypes.string,
  onBulkAction: PropTypes.func,
  onBulkActionError: PropTypes.func,
  onBulkActionSuccess: PropTypes.func,
  onRowClick: PropTypes.func,
  publication: PropTypes.string,
  query: PropTypes.object,
  selectedRows: PropTypes.array,
  transform: PropTypes.func
};

SortableTableApollo.defaultProps = {
  defaultPageSize: 10,
  filterType: "table",
  isFilterable: false,
  isResizeable: true,
  isSortable: true,
  minRows: 0,
  noDataMessage: "No results found",
  previousText: "Previous",
  nextText: "Next",
  loadingText: "Loading...",
  noDataText: "No results found",
  pageText: "Page",
  ofText: "of",
  rowsText: "rows",
  onBulkAction() {},
  onBulkActionError() {},
  onBulkActionSuccess() {}
  // noDataMessage: <Translation defaultValue="No results found" i18nKey={"reactionUI.components.sortableTable.tableText.noDataMessage"} />,
  // previousText: <Translation defaultValue="Previous" i18nKey={"reactionUI.components.sortableTable.tableText.previousText"} />,
  // nextText: <Translation defaultValue="Next" i18nKey={"reactionUI.components.sortableTable.tableText.nextText"} />,
  // loadingText: <Translation defaultValue="Loading..." i18nKey={"reactionUI.components.sortableTable.tableText.loadingText"} />,
  // noDataText: <Translation defaultValue="No results found" i18nKey={"reactionUI.components.sortableTable.tableText.noDataText"} />,
  // pageText: <Translation defaultValue="Page" i18nKey={"reactionUI.components.sortableTable.tableText.pageText"} />,
  // ofText: <Translation defaultValue="of" i18nKey={"reactionUI.components.sortableTable.tableText.ofText"} />,
  // rowsText: <Translation defaultValue="rows" i18nKey={"reactionUI.components.sortableTable.tableText.rowsText"} />
};

registerComponent("SortableTableApollo", SortableTableApollo);

export default SortableTableApollo;
