import Head from "next/head";
import HeadLink from "./components/frontend/headlink";
import Menu from "./components/frontend/menu";
import ScriptLink from "./components/frontend/scriptlink";
import Footer from "./components/frontend/footer";
import React, { useEffect, useState } from "react";
import { formatImage, req } from "@/helpers";
import Checker from "./components/Checker";

export default function Terms() {
  return (
    <>
      <Head>
        <title>
          Terms & Conditions | Frantzdy Trading & Co., LLC - Service Usage Policies
        </title>
        <meta
          name="description"
          content="Review the Terms & Conditions governing the use of Frantzdy Trading & Co., LLC's services, including subscription details, payment terms, and user responsibilities. Understand your rights and obligations when accessing our COT report analysis tools."
        />
        <meta
          name="keywords"
          content="Frantzdy Trading & Co., LLC terms and conditions, service usage policies, subscription terms, payment policies, user responsibilities, COT report analysis terms"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Checker no_login={true}>
        <HeadLink />
        <Menu />

        <section className="page-header bg-tertiary">
          <div className="container">
            <div className="row">
              <div className="col-6 mx-auto text-center">
                <h2 className="mb-3 text-capitalize">Terms &amp; Conditions</h2>
                <p className="text-primary">Effective Date: 08/01/2024</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5 testimonials bg-tertiary">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="content">
                  <h3>Introduction</h3>
                  <p>
                    Welcome to Frantzdy Trading & Co., LLC. LLC. These Terms and
                    Conditions (“Terms”, “Terms and Conditions”) govern your use
                    of our website located at frantzdytradingco.com (together or
                    individually “Service”) operated by Frantzdy Trading & Co., LLC. LLC
                  </p>
                  <p>
                    Our Privacy Policy also governs your use of our Service and
                    explains how we collect, safeguard, and disclose information
                    that results from your use of our web pages.
                  </p>
                  <p>
                    Your agreement with us includes these Terms and our Privacy
                    Policy (“Agreements”). You acknowledge that you have read
                    and understood Agreements and agree to be bound by them.
                  </p>
                  <p>
                    If you do not agree with (or cannot comply with) Agreements,
                    then you may not use the Service, but please let us know by
                    emailing at{" "}
                    <a href="mailto:contact@frantzdytradingco.com">
                      contact@frantzdytradingco.com
                    </a>{" "}
                    so we can try to find a solution. These Terms apply to all
                    visitors, users, and others who wish to access or use
                    Service.
                  </p>
                  <h3>Communications</h3>
                  <p>
                    By using our Service, you agree to subscribe to newsletters,
                    marketing or promotional materials, and other information we
                    may send. However, you may opt out of receiving any, or all,
                    of these communications from us by following the unsubscribe
                    link or by emailing at{" "}
                    <a href="mailto:frantzdytradingco@gmail.com">
                      frantzdytradingco@gmail.com
                    </a>
                  </p>
                  <h3>Purchases</h3>
                  <p>
                    If you wish to purchase any product or service made
                    available through Service (“Purchase”), you may be asked to
                    supply certain information relevant to your Purchase
                    including, without limitation, your credit card number, the
                    expiration date of your credit card, your billing address,
                    and your shipping information.
                  </p>
                  <p>
                    You represent and warrant that: (i) you have the legal right
                    to use any credit card(s) or other payment method(s) in
                    connection with any Purchase; and that (ii) the information
                    you supply to us is true, correct, and complete.
                  </p>
                  <p>
                    We may employ the use of third-party services for the
                    purpose of facilitating payment and the completion of
                    Purchases. By submitting your information, you grant us the
                    right to provide the information to these third parties
                    subject to our Privacy Policy.
                  </p>
                  <p>
                    We reserve the right to refuse or cancel your order at any
                    time for reasons including but not limited to: product or
                    service availability, errors in the description or price of
                    the product or service, error in your order, or other
                    reasons.
                  </p>
                  <p>
                    We reserve the right to refuse or cancel your order if fraud
                    or an unauthorized or illegal transaction is suspected.
                  </p>
                  <h3>Subscriptions</h3>
                  <p>
                    Some parts of the Service are billed on a subscription basis
                    (“Subscription(s)”). You will be billed in advance on a
                    recurring and periodic basis (“Billing Cycle”). Billing
                    cycles are set either on a monthly or annual basis,
                    depending on the type of subscription plan you select when
                    purchasing a Subscription.
                  </p>
                  <p>
                    At the end of each Billing Cycle, your Subscription will
                    automatically renew under the exact same conditions unless
                    you cancel it or Frantzdy Trading & Co., LLC. LLC cancels it. You
                    may cancel your Subscription renewal either through your
                    online account management page or by contacting Frantzdy
                    Trading Co. LLC’s customer support team.
                  </p>
                  <p>
                    A valid payment method is required to process the payment
                    for your subscription. You shall provide Frantzdy Trading
                    Co. LLC with accurate and complete billing information
                    including full name, address, state, zip code, telephone
                    number, and a valid payment method information. By
                    submitting such payment information, you automatically
                    authorize Frantzdy Trading & Co., LLC. LLC to charge all
                    Subscription fees incurred through your account to any such
                    payment instruments.
                  </p>
                  <p>
                    Should automatic billing fail to occur for any reason,
                    Frantzdy Trading & Co., LLC. LLC will issue an electronic invoice
                    indicating that you must proceed manually, within a certain
                    deadline date, with the full payment corresponding to the
                    billing period as indicated on the invoice.
                  </p>
                  <h3>Fee Changes</h3>
                  <p>
                    Frantzdy Trading & Co., LLC. LLC, in its sole discretion and at any
                    time, may modify Subscription fees for the Subscriptions.
                    Any Subscription fee change will become effective at the end
                    of the then-current Billing Cycle.
                  </p>
                  <p>
                    Frantzdy Trading & Co., LLC. LLC will provide you with a reasonable
                    prior notice of any change in Subscription fees to give you
                    an opportunity to terminate your Subscription before such
                    change becomes effective.
                  </p>
                  <p>
                    Your continued use of the Service after the Subscription fee
                    change comes into effect constitutes your agreement to pay
                    the modified Subscription fee amount.
                  </p>
                  <h3>Refunds</h3>
                  <p>
                    Certain refund requests for Subscriptions may be considered
                    by Frantzdy Trading & Co., LLC. LLC on a case-by-case basis and
                    granted at the sole discretion of Frantzdy Trading & Co., LLC. LLC.
                  </p>
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
      </Checker>
      <Footer />
      <ScriptLink />
    </>
  );
}
