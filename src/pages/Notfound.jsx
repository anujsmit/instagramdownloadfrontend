
import React from "react";
import { Link } from "react-router-dom";
import "./css/Notfound.css";

function Notfound() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">

        <div className="notfound-code">
          404
        </div>

        <div className="notfound-icon">
          ◎
        </div>

        <h1>
          Page Not Found
        </h1>

        <p>
          Sorry, we couldn't find the page you're
          looking for. It may have been moved,
          deleted, or the URL may be incorrect.
        </p>

        <div className="notfound-actions">
          <Link
            to="/"
            className="notfound-home-btn"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Notfound;

