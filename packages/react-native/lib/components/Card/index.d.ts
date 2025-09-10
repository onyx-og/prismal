import React from "react";
import ComponentProps from '../Component';
import { ViewStyle, StyleProp } from "react-native";
export interface CardProps extends ComponentProps<ViewStyle> {
    header?: React.ReactNode;
    headerStyle?: StyleProp<ViewStyle>;
    footer?: React.ReactNode;
    footerStyle?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    bodyStyle?: StyleProp<ViewStyle>;
    padding?: 'xs' | "s" | 'm' | 'l';
    orientation?: "row" | "column";
}
declare const Card: (props: CardProps) => import("react/jsx-runtime").JSX.Element;
export default Card;
