import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { SearchSpinner, Sidebar, SidebarButton, SidebarForm, SidebarTitle, SidebarSearch, SrOnly, SidebarHeader, SidebarNav, SidebarNavList, SidebarNavItem, Detail } from './styles';
import { createContact, getContacts } from '../../apis/contact';

export async function action() {
  const contact = await createContact();
  return { contact };
}

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

const RootPage = () => {
  const { contacts } = useLoaderData();
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
          {contacts.length ? (
            <SidebarNavList>
              {contacts.map((contact) => (
                <SidebarNavItem key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </SidebarNavItem>
              ))}
            </SidebarNavList>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </SidebarNav>
      </Sidebar>
      <Detail id="detail">
        <Outlet />
      </Detail>
    </>
  );
};

export default RootPage;
