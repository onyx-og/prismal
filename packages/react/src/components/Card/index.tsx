import {
    ReactNode, FC, useMemo
} from "react";
import './index.scss';
import ComponentProps from '../Component';
import { setAccentStyle } from 'utils/colors';
// FIX: Import missing utility functions `setBorderRadius`, `setPadding`, and `setBoxElevation`.
import { setBorderRadius, setPadding, setBoxElevation } from '../../utils';

/**
 * @typedef {object} CardProps
 * @description Props for the Card component.
 * @property {ReactNode} [header] The content for the card's header section.
 * @property {string} [headerClass] Additional CSS class for the header.
 * @property {ReactNode} [footer] The content for the card's footer section.
 * @property {string} [footerClass] Additional CSS class for the footer.
 * @property {ReactNode} [children] The main content of the card (body).
 * @property {string} [bodyClass] Additional CSS class for the body.
 * @property {"vertical" | "horizontal"} [orientation="vertical"] The orientation of the card layout.
 * @property {"none" | 'xs' | "s" | 'm' | 'l'} [padding='s'] The padding size for the card content.
 */
export interface CardProps extends ComponentProps  {
    header?: ReactNode;
    headerClass?: string;
    footer?: ReactNode;
    footerClass?: string;
    children?: ReactNode; // Card content
    bodyClass?: string;
    orientation?: "vertical" | "horizontal";
    padding?: "none" | 'xs' | "s" | 'm' | 'l';
}

/**
 * @component Card
 * @description A flexible content container with optional header, footer, and body sections.
 * @param {CardProps} props The component props.
 * @returns {React.ReactElement} The rendered Card component.
 * @example
 * <Card header={<h2>Card Title</h2>} footer={<Button>Action</Button>}>
 *   <p>This is the card content.</p>
 * </Card>
 */
const Card: FC<CardProps> = ( props ) => {
    const {
        "data-id": dataId,
        header, headerClass,
        footer, footerClass,
        accent, accentDark, accentLight,
        className, style = {},
        children, bodyClass,
        orientation = "vertical",
        borderRadius = 'xs', padding = 's',
        elevation = 1
    } = props;

    let cardClass = `prismal-card`;
    if (className) cardClass = `${cardClass} ${className}`;
    cardClass = `${cardClass} prismal-card-${orientation[0]}`;

    let style_: {[key: string]: any} = {...style};
    setAccentStyle(style_, {accent, accentLight, accentDark});
    if (borderRadius) setBorderRadius(style_, borderRadius);
    setBoxElevation(style_, elevation);
    setPadding(style_, padding);
    
    /**
     * @member header_
     * @description Memoized header element.
     * @returns {JSX.Element | null}
     */
    const header_ = useMemo(() => {
        let headerClass_ = "prismal-card-header";
        if (headerClass) {
            headerClass_ = `${headerClass_} ${headerClass}`;
        }
        if (header) {
            return <div className={headerClass_}>
                {header}
            </div>
        }
        return null;
    },[header, headerClass]);

    /**
     * @member body
     * @description Memoized body content element.
     * @returns {JSX.Element | null}
     */
    const body = useMemo(() => {
        let bodyClass_ = "prismal-card-body";
        if (bodyClass) {
            bodyClass_ = `${bodyClass_} ${bodyClass}`;
        }
        if (children) {
            return <div className={bodyClass_}>
                {children}
            </div>
        }
        return null;
    },[children, bodyClass]);

    /**
     * @member footer_
     * @description Memoized footer element.
     * @returns {JSX.Element | null}
     */
    const footer_ = useMemo(() => {
        let footerClass_ = "prismal-card-footer";
        if (footerClass) {
            footerClass_ = `${footerClass_} ${footerClass}`;
        }
        if (footer) {
            return <div className={footerClass_}>
                {footer}
            </div>
        }
        return null;
    },[footer, footerClass]);

    return <div data-id={dataId}
        className={cardClass}
        style={style_}
    >
        {header_}
        {body}
        {footer_}
    </div>
}

export default Card;