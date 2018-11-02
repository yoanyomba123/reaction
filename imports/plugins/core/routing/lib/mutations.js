import gql from "graphql-tag";

export const addRedirectRuleMutation = gql`
  mutation addRedirectRuleMutation($input: AddRedirectRuleInput!) {
    addRedirectRule(input: $input) {
      redirectRule {
        _id
        enabled
        from
        status
        to
        type
      }
    }
  }
`;

export const updateRedirectRuleMutation = gql`
  mutation updateRedirectRuleMutation($input: UpdateRedirectRuleInput!) {
    updateRedirectRule(input: $input) {
      redirectRule {
        _id
        enabled
        from
        status
        to
        type
      }
    }
  }
`;

export const removeRedirectRuleMutation = gql`
  mutation removeRedirectRuleMutation($input: RemoveRedirectRuleInput!) {
    removeRedirectRule(input: $input) {
      wasRemoved
    }
  }
`;
