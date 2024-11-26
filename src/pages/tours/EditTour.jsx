import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getTourById, updateTour } from "../../services/tourService";

const EditTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      price: Yup.number().required("Bắt buộc").positive("Giá phải lớn hơn 0"),
      startDate: Yup.date().required("Bắt buộc"),
      duration: Yup.number()
        .required("Bắt buộc")
        .positive("Thời gian phải lớn hơn 0"),
      countryName: Yup.string().required("Bắt buộc"),
    }),
    onSubmit: async (values) => {
      const formattedValues = {
        ...values,
        price: Number(values.price),
        duration: Number(values.duration),
      };
      console.log("Dữ liệu gửi đi:", values);
      try {
        await updateTour(id, formattedValues);
        navigate("/tours");
      } catch (error) {
        console.error("Chi tiết lỗi:", error.response);
        setError(
          error.response?.data?.message || "Có lỗi xảy ra khi cập nhật tour"
        );
      }
    },
  });

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const tourData = await getTourById(id);
        formik.setValues({
          cityName: tourData.cityName || "",
          avatar: tourData.avatar || "",
          price: tourData.price || "",
          startDate: new Date(tourData.startDate).toISOString().split("T")[0],
          duration: tourData.duration || "",
          countryName: tourData.countryName || "",
        });
      } catch (error) {
        setError("Có lỗi xảy ra khi tải thông tin tour");
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <h2 className="text-2xl font-bold mb-4">Chỉnh sửa Tour</h2>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

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

          <Box mt={2} display="flex" gap={2}>
            <Button type="submit" variant="contained" color="primary">
              Cập nhật Tour
            </Button>
            <Button variant="outlined" onClick={() => navigate("/tours")}>
              Hủy
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditTour;
