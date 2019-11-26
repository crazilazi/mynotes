import React from 'react';
import { ISidebarProps } from './ISidebarProps';
import { slide as Menu } from 'react-burger-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCartPlus, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import './menu.css'
const SideBarMenu: React.FC<ISidebarProps> = (props) => {
    return (
        <Menu noOverlay={false} disableOverlayClick={false} isOpen={false} pageWrapId={props.pageWrapId} outerContainerId={props.outerContainerId}>
            <a id="home" className="menu-item" href="/"><FontAwesomeIcon icon={faHome} /> Home </a>
            <a id="about" className="menu-item" href="/note/add"> <FontAwesomeIcon icon={faCartPlus} /> Add Notes </a>
            <a id="contact" className="menu-item" href="/note"><FontAwesomeIcon icon={faBoxOpen} /> View Notes </a>
        </Menu>

    )
}

export default SideBarMenu;