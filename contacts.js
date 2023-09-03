// contacts.js
import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
/*
 * Раскомментируй и запиши значение */
const contactsPath = path.resolve("db", "contacts.json");

// TODO: задокументировать каждую функцию
export const listContacts = async () => {
  // ...твой код. Возвращает массив контактов.
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

export const removeContact = async (id) => {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  //это result из промиса, мы ловим только результат этого промиса
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

export const addContact = async ({ name, email, phone }) => {
  // ...твой код. Возвращает объект добавленного контакта.
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
};

export default { listContacts, getContactById, removeContact, addContact };
