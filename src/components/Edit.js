import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Metadata from "./Metadata";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Edit() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [comments, setComments] = useState("");
  const [id, setID] = useState("");

  let history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let a = Metadata.find((item) => item.id === id);
    if (a) {
      a.title = title;
      a.subtitle = subtitle;
      a.comments = comments;

      history("/");
    }
  };

  useEffect(() => {
    setTitle(localStorage.getItem("title"));
    setSubtitle(localStorage.getItem("subtitle"));
    setComments(localStorage.getItem("comments"));
    setID(localStorage.getItem("id"));
  }, []);

  useEffect(() => {
    localStorage.setItem("Metadata", JSON.stringify(Metadata));
  }, []);

  return (
    <div>
      <Form className="d-grid gap-2" style={{ margin: "3.5rem" }}>
        <h1 className="text-primary">Edit the Data:</h1>
        <h5 className="text-primary">Edit the Title:</h5>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%" }}
          ></Form.Control>
        </Form.Group>
        <h5 className="text-primary">Edit the Subtitle:</h5>
        <Form.Group className="mb-3" controlId="formSubtitle">
          <Form.Control
            type="text"
            placeholder="Enter subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            style={{ width: "100%" }}
          ></Form.Control>
        </Form.Group>

        <Button onClick={(e) => handleSubmit(e)} type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default Edit;
