import { Link, Outlet } from 'react-router-dom';
import { SearchSpinner, Sidebar, SidebarButton, SidebarForm, SidebarTitle, SidebarSearch, SrOnly, SidebarHeader, SidebarNav, SidebarNavList, SidebarNavItem, Detail } from './styles';

const RootPage = () => {
  return (
    <>
      <Sidebar id="sidebar">
        <SidebarTitle>React Router Contacts</SidebarTitle>
        <SidebarHeader>
          <SidebarForm id="search-form" role="search">
            <SidebarSearch id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q" />
            <SearchSpinner id="search-spinner" aria-hidden hidden={true} />
            <SrOnly className="sr-only" aria-live="polite"></SrOnly>
          </SidebarForm>
          <SidebarForm method="post">
            <SidebarButton type="submit">New</SidebarButton>
          </SidebarForm>
        </SidebarHeader>
        <SidebarNav>
          <SidebarNavList>
            <SidebarNavItem>
              <Link to={`/contacts/1`}>Your Name</Link>
            </SidebarNavItem>
            <SidebarNavItem>
              <Link to={`/contacts/2`}>Your Friend</Link>
            </SidebarNavItem>
          </SidebarNavList>
        </SidebarNav>
      </Sidebar>
      <Detail id="detail">
        <Outlet />
      </Detail>
    </>
  );
};

export default RootPage;
