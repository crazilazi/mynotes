export interface State {
    isOpen: boolean;
}

export interface Styles {
    bmBurgerBars: Partial<CSSStyleDeclaration>;
    bmBurgerButton: Partial<CSSStyleDeclaration>;
    bmCross: Partial<CSSStyleDeclaration>;
    bmCrossButton: Partial<CSSStyleDeclaration>;
    bmItemList: Partial<CSSStyleDeclaration>;
    bmMenuWrap: Partial<CSSStyleDeclaration>;
    bmMenu: Partial<CSSStyleDeclaration>;
    bmMorphShape: Partial<CSSStyleDeclaration>;
    bmOverlay: Partial<CSSStyleDeclaration>;
}

export interface ISidebarProps {
    bodyClassName?: string;
    burgerBarClassName?: string;
    burgerButtonClassName?: string;
    className?: string;
    crossButtonClassName?: string;
    crossClassName?: string;
    customBurgerIcon?: JSX.Element | false;
    customCrossIcon?: JSX.Element | false;
    customOnKeyDown?(event: React.KeyboardEvent): void;
    disableAutoFocus?: boolean;
    disableCloseOnEsc?: boolean;
    disableOverlayClick?: boolean;
    htmlClassName?: string;
    id?: string;
    isOpen?: boolean;
    itemClassName?: string;
    itemListClassName?: string;
    menuClassName?: string;
    morphShapeClassName?: string;
    noOverlay?: boolean;
    onStateChange?(state: State): void;
    outerContainerId?: string;
    overlayClassName?: string;
    pageWrapId?: string;
    right?: boolean;
    styles?: Styles;
    width?: number | string;
}