import React, { useState } from 'react';
import './index.scss';
// import Button from 'components/Button';
import ReactDOM from 'react-dom';

export interface SidebarProps {
    visible?: boolean;
    closeSidebar?: () => void;
    header?: JSX.Element;
    footer?: JSX.Element;
    children?: React.ReactNode;
}
const Sidebar: React.FC<SidebarProps> = ( props ) => {
    const {
        visible = false,
        header,
        children,
        footer,
        closeSidebar
    } = props;
    // const [ visible, show ] = useState(false);
    const [ wrapperMounted, mountWrapper ] = useState(false);
    const [ visibility, setVisibility ] = useState(false);

    let sidebarClassName = 'sidebar';
    let sidebarFgClassName = "sidebar-fg fd-col text-nosel";
    let sidebarBgClassName = 'sidebar-bg';

    // TODO: Consider abstracting to a custom-hook, make it reusable
    React.useEffect( () => {
        let unmountTimeoutId: number,
            visiblityTimeoutId: number;
        if ( visible ) {
            mountWrapper(visible);
            visiblityTimeoutId = window.setTimeout(() =>  setVisibility(visible),150);
        } else {
            unmountTimeoutId = window.setTimeout( () => mountWrapper(visible), 500);
            setVisibility(visible);
        }
        return () => {
            unmountTimeoutId && window.clearTimeout(unmountTimeoutId);
            visiblityTimeoutId && window.clearTimeout(visiblityTimeoutId);
        }
    }, [visible]);
    
    if ( visibility ) {
        sidebarClassName = `${sidebarClassName} visible`;
    }

    const sidebarArea = document.getElementById('sidebar-area');

    return ( sidebarArea && wrapperMounted ) ? ReactDOM.createPortal(<div className={sidebarClassName}>
    <div className={sidebarBgClassName} onClick={closeSidebar}>
            &nbsp;
        </div>
        <div className={sidebarFgClassName}>

            { header && <div className="sidebar-header">
                {header}
            </div> }

            <div className='sidebar-children'>
                {children}
            </div>

            {/* TODO: Footer */}
            { footer && <div className='sidebar-footer'>
                {footer}
            </div> }
        </div>
    </div>, sidebarArea) : null
}

export default Sidebar;