import PropTypes from 'prop-types';
import { Button } from '../ContactList.styled';
import { useDispatch } from 'react-redux';

import { deleteContact } from 'redux/contactsSlice';

export const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  return (
    <>
      <p>
        {name}: {number}
      </p>
      <Button onClick={() => dispatch(deleteContact(id))}>Delete</Button>
    </>
  );
};
Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
