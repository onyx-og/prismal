import React, { ReactNode } from 'react';
import './index.scss';
export interface SandboxProps {
    children: ReactNode;
}
/**
 * @component Sandbox
 * @description A live prop-editing playground: clones its children with editable props driven by a
 * schema (props-map.json) generated from the package's exported `*Props` interfaces. Used in docs to
 * let readers tweak a component's props and see the result update in place.
 * @param {SandboxProps} props The component props.
 * @returns {React.ReactElement} The rendered Sandbox component.
 * @example
 * <Sandbox>
 *   <Button type="primary">Primary Button</Button>
 * </Sandbox>
 */
declare const Sandbox: React.FC<SandboxProps>;
export default Sandbox;
