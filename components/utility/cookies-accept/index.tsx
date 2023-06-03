"use client";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import style from "./index.style.module.scss";
import Link from "next/link";

const CookiesAccept = () => {
  const [cookies, setCookies] = useCookies(["userAccepted"]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!cookies.userAccepted) {
      setShowPopup(true);
    }
  }, []);

  return (
    <>
      {showPopup && (
        <div
          className={`${style.CookiesAccept} popup flex-c full-height full-width align-center justify-center top-level-indent`}
        >
          <div
            className={`${style.popupContent} full-width standard-component-width flex-c gap-sm align-center justify-between radius-md tw-p-5`}
          >
            <div className="popup-header flex-c align-center justify-center">
              <h2>Cookies</h2>
            </div>
            <div className="popup-body full-width flex-c gap-xs align-center smallest-component-width">
              <div>
                <p>
                  Please note that this app is currently in its early stages of
                  development. Some features may be unstable or not fully
                  implemented.
                </p>
                <Link href="/">See update log for more details</Link>
              </div>
              <div>
                <p>
                  To keep this app free of charge, your data is stored locally
                  in your browser. For optimal functionality, please enable
                  JavaScript and browser storage access. Any cookies are solely
                  for analytical purposes.
                </p>
                <Link href="/">Read the terms for more information</Link>
              </div>
              <p>
                You&apos;re free to explore the app without agreeing to these
                terms, but please note that its functionality might be limited.
              </p>
            </div>
            <div className="popup-footer flex-r align-center justify-center">
              <button
                className="pseudo-button"
                onClick={() => {
                  setCookies("userAccepted", true, {
                    path: "/",
                    maxAge: 31536000,
                    sameSite: true,
                  });
                  setShowPopup(false);
                }}
                value="accept"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiesAccept;
