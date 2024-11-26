import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const TourList = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get(
        "https://api-ltdd-flutter-5wp1.onrender.com/v1/tour"
      );
      setTours(response.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tour này?")) {
      try {
        await axios.delete(
          `https://api-ltdd-flutter-5wp1.onrender.com/v1/tour/${id}`
        );
        fetchTours();
      } catch (error) {
        console.error("Error deleting tour:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Danh sách Tour</h2>
        <Link to="/tours/add">
          <Button variant="contained" color="primary">
            Thêm Tour Mới
          </Button>
        </Link>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thành phố</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Quốc gia</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour._id}>
                <TableCell>{tour.cityName}</TableCell>
                <TableCell>
                  <img
                    src={tour.avatar}
                    alt={tour.cityName}
                    style={{ width: 100 }}
                  />
                </TableCell>
                <TableCell>${tour.price}</TableCell>
                <TableCell>
                  {moment(tour.startDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>{tour.duration} ngày</TableCell>
                <TableCell>{tour.countryName}</TableCell>
                <TableCell>
                  <Link to={`/tours/edit/${tour._id}`}>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(tour._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TourList;
