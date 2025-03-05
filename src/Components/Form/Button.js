import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
export default function Button( props) {
  if (props.to) {
    return (
      <Link to={props.to} className={props.className}>
        {props.children}
      </Link>
    );
  } else if (props.href) {
    return (
      <a href={props.href} className={props.className}>
        {props.children}
      </a>
    );
  } else {
    return (
      <button
        disabled={props.disabled}
        onClick={props.onClick}
        className={props.className}
        type={props.type}
      >
        {props.children}
      </button>
    );
  }
}
