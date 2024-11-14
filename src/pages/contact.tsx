import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Button,
  CircularProgress,
  Grid,
  SelectProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { contact } from "assets/business";
import CommonBanner from "components/CommonBanner";
import { Field, Form, Formik } from "formik";
import useAuthFetch from "hooks/useAuthFetch";
import { PublicLayout } from "layouts";
import { MainContactSchema } from "schemas";
import Swal from "sweetalert2";
import * as Yup from "yup";

const Contact = () => {
  const initialValues = MainContactSchema().reduce(
    (
      accumulator: { [x: string]: any },
      currentValue: { name: string | number; initialValue: any }
    ) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );
  // console.log({ initialValues })

  const validationSchema = MainContactSchema().reduce(
    (
      accumulator: { [x: string]: any },
      currentValue: { name: string | number; validationSchema: any }
    ) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );

  const { isLoading, mutate } = useAuthFetch();
  const handleSubmit = async (
    values: any,
    props: { resetForm: () => void }
  ) => {
    console.log({ values });
    const resData = await mutate({
      path: "support-form",
      method: "POST",
      body: JSON.stringify({
        name: values?.name,
        email: values?.email,
        phoneNumber: values?.phone,
        subject: values?.subject,
        message: values?.message,
      }),
    });
    if (resData.error) {
      return Swal.fire({
        title: "Oops!",
        text: resData?.error,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    Swal.fire({
      title: "Success",
      text: "Your message has been sent successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
    props.resetForm();
  };
  return (
    <PublicLayout title="Contact Us | Prizen">
      <CommonBanner title="Contact Us" />
      <section className="bg-gray-100">
        <article className="main-container flex flex-col items-center py-16">
          <h1 className="text-center text-2xl font-semibold tracking-wide md:text-4xl">
            Reach <span className="text-theme">Us</span>
          </h1>
          <div className="flex justify-center">
            <div className="my-4 w-20 border-b-2 border-theme"></div>
          </div>
          <p className="w-3/4 text-center font-light tracking-wide">
            If you have any queries regarding your shopping experience, payment
            issues, product then you can directly reach us by just filling up
            the below details. Our customer care executive will reach you as
            soon as possible.
          </p>
          <section className="mt-16 flex w-full flex-col gap-16 rounded-2xl bg-white p-6 md:w-[90%] md:flex-row md:justify-between lg:w-3/4">
            <div className="w-full">
              <h1 className="text-3xl font-semibold tracking-wide text-theme">
                Get In Touch
              </h1>
              <p className="py-4 text-sm tracking-wider text-gray-500">
                We are here for you! How can we help?
              </p>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <Form className="!flex !flex-col !items-center !gap-4">
                    <Grid container justifyContent="center" spacing={1}>
                      {MainContactSchema().map((curElm: any) => (
                        <Field name={curElm.name} key={curElm.key}>
                          {(props: {
                            meta: { touched: any; error: any };
                            field: JSX.IntrinsicAttributes &
                              TextFieldProps &
                              SelectProps;
                          }) => (
                            <Grid item xs={12} sm={12} md={12} lg={curElm.lg}>
                              <h1 className="mb-3 tracking-wide">
                                {curElm.label}
                              </h1>
                              <TextField
                                required={curElm?.required}
                                type={curElm.type}
                                fullWidth
                                placeholder={curElm.placeholder}
                                multiline={curElm?.multiline}
                                rows={curElm?.multiline ? 4 : 1}
                                //   InputProps={{
                                //     classes: {
                                //       root: ' ',
                                //       notchedOutline: 'sorting-select-outline',
                                //     },
                                //   }}
                                inputProps={
                                  curElm.isPhone === true
                                    ? { maxLength: 10 }
                                    : {}
                                }
                                error={Boolean(
                                  props.meta.touched && props.meta.error
                                )}
                                helperText={
                                  props.meta.touched && props.meta.error
                                }
                                {...props.field}
                              />
                            </Grid>
                          )}
                        </Field>
                      ))}
                    </Grid>

                    <Button
                      size="large"
                      variant="contained"
                      className="w-full bg-theme !tracking-wider text-white"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress size={16} />
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="relative w-full">
              <div className="flex w-full justify-center">
                <img src={contact.src} alt="gif" className="mb-8 w-4/5" />
              </div>
              <div className="flex gap-4 text-sm tracking-wide text-gray-500">
                <span className="flex h-8 min-w-[2rem] items-center justify-center overflow-hidden rounded-full border border-theme">
                  <LocationOnIcon className="!text-base text-theme" />
                </span>
                <p>Dashwantpur,Kashimabad,Ghazipur, Uttar Pradesh, 233230</p>
              </div>
              <div className="my-4 flex gap-4 text-sm tracking-wide text-gray-500">
                <span className="flex h-8 min-w-[2rem] items-center justify-center overflow-hidden rounded-full border border-theme">
                  <EmailIcon className="!text-base text-theme" />
                </span>
                <p>prizenbusiness@gmail.com</p>
              </div>
              <div className="flex gap-4 text-sm tracking-wide text-gray-500">
                <span className="flex h-8 min-w-[2rem] items-center justify-center overflow-hidden rounded-full border border-theme">
                  <CallIcon className="!text-base text-theme" />
                </span>
                <p>+91-9373054469 </p>
              </div>

              <div className="absolute bottom-0 -right-20 hidden flex-col gap-3 rounded-br-2xl bg-theme p-4 text-white md:flex">
                <a
                  href="https://www.facebook.com/people/Prizen-Brand/pfbid0nHPPMgUqRBqQju8YMHNDtsvt1FvyviSjcbh5zE2RGFaMgpmXLvQ78cY9EGMqf787l/?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FacebookIcon className="cursor-pointer" />
                </a>
                <a
                  href="https://www.instagram.com/prizenbusiness/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <InstagramIcon className="cursor-pointer" />
                </a>
                <a
                  href="https://twitter.com/PrizenBusiness"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <TwitterIcon className="cursor-pointer" />
                </a>
              </div>
              <div className="mt-4 flex gap-2 md:hidden">
                <a
                  href="https://www.facebook.com/people/Prizen-Brand/pfbid0nHPPMgUqRBqQju8YMHNDtsvt1FvyviSjcbh5zE2RGFaMgpmXLvQ78cY9EGMqf787l/?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FacebookIcon className="cursor-pointer text-facebook" />
                </a>

                <a
                  href="https://www.instagram.com/prizenbusiness/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <InstagramIcon className="cursor-pointer text-instagram" />
                </a>
                <a
                  href="https://twitter.com/PrizenBusiness"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <TwitterIcon className="cursor-pointer text-twitter" />
                </a>
              </div>
            </div>
          </section>
        </article>
      </section>
    </PublicLayout>
  );
};

export default Contact;
