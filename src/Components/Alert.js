import React from "react";

export default function Alert(props) {
  return (
    <>
      {/* If props.alert is true then alert is shown else it is hidden */}
      <div style={{height: "50px", position: "sticky", top: "50px"}} >
        {props.alert && (
          <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show sticky-top`}
            role="alert"
          >
            {props.alert.type + ":" + props.alert.message}
          </div>
        )}
      </div>
    </>
  );
}
