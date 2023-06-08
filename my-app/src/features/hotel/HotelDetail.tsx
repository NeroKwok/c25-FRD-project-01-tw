import React from "react";
import { useParams } from "react-router-dom";
import Title from "../title/Title";
import { UseHotelInfo } from "./hotelAPI";
import Equipment from "../equipment/Equipment";
import "./HotelList.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import Gallery from "../gallery/Gallery";
import { Col, Row } from "react-bootstrap";
import Bookings from "../bookings/Bookings";
import RatingForm from "../rating/RatingForm";
import BookingSlot from "../bookings/BookingTesting";

export default function HotelDetail() {
  let { hotelId } = useParams();
  const hotelIdNum = Number(hotelId);
  const hotelInfo = UseHotelInfo();

  // Find the specific hotel using the hotelId
  const hotel = hotelInfo.find((hotel) => hotel.id === hotelIdNum);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      <Title mainTitle="酒店資料🏨" />
      <Gallery hotel={hotel} />
      <Row>
        <Col md={6}>
          <h2>{hotel.name}💖</h2>
          <p>地址: {hotel.address}</p>
          <p>地區: {hotel.district}</p>
          <p>電話: {hotel.phone}</p>
          <p>描述: {hotel.description}</p>
        </Col>
        <Col md={6}>
          <Equipment />
        </Col>
        <Col md={6}>
          <h2>酒店地圖🗺️</h2>
          <div
            className="map"
            dangerouslySetInnerHTML={{ __html: hotel.google_map_address }}
          />
        </Col>
        <Col md={6}>
          <h2>酒店預約😉</h2>
          <Bookings hotel={hotel} />
        </Col>
        <Col md={6}>
          <h2>發表評論👍</h2>
          <RatingForm />
        </Col>
        <Col md={6}>
          <h2>預約testing</h2>
          <BookingSlot hotel={hotel} />
        </Col>
      </Row>
    </div>
  );
}
