import React from "react";

export type ParentComponentProps = {
  children?: React.ReactNode;
};

export type ParentComponent = React.FC<ParentComponentProps>;

export type IdRouteParams = {
  params: {
    id: string;
  };
};
