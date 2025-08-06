import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppFloatButton.css';

const WhatsAppFloatButton = () => {
  const phoneNumber = '917092466600'; 
  const message = 'Hello! I am Looking for More personalized Product Details...';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppFloatButton;
