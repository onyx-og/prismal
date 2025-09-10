import React from "react";
import ComponentProps from '../Component';
import { View, ViewStyle, StyleSheet, StyleProp } from "react-native";
// import { setAccentStyle } from '../../utils/colors';
import { getBorderRadius, getPadding, getBoxElevation } from '../../utils';

export interface CardProps extends ComponentProps<ViewStyle>  {
    header?: React.ReactNode;
    headerStyle?: StyleProp<ViewStyle>;
    footer?: React.ReactNode;
    footerStyle?: StyleProp<ViewStyle>;
    children: React.ReactNode; // Card content
    bodyStyle?: StyleProp<ViewStyle>;
    padding?: 'xs' | "s" | 'm' | 'l';
    orientation?: "row" | "column"
}

const Card = ( props: CardProps ) => {
    const {
        header, headerStyle,
        footer, footerStyle,
        accent, accentDark, accentLight,
        children, bodyStyle, padding = "s",
        orientation = "column", style,
        elevation = 1, borderRadius = "small"
    } = props;

    const boxElevation = getBoxElevation(elevation);
    const borderRadius_ = getBorderRadius(borderRadius)
    const boxPadding = getPadding(padding);

    const styles: {[key: string]: ViewStyle} = {
        component: {
            display: "flex",
            flexDirection: orientation,
            backgroundColor: "white",
            boxShadow: boxElevation[0],
            borderRadius: borderRadius_,
            overflow: "hidden",
            padding: boxPadding,
        },
        body: {
            padding: 5,
            flex: 1
        },
        header: {
        },
        footer: {
        },
        
    };

    if (style) Object.assign(styles.component, style);


    // let style: {[key: string]: any} = setAccentStyle({}, {accent, accentLight, accentDark});

    const header_ = React.useMemo(() => {
        if (headerStyle) Object.assign(styles.header, headerStyle);
        if (header) {
            return <View style={styles.header}>
                {header}
            </View>
        } else return null;
    },[header, styles.header]);

    const footer_ = React.useMemo(() => {
        if (footerStyle) Object.assign(styles.footer, footerStyle);
        if (footer) {
            return <View style={styles.footer}>
                {footer}
            </View>
        } else return null;
    },[footer, styles.footer]);

    const body = React.useMemo(() => {
        if (bodyStyle) Object.assign(styles.body, bodyStyle);
        return <View style={styles.body}>{children}</View>;
    },[children, bodyStyle])
    
    return <View style={styles.component}>
        {header_}
        {body}
        {footer_}
    </View>
}

export default Card;
