import React, { Fragment, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Metadata from "./Metadata";
import Box from "./Box";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  let history = useNavigate();

  const handleEdit = (id, title, subtitle, date, comments) => {
    localStorage.setItem("title", title);
    localStorage.setItem("subtitle", subtitle);
    localStorage.setItem("date", date);
    localStorage.setItem("comments", comments);
    localStorage.setItem("id", id);
  };

  const handleDelete = (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete the data? if u delete data the tasks should be removed!!"
    );
    if (confirmation) {
      const index = Metadata.findIndex((item) => item.id === id);

      if (index > -1) {
        Metadata.splice(index, 1);
      }
      history("/");
    }
  };

  useEffect(() => {
    localStorage.setItem("Metadata", JSON.stringify(Metadata));
  }, []);

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-primary">PROJECT: TODO LIST</h1>
        <div className="table-responsive">
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Title</th>
                <th style={{ width: "10%" }}>Subtitle</th>
                <th style={{ width: "15%" }}>Date</th>
                <th style={{ width: "25%" }}>Comments</th>
                <th style={{ width: "15%" }}>Crud Operations</th>
              </tr>
            </thead>
            <tbody>
              {Metadata && Metadata.length > 0 ? (
                Metadata.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td style={{ width: "10%" }}>{item.title}</td>
                      <td style={{ width: "10%" }}>{item.subtitle}</td>
                      <td style={{ width: "15%" }}>{formatDate(item.date)}</td>
                      <td style={{ width: "25%" }}>
                        <Box />
                      </td>
                      <td style={{ width: "15%" }}>
                        <Link to={"/edit"}>
                          <button
                            onClick={() =>
                              handleEdit(
                                item.id,
                                item.title,
                                item.subtitle,
                                item.date,
                                item.Comments
                              )
                            }
                            className="btn btn-success"
                          >
                            Update
                          </button>
                        </Link>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">
                    No Data is Available. Please enter the Data.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <br></br>
        <Link className="d-grid gap-2" to="/create">
          <Button size="lg">Create</Button>
        </Link>
      </div>
    </Fragment>
  );
}

export default Home;
