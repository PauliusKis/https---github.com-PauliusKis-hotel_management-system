import { useState } from "react";

function GuestSearch({ onFilter }) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    const value = event.target?.value || "";
    onFilter(value);
    setValue(value);
  }

  return <input type="text" value={value} onChange={handleChange} />;
}

export default GuestSearch;
