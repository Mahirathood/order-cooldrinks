import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate(service.link);
  };

  return (
    <div className="service-card" onClick={handleServiceClick}>
      <div className="service-icon">
        {service.icon}
      </div>
      <h3 className="service-title">{service.title}</h3>
    </div>
  );
};

export default ServiceCard;