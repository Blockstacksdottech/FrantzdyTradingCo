import Head from "next/head";
import Menu from "./components/frontend/menu";
import Footer from "./components/frontend/footer";
import HeadLink from "./components/frontend/headlink";
import ScriptLink from "./components/frontend/scriptlink";
import React, { useContext, useEffect, useState } from "react";
import { formatDateLocal, formatImage, req, reqNoAuth } from "@/helpers";
import Checker from "./components/Checker";
import { loadStripe } from "@stripe/stripe-js";
import { public_stripe_key } from "@/helpers/constants";
import { UserContext } from "@/contexts/UserContextData";

function Index() {
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [articles, setArticles] = useState([]);

  const fetchBlogs = async () => {
    const resp = await req("blog?limit=4");
    if (resp) {
      setArticles(resp);
    }
  };

  const fetchPayments = async () => {
    const resp = await reqNoAuth("/payment/subscribable-product", true);
    if (resp) {
      setPayments(resp);
    }
  };

  const fetchTeamMembers = async () => {
    const resp = await req("team-members");
    if (resp) {
      setMembers(resp);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchPayments();
    fetchTeamMembers();
  }, []);

  function filterByNameKeyword(array, keyword) {
    return array.filter((obj) =>
      obj.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  const getPrice = (keyword) => {
    const objects = filterByNameKeyword(payments, keyword);
    if (objects.length > 0) {
      console.log(objects[0]);
      const price = objects[0].price / 100;
      return price;
    } else {
      return null;
    }
  };

  return (
    <>
      <Head>
        <title>
          Frantzdy Trading CO - Trading become easier when you trade with us
        </title>
      </Head>
      <Checker no_login={true}>
        <HeadLink />
        <Menu />
        <div className="video-background-holder">
          <div className="video-background-overlay"></div>
          <video playsInline autoPlay muted loop>
            <source src="./frontend/cot-video.mp4" type="video/mp4" />
          </video>
          <div className="video-background-content container h-100">
            <div className="d-flex h-100  align-items-center">
              <div className="text-center">
                <h1 className="text-uppercase mb-4 text-center">
                  Charting Tools for In-Depth Analysis of COT Reports
                </h1>
                <p className="mb-4 text-center lead text-secondary">
                  Unlock the power of Commitment of Traders (COT) report
                  analysis with our interactive charting tools for better
                  trading decisions.
                </p>
                <a
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  type="button"
                  className="btn btn-primary box-shadow"
                  href="#ourservices"
                >
                  Checkout Our Services
                </a>
              </div>
            </div>
          </div>
        </div>
        <section
          className="about-section testimonials section bg-tertiary overflow-hidden"
          id="ourservices"
        >
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-12">
                <div className="section-title text-center">
                  <h1 className="text-primary text-uppercase fw-bold mb-3">
                    Our Services
                  </h1>
                  <p className="lead">Unlock Market Insights with COT Data</p>
                </div>
              </div>
            </div>
            <div className="row align-items-center mb-5 pb-5">
              <div className="col-lg-5" data-aos="fade-right">
                <div className="section-title">
                  <h2>COT SCANNER</h2>
                  <p className="lead mb-0 mt-4">
                    Understanding the COT Scanner
                  </p>
                  <p>
                    A powerful tool for analyzing market positions of large
                    traders, helping you make informed trading decisions.
                  </p>
                  <a
                    className="btn btn-primary box-shadow mt-4"
                    href="./register"
                  >
                    Register
                  </a>
                </div>
              </div>
              <div className="col-lg-7" data-aos="fade-left">
                <img
                  loading="lazy"
                  decoding="async"
                  src="./frontend/images/COTSCANNER.png"
                  alt="COT Scanner"
                  className="img-fluid float-end"
                />
              </div>
            </div>

            <div className="row align-items-center mb-5 pb-5">
              <div className="col-lg-7" data-aos="fade-right">
                <img
                  loading="lazy"
                  decoding="async"
                  src="./frontend/images/COT-Change.png"
                  alt="COT % CHANGE"
                  className="img-fluid float-start"
                />
              </div>
              <div className="col-lg-5" data-aos="fade-left">
                <div className="section-title">
                  <h2>COT % CHANGE</h2>
                  <p className="lead mb-0 mt-4">
                    Track Market Sentiment Shifts
                  </p>
                  <p>
                    The Commitment of Traders (COT) report shows the net
                    positions of major market participants. COT % Change
                    measures the week-to-week changes in these positions, giving
                    insights into market sentiment shifts.
                  </p>
                  <a
                    className="btn btn-primary box-shadow mt-4"
                    href="./register"
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>

            <div className="row align-items-center mb-5">
              <div className="col-lg-5" data-aos="fade-right">
                <div className="section-title">
                  <h2>SENTIMENT DATA</h2>
                  <p className="lead mb-0 mt-4">Uncover Market Emotions</p>
                  <p>
                    Sentiment data captures the emotions and opinions of market
                    participants, offering insights into market mood—whether
                    bullish (optimistic) or bearish (pessimistic).
                  </p>
                  <a
                    className="btn btn-primary box-shadow mt-4"
                    href="./register"
                  >
                    Register
                  </a>
                </div>
              </div>
              <div className="col-lg-7" data-aos="fade-left">
                <img
                  loading="lazy"
                  decoding="async"
                  src="./frontend/images/Sentiment-Data.png"
                  alt="Sentiment Data"
                  className="img-fluid float-end"
                />
              </div>
            </div>
          </div>
          <div className="has-shapes">
            <svg
              className="shape shape-left text-light"
              width={290}
              height={709}
              viewBox="0 0 290 709"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-119.511 58.4275C-120.188 96.3185 -92.0001 129.539 -59.0325 148.232C-26.0649 166.926 11.7821 174.604 47.8274 186.346C83.8726 198.088 120.364 215.601 141.281 247.209C178.484 303.449 153.165 377.627 149.657 444.969C144.34 546.859 197.336 649.801 283.36 704.673"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-141.434 72.0899C-142.111 109.981 -113.923 143.201 -80.9554 161.895C-47.9878 180.588 -10.1407 188.267 25.9045 200.009C61.9497 211.751 98.4408 229.263 119.358 260.872C156.561 317.111 131.242 391.29 127.734 458.631C122.417 560.522 175.414 663.463 261.437 718.335"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-163.379 85.7578C-164.056 123.649 -135.868 156.869 -102.901 175.563C-69.9331 194.256 -32.086 201.934 3.9592 213.677C40.0044 225.419 76.4955 242.931 97.4127 274.54C134.616 330.779 109.296 404.957 105.789 472.299C100.472 574.19 153.468 677.131 239.492 732.003"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-185.305 99.4208C-185.982 137.312 -157.794 170.532 -124.826 189.226C-91.8589 207.919 -54.0118 215.597 -17.9666 227.34C18.0787 239.082 54.5697 256.594 75.4869 288.203C112.69 344.442 87.3706 418.62 83.8633 485.962C78.5463 587.852 131.542 690.794 217.566 745.666"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
            </svg>
            <svg
              className="shape shape-right text-light"
              width={731}
              height={429}
              viewBox="0 0 731 429"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1794 428.14C1.80036 390.275 -5.75764 349.015 8.73984 312.537C27.748 264.745 80.4729 237.968 131.538 231.843C182.604 225.703 234.032 235.841 285.323 239.748C336.615 243.64 391.543 240.276 433.828 210.964C492.452 170.323 511.701 91.1227 564.607 43.2553C608.718 3.35334 675.307 -9.81661 731.29 10.323"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M51.0253 428.14C41.2045 392.326 34.0538 353.284 47.7668 318.783C65.7491 273.571 115.623 248.242 163.928 242.449C212.248 236.641 260.884 246.235 309.4 249.931C357.916 253.627 409.887 250.429 449.879 222.701C505.35 184.248 523.543 109.331 573.598 64.0588C615.326 26.3141 678.324 13.8532 731.275 32.9066"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M89.8715 428.14C80.6239 394.363 73.8654 357.568 86.8091 325.028C103.766 282.396 150.788 258.515 196.347 253.054C241.906 247.578 287.767 256.629 333.523 260.099C379.278 263.584 428.277 260.567 465.976 234.423C518.279 198.172 535.431 127.525 582.62 84.8317C621.964 49.2292 681.356 37.4924 731.291 55.4596"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M128.718 428.14C120.029 396.414 113.678 361.838 125.837 331.274C141.768 291.221 185.939 268.788 228.737 263.659C271.536 258.515 314.621 267.008 357.6 270.282C400.58 273.556 446.607 270.719 482.028 246.16C531.163 212.111 547.275 145.733 591.612 105.635C628.572 72.19 684.375 61.1622 731.276 78.0432"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M167.564 428.14C159.432 398.451 153.504 366.107 164.863 337.519C179.753 300.046 221.088 279.062 261.126 274.265C301.164 269.452 341.473 277.402 381.677 280.465C421.88 283.527 464.95 280.872 498.094 257.896C544.061 226.035 559.146 163.942 600.617 126.423C635.194 95.1355 687.406 84.8167 731.276 100.612"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        </section>
        <iframe
          src="https://fxpricing.com/fx-widget/ticker-tape-widget.php?id=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24&border=show&speed=50&pair_weight=normal&click_target=blank&theme=dark&by-cr=28A745&sl-cr=DC3545&flags=circle&d_mode=regular&column=ask,bid,spread,chg,chg_per&lang=en"
          style={{ width: "100%", height: "45px", border: "0" }}
        />
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="section-title pt-4">
                  <p className="text-primary text-uppercase fw-bold mb-3 lead">
                    Unlock the Power of COT Data
                  </p>
                  <h1>Gain a Deeper Understanding of Market Sentiment</h1>

                  <p className="mb-0">
                    Frantzdy Trading Co. provides you with the tools to analyze
                    the Commitment of Traders (COT) report, a crucial indicator
                    of market sentiment. Our platform empowers you to
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 service-item">
                <a className="text-black">
                  <div className="block">
                    <span
                      className="colored-box text-center h3 mb-4"
                      data-aos="fade-down"
                      data-aos-anchor-placement="center-center"
                    >
                      01
                    </span>
                    <h3 className="mb-3 service-title">Visualize COT Data</h3>
                    <p className="mb-0 service-description">
                      Explore interactive charts and graphs that clearly
                      illustrate the positions of major market players, such as
                      commercial traders, hedge funds, and non-commercial
                      traders.
                    </p>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-md-6 service-item">
                <a className="text-black">
                  <div className="block">
                    <span
                      className="colored-box text-center h3 mb-4"
                      data-aos="fade-down"
                      data-aos-anchor-placement="center-center"
                    >
                      02
                    </span>
                    <h3 className="mb-3 service-title">Identify Trends</h3>
                    <p className="mb-0 service-description">
                      Gain insights into the collective sentiment of the market
                      by analyzing the changes in COT positions over time. This
                      helps you anticipate potential market shifts and make
                      informed trading decisions.
                    </p>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-md-6 service-item">
                <a className="text-black">
                  <div className="block">
                    <span
                      className="colored-box text-center h3 mb-4"
                      data-aos="fade-down"
                      data-aos-anchor-placement="center-center"
                    >
                      03
                    </span>
                    <h3 className="mb-3 service-title">Filter and Customize</h3>
                    <p className="mb-0 service-description">
                      Tailor your analysis to specific markets, timeframes, and
                      data points to focus on the information most relevant to
                      your trading strategy.
                    </p>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-md-6 service-item">
                <a className="text-black">
                  <div className="block">
                    <span
                      className="colored-box text-center h3 mb-4"
                      data-aos="fade-down"
                      data-aos-anchor-placement="center-center"
                    >
                      04
                    </span>
                    <h3 className="mb-3 service-title">Stay Informed</h3>
                    <p className="mb-0 service-description">
                      Access the latest COT data releases and updates, ensuring
                      you have the most current information available.
                    </p>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-md-6 service-item">
                <a className="text-black">
                  <div className="block">
                    <span
                      className="colored-box text-center h3 mb-4"
                      data-aos="fade-down"
                      data-aos-anchor-placement="center-center"
                    >
                      05
                    </span>
                    <h3 className="mb-3 service-title">Generate Reports</h3>
                    <p className="mb-0 service-description">
                      Create customized reports and analyses based on your
                      specific needs, allowing you to easily share your findings
                      with others.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="about-section testimonials section bg-tertiary overflow-hidden">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5" data-aos="fade-right">
                <div className="section-title">
                  <h1 className="text-primary text-uppercase fw-bold mb-3">
                    About Us
                  </h1>
                  <p className="mt-4">
                    At Frantzdy Trading Co., we understand that trading requires
                    dedication and commitment. We're committed to providing you
                    with the tools, resources, and support you need to achieve
                    your trading goals.
                  </p>
                  <p>
                    Our platform is built on a foundation of transparency,
                    expertise, innovation, and security, ensuring you have the
                    confidence to make informed trading decisions.
                  </p>
                  <a
                    className="btn btn-primary box-shadow mt-4"
                    href="./register"
                  >
                    Register
                  </a>
                </div>
              </div>
              <div
                className="col-lg-7 text-center text-lg-end"
                data-aos="fade-left"
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src="./frontend/images/about-us.png"
                  alt="About Frantzdy Trading CO"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="has-shapes">
            <svg
              className="shape shape-left text-light"
              width={290}
              height={709}
              viewBox="0 0 290 709"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-119.511 58.4275C-120.188 96.3185 -92.0001 129.539 -59.0325 148.232C-26.0649 166.926 11.7821 174.604 47.8274 186.346C83.8726 198.088 120.364 215.601 141.281 247.209C178.484 303.449 153.165 377.627 149.657 444.969C144.34 546.859 197.336 649.801 283.36 704.673"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-141.434 72.0899C-142.111 109.981 -113.923 143.201 -80.9554 161.895C-47.9878 180.588 -10.1407 188.267 25.9045 200.009C61.9497 211.751 98.4408 229.263 119.358 260.872C156.561 317.111 131.242 391.29 127.734 458.631C122.417 560.522 175.414 663.463 261.437 718.335"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-163.379 85.7578C-164.056 123.649 -135.868 156.869 -102.901 175.563C-69.9331 194.256 -32.086 201.934 3.9592 213.677C40.0044 225.419 76.4955 242.931 97.4127 274.54C134.616 330.779 109.296 404.957 105.789 472.299C100.472 574.19 153.468 677.131 239.492 732.003"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-185.305 99.4208C-185.982 137.312 -157.794 170.532 -124.826 189.226C-91.8589 207.919 -54.0118 215.597 -17.9666 227.34C18.0787 239.082 54.5697 256.594 75.4869 288.203C112.69 344.442 87.3706 418.62 83.8633 485.962C78.5463 587.852 131.542 690.794 217.566 745.666"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
            </svg>
            <svg
              className="shape shape-right text-light"
              width={731}
              height={429}
              viewBox="0 0 731 429"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1794 428.14C1.80036 390.275 -5.75764 349.015 8.73984 312.537C27.748 264.745 80.4729 237.968 131.538 231.843C182.604 225.703 234.032 235.841 285.323 239.748C336.615 243.64 391.543 240.276 433.828 210.964C492.452 170.323 511.701 91.1227 564.607 43.2553C608.718 3.35334 675.307 -9.81661 731.29 10.323"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M51.0253 428.14C41.2045 392.326 34.0538 353.284 47.7668 318.783C65.7491 273.571 115.623 248.242 163.928 242.449C212.248 236.641 260.884 246.235 309.4 249.931C357.916 253.627 409.887 250.429 449.879 222.701C505.35 184.248 523.543 109.331 573.598 64.0588C615.326 26.3141 678.324 13.8532 731.275 32.9066"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M89.8715 428.14C80.6239 394.363 73.8654 357.568 86.8091 325.028C103.766 282.396 150.788 258.515 196.347 253.054C241.906 247.578 287.767 256.629 333.523 260.099C379.278 263.584 428.277 260.567 465.976 234.423C518.279 198.172 535.431 127.525 582.62 84.8317C621.964 49.2292 681.356 37.4924 731.291 55.4596"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M128.718 428.14C120.029 396.414 113.678 361.838 125.837 331.274C141.768 291.221 185.939 268.788 228.737 263.659C271.536 258.515 314.621 267.008 357.6 270.282C400.58 273.556 446.607 270.719 482.028 246.16C531.163 212.111 547.275 145.733 591.612 105.635C628.572 72.19 684.375 61.1622 731.276 78.0432"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M167.564 428.14C159.432 398.451 153.504 366.107 164.863 337.519C179.753 300.046 221.088 279.062 261.126 274.265C301.164 269.452 341.473 277.402 381.677 280.465C421.88 283.527 464.95 280.872 498.094 257.896C544.061 226.035 559.146 163.942 600.617 126.423C635.194 95.1355 687.406 84.8167 731.276 100.612"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-5" data-aos="fade-right">
                <div className="section-title">
                  <p className="text-primary text-uppercase fw-bold mb-3 lead">
                    Secure Your Trading Future
                  </p>
                  <h1>
                    Frantzdy Trading Co. Provides the Protection and Support You
                    Need
                  </h1>
                  <div className="content mb-0 mt-4">
                    <p>
                      At Frantzdy Trading Co., we understand that your financial
                      security is paramount. That's why we've built our platform
                      with a focus
                    </p>
                    <p>
                      Join Frantzdy Trading Co. today and experience the
                      security and support you deserve.
                    </p>
                    <a
                      className="btn btn-primary box-shadow mt-4"
                      href="./register"
                    >
                      Register
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="difference-of-us-item p-3 rounded mr-0 me-lg-4"
                  data-aos="fade-left"
                  data-aos-easing="ease-in-sine"
                >
                  <div className="d-block d-sm-flex align-items-center m-2">
                    <div className="icon me-4 mb-4 mb-sm-0">
                      <i
                        className="fas fa-shield-alt mt-4"
                        style={{ fontSize: 36 }}
                      />
                    </div>
                    <div className="block">
                      <h3 className="mb-3">Security</h3>
                      <p className="mb-0">
                        Our advanced security measures protect your personal and
                        financial information, giving you peace of mind. We use
                        industry-leading encryption and authentication protocols
                        to safeguard your data and transactions.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="difference-of-us-item p-3 rounded mr-0 me-lg-4"
                  data-aos="fade-left"
                  data-aos-easing="ease-in-sine"
                >
                  <div className="d-block d-sm-flex align-items-center m-2">
                    <div className="icon me-4 mb-4 mb-sm-0">
                      {" "}
                      <i
                        className="fas fa-blender-phone mt-4"
                        style={{ fontSize: 36 }}
                      />
                    </div>
                    <div className="block">
                      <h3 className="mb-3">Support</h3>
                      <p className="mb-0">
                        Our dedicated support team is available to assist you
                        with any questions or concerns you may have. We're
                        committed to providing personalized guidance and
                        ensuring a smooth and positive trading experience.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="difference-of-us-item p-3 rounded mr-0 me-lg-4"
                  data-aos="fade-left"
                  data-aos-easing="ease-in-sine"
                >
                  <div className="d-block d-sm-flex align-items-center m-2">
                    <div className="icon me-4 mb-4 mb-sm-0">
                      {" "}
                      <i
                        className="fas fa-money-bill-alt mt-4"
                        style={{ fontSize: 36 }}
                      />
                    </div>
                    <div className="block">
                      <h3 className="mb-3">Stability</h3>
                      <p className="mb-0">
                        Our platform is built for reliability and stability,
                        ensuring you can access your accounts and execute trades
                        with confidence, even in volatile market conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section testimonials bg-tertiary homepage_tab">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 mb-4">
                <div className="section-title text-center">
                  <p className="text-primary text-uppercase fw-bold mb-3 lead">
                    Real-Time Market Insights
                  </p>
                  <h1>Informed Trading, Simplified</h1>
                </div>
              </div>
              <div className="col-lg-10">
                <ul
                  className="payment_info_tab nav nav-pills justify-content-center mb-4"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item m-2" role="presentation">
                    <a
                      className="nav-link btn btn-primary effect-none text-dark active"
                      id="Unlock-Your-Potential-tab"
                      data-bs-toggle="pill"
                      href="#Unlock-Your-Potential"
                      role="tab"
                      aria-controls="Unlock-Your-Potential"
                      aria-selected="true"
                    >
                      Unlock Your Potential
                    </a>
                  </li>
                  <li className="nav-item m-2" role="presentation">
                    <a
                      className="nav-link btn btn-primary effect-none text-dark "
                      id="Secure-Your-Financial-Future-tab"
                      data-bs-toggle="pill"
                      href="#Secure-Your-Financial-Future"
                      role="tab"
                      aria-controls="Secure-Your-Financial-Future"
                      aria-selected="true"
                    >
                      Secure Your Financial Future
                    </a>
                  </li>
                  <li className="nav-item m-2" role="presentation">
                    <a
                      className="nav-link btn btn-primary effect-none text-dark "
                      id="Stay-Connected-Stay-Informed-tab"
                      data-bs-toggle="pill"
                      href="#Stay-Connected-Stay-Informed"
                      role="tab"
                      aria-controls="Stay-Connected-Stay-Informed"
                      aria-selected="true"
                    >
                      Stay Connected, Stay Informed
                    </a>
                  </li>
                </ul>
                <div
                  className="rounded shadow bg-hometab-content p-5 tab-content"
                  id="pills-tabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="Unlock-Your-Potential"
                    role="tabpanel"
                    aria-labelledby="Unlock-Your-Potential-tab"
                  >
                    <div className="row align-items-center">
                      <div className="col-md-12">
                        <h3 className="mb-4">
                          Frantzdy Trading Co. Illuminates the Path to Financial
                          Success
                        </h3>
                      </div>
                      <div className="col-md-6 order-1 order-md-0">
                        <div className="content-block">
                          <div className="content">
                            <p>
                              At Frantzdy Trading Co., we believe in empowering
                              traders to achieve their financial goals. Our
                              platform is designed to provide you with the
                              knowledge, tools, and support you need to make
                              informed trading decisions and unlock your
                              potential.
                            </p>
                            <p>
                              <strong>Expert Insights:</strong> Access
                              insightful market analysis and educational
                              resources to gain a deeper understanding of
                              trading strategies and techniques.
                            </p>
                            <p>
                              Utilize our powerful charting tools and technical
                              analysis features to identify trends, make
                              predictions, and execute trades with confidence.
                            </p>
                            <p className="mb-0">
                              Our dedicated support team is available to answer
                              your questions, provide personalized guidance, and
                              help you navigate the complexities of the market.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 order-0 order-md-1 mb-5 mt-md-0">
                        <div className="image-block text-center">
                          <img
                            loading="lazy"
                            decoding="async"
                            src="./frontend/images/payment-info.png"
                            alt="Frantzdy Trading Co. Illuminates the Path to Financial
                          Success"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade "
                    id="Secure-Your-Financial-Future"
                    role="tabpanel"
                    aria-labelledby="Secure-Your-Financial-Future-tab"
                  >
                    <div className="row align-items-center">
                      <div className="col-md-12">
                        <h3 className="mb-4">
                          Frantzdy Trading Co. Makes Trading Safe and Easy
                        </h3>
                      </div>
                      <div className="col-md-6 order-1 order-md-0">
                        <div className="content-block">
                          <div className="content">
                            <p>
                              At Frantzdy Trading Co., we understand that your
                              financial security is a top priority. That's why
                              we've built our platform with a focus on:
                            </p>
                            <p>
                              <strong>Secure Transactions:</strong> Our platform
                              utilizes state-of-the-art encryption and security
                              measures to protect your personal and financial
                              information. You can trade with confidence knowing
                              your data is safe.
                            </p>
                            <p className="mb-0">
                              We're committed to providing a secure and reliable
                              trading environment, so you can focus on making
                              smart investment decisions.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 order-0 order-md-1 mb-5 mt-md-0">
                        <div className="image-block text-center">
                          <img
                            loading="lazy"
                            decoding="async"
                            src="./frontend/images/illustration-2.png"
                            alt="Frantzdy Trading Co. Makes Trading Safe and Easy"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade "
                    id="Stay-Connected-Stay-Informed"
                    role="tabpanel"
                    aria-labelledby="Stay-Connected-Stay-Informed-tab"
                  >
                    <div className="row align-items-center">
                      <div className="col-md-12">
                        <h3 className="mb-4">
                          Frantzdy Trading Co. Keeps You in the Loop
                        </h3>
                      </div>
                      <div className="col-md-6 order-1 order-md-0">
                        <div className="content-block">
                          <div className="content">
                            <p>
                              At Frantzdy Trading Co., we believe in keeping you
                              connected and informed. Our platform provides you
                              with the tools and resources you need to stay
                              up-to-date on market trends and make informed
                              trading decisions.
                            </p>
                            <p>
                              <strong>Real-Time Market Updates:</strong> Get
                              instant notifications and alerts on key market
                              movements, ensuring you never miss a beat.
                            </p>
                            <p>
                              Connect with our dedicated support team for
                              real-time assistance and guidance, available 24/7
                              to answer your questions and address your
                              concerns.
                            </p>
                            <p className="mb-0">
                              Customize your news feed to receive updates on the
                              markets and assets that matter most to you,
                              keeping you informed and ahead of the curve.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 order-0 order-md-1 mb-5 mt-md-0">
                        <div className="image-block text-center">
                          <img
                            loading="lazy"
                            decoding="async"
                            src="./frontend/images/illustration-1.png"
                            alt="Frantzdy Trading Co. Keeps You in the Loop"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="has-shapes">
            <svg
              className="shape shape-left text-light"
              width={290}
              height={709}
              viewBox="0 0 290 709"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-119.511 58.4275C-120.188 96.3185 -92.0001 129.539 -59.0325 148.232C-26.0649 166.926 11.7821 174.604 47.8274 186.346C83.8726 198.088 120.364 215.601 141.281 247.209C178.484 303.449 153.165 377.627 149.657 444.969C144.34 546.859 197.336 649.801 283.36 704.673"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-141.434 72.0899C-142.111 109.981 -113.923 143.201 -80.9554 161.895C-47.9878 180.588 -10.1407 188.267 25.9045 200.009C61.9497 211.751 98.4408 229.263 119.358 260.872C156.561 317.111 131.242 391.29 127.734 458.631C122.417 560.522 175.414 663.463 261.437 718.335"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-163.379 85.7578C-164.056 123.649 -135.868 156.869 -102.901 175.563C-69.9331 194.256 -32.086 201.934 3.9592 213.677C40.0044 225.419 76.4955 242.931 97.4127 274.54C134.616 330.779 109.296 404.957 105.789 472.299C100.472 574.19 153.468 677.131 239.492 732.003"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-185.305 99.4208C-185.982 137.312 -157.794 170.532 -124.826 189.226C-91.8589 207.919 -54.0118 215.597 -17.9666 227.34C18.0787 239.082 54.5697 256.594 75.4869 288.203C112.69 344.442 87.3706 418.62 83.8633 485.962C78.5463 587.852 131.542 690.794 217.566 745.666"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
            </svg>
            <svg
              className="shape shape-right text-light"
              width={474}
              height={511}
              viewBox="0 0 474 511"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M601.776 325.899C579.043 348.894 552.727 371.275 520.74 375.956C478.826 382.079 438.015 355.5 412.619 321.6C387.211 287.707 373.264 246.852 354.93 208.66C336.584 170.473 311.566 132.682 273.247 114.593C220.12 89.5159 155.704 108.4 99.7772 90.3769C53.1531 75.3464 16.3392 33.2759 7.65012 -14.947"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M585.78 298.192C564.28 319.945 539.378 341.122 509.124 345.548C469.472 351.341 430.868 326.199 406.845 294.131C382.805 262.059 369.62 223.419 352.278 187.293C334.936 151.168 311.254 115.417 275.009 98.311C224.74 74.582 163.815 92.4554 110.913 75.3971C66.8087 61.1784 31.979 21.3767 23.7639 -24.2362"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M569.783 270.486C549.5 290.99 526.04 310.962 497.501 315.13C460.111 320.592 423.715 296.887 401.059 266.641C378.392 236.402 365.963 199.965 349.596 165.901C333.24 131.832 310.911 98.1265 276.74 82.0034C229.347 59.6271 171.895 76.4848 122.013 60.4086C80.419 47.0077 47.5905 9.47947 39.8431 -33.5342"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M553.787 242.779C534.737 262.041 512.691 280.809 485.884 284.722C450.757 289.853 416.568 267.586 395.286 239.173C373.993 210.766 362.308 176.538 346.945 144.535C331.581 112.533 310.605 80.8723 278.502 65.7217C233.984 44.6979 180.006 60.54 133.149 45.4289C94.0746 32.8398 63.2303 -2.41965 55.9568 -42.8233"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M537.791 215.073C519.964 233.098 499.336 250.645 474.269 254.315C441.41 259.126 409.422 238.286 389.513 211.704C369.594 185.13 358.665 153.106 344.294 123.17C329.923 93.2337 310.293 63.6078 280.258 49.4296C238.605 29.7646 188.105 44.5741 144.268 30.4451C107.714 18.6677 78.8538 -14.3229 72.0543 -52.1165"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12 text-center">
                <h1 className="text-primary text-uppercase fw-bold mb-5">
                  Pricing
                </h1>
              </div>
              <div
                className="col-md-6 col-lg-3 mb-5 mb-lg-0"
                data-aos="fade-down"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="card h-100 border-0 rounded pricing-table table-1">
                  <div className="card-header pt-4 pb-1 bg-transparent text-center">
                    <h3>BASIC</h3>
                    <h1 className="mb-0">
                      <span>$</span>
                      {getPrice("basic")
                        ? getPrice("basic").toFixed(2)
                        : "Undefined"}
                    </h1>
                    <span className="text-primary">Monthly</span>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Weekly COT report signal summaries
                      </li>
                      <li className="list-group-item">
                        Basic educational content on how to interpret COT
                        reports
                      </li>
                      <li className="list-group-item">
                        Access to a community forum
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer py-3 bg-transparent">
                    <div className="text-center">
                      <a
                        type="button"
                        className="btn btn-primary box-shadow px-3"
                        href="./register"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-md-6 col-lg-3 mb-5 mb-lg-0"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="card h-100 border-0 rounded pricing-table table-2">
                  <div className="card-header pt-4 pb-1 bg-transparent text-center">
                    <h3>STANDARD</h3>
                    <h1 className="mb-0">
                      <span>$</span>
                      {getPrice("standard")
                        ? getPrice("standard").toFixed(2)
                        : "Undefined"}
                    </h1>
                    <span className="text-primary">Monthly</span>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        All Basic Plan features
                      </li>
                      <li className="list-group-item">
                        Bi-weekly COT report signal analysis
                      </li>
                      <li className="list-group-item">
                        Detailed breakdowns of major market positions (e.g.,
                        futures, options)
                      </li>
                      <li className="list-group-item">
                        Monthly webinars with market experts
                      </li>
                      <li className="list-group-item">
                        Priority email support
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer py-3 bg-transparent">
                    <div className="text-center">
                      <a
                        type="button"
                        className="btn btn-primary box-shadow px-3"
                        href="./register"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-md-6 col-lg-3 mb-5 mb-lg-0"
                data-aos="fade-down"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="card h-100 border-0 rounded pricing-table table-1">
                  <div className="card-header pt-4 pb-1 bg-transparent text-center">
                    <h3>PREMIUM</h3>
                    <h1 className="mb-0">
                      <span>$</span>
                      {getPrice("premium")
                        ? getPrice("premium").toFixed(2)
                        : "Undefined"}
                    </h1>
                    <span className="text-primary">Monthly</span>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        All Standard Plan features
                      </li>
                      <li className="list-group-item">
                        Real-time alerts on significant COT report changes
                      </li>
                      <li className="list-group-item">
                        Access to exclusive market trend reports
                      </li>
                      <li className="list-group-item">
                        One-on-one consultation sessions (1 per month)
                      </li>
                      <li className="list-group-item">
                        Dedicated account manager
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer py-3 bg-transparent">
                    <div className="text-center">
                      <a
                        type="button"
                        className="btn btn-primary box-shadow px-3"
                        href="./register"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-md-6 col-lg-3 mb-5 mb-lg-0"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="card h-100 border-0 rounded pricing-table table-1">
                  <div className="card-header pt-4 pb-1 bg-transparent text-center">
                    <h3>ENTERPRISE</h3>
                    <h1 className="mb-0">
                      <span>$</span>
                      {getPrice("custom")
                        ? getPrice("custom").toFixed(2)
                        : "Undefined"}
                    </h1>
                    <span className="text-primary">for 2 Years</span>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        All Premium Plan features
                      </li>
                      <li className="list-group-item">
                        Tailored COT report signal analysis based on specific
                        market interests
                      </li>
                      <li className="list-group-item">
                        Regular strategy sessions with top analysts
                      </li>
                      <li className="list-group-item">
                        On-demand market research reports
                      </li>
                      <li className="list-group-item">
                        Full access to historical COT data archives
                      </li>
                      <li className="list-group-item">
                        Priority support with a dedicated team
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer py-3 bg-transparent">
                    <div className="text-center">
                      <a
                        type="button"
                        className="btn btn-primary box-shadow px-3"
                        href="./register"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section testimonials overflow-hidden bg-tertiary">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section-title text-center">
                  <h1 className="text-primary text-uppercase fw-bold mb-3">
                    About Me
                  </h1>
                  <p className="mb-4 lead">The Ceo's Desk</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 mx-auto">
                <div
                  className="shadow rounded bg-hometab-content p-4 mt-4"
                  data-aos="fade-down"
                >
                  <div className="">
                    <p>Dear Reader,</p>
                    <p>
                      I am Frantzdy Pierre, the CEO and founder of Frantzdy
                      Trading Co., LLC. Over the past five years, I have
                      navigated various trading strategies in my journey.
                      Despite my efforts, maintaining consistent profitability
                      has posed challenges. I believe many retail traders
                      encounter similar difficulties, leading to behaviors like
                      FOMO (Fear of Missing Out) that can undermine their
                      trading success.
                    </p>
                    <p>
                      Driven by a passion for continuous improvement, I
                      constantly seek new knowledge to enhance my trading
                      skills. My exploration into Cot reports has significantly
                      refined my trading approach. In response, I have developed
                      a website where traders can not only learn my strategies
                      but also customize them to suit their needs.
                    </p>
                    <p>
                      I am eager to share my insights and foster a community
                      where we can learn and grow together.
                    </p>
                    <p className="mb-0">
                      Warm regards,
                      <br />
                      <strong>Frantzdy Pierre</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="has-shapes">
            <svg
              className="shape shape-left text-light"
              width={290}
              height={709}
              viewBox="0 0 290 709"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-119.511 58.4275C-120.188 96.3185 -92.0001 129.539 -59.0325 148.232C-26.0649 166.926 11.7821 174.604 47.8274 186.346C83.8726 198.088 120.364 215.601 141.281 247.209C178.484 303.449 153.165 377.627 149.657 444.969C144.34 546.859 197.336 649.801 283.36 704.673"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-141.434 72.0899C-142.111 109.981 -113.923 143.201 -80.9554 161.895C-47.9878 180.588 -10.1407 188.267 25.9045 200.009C61.9497 211.751 98.4408 229.263 119.358 260.872C156.561 317.111 131.242 391.29 127.734 458.631C122.417 560.522 175.414 663.463 261.437 718.335"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-163.379 85.7578C-164.056 123.649 -135.868 156.869 -102.901 175.563C-69.9331 194.256 -32.086 201.934 3.9592 213.677C40.0044 225.419 76.4955 242.931 97.4127 274.54C134.616 330.779 109.296 404.957 105.789 472.299C100.472 574.19 153.468 677.131 239.492 732.003"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-185.305 99.4208C-185.982 137.312 -157.794 170.532 -124.826 189.226C-91.8589 207.919 -54.0118 215.597 -17.9666 227.34C18.0787 239.082 54.5697 256.594 75.4869 288.203C112.69 344.442 87.3706 418.62 83.8633 485.962C78.5463 587.852 131.542 690.794 217.566 745.666"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
            </svg>
            <svg
              className="shape shape-right text-light"
              width={731}
              height={429}
              viewBox="0 0 731 429"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1794 428.14C1.80036 390.275 -5.75764 349.015 8.73984 312.537C27.748 264.745 80.4729 237.968 131.538 231.843C182.604 225.703 234.032 235.841 285.323 239.748C336.615 243.64 391.543 240.276 433.828 210.964C492.452 170.323 511.701 91.1227 564.607 43.2553C608.718 3.35334 675.307 -9.81661 731.29 10.323"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M51.0253 428.14C41.2045 392.326 34.0538 353.284 47.7668 318.783C65.7491 273.571 115.623 248.242 163.928 242.449C212.248 236.641 260.884 246.235 309.4 249.931C357.916 253.627 409.887 250.429 449.879 222.701C505.35 184.248 523.543 109.331 573.598 64.0588C615.326 26.3141 678.324 13.8532 731.275 32.9066"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M89.8715 428.14C80.6239 394.363 73.8654 357.568 86.8091 325.028C103.766 282.396 150.788 258.515 196.347 253.054C241.906 247.578 287.767 256.629 333.523 260.099C379.278 263.584 428.277 260.567 465.976 234.423C518.279 198.172 535.431 127.525 582.62 84.8317C621.964 49.2292 681.356 37.4924 731.291 55.4596"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M128.718 428.14C120.029 396.414 113.678 361.838 125.837 331.274C141.768 291.221 185.939 268.788 228.737 263.659C271.536 258.515 314.621 267.008 357.6 270.282C400.58 273.556 446.607 270.719 482.028 246.16C531.163 212.111 547.275 145.733 591.612 105.635C628.572 72.19 684.375 61.1622 731.276 78.0432"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M167.564 428.14C159.432 398.451 153.504 366.107 164.863 337.519C179.753 300.046 221.088 279.062 261.126 274.265C301.164 269.452 341.473 277.402 381.677 280.465C421.88 283.527 464.95 280.872 498.094 257.896C544.061 226.035 559.146 163.942 600.617 126.423C635.194 95.1355 687.406 84.8167 731.276 100.612"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        </section>
        <section className="section teams">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="section-title text-center">
                  <h1 className="text-primary text-uppercase fw-bold mb-3 ">
                    Our Team
                  </h1>
                  <p className="lead">People Behind Us</p>
                  <p className="mb-0">
                    Meet the passionate individuals who drive Frantzdy Trading
                    Co. to success. <br /> Our team is dedicated to providing
                    you with the best possible trading experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {members.map((e, i) => {
                return (
                  <div className="col-xl-3 col-lg-3 col-md-3 mt-4">
                    <div className="card bg-transparent border-0 text-center">
                      <div className="card-img">
                        <img
                          loading="lazy"
                          decoding="async"
                          src={
                            e.image
                              ? formatImage(e.image.profile_picture)
                              : "./frontend/images/team/team-1.png"
                          }
                          alt={e.details.full_name}
                          className="rounded"
                          style={{ height: "332px", width: "100%" }}
                        />
                      </div>
                      <div className="card-body">
                        <h3>{e.details.full_name}</h3>
                        <p>{e.details.position}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section testimonials bg-tertiary">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-12">
                <div className="section-title text-center mb-5 pb-2">
                  <h1 className="text-primary text-uppercase fw-bold mb-3">
                    Blog
                  </h1>
                  <p className="lead">The Latest News & Updates</p>
                </div>
              </div>
              {articles.map((e, i) => {
                return (
                  <div className="col-sm-3 mb-4">
                    <a href={`/blogdetails/${e.slug}`}>
                      <div className="card rounded bg-testimonial h-100">
                        <img
                          src={formatImage(e.image)}
                          className="card-img-top"
                          alt={e.title}
                          style={{ height: "203px", width: "100%" }}
                        />
                        <div className="card-body">
                          <p className="mb-0 text-center text-dark text-capitalize">
                            {e.title}
                          </p>
                        </div>
                        <div className="card-footer text-center">
                          <span className="mb-0 text-primary text-uppercase">
                            {e.user.username} - {formatDateLocal(e.date)}
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}

              <div className="col-sm-12 text-center">
                <a href="/blog" className="btn btn-primary ml-lg-3 box-shadow">
                  View All Blogs
                </a>
              </div>
            </div>
          </div>
          <div className="has-shapes">
            <svg
              className="shape shape-left text-light"
              width={290}
              height={709}
              viewBox="0 0 290 709"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-119.511 58.4275C-120.188 96.3185 -92.0001 129.539 -59.0325 148.232C-26.0649 166.926 11.7821 174.604 47.8274 186.346C83.8726 198.088 120.364 215.601 141.281 247.209C178.484 303.449 153.165 377.627 149.657 444.969C144.34 546.859 197.336 649.801 283.36 704.673"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-141.434 72.0899C-142.111 109.981 -113.923 143.201 -80.9554 161.895C-47.9878 180.588 -10.1407 188.267 25.9045 200.009C61.9497 211.751 98.4408 229.263 119.358 260.872C156.561 317.111 131.242 391.29 127.734 458.631C122.417 560.522 175.414 663.463 261.437 718.335"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-163.379 85.7578C-164.056 123.649 -135.868 156.869 -102.901 175.563C-69.9331 194.256 -32.086 201.934 3.9592 213.677C40.0044 225.419 76.4955 242.931 97.4127 274.54C134.616 330.779 109.296 404.957 105.789 472.299C100.472 574.19 153.468 677.131 239.492 732.003"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M-185.305 99.4208C-185.982 137.312 -157.794 170.532 -124.826 189.226C-91.8589 207.919 -54.0118 215.597 -17.9666 227.34C18.0787 239.082 54.5697 256.594 75.4869 288.203C112.69 344.442 87.3706 418.62 83.8633 485.962C78.5463 587.852 131.542 690.794 217.566 745.666"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
            </svg>
            <svg
              className="shape shape-right text-light"
              width={731}
              height={429}
              viewBox="0 0 731 429"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1794 428.14C1.80036 390.275 -5.75764 349.015 8.73984 312.537C27.748 264.745 80.4729 237.968 131.538 231.843C182.604 225.703 234.032 235.841 285.323 239.748C336.615 243.64 391.543 240.276 433.828 210.964C492.452 170.323 511.701 91.1227 564.607 43.2553C608.718 3.35334 675.307 -9.81661 731.29 10.323"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M51.0253 428.14C41.2045 392.326 34.0538 353.284 47.7668 318.783C65.7491 273.571 115.623 248.242 163.928 242.449C212.248 236.641 260.884 246.235 309.4 249.931C357.916 253.627 409.887 250.429 449.879 222.701C505.35 184.248 523.543 109.331 573.598 64.0588C615.326 26.3141 678.324 13.8532 731.275 32.9066"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M89.8715 428.14C80.6239 394.363 73.8654 357.568 86.8091 325.028C103.766 282.396 150.788 258.515 196.347 253.054C241.906 247.578 287.767 256.629 333.523 260.099C379.278 263.584 428.277 260.567 465.976 234.423C518.279 198.172 535.431 127.525 582.62 84.8317C621.964 49.2292 681.356 37.4924 731.291 55.4596"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M128.718 428.14C120.029 396.414 113.678 361.838 125.837 331.274C141.768 291.221 185.939 268.788 228.737 263.659C271.536 258.515 314.621 267.008 357.6 270.282C400.58 273.556 446.607 270.719 482.028 246.16C531.163 212.111 547.275 145.733 591.612 105.635C628.572 72.19 684.375 61.1622 731.276 78.0432"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
              <path
                d="M167.564 428.14C159.432 398.451 153.504 366.107 164.863 337.519C179.753 300.046 221.088 279.062 261.126 274.265C301.164 269.452 341.473 277.402 381.677 280.465C421.88 283.527 464.95 280.872 498.094 257.896C544.061 226.035 559.146 163.942 600.617 126.423C635.194 95.1355 687.406 84.8167 731.276 100.612"
                stroke="currentColor"
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section-title text-center">
                  <h1 className="text-primary text-uppercase fw-bold mb-3">
                    Testimonials
                  </h1>
                  <p className="mb-4 lead">Trusted By 1.2K+ Peoples</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-lg-4 col-md-6 pt-1"
                data-aos="fade-up"
                data-aos-anchor-placement="top-center"
              >
                <div className="shadow rounded bg-testimonial p-4 mt-4">
                  <div className="d-block d-sm-flex align-items-center mb-3">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="./frontend/images/testimonials/01.jpg"
                      alt="Michael J."
                      className="img-fluid"
                      width={65}
                      height={66}
                    />
                    <div className="mt-3 mt-sm-0 ms-0 ms-sm-3">
                      <h4 className="h5 mb-1">Michael J.</h4>
                      <p className="mb-0">Professional Trader</p>
                    </div>
                  </div>
                  <div className="content">
                    Frantzdy Trading Co. has been instrumental in my trading
                    success. Their deep COT and CFTC data analysis has given me
                    the edge I needed to make informed decisions. Their insights
                    are always spot-on and timely. I highly recommend their
                    services to any serious trader.
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 pt-1"
                data-aos="fade-down"
                data-aos-anchor-placement="center-center"
              >
                <div className="shadow rounded bg-testimonial p-4 mt-4">
                  <div className="d-block d-sm-flex align-items-center mb-3">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="./frontend/images/testimonials/02.jpg"
                      alt="Arlene McCoy"
                      className="img-fluid"
                      width={65}
                      height={66}
                    />
                    <div className="mt-3 mt-sm-0 ms-0 ms-sm-3">
                      <h4 className="h5 mb-1">Arlene McCoy</h4>
                      <p className="mb-0">Professional Trader</p>
                    </div>
                  </div>
                  <div className="content">
                    I've been using Frantzdy Trading Co.'s COT and CFTC reports
                    for the past year, and the results have been phenomenal.
                    Their data is comprehensive, and their analysis is easy to
                    understand and apply. I've significantly improved my trading
                    performance since I started using their services
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 pt-1"
                data-aos="fade-left"
                data-aos-anchor-placement="bottom-center"
              >
                <div className="shadow rounded bg-testimonial p-4 mt-4">
                  <div className="d-block d-sm-flex align-items-center mb-3">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="./frontend/images/testimonials/03.jpg"
                      alt="Marvin McKinney"
                      className="img-fluid"
                      width={65}
                      height={66}
                    />
                    <div className="mt-3 mt-sm-0 ms-0 ms-sm-3">
                      <h4 className="h5 mb-1">Marvin McKinney</h4>
                      <p className="mb-0">Professional Trader</p>
                    </div>
                  </div>
                  <div className="content">
                    Frantzdy Trading Co. provides unparalleled detail in their
                    COT and CFTC reports. The accuracy and depth of their
                    analysis have helped me stay ahead of market trends. Their
                    customer support is also exceptional, always ready to assist
                    with any queries I have
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 pt-1"
                data-aos="fade-right"
                data-aos-anchor-placement="top-center"
              >
                <div className="shadow rounded bg-testimonial p-4 mt-4">
                  <div className="d-block d-sm-flex align-items-center mb-3">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="./frontend/images/testimonials/04.jpg"
                      alt="Devon Lane"
                      className="img-fluid"
                      width={65}
                      height={66}
                    />
                    <div className="mt-3 mt-sm-0 ms-0 ms-sm-3">
                      <h4 className="h5 mb-1">Devon Lane</h4>
                      <p className="mb-0">Professional Trader</p>
                    </div>
                  </div>
                  <div className="content">
                    The expertise of Frantzdy Trading Co. in COT and CFTC data
                    analysis is truly impressive. Their reports have become a
                    crucial part of my trading strategy. The actionable insights
                    I gained from their analysis have led to more profitable
                    trades and a better understanding of market dynamics.
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 pt-1"
                data-aos="fade-down"
                data-aos-anchor-placement="bottom-center"
              >
                <div className="shadow rounded bg-testimonial p-4 mt-4">
                  <div className="d-block d-sm-flex align-items-center mb-3">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="./frontend/images/testimonials/05.jpg"
                      alt="Bessie Cooper"
                      className="img-fluid"
                      width={65}
                      height={66}
                    />
                    <div className="mt-3 mt-sm-0 ms-0 ms-sm-3">
                      <h4 className="h5 mb-1">Bessie Cooper</h4>
                      <p className="mb-0">Professional Trader</p>
                    </div>
                  </div>
                  <div className="content">
                    As a seasoned trader, I've relied on various sources for
                    market data, but Frantzdy Trading Co. stands out with its
                    exceptional COT and CFTC reports. Their detailed analysis
                    and clear presentation make it easy to grasp complex market
                    movements. I trust their insights to guide my trading
                    decisions.
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 pt-1"
                data-aos="fade-up"
                data-aos-anchor-placement="center-center"
              >
                <div className="shadow rounded bg-testimonial p-4 mt-4">
                  <div className="d-block d-sm-flex align-items-center mb-3">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="./frontend/images/testimonials/06.jpg"
                      alt="Kathryn Murphy"
                      className="img-fluid"
                      width={65}
                      height={66}
                    />
                    <div className="mt-3 mt-sm-0 ms-0 ms-sm-3">
                      <h4 className="h5 mb-1">Kathryn Murphy</h4>
                      <p className="mb-0">Professional Trader</p>
                    </div>
                  </div>
                  <div className="content">
                    Frantzdy Trading Co. has been a game-changer for my trading
                    approach. Their thorough analysis of COT and CFTC data has
                    provided me with valuable insights that have consistently
                    translated into profitable trades. Their dedication to
                    quality and accuracy is evident in every report they produce
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Checker>

      <Footer />
      <ScriptLink />
    </>
  );
}

export default Index;
