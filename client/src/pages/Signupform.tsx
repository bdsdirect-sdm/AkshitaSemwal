import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  photopath: Yup.mixed()
    .required("Profile photo is required")
    .test("fileSize", "File too large", (value: any) => {
      return !value || value.size <= 5024 * 5024;
    })
    .test("fileType", "Only .png and .jpeg files are allowed", (value: any) => {
      return value && ["image/png", "image/jpeg"].includes(value.type);
    }),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  usertype: Yup.string().required("User type is required"),
  cvpath: Yup.mixed()
    .test(
      "required-if-jobseeker",
      "CV is required for Job Seekers",
      function (value: any) {
        const { usertype } = this.parent;
        return usertype === "jobseeker" ? !!value : true;
      }
    )
    .test("fileType", "Only .pdf and .docx files are allowed", (value: any) => {
      return (
        value == null ||
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(value.type)
      );
    }),
});

const Signup = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleSignup = async (formdata: any) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/users",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const getAgency = async () => {
      try {
        const response: any = await axios.get(
          "http://localhost:4000/users/allagencies"
        );
        console.log("JEEEEEEEEEE",response.data)
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getAgency();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          gender: "",
          usertype: "",
          agency: "",
          hobbies: [],
          photopath: "",
          cvpath: "",
          agencyid: "",
        }}
        validationSchema={validationSchema} 
        onSubmit={(values: any) => {
          const formdata: any = new FormData();
          formdata.append("firstname", values.firstname);
          formdata.append("lastname", values.lastname);
          formdata.append("email", values.email);
          formdata.append("phone", values.phone);
          formdata.append("gender", values.gender);
          formdata.append("usertype", values.usertype);
          formdata.append("hobbies", values.hobbies);

          if (values.photopath) {
            formdata.append("photopath", values.photopath);
          }
          if (values.cvpath) {
            formdata.append("cvpath", values.cvpath);
          }
          if (values.usertype === "jobseeker") {
            formdata.append("agencyid", values.agency);
          }

          handleSignup(formdata);
          alert("User created, please check your email for a password");
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="bg-pink p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name:
            </label>
            <Field
              className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.firstname && touched.firstname
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              name="firstname"
            />
            {errors.firstname && touched.firstname && (
              <div className="text-red-500 text-sm">{errors.firstname}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name:
            </label>
            <Field
              className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.lastname && touched.lastname
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              name="lastname"
            />
            {errors.lastname && touched.lastname && (
              <div className="text-red-500 text-sm">{errors.lastname}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <Field
              className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              name="email"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Profile Photo:
            </label>
            <input
              type="file"
              name="photopath"
              className="mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              onChange={(event) => {
                setFieldValue(
                  "photopath",
                  event.currentTarget.files ? event.currentTarget.files[0] : null
                );
              }}
            />
            {errors.photopath && touched.photopath && (
              <div className="text-red-500 text-sm">{errors.photopath}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone:
            </label>
            <Field
              className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.phone && touched.phone
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              name="phone"
            />
            {errors.phone && touched.phone && (
              <div className="text-red-500 text-sm">{errors.phone}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Gender:
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <Field
                  type="radio"
                  name="gender"
                  value="male"
                  className="mr-1"
                />
                Male
              </label>
              <label className="flex items-center">
                <Field
                  type="radio"
                  name="gender"
                  value="female"
                  className="mr-1"
                />
                Female
              </label>
              {errors.gender && touched.gender && (
                <div className="text-red-500 text-sm">{errors.gender}</div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              User type:
            </label>
            <Field
              as="select"
              name="usertype"
              className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.usertype && touched.usertype
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="" label="Select user type" />
              <option value="jobseeker">Job Seeker</option>
              <option value="agency">Agency</option>
            </Field>
            {errors.usertype && touched.usertype && (
              <div className="text-red-500 text-sm">{errors.usertype}</div>
            )}
          </div>

          {values.usertype === "jobseeker" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Agency:
                </label>
                <Field
                  as="select"
                  name="agency"
                  className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    errors.agency && touched.agency
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Agency</option>
                  {data.map((agency: any) => (
                    <option key={agency.id} value={agency.id}>
                      {agency.firstname}
                    </option>
                  ))}
                </Field>
                {errors.agency && touched.agency && (
                  <div className="text-red-500 text-sm">{errors.agency}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  CV (PDF):
                </label>
                <input
                  type="file"
                  name="cvpath"
                  className="mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  onChange={(event) => {
                    setFieldValue(
                      "cvpath",
                      event.currentTarget.files ? event.currentTarget.files[0] : null
                    );
                  }}
                />
                {errors.cvpath && touched.cvpath && (
                  <div className="text-red-500 text-sm">{errors.cvpath}</div>
                )}
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hobbies:
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <Field
                  type="checkbox"
                  name="hobbies"
                  value="Singing"
                  className="mr-2"
                />
                Singing
              </label>
              <label className="flex items-center">
                <Field
                  type="checkbox"
                  name="hobbies"
                  value="Traveling"
                  className="mr-2"
                />
                Traveling
              </label>
              <label className="flex items-center">
                <Field
                  type="checkbox"
                  name="hobbies"
                  value="Reading"
                  className="mr-2"
                />
                Reading
              </label>
              <label className="flex items-center">
                <Field
                  type="checkbox"
                  name="hobbies"
                  value="Playing"
                  className="mr-2"
                />
                Playing
              </label>
              {errors.hobbies && touched.hobbies && (
                <div className="text-red-500 text-sm">{errors.hobbies}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default Signup;
