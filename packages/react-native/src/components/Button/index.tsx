import React from 'react';
// import Icon from 'components/Icon';
import { Text, Pressable, ViewStyle, PressableStateCallbackType, StyleProp } from 'react-native';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';
import { getBorderRadius, getBoxElevation } from '../../utils/index';
import { COLORS } from '../../styles/vars';

export interface ButtonProps extends ComponentProps<ViewStyle> {
    name?: string;
    iconName?: string;
    title?: string;
    onPress?: (arg: any) => void;
    disabled?: boolean;
    type?: 'default' | 'primary' | 'text';
    children?: React.ReactNode;
    shape?: 'default-shape' | 'circle';
}

const Button = (props: ButtonProps) => {
    const {
        name,
        iconName,
        onPress,
        disabled = false,
        children,
        type = 'default',
        shape = 'default-shape',
        title,
        style,
        accent = COLORS.primary, accentDark, 
        accentLight = COLORS.primaryLight,
        elevation = 0, borderRadius
    } = props;

    const borderRadius_ = getBorderRadius(borderRadius);
    const boxShadow_ = getBoxElevation(elevation);

    const styles: {[key: string]: ViewStyle} = {
        component: {
            padding: 5,
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 7,
            height: 20,
            minWidth: 15,
            borderRadius: borderRadius_,
            boxShadow: boxShadow_[0],
            boxSizing: 'border-box',
        }
    }

    if (type == "default") {
        styles.component = { ...styles.component,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: accent
        }
    } else if (type == "primary") {
        // [TODO]
    } else if (type == "text") {
        // [TODO]
    }

    const [isHovered, setIsHovered] = React.useState(false);

    const componentStyle: ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) = ({pressed}) => {
        return [
            styles.component,
            {
                backgroundColor: isHovered ? accent : (pressed ? accent : 'white'),
            },
        ]
    }

    // let btnClass = `prismal-btn btn-${type} btn-${shape}`; 
    // if ( className ) btnClass = `${btnClass} ${className}`;
    // if ( disabled ) btnClass = `${btnClass} btn-disabled`;
    // else if ( elevation ) btnClass = `${btnClass} btn-elevated`;
    // else btnClass = `${btnClass} btn-anim`;

    // let style_: {[key: string]: any} = {};
    // setAccentStyle(style_, {accent, accentLight, accentDark});
    // setBorderRadius(style_, borderRadius);
    // setBoxElevation(style_, elevation);
    // // Merge and override with provided style
    // style_ = {...style_, ...style};

    if (style) Object.assign(styles.component, style);

    const title_ = React.useMemo( () => {
        if (title) {
            return <Text>{title}</Text>
        } else return null
    },[title]);

    return <Pressable
        onPress={onPress}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={componentStyle}>
        {/* { iconName && <Icon name={iconName}/>} */}
        { title_ || children }
    </Pressable>
}

export default Button;