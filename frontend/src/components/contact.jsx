import React from 'react'

export const Contact = () => {
  return (
    <section id="contact" className="contact">
    <div className="container">
      <div className="section-title">
        <h2>Contact</h2>
        <p>We'd love to hear from you! Reach out to us with your questions, comments, or inquiries.</p>
      </div>
      <div className="row contact-info">
        <div className="col-md-4">
          <div className="contact-address">
            <i className="bi bi-geo-alt" />
            <h3>Address</h3>
            <address>Jalpaiguri - 735101, West Bengal , INDIA</address>
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-phone">
            <i className="bi bi-phone" />
            <h3>Phone Number</h3>
            <p><a href="tel:+155895548855">+91 9083527130</a></p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-email">
            <i className="bi bi-envelope" />
            <h3>Email</h3>
            <p><a href="mailto:info@example.com">divinebeauty@example.com</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
