import { useState, useRef } from "react";

import { useClickOutside } from "../hooks/useClickOutside";

import './Dropdown.css';

export default function Dropdown(props) {
  const {
    onChange,
    options,
    value
  } = props;
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  useClickOutside(dropdownRef, () => setOpen(false));

  return (
    <div
      ref={dropdownRef}
      className="dropdown-container"
    >
      <div
        className="dropdown-button"
        onClick={() => setOpen(true)}
      >
        {value ?? 'Select language:'}
      </div>
      {
        open && (
          <div
            className="dropdown-list"
          >
            {options.map((option, i) => (
              <div
                key={i}
                className="dropdown-item"
                onClick={() => onChange(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}