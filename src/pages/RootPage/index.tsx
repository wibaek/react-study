import { SearchSpinner, Sidebar, SidebarButton, SidebarForm, SidebarTitle, SidebarSearch, SrOnly, SidebarHeader, SidebarNav, SidebarNavList, SidebarNavItem, SidebarNavLink } from './styles';

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
              <SidebarNavLink href={`/contacts/1`}>Your Name</SidebarNavLink>
            </SidebarNavItem>
            <SidebarNavItem>
              <SidebarNavLink href={`/contacts/2`}>Your Friend</SidebarNavLink>
            </SidebarNavItem>
          </SidebarNavList>
        </SidebarNav>
      </Sidebar>
      <div id="detail"></div>
    </>
  );
};

export default RootPage;
