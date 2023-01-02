const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "./db/", "contacts.json");

console.log(contactsPath);
console.log(__dirname);

const getContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

const listContacts = async () => {
  return await getContacts();
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  let desiredContact = null;
  contacts.forEach((contact) => {
    if (contact.id !== contactId) {
      return;
    }
    desiredContact = contact;
  });
  return desiredContact;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );

  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
};

const addContact = async (name, email, phone) => {
  const contacts = await getContacts();
  phone = phone.toString();
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
