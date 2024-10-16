import { Link, NavLink, Outlet, redirect, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { SearchSpinner, Sidebar, SidebarButton, SidebarForm, SidebarTitle, SidebarSearch, SrOnly, SidebarHeader, SidebarNav, SidebarNavList, SidebarNavItem, Detail } from './styles';
import { createContact, getContacts } from '../../apis/contact';
import { useEffect } from 'react';

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return { contacts, q };
}

const RootPage = () => {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    document.getElementById('q').value = q;
  }, [q]);

  return (
    <>
      <Sidebar id="sidebar">
        <SidebarTitle>React Router Contacts</SidebarTitle>
        <SidebarHeader>
          <SidebarForm id="search-form" role="search">
            <SidebarSearch
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <SearchSpinner id="search-spinner" aria-hidden hidden={!searching} />
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
