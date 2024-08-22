import { Fragment, useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the year when the component mounts
    setYear(new Date().getFullYear());
  }, []);
  return (
    <>
      <footer className="main-footer">
        <nav className="align-self-center mb-1">
          <div className="row">
            <div className="col-sm-5">
              <img src="../logo.png" className="img-fluid" />
              <ul className="list-unstyled list-inline my-3 social-icons">
                <li className="list-inline-item me-3">
                  <a
                    title="Telegram"
                    href="https://t.me/frantzdytradingco"
                    target="_blank"
                  >
                    <img src="../telegram.png" className="img-fluid" />
                  </a>
                </li>
                <li className="list-inline-item me-3">
                  <a
                    title="Discord"
                    href="https://discord.gg/TaeYTC3n33"
                    target="_blank"
                  >
                    <img src="../discord.png" className="img-fluid" />
                  </a>
                </li>
                <li className="list-inline-item me-3">
                  <a
                    title="Linkedin"
                    href="https://www.linkedin.com/in/frantzdy-trading-co-llc-179121318/"
                    target="_blank"
                  >
                    <img src="../linkedin.png" className="img-fluid" />
                  </a>
                </li>
                <li className="list-inline-item me-3">
                  <a
                    title="X"
                    href="https://x.com/Frantzdytrading"
                    target="_blank"
                  >
                    <img src="../x-twitter.png" className="img-fluid" />
                  </a>
                </li>
                <li className="list-inline-item me-3">
                  <a
                    title="Youtube"
                    href="https://www.youtube.com/@frantzdytradingco"
                    target="_blank"
                  >
                    <img src="../youtube.png" className="img-fluid" />
                  </a>
                </li>
              </ul>

              <ul className="list-inline mb-1">
                <li className="list-inline-item">
                  <a href="../privacy" className="text-white">
                    Privacy Policy
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="../terms" className="text-white">
                    Terms & Conditions
                  </a>
                </li>
              </ul>

              <p className="mb-1">
                &copy; {year} <a href="../">Frantzdy Trading Co</a>
              </p>
              <p className="mb-1">
                Designed & Developed by
                <a href="../"> Blockstacks Technologies Limited</a>
              </p>
            </div>
            <div className="col-sm-4">
              <h5>QUICK LINKS</h5>
              <ul className="footer-list footer-menu mb-0">
                <li className="list-item text-uppercase">
                  <a className="text-white" href="../">
                    Home
                  </a>
                </li>
                <li className="list-item text-uppercase">
                  <a className="text-white" href="../faq">
                    FAQ
                  </a>
                </li>
                <li className="list-item text-uppercase">
                  <a className="text-white" href="../blog">
                    Blog
                  </a>
                </li>
                <li className="list-item text-uppercase">
                  <a className="text-white" href="../contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h5>FOR MEMBERS</h5>
              <ul className="footer-list footer-menu">
                <li className="list-item text-uppercase">
                  <a className="text-white" href="../panel/cotpercentchange">
                    Cot % Change
                  </a>
                </li>
                <li className="list-item text-uppercase">
                  <a className="text-white" href="../panel/sentimentdata">
                    Sentiment Data
                  </a>
                </li>
                <li className="list-item text-uppercase">
                  <a className="text-white" href="../panel/cotscanner">
                    Cot Scanner
                  </a>
                </li>
                <li className="list-item text-uppercase">
                  <a className="text-white" href="../panel/videospdf">
                    Video's & PDF
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <p className="line-height-1 text-justify mb-0">
          <small>
            <strong>Disclaimer:</strong> The information on this website is for
            general purposes only and shouldn't be considered specific
            investment advice. It's not tailored to your individual situation or
            financial goals. While we strive for accuracy, the content can
            change without notice. We recommend consulting with a qualified
            financial advisor before making any investment decisions. Frantzdy
            Trading Co. is not responsible for any losses you may incur based on
            the information provided.
          </small>
        </p>
      </footer>
    </>
  );
}
