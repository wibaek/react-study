import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { ContactForm } from './styles';
import { updateContact } from '../../apis/contact';

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

const EditContact = () => {
  const { contact } = useLoaderData();
  const { navigate } = useNavigate();

  return (
    <ContactForm method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input placeholder="First" aria-label="First name" type="text" name="first" defaultValue={contact?.first} />
        <input placeholder="Last" aria-label="Last name" type="text" name="last" defaultValue={contact?.last} />
      </p>
      <label>
        <span>Twitter</span>
        <input type="text" name="twitter" placeholder="@jack" defaultValue={contact?.twitter} />
      </label>
      <label>
        <span>Avatar URL</span>
        <input placeholder="https://example.com/avatar.jpg" aria-label="Avatar URL" type="text" name="avatar" defaultValue={contact?.avatar} />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact?.notes} rows={6} />
      </label>
      <p>
        <button
          type="submit"
          onClick={() => {
            navigate(-1);
          }}
        >
          Save
        </button>
        <button type="button">Cancel</button>
      </p>
    </ContactForm>
  );
};

export default EditContact;
