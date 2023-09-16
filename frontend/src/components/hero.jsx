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
            style={{ backgroundImage: "url(assets/img/slide/slide-1.jpg)" }}
          ></div>
          <div
            className="carousel-item"
            style={{ backgroundImage: "url(assets/img/slide/slide-2.jpg)" }}
          ></div>
          <div
            className="carousel-item"
            style={{ backgroundImage: "url(assets/img/slide/slide-3.jpg)" }}
          ></div>
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
