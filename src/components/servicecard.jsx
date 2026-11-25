export default function ServiceCard({ service, onChoose }) {
  return <button className="service-card" onClick={() => onChoose(service)}>
    <span className="service-icon">{service.icon}</span>
    <span className="service-name">{service.name}</span>
    <span className="service-arrow">Plans →</span>
  </button>;
}
