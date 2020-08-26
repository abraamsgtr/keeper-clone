import React from "react";

const date = new Date();
const year = date.getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p> All rights in {year} </p>{" "}
    </footer>
  );
}

export default Footer;
