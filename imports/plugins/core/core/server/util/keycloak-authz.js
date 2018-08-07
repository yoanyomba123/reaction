import { URLSearchParams } from "url";
import { Meteor } from "meteor/meteor";
import fetch from "node-fetch";
import Token from "./keycloak-token";

const { keycloakRealm, keycloakClientID, keycloakServerUrl } = Meteor.settings.public;
const GRANT_TYPE = "urn:ietf:params:oauth:grant-type:uma-ticket";

/**
* makes API call to authz server to get user's permission
* @param {Boolean} resource -
* @param {Boolean} scope -
* @param {Boolean} token -
* @returns {Boolean} boolean
*/
export default async function (resource, scope, token) {
  const keycloakTokenURL = `${keycloakServerUrl}/realms/${keycloakRealm}/protocol/openid-connect/token`;
  const params = new URLSearchParams();
  params.append("grant_type", GRANT_TYPE);
  params.append("audience", keycloakClientID);
  params.append("permission", `${resource}#${scope}`);

  fetch(keycloakTokenURL, { // eslint-disable-line
    method: "POST",
    body: params,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then((res) => res.json())
    .then((res) => {
      const authData = new Token(res.access_token);
      const permissions = authData.content && authData.content.authorization && authData.content.authorization.permissions;
      const hasPermission = Array.isArray(permissions) && permissions.length;
      console.log(!!hasPermission);
      return !!hasPermission;
    });
}
