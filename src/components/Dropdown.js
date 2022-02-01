import { useState, useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";

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
        onClick={() => setOpen(!open)}
        style={{
            textAlign: "center",
        }}
      >
        {value ?? 'Select language:'}
      </div>
      {
        open && (
          <div
            className="dropdown-list"
            style={{
                height: "calc(100vh - 70px)",
                overflowY: "auto"
            }}
          >
            <Scrollbars>
                {options.map((option, i) => (
                <div
                    key={i}
                    className="dropdown-item"
                    onClick={() => { onChange(option); setOpen(false); }}
                >
                    {option}
                </div>
                ))}
            </Scrollbars>
          </div>
        )
      }
    </div>
  )
}