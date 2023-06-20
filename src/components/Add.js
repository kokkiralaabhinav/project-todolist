import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Metadata from "./Metadata";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

function Add() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [comments /* remove setComments */] = useState("");

  let history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqueId = ids.slice(0, 8);

    const newMetadata = {
      id: uniqueId,
      title: title,
      subtitle: subtitle,
      date: new Date().toISOString(),
      comments: comments,
    };

    Metadata.push(newMetadata);
    history("/");
  };

  // add data in the local storage
  useEffect(() => {
    localStorage.setItem("Metadata", JSON.stringify(Metadata));
  }, []);

  return (
    <div>
      <Form className="d-grid gap-2" style={{ margin: "4.5rem" }}>
        <h1 className="text-primary">ADD the Data:</h1>
        <h5 className="text-primary">ADD the Title:</h5>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Control
            type="text"
            placeholder="Enter title"
            required
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%" }}
          ></Form.Control>
        </Form.Group>
        <h5 className="text-primary">ADD the Subtitle:</h5>
        <Form.Group className="mb-3" controlId="formSubtitle">
          <Form.Control
            type="text"
            placeholder="Enter subtitle"
            required
            onChange={(e) => setSubtitle(e.target.value)}
            style={{ width: "100%" }}
          ></Form.Control>
        </Form.Group>

        <Button onClick={(e) => handleSubmit(e)} type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default Add;
