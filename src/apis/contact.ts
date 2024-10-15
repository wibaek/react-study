import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import { Contact } from '../types/contact';

export const getContacts = async (query?: string) => {
  await fakeNetwork(`getContacts:${query}`);
  let contacts: Contact[] = await localforage.getItem('contacts');
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ['first', 'last'] });
  }
  return contacts.sort((a, b) => {
    // last 기준으로 먼저 정렬
    if (a.last < b.last) return -1;
    if (a.last > b.last) return 1;

    // last가 같으면 createdAt 기준으로 정렬
    // return a.createdAt - b.createdAt;
    return true;
  });
};

export const createContact = async () => {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9);
  const contact = { id, createdAt: Date.now() };
  const contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
};

export const getContact = async (id: number) => {
  await fakeNetwork(`contact:${id}`);
  const contacts: Contact[] = await localforage.getItem('contacts');
  const contact = contacts.find((contact) => contact.id === id);
  return contact ?? null;
};

export const updateContact = async (id: number, updates) => {
  await fakeNetwork();
  const contacts: Contact[] = await localforage.getItem('contacts');
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error('No contact found for', id);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
};

export const deleteContact = async (id: number) => {
  const contacts: Contact[] | null = await localforage.getItem('contacts');
  if (!contacts) return false;
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
};

const set = (contacts: Contact[]) => {
  return localforage.setItem('contacts', contacts);
};

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

const fakeNetwork = async (key?: string | null) => {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
};
