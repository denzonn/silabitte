import * as yup from "yup";

export const validateLogin = yup.object({
  email: yup
    .string()
    .required("Anda Harus Memasukkan Email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Emails harus menggunakan @"
    ),
  password: yup.string().required("Anda Harus Memasukkan Password"),
});

export const validateUser = yup.object({
  email: yup
    .string()
    .required("Anda Harus Memasukkan Email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Emails harus menggunakan @"
    ),
  password: yup.string().required("Anda Harus Memasukkan Password"),
  name: yup.string().required("Anda Harus Memasukkan Name"),
});

export const validateType = yup.object({
  type: yup.string().required("Anda Harus Memasukkan Type"),
  certificate_color: yup.string().required("Anda Harus Memasukkan Warna Sertifikat"),
});

export const validateRequest = yup.object({
  type: yup.string().required("Anda Harus Memasukkan Type"),
  certificate_color: yup.string().required("Anda Harus Memasukkan Warna Sertifikat"),
});

export const validateIndicator = yup.object({
  indicator: yup.string().required("Anda Harus Memasukkan Indikator"),
  unit: yup.string().required("Anda Harus Memasukkan Unit"),
  gender: yup.string().required("Anda Harus Memasukkan Gender"),
  from_age: yup.string().required("Anda Harus Memasukkan From-Age"),
  to_age: yup.string().required("Anda Harus Memasukkan To-Age"),
  limit_grade_1: yup.string().required("Anda Harus Memasukkan Limitgrade 1"),
  limit_grade_2: yup.string().required("Anda Harus Memasukkan Limitgrade 2"),
  limit_grade_3: yup.string().required("Anda Harus Memasukkan Limitgrade 3"),
  type_livestock_id: yup.string().required("Anda Harus Memasukkan Tipe Ternak"),
});

export const validateNews = yup.object({
  title: yup.string().required("Anda Harus Memasukkan Judul Berita"),
  content: yup.string().required("Anda Harus Memasukkan Isi Berita"),
});

export const validateStatus = yup.object({
  status: yup.string().required("Anda Harus Memasukkan Statusnya"),
});