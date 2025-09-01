export interface NavbarProps {
  className?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: readonly { name: string; href: string }[];
}

export interface SearchInputProps {
  placeholder?: string;
  className?: string;
  hideIcon?: boolean;
}

export interface UseNavbarReturn {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}
