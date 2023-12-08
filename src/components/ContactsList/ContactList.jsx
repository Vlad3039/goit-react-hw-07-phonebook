import { List, ListItem } from './ContactList.styled';
import { Contact } from './Contact/Contact';
import { useSelector } from 'react-redux';
import { selectContacts, selectFilters } from 'redux/selector';

export const ContactList = () => {
  const filterState = useSelector(selectFilters);
  const contacts = useSelector(selectContacts);

  const filteredContacts =
    contacts &&
    filterState &&
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterState.toLowerCase())
    );

  return (
    <List>
      {filteredContacts &&
        filteredContacts.map(({ id, name, number }) => (
          <ListItem key={id}>
            <Contact id={id} name={name} number={number} />
          </ListItem>
        ))}
    </List>
  );
};
