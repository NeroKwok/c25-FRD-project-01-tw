import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./MyNavbar.css";
import { useAppDispatch } from "../../app/hook";
import { Form, Button } from "react-bootstrap";
import { logout } from "../auth/authSlice";
import { AuthGuard } from "../auth/AuthGuard";
import { useAppSelector } from "../../app/hook";
import { IRootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MyNavbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state: IRootState) => state.auth.username);
  const guardPage = AuthGuard();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <Navbar bg="bg" variant="light" className="my-navbar" sticky="top">
      <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Company Logo" />
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">
          💋主頁
        </Nav.Link>
        <Nav.Link as={Link} to="/hotels">
          🏩酒店一覽
        </Nav.Link>
        <Nav.Link as={Link} to="/contact-us">
          💌聯絡我們
        </Nav.Link>
        <Form className="d-flex" onSubmit={handleSearchSubmit}>
          <Form.Control
            type="search"
            placeholder="輸入地區或酒店名"
            className="me-2"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </Nav>
      <Nav>
        {guardPage || [
          <Nav.Link key="login" as={Link} to="/login">
            💁‍♀️登入
          </Nav.Link>,
          <Nav.Link key="register" as={Link} to="/register">
            💁‍♂️註冊
          </Nav.Link>,
        ]}
      </Nav>
      {guardPage && (
        <Nav.Item>
          <Nav.Link as={Link} to="/user-profile">
            {username}
          </Nav.Link>
        </Nav.Item>
      )}
      {guardPage && (
        <Nav.Item>
          <Button
            variant="warning"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            登出
          </Button>
        </Nav.Item>
      )}
    </Navbar>
  );
}
