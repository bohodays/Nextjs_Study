"use client";

import React, { ReactNode } from "react";
// 클라이언트 컴포넌트에서 서버 컴포넌트를 사용해야 된다면 import하지 않고, children으로 받아서 사용하는 것을 권장함
// import ServerComponent from "./server-component";

const ClientComponent = ({ children }: { children: ReactNode }) => {
  console.log("클라이언트 컴포넌트");

  return <div>{children}</div>;
};

export default ClientComponent;
