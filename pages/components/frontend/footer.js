import { Fragment, useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the year when the component mounts
    setYear(new Date().getFullYear());
  }, []);
  return (
    <>
      <footer className="pt-4 pb-3 bg-tertiary">
        <div className="container">
          <div className="row">
            <nav className="col-lg-12 align-self-center mb-1">
              <div className="row">
                <div className="col-sm-6">
                  <img src="/logo.png" className="img-fluid mb-3" />

                  <ul className="list-unstyled list-inline mb-1 social-icons">
                    <li className="list-inline-item me-3">
                      <a
                        title="Telegram"
                        href="https://t.me/frantzdytradingco"
                        target="_blank"
                      >
                        <img src="/telegram.png" className="img-fluid" />
                      </a>
                    </li>
                    <li className="list-inline-item me-3">
                      <a
                        title="Discord"
                        href="https://discord.gg/TaeYTC3n33"
                        target="_blank"
                      >
                        <img src="/discord.png" className="img-fluid" />
                      </a>
                    </li>
                    <li className="list-inline-item me-3">
                      <a
                        title="Linkedin"
                        href="https://www.linkedin.com/in/frantzdy-trading-co-llc-179121318/"
                        target="_blank"
                      >
                        <img src="/linkedin.png" className="img-fluid" />
                      </a>
                    </li>
                    <li className="list-inline-item me-3">
                      <a
                        title="X"
                        href="https://x.com/Frantzdytrading"
                        target="_blank"
                      >
                        <img src="/x-twitter.png" className="img-fluid" />
                      </a>
                    </li>
                    <li className="list-inline-item me-3">
                      <a
                        title="Youtube"
                        href="https://www.youtube.com/@frantzdytradingco"
                        target="_blank"
                      >
                        <img src="/youtube.png" className="img-fluid" />
                      </a>
                    </li>
                  </ul>

                  <p className="mb-0">
                    &copy; {year}{" "}
                    <a href="/" className="me-2">
                      Frantzdy Trading Co
                    </a>{" "}
                    |{" "}
                    <a href="/sitemap.xml" className="ms-2 text-dark">
                      Sitemap
                    </a>
                  </p>
                  <p className="mb-0">
                    Designed & Developed by
                    <a href="/"> Blockstacks Technologies Limited</a>
                  </p>
                </div>
                <div className="col-sm-2">
                  <h5>QUICK LINKS</h5>
                  <ul className="footer-list footer-menu">
                    <li className="list-item text-uppercase">
                      <a className="text-dark" href="/">
                        Home
                      </a>
                    </li>
                    <li className="list-item text-uppercase">
                      <a className="text-dark" href="/faq">
                        FAQ
                      </a>
                    </li>
                    <li className="list-item text-uppercase">
                      <a className="text-dark" href="/blog">
                        Blog
                      </a>
                    </li>
                    <li className="list-item text-uppercase">
                      <a className="text-dark" href="/contact">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-2">
                  <h5>FOR MEMBERS</h5>
                  <ul className="footer-list footer-menu">
                    <li className="list-item text-uppercase">
                      <a className="text-dark" href="/panel/cotpercentchange">
                        Cot % Change
                      </a>
                    </li>
                    <li className="list-item text-uppercase">
                      <a className="text-dark" href="/panel/sentimentdata">
                        Sentiment Data
                      </a>
                    </li>
                    <li className="list-item text-uppercase">
                      <a className="text-dark" href="/panel/cotscanner">
                        Cot Scanner
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-2">
                  <h5>OTHERS</h5>
                  <ul className="footer-list footer-menu">
                    <li className="list-item text-uppercase">
                      <a className="text-dark" href="/panel/videospdf">
                        Video's & PDF
                      </a>
                    </li>
                    <li className="list-item text-uppercase">
                      <a className="text-dark" href="/privacy">
                        Privacy Policy
                      </a>
                    </li>
                    <li className="list-item text-uppercase">
                      <a className="text-dark" href="/terms">
                        Terms &amp; Conditions
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="col-sm-12">
              <p className="line-height-1 text-justify mb-0">
                <small>
                  <strong>Disclaimer :</strong> The information on this website
                  is for general purposes only and shouldn't be considered
                  specific investment advice. It's not tailored to your
                  individual situation or financial goals. While we strive for
                  accuracy, the content can change without notice. We recommend
                  consulting with a qualified financial advisor before making
                  any investment decisions. Frantzdy Trading Co. is not
                  responsible for any losses you may incur based on the
                  information provided.
                </small>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
