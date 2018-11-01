import { Template } from "meteor/templating";
import RoutingSettings from "../components/RoutingSettings";


Template.routingSettings.helpers({
  RoutingSettings() {
    return {
      component: RoutingSettings
    };
  }
});
