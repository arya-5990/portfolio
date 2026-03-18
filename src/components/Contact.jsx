import { useData } from '../context/DataContext';

const Contact = () => {
  const { data, loading } = useData();
  const contact = data?.contact;

  if (loading || !contact) return <section className="contact" id="contact"></section>;

  return (
    <section className="contact" id="contact">
      <h2 className="heading">Contact <span>Me!</span></h2>
      <div className="contact-info">
        <p>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
        <p>
          <strong>Phone:</strong>{' '}
          <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}>{contact.phone}</a>
        </p>
        <p>
          <strong>LinkedIn:</strong>{' '}
          <a href={contact.linkedinLink} target="_blank" rel="noreferrer">
            {contact.linkedin}
          </a>
        </p>
      </div>
    </section>
  )
}

export default Contact
