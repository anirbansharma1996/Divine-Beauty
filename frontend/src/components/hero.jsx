import React from "react";

export const Hero = () => {
  return (
    <section id="hero">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div
            className="carousel-item active"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1595535373192-fc8935bacd89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80)",
            }}
          >
            <h1>Long-lasting Fragrance</h1>
            <p>
              Our perfumes are formulated to provide long-lasting fragrance
              throughout the day.
            </p>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/2814832/pexels-photo-2814832.jpeg?cs=srgb&dl=pexels-fidel-hajj-2814832.jpg&fm=jpg)",
            }}
          >
            <h1>High-Quality Ingredients</h1>
            <p>
              We use only the finest, high-quality ingredients to create our
              perfumes.
            </p>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(https://wallpapercave.com/wp/wp1879439.jpg)",
            }}
          >
            <h1>Wide Range of Scents</h1>
            <p>
              {" "}
              Our product line includes a diverse range of scents to cater to
              various preferences and occasions.
            </p>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <i class="bi bi-arrow-left"></i>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </section>
  );
};
