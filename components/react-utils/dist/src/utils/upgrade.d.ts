import React from 'react';
declare const upgrade: <I, O extends Object>(Component: React.ComponentType<I>, props: any) => React.ComponentType<I & O>;
export default upgrade;
