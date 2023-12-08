// Form.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Box } from 'components/Box/Box';
import { Input, Button, StyledForm } from './Form.styled';
import { addContact } from 'redux/contactsSlice';
import { selectContacts } from 'redux/selector';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /(^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$)/,
      "Name may contain only letters, apostrophe, dash and spaces. For example, 'Adrian', 'Jacob Mercer', 'Charles de Batz de Castelmore d'Artagnan'"
    )
    .required('Add the name, please'),
  number: yup
    .string()
    .matches(
      /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Add the phone number, please'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { name, number } = values;

    if (contacts && contacts.length > 0) {
      const contactExists = contacts.some(
        contact => contact.name === name || contact.number === number
      );

      if (contactExists) {
        console.log('Contact already exists!');
      } else {
        dispatch(addContact({ name, number }));
        console.log('Contact added successfully!');
        resetForm();
      }
    } else {
      console.error('Contacts data is empty or undefined.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <StyledForm>
        <label htmlFor="name">Name</label>
        <Box display="flex" alignItems="baseline" gridGap={10}>
          <Input name="name" id="name" />
          <ErrorMessage name="name" />
        </Box>

        <label htmlFor="number">Number</label>
        <Box display="flex" alignItems="baseline" gridGap={10}>
          <Input name="number" />
          <ErrorMessage name="number" id="number" />
        </Box>

        <Button type="submit">Add contact</Button>
      </StyledForm>
    </Formik>
  );
};
