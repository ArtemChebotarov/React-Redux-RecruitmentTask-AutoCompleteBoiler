import React from "react";

const { Provider: ServiceProvider, Consumer: ServiceConsumer } =
    React.createContext(undefined, undefined);

export {
    ServiceProvider,
    ServiceConsumer
};