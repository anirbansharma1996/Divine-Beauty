import React from 'react';

export const Faq = () => {
  return (
    <section id="faq" className="faq section-bg">
      <div className="container">
        <div className="section-title">
          <h2>Frequently Asked Questions</h2>
          <p>Welcome to Divine Beauty, your destination for exquisite perfumes. If you have any questions, we're here to help!</p>
        </div>
        <div className="faq-list">
          <ul>
            <li data-aos="fade-up">
              <i className="bx bx-help-circle icon-help" />{' '}
              <a
                data-bs-toggle="collapse"
                className="collapse"
                data-bs-target="#faq-list-1"
              >
                What makes Divine Beauty perfumes unique?{' '}
                <i className="bx bx-chevron-down icon-show" />
                <i className="bx bx-chevron-up icon-close" />
              </a>
              <div
                id="faq-list-1"
                className="collapse show"
                data-bs-parent=".faq-list"
              >
                <p>
                  At Divine Beauty, we take pride in offering you the most
                  exquisite and exclusive range of perfumes. Our fragrances are
                  carefully crafted with the finest ingredients to provide you
                  with a unique and long-lasting scent experience. We believe
                  that everyone deserves to feel divine, and our perfumes are
                  designed to make that possible.
                </p>
              </div>
            </li>
            <li data-aos="fade-up" data-aos-delay={100}>
              <i className="bx bx-help-circle icon-help" />{' '}
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq-list-2"
                className="collapsed"
              >
                How do I choose the perfect perfume from Divine Beauty?{' '}
                <i className="bx bx-chevron-down icon-show" />
                <i className="bx bx-chevron-up icon-close" />
              </a>
              <div
                id="faq-list-2"
                className="collapse"
                data-bs-parent=".faq-list"
              >
                <p>
                  We understand that selecting the right fragrance can be
                  overwhelming. To help you make the best choice, we offer a
                  fragrance quiz on our website. Simply answer a few questions,
                  and we'll recommend perfumes that match your preferences and
                  personality. You can also visit our physical store to sample
                  our scents and receive personalized assistance from our
                  experts.
                </p>
              </div>
            </li>
            <li data-aos="fade-up" data-aos-delay={200}>
              <i className="bx bx-help-circle icon-help" />{' '}
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq-list-3"
                className="collapsed"
              >
                Are Divine Beauty perfumes cruelty-free and eco-friendly?{' '}
                <i className="bx bx-chevron-down icon-show" />
                <i className="bx bx-chevron-up icon-close" />
              </a>
              <div
                id="faq-list-3"
                className="collapse"
                data-bs-parent=".faq-list"
              >
                <p>
                  Absolutely! Divine Beauty is committed to ethical and
                  sustainable practices. Our perfumes are cruelty-free, and we
                  prioritize environmentally responsible sourcing and
                  packaging. We believe in making the world more beautiful in
                  every way.
                </p>
              </div>
            </li>
            <li data-aos="fade-up" data-aos-delay={300}>
              <i className="bx bx-help-circle icon-help" />{' '}
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq-list-4"
                className="collapsed"
              >
                How long does the scent of Divine Beauty perfumes last?{' '}
                <i className="bx bx-chevron-down icon-show" />
                <i className="bx bx-chevron-up icon-close" />
              </a>
              <div
                id="faq-list-4"
                className="collapse"
                data-bs-parent=".faq-list"
              >
                <p>
                  Our perfumes are known for their long-lasting scent. The
                  duration varies depending on factors like the specific
                  fragrance and your body chemistry. On average, you can expect
                  the scent to last anywhere from 6 to 8 hours. To enhance
                  longevity, we recommend applying the perfume to pulse points
                  and using matching body products from our collection.
                </p>
              </div>
            </li>
            <li data-aos="fade-up" data-aos-delay={400}>
              <i className="bx bx-help-circle icon-help" />{' '}
              <a
                data-bs-toggle="collapse"
                data-bs-target="#faq-list-5"
                className="collapsed"
              >
                Can I return or exchange a Divine Beauty perfume if I'm not satisfied?{' '}
                <i className="bx bx-chevron-down icon-show" />
                <i className="bx bx-chevron-up icon-close" />
              </a>
              <div
                id="faq-list-5"
                className="collapse"
                data-bs-parent=".faq-list"
              >
                <p>
                  We want you to be delighted with your Divine Beauty purchase.
                  If, for any reason, you are not satisfied with your perfume,
                  you can return it within 30 days of purchase for a full refund
                  or exchange. Please check our{' '}
                  <a href="/return-policy">return policy</a> for more details
                  and instructions on how to initiate a return.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
