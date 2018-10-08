import { Template } from "meteor/templating";
import NavigationEditor from "./navigationEditor";

Template.navigationEditor.helpers({
  navigationEditorComponent() {
    return {
      component: NavigationEditor
    };
  }
});
