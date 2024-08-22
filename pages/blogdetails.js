import Head from "next/head";
import Menu from "./components/frontend/menu";
import Footer from "./components/frontend/footer";
import HeadLink from "./components/frontend/headlink";
import ScriptLink from "./components/frontend/scriptlink";
import React, { useEffect, useState } from "react";
import { formatImage, req } from "@/helpers";
import Checker from "./components/Checker";

export default function BlogDetails() {
  return (
    <>
      <Head>
        <title>Frantzdy Trading Co | BLOG Title</title>
        <meta name="description" content="Frantzdy Trading Co" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Checker no_login={true}>
        <HeadLink />
        <Menu />

        <section
          className="page-header bg-tertiary"
          style={{
            backgroundImage: "url(" + "./frontend/images/blog/post-1.jpg" + ")",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-9 mx-auto text-center">
                <div className="bd-banner">
                  <h2 className="text-capitalize">
                    Sustaining During The Covid-19 Pandemic – A Guide For
                    Businesses
                  </h2>
                  <p className="mb-0">Author Name - January 12, 2021</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5 testimonials bg-tertiary">
          <div className="container">
            <div className="row mb-5">
              <div className="col-sm-8">
                <p>
                  For businesses across the globe, the last twelve months have
                  been nothing short of a nightmare – one which still isn’t
                  showing much signs of ending. Many startups and mid-level
                  companies have been forced to shut up shop altogether, while
                  nearly 72% businesses have reported significant reductions in
                  their cash flows. The manufacturing industry has been the
                  worst hit, while software and tech companies are facing huge
                  problems too. In what follows, we will highlight a few
                  strategies to deal with the COVID-19 challenge, till
                  everything turns normal again:
                </p>

                <h2>Have empathy</h2>
                <p>
                  If you – the owner of an organisation – is struggling in the
                  face of the pandemic, think about the position of your
                  customers, who are probably under even greater stress. Talk
                  with your clients, try to understand how they are planning to
                  cope with the crisis, and, if required, deliver certain basic
                  services at discounted rates (or free). Do not sever ties with
                  anyone just because he/she fails to meet a couple of payment
                  deadlines. Once the virus threat is neutralised and things are
                  back to normal, people will remember your good gesture – and
                  your business reputation will go up.
                </p>

                <h2>Use a contingency fund</h2>
                <p>
                  Think about it – what’s causing the biggest problem for
                  businesses in these trying times? That’s right, the paucity of
                  cash. To tackle this, set up an emergency/contingency fund –
                  one that would be enough to tide over the next 3-4 quarters.
                  If you do not have such a fund already, set it up as soon as
                  possible. Use the money from that fund prudently – to maintain
                  your resources (instead of, say, starting a new ambitious
                  project). Your business should never run out of a ‘sufficient’
                  cash availability.
                </p>

                <h2>Be transparent and communicate with everyone</h2>
                <p>
                  You are worried about sustainability of your company. Your
                  employees are worried about their job security. Potential
                  clients are worried about exorbitant expenses. As an
                  entrepreneur, the onus is on you to communicate regularly with
                  everyone – and let them know what the situation is, and what
                  direction your company is heading to. Everyone has been
                  emotionally impacted by the Covid crisis, everyone is anxious
                  – and good, honest communication is the only thing that can
                  tackle such unnecessary anxiety.
                </p>
              </div>
              <div className="col-sm-4">
                <div className="card shadow rounded bg-hometab-content">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Other Blogs</h4>
                  </div>
                  <div className="card-body">
                    <a href="./blogdetails">
                      <div className="row gx-2 mb-2">
                        <div className="col-sm-3 my-auto">
                          <img src="./frontend/images/blog/post-2.jpg" />
                        </div>
                        <div className="col-sm-9 my-auto text-dark">
                          Neque porro quisquam est qui dolorem ipsum quia dolor
                          sit
                        </div>
                      </div>
                    </a>
                    <a href="./blogdetails">
                      <div className="row gx-2 mb-2">
                        <div className="col-sm-3 my-auto">
                          <img src="./frontend/images/blog/post-3.jpg" />
                        </div>
                        <div className="col-sm-9 my-auto text-dark">
                          Neque porro quisquam est qui dolorem ipsum quia dolor
                          sit
                        </div>
                      </div>
                    </a>
                    <a href="./blogdetails">
                      <div className="row gx-2 mb-2">
                        <div className="col-sm-3 my-auto">
                          <img src="./frontend/images/blog/post-4.jpg" />
                        </div>
                        <div className="col-sm-9 my-auto text-dark">
                          Neque porro quisquam est qui dolorem ipsum quia dolor
                          sit
                        </div>
                      </div>
                    </a>
                    <a href="./blogdetails">
                      <div className="row gx-2 mb-2">
                        <div className="col-sm-3 my-auto">
                          <img src="./frontend/images/blog/post-5.jpg" />
                        </div>
                        <div className="col-sm-9 my-auto text-dark">
                          Neque porro quisquam est qui dolorem ipsum quia dolor
                          sit
                        </div>
                      </div>
                    </a>
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
      </Checker>
      <Footer />
      <ScriptLink />
    </>
  );
}
