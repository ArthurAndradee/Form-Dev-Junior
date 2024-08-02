import React, { useState, useEffect } from 'react';

interface ContactFormProps {
  onSubmit: (text: string, phoneNumber: string) => void;
  initialText?: string;
  initialPhoneNumber?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialText = '', initialPhoneNumber = '' }) => {
  const [text, setText] = useState<string>(initialText);
  const [phoneNumber, setPhoneNumber] = useState<string>(initialPhoneNumber);

  useEffect(() => {
    setText(initialText);
    setPhoneNumber(initialPhoneNumber);
  }, [initialText, initialPhoneNumber]);

  // Function to format the phone number
  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
      if (match) {
        const [, areaCode, prefix, lineNumber] = match;
        return `(${areaCode}${areaCode.length === 2 ? ')' : ''} ${prefix}${prefix.length === 5 ? '-' : ''}${lineNumber}`;
      }
    }
    return value;
  };

  // Handle input change for phone number
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNumber(formatPhoneNumber(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === '' || phoneNumber.trim() === '') return;
    onSubmit(text, phoneNumber);
    setText('');
    setPhoneNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className='d-flex flex-column mt-5 w-50'>
      <div className='d-flex align-items-start text-left'>Nome do Contato*</div>
      <input
        className='form-control w-75 form-control-lg my-3'
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div>Telefone*</div>
      <input
        className='form-control w-75 form-control-lg my-3'
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="(xx) xxxxx-xxxx"
      />
      <button type="submit" className='btn btn-primary w-25 mt-3'>Continuar</button>
    </form>
  );
};

export default ContactForm;
