import React, { FunctionComponent, ReactChild, ReactChildren } from "react";

interface IAuxiliaryProps {
  children: ReactChild | ReactChildren;
}

const Auxiliary: FunctionComponent<IAuxiliaryProps> = (props) => (
  <>{props.children}</>
);

export default Auxiliary;
