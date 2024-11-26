import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTour = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      cityName: "",
      avatar: "",
      price: "",
      startDate: "",
      duration: "",
      countryName: "",
    },
    validationSchema: Yup.object({
      cityName: Yup.string().required("Bắt buộc"),
      avatar: Yup.string().required("Bắt buộc"),
      price: Yup.number().required("Bắt buộc"),
      startDate: Yup.date().required("Bắt buộc"),
      duration: Yup.number().required("Bắt buộc"),
      countryName: Yup.string().required("Bắt buộc"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(
          "https://api-ltdd-flutter-5wp1.onrender.com/v1/tour",
          values
        );
        navigate("/tours");
      } catch (error) {
        console.error("Error adding tour:", error);
      }
    },
  });

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <h2 className="text-2xl font-bold mb-4">Thêm Tour Mới</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Tên thành phố"
            name="cityName"
            value={formik.values.cityName}
            onChange={formik.handleChange}
            error={formik.touched.cityName && Boolean(formik.errors.cityName)}
            helperText={formik.touched.cityName && formik.errors.cityName}
          />

          <TextField
            fullWidth
            margin="normal"
            label="URL Hình ảnh"
            name="avatar"
            value={formik.values.avatar}
            onChange={formik.handleChange}
            error={formik.touched.avatar && Boolean(formik.errors.avatar)}
            helperText={formik.touched.avatar && formik.errors.avatar}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Giá"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Ngày bắt đầu"
            name="startDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Thời gian (ngày)"
            name="duration"
            type="number"
            value={formik.values.duration}
            onChange={formik.handleChange}
            error={formik.touched.duration && Boolean(formik.errors.duration)}
            helperText={formik.touched.duration && formik.errors.duration}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Quốc gia"
            name="countryName"
            value={formik.values.countryName}
            onChange={formik.handleChange}
            error={
              formik.touched.countryName && Boolean(formik.errors.countryName)
            }
            helperText={formik.touched.countryName && formik.errors.countryName}
          />

          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Thêm Tour
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/tours")}
              sx={{ ml: 2 }}
            >
              Hủy
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddTour;
