import { Link, NavLink, Outlet, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import { SearchSpinner, Sidebar, SidebarButton, SidebarForm, SidebarTitle, SidebarSearch, SrOnly, SidebarHeader, SidebarNav, SidebarNavList, SidebarNavItem, Detail } from './styles';
import { createContact, getContacts } from '../../apis/contact';

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

const RootPage = () => {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();

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
                <NavLink key={contact.id} to={`contacts/${contact.id}`} className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}>
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
                </NavLink>
              ))}
            </SidebarNavList>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </SidebarNav>
      </Sidebar>
      <Detail id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </Detail>
    </>
  );
};

export default RootPage;
