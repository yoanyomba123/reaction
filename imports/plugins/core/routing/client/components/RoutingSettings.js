import React, { Component, Fragment } from "react";
import { registerComponent, Components } from "@reactioncommerce/reaction-components";
import { Mutation } from "react-apollo";
import { uniqueId } from "lodash";
import styled from "styled-components";
import { Form } from "reacto-form";
import Button from "@reactioncommerce/components/Button/v1";
import ErrorsBlock from "@reactioncommerce/components/ErrorsBlock/v1";
import Field from "@reactioncommerce/components/Field/v1";
import Select from "@reactioncommerce/components/Select/v1";
import TextInput from "@reactioncommerce/components/TextInput/v1";
import { i18next } from "/client/api";
import { redirectRuleQuery } from "../../lib/queries";
import { addRedirectRuleMutation, updateRedirectRuleMutation, removeRedirectRuleMutation } from "../../lib/mutations";

const httpStatusCodes = [
  { value: 301, label: "301" },
  { value: 302, label: "302" },
  { value: 303, label: "303" },
  { value: 307, label: "307" }
];

const Title = styled.h3`
  margin-bottom: 16px;
`;

const ButtonBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FormAction = styled.div`
  padding-left: 16px;
`;

const PaddedField = styled(Field)`
  margin-bottom: 10px;
`;

const StatusSelectField = styled(Field)`
  max-width: 140px;
`;

class RoutingSettings extends Component {
  state = {
    selectedRoute: null
  }

  uniqueInstanceIdentifier = uniqueId("URLRedirectEditForm");

  handleRowClick = (row) => {
    this.setState({
      selectedRoute: row.props.data
    });
  }

  async handleSubmit(data, mutation) {
    const input = {
      id: data._id,
      to: data.to,
      from: data.from,
      status: data.status,
      type: "redirect",
      enabled: !!data.enabled
    };

    const result = await mutation({
      refetchQueries: [{
        query: redirectRuleQuery
      }],
      variables: {
        input
      }
    });

    this.reset();

    return result;
  }

  async handleRemove(id, mutation) {
    return mutation({
      refetchQueries: [{
        query: redirectRuleQuery
      }],
      variables: {
        input: {
          id
        }
      }
    });
  }

  handleShowCreateForm = () => {
    this.setState({
      selectedRoute: {
        status: httpStatusCodes[0].value
      }
    });
  }

  reset() {
    this.setState({ selectedRoute: null });
  }

  handleCancel = () => {
    this.reset();
  }

  handleSubmitForm = () => {
    this.form.submit();
  }

  renderForm() {
    const { selectedRoute } = this.state;
    const fromInputId = `from_${this.uniqueInstanceIdentifier}`;
    const toInputId = `from_${this.uniqueInstanceIdentifier}`;
    const statusInputId = `from_${this.uniqueInstanceIdentifier}`;


    let title = "Create a new redirect";
    let mutation = addRedirectRuleMutation;
    let submitButtonTitle = "Save Redirect";

    if (selectedRoute) {
      const isNew = !!selectedRoute._id;

      if (selectedRoute._id) {
        title = "Edit redirect";
        mutation = updateRedirectRuleMutation;
        submitButtonTitle = "Save redirect";
      }

      return (
        <Mutation mutation={mutation}>
          {(mutationFunc) => (
            <Fragment>
              <Title>{title}</Title>
              <Form
                ref={(formRef) => { this.form = formRef; }}
                onSubmit={(data) => this.handleSubmit(data, mutationFunc)}
                value={selectedRoute}
              >
                <PaddedField
                  helpText="The original URL you'd like to forward visitors from."
                  name="fullName"
                  label={i18next.t("admin.routing.headers.from")}
                  labelFor={fromInputId}
                  isRequired
                >
                  <TextInput id={fromInputId} name="from" />
                  <ErrorsBlock names={["from"]} />
                </PaddedField>

                <PaddedField
                  helpText="The new URL visitors will be forwarded to."
                  name="to"
                  label={i18next.t("admin.routing.form.to")}
                  labelFor={toInputId}
                  isRequired
                >
                  <TextInput id={toInputId} name="to" />
                  <ErrorsBlock names={["to"]} />
                </PaddedField>

                <StatusSelectField name="to" label={i18next.t("admin.routing.form.status")} labelFor={statusInputId}>
                  <Select
                    id={statusInputId}
                    isSearchable
                    name="status"
                    options={httpStatusCodes}
                    placeholder="Status"
                    isRequired
                  />
                  <ErrorsBlock names={["status"]} />
                </StatusSelectField>
              </Form>
              <FormActions>
                {isNew &&
                  <Mutation mutation={removeRedirectRuleMutation}>
                    {(removeMutationFunc) => (
                      <Button
                        actionType="secondary"
                        isTextOnly={true}
                        onClick={() => this.handleRemove(selectedRoute._id, removeMutationFunc)}
                      >
                        Delete
                      </Button>
                    )}
                  </Mutation>
                }
                <FormAction>
                  <Button actionType="secondary" onClick={this.handleCancel}>
                    Cancel
                  </Button>
                </FormAction>
                <FormAction>
                  <Button onClick={this.handleSubmitForm}>
                    {submitButtonTitle}
                  </Button>
                </FormAction>
              </FormActions>
              <Components.Divider />
            </Fragment>
          )}
        </Mutation>
      );
    }

    return (
      <ButtonBar>
        <Button onClick={this.handleShowCreateForm}>
          Create URL redirect
        </Button>
      </ButtonBar>
    );
  }

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
        onRowClick={this.handleRowClick}
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
            {this.renderForm()}
            {this.renderTable()}
          </Components.CardBody>
        </Components.Card>
      </Components.CardGroup>
    );
  }
}

registerComponent("RoutingSettings", RoutingSettings);

export default RoutingSettings;
