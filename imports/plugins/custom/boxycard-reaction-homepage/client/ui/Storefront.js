import React from "react";
import { registerComponent, getHOCs, getRawComponent } from "/imports/plugins/core/components/lib";

export default class Storefront extends React.Component {
  render() {
   return (
     <div>BoxyCard</div>
   );
  }
}

registerComponent("Storefront",  Storefront, getHOCs("Products"));
