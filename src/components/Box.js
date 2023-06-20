import React, { useState } from "react";

function Box() {
  const [inputs, setInputs] = useState([]);

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleInputChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const handleDelete = (index) => {
    const confirmation = window.confirm("Are you sure you want to delete the task?");
    if (confirmation) {
      const updatedInputs = [...inputs];
      updatedInputs.splice(index, 1);
      setInputs(updatedInputs);
    }
  };

  return (
    <div className="container">
      <div className="box mt-4">
        {inputs.map((input, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <button className="btn btn-danger" type="button" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))}
        <button className="btn btn-primary mt-2" onClick={addInput}>
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Box;
