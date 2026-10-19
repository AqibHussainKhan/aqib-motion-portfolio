import { Icon, Star } from "./Icon";

export default function CardStage() {
  return (
    <section
      className="card-stage"
      id="craft"
      data-scene="cards"
      aria-labelledby="craft-heading"
    >
      <div className="stage-sticky">
        <div className="section-topline container">
          <span>(02 — THE CRAFT)</span>
          <span>THOUGHTFULLY BUILT. PLAYFULLY EXPRESSED.</span>
        </div>
        <h2 className="stage-heading" id="craft-heading">
          Code that feels
          <br />
          as good as it looks.
        </h2>
        <div className="cards-space">
          <div className="rotating-cards">
            <a href="#work" className="craft-card craft-card-one">
              <span className="craft-card-kicker">01 / THE FOUNDATION</span>
              <div className="card-code" aria-hidden="true">
                <span>&lt;ideas&gt;</span>
                <span>&nbsp;&nbsp;made real.</span>
                <span>&lt;/ideas&gt;</span>
              </div>
              <div className="craft-card-bottom">
                <h3>
                  Beautiful
                  <br />
                  by design.
                </h3>
                <Icon name="arrow" size={27} />
              </div>
            </a>
            <a href="#about" className="craft-card craft-card-two">
              <span className="craft-card-kicker">02 / THE DETAILS</span>
              <Star className="card-large-star" />
              <div className="craft-card-bottom">
                <h3>
                  Built with
                  <br />
                  intention.
                </h3>
                <Icon name="arrow" size={27} />
              </div>
              <div className="card-orbit-line" aria-hidden="true" />
            </a>
            <a href="#playground" className="craft-card craft-card-three">
              <span className="craft-card-kicker">03 / THE FEELING</span>
              <div className="card-rings" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="craft-card-bottom">
                <h3>
                  A little
                  <br />
                  unexpected.
                </h3>
                <Icon name="arrow" size={27} />
              </div>
            </a>
          </div>
        </div>
        <div className="stage-footer">
          <span className="stage-line" />
          <p>From the first impression to the last interaction.</p>
          <span className="stage-line" />
        </div>
      </div>
    </section>
  );
}
