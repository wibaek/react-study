import { Form, useLoaderData } from 'react-router-dom';
import { Contact, ContactControls, ContactHeader, ContactImg, ContactNotes, ContactTwitter, ContactTwitterLink } from './styles';
import { getContact } from '../../apis/contact';

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

const ContactPage = () => {
  const { contact } = useLoaderData();

  return (
    <Contact id="contact">
      <div>
        <ContactImg key={contact.avatar} src={contact.avatar || `https://robohash.org/${contact.id}.png?size=200x200`} />
      </div>

      <div>
        <ContactHeader>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </ContactHeader>

        {contact.twitter && (
          <ContactTwitter>
            <ContactTwitterLink target="_blank" href={`https://twitter.com/${contact.twitter}`} rel="noreferrer">
              {contact.twitter}
            </ContactTwitterLink>
          </ContactTwitter>
        )}

        {contact.notes && <ContactNotes>{contact.notes}</ContactNotes>}

        <ContactControls>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </ContactControls>
      </div>
    </Contact>
  );
};

function Favorite({ contact }) {
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button name="favorite" value={favorite ? 'false' : 'true'} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
        {favorite ? '★' : '☆'}
      </button>
    </Form>
  );
}

export default ContactPage;
