import React from "react";
import { UseHotelInfo } from "../hotel/hotelAPI";
import Title from "../title/Title";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import "./HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  const hotelInfo = UseHotelInfo();

  return (
    <>
      <div className="background-image search-container"></div>
      <Title mainTitle="❤️‍🔥熱門時鐘酒店❤️‍🔥" />

      <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 4, md: 8 }}>
        {hotelInfo.slice(140, 146).map((hotel) => (
          <Grid item key={hotel.id} xs={4} className="popular-hotel-container">
            <Card sx={{ width: 360 }}>
              <Link to={"/hotel-detail/" + hotel.id}>
                <CardMedia
                  component="img"
                  alt="popular-hotel"
                  height="220"
                  image={hotel.profile_pic}
                />
              </Link>
              <CardContent>
                <Typography
                  className="popular-hotel-center"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {hotel.name}
                </Typography>
                <Typography
                  className="popular-hotel-center"
                  variant="body2"
                  color="text.secondary"
                >
                  地址 : {hotel.address}
                </Typography>
              </CardContent>
              <CardActions className="popular-hotel-center">
                <Button size="medium">立即預約</Button>
                <Button size="medium">收藏</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
