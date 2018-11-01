import gql from "graphql-tag";

export const redirectRuleQuery = gql`
  query getRedirectRules {
    redirectRules {
      _id
      status
      from
      to
      enabled
    }
  }
`;
