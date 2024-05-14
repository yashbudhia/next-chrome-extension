export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems: SideNavItem[];
};

export interface Workspace {
  id: string;
  name: string;
  tabs: {
    image: string;
    title: string;
    url: string;
  }[];
}
