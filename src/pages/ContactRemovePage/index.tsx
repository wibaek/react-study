import { redirect } from 'react-router-dom';
import { deleteContact } from '../../apis/contact';

export const action = async ({ params }) => {
  await deleteContact(params.contactId);
  return redirect('/');
};
