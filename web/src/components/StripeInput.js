import * as React from "react";

const StripeInput = React.forwardRef(
  function StripeInput(props, ref) {
    const { component: Component, options, ...other } = props;
    const [mountNode, setMountNode] = React.useState(null);

    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => mountNode.focus()
      }),
      [mountNode]
    );

    return (
      <Component
        onReady={setMountNode}
        options={{
          ...options,
          style: {
            base: {
              color: "black",
              fontSize: "16px",
              fontFamily: "sans-serif",
            },
            invalid: {
              color: "red"
            }
          }
        }}
        {...other}
      />
    );
  }
);

export default StripeInput;
