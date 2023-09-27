import React from 'react';

export const Membership = () => {
  return (
    <section id="pricing" className="pricing" style={{ marginTop: '25px' }}>
      <div className="container">
        <div className="section-title">
          <h2>Pricing</h2>
          <p>Choose the membership plan that suits your needs. Our prices start from INR 500 and go up to INR 2000 per year.</p>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="box">
              <h3>Basic</h3>
              <h4><sup>₹</sup>500<span> / year</span></h4>
              <ul>
                <li>Access to our exclusive perfume collection</li>
                <li>Monthly fragrance newsletter</li>
                <li>Limited-time discounts on select scents</li>
                <li className="na">Personalized fragrance recommendations</li>
                <li className="na">Invitations to VIP perfume events</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">Buy Now</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
            <div className="box recommended">
              <h3>Premium</h3>
              <h4><sup>₹</sup>1000<span> / year</span></h4>
              <ul>
                <li>Access to our entire perfume collection</li>
                <li>Monthly fragrance newsletter with insider tips</li>
                <li>Exclusive discounts on all scents</li>
                <li>Personalized fragrance recommendations</li>
                <li className="na">Invitations to VIP perfume events</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">Buy Now</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
            <div className="box">
              <h3>Enterprise</h3>
              <h4><sup>₹</sup>2000<span> / year</span></h4>
              <ul>
                <li>Access to our entire perfume collection</li>
                <li>Monthly fragrance newsletter with expert insights</li>
                <li>Significant discounts on all scents</li>
                <li>Personalized fragrance consultations</li>
                <li>Priority access to VIP perfume events</li>
              </ul>
              <div className="btn-wrap">
                <a href="#" className="btn-buy">Buy Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
