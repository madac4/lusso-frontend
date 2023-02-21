import React from 'react'

function Founder() {
  return (
    <div className="founder">
        <img className="founder-image" src="assets/img/olga-big.jpg" alt="CEO" />
        <div className="founder-info">
            <p className="founder-info__quote">
                “ Good design is a form of respect—on the part of the producer for the person who will spend hard-earned cash on the product, use the product, own the product. “
            </p>
            <div className="founder-info__details flex-gap-3">
                <div className="info-details__block">
                    <h6>Olga Rogovaya</h6>
                    <p>Creator & Founder</p>
                </div>
                <img src="assets/img/OlgaRogovaya.svg" alt="" />
            </div>
        </div>
    </div>
  );
}

export default Founder