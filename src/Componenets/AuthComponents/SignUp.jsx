import React, { useState } from 'react'
import { Box, Grid, makeStyles, TextField, Typography, Button, Snackbar } from '@material-ui/core'
import { signUp } from '../../Api Calls/Api'
import MuiAlert from '@material-ui/lab/Alert';
import { withFormik } from "formik";
import * as Yup from 'yup';


const useStyle = makeStyles((theme) => (
    {
        mainHight: {
            minHeight: '30vh'
        },
        textinput: {
            marginBottom: '25px',
            minWidth: '300px'
        },
        btn: {

            display: 'flex',
            justifyContent: 'center'
        },
        atag: {
            color: theme.palette.text.primary,
            textDecoration: 'none'
        }
    }
))

function SignUpTemplate(props) {
    const { values,
        touched,
        errors,
        isValid,
        submitCount,
        handleChange,
        handleBlur,
        handleSubmit,
        setSubmitting,
        handleReset } = props;
    const classes = useStyle()
    const [open, setOpen] = React.useState(false);
    const [response, setresponse] = useState({
        status: "success",
        Text: ''
    })

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const submitForm = (e) => {
        e.preventDefault()
        handleSubmit()

        if (Object.keys(errors).length === 0) {
            signUp(values).then(res => {
                console.log(res);
                if (res.status === 201) {
                    setOpen(true)
                    setresponse({
                        status: "success",
                        Text: "Register Successfull please Login :)"
                    })

                }
                else {
                    setOpen(true)
                    setresponse({
                        status: "error",
                        Text: res.data
                    })
                }

                setSubmitting(false)
                handleReset()

            })
        }
    }

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center"
            style={{ minHeight: '60vh' }}
        >
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={response.status}>
                    {response.Text}
                </Alert>
            </Snackbar>
            <Grid container item xs={3} justify="center" >
                <Box p={3} display="flex" justifyContent="center" flexDirection="column">
                    <form noValidate >
                        <Typography align="center" variant="h6" >
                            Register
                    </Typography>
                        <TextField
                            className={classes.textinput}
                            label="First Name"
                            name="first_name"
                            variant="standard"
                            value={values.first_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.first_name ? errors.first_name : ""}
                            error={touched.first_name && Boolean(errors.first_name)}
                            autoFocus
                            required
                        />

                        <TextField
                            className={classes.textinput}
                            label="Last Name"
                            name="last_name"
                            variant="standard"
                            value={values.last_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.last_name ? errors.last_name : ""}
                            error={touched.last_name && Boolean(errors.last_name)}
                            required
                        />

                        <TextField
                            className={classes.textinput}
                            label="Username"
                            name="username"
                            variant="standard"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.username ? errors.username : ""}
                            error={touched.username && Boolean(errors.username)}
                            required
                        />

                        <TextField
                            className={classes.textinput}
                            label="Email"
                            variant="standard"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.email ? errors.email : ""}
                            error={touched.email && Boolean(errors.email)}
                            required

                        />

                        <TextField
                            className={classes.textinput}
                            label="Passsword"
                            variant="standard"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.password ? errors.password : ""}
                            error={touched.password && Boolean(errors.password)}
                            required
                        />



                        <div className={classes.btn}>
                            <Button variant="contained" type="submit" color="primary" onClick={submitForm} >
                                Register
                        </Button>
                        </div>

                    </form>
                </Box>

            </Grid>
        </Grid>


    )
}


const SignUp = withFormik({

    mapPropsToValues: ({
        first_name, last_name, username, password, email
    }) => {
        return {
            first_name: first_name || "",
            last_name: last_name || "",
            username: username || "",
            password: password || "",
            email: email || ""

        };
    },

    validationSchema: Yup.object().shape({

        first_name: Yup.string().required('required field'),
        last_name: Yup.string().required('required field'),
        password: Yup.string()
            .min(3, "Password must contain at least 8 characters")
            .required("Enter your password"),
        username: Yup.string().required('required field'),
        email: Yup.string().email('not valid').required('required ')


    }),

    handleSubmit: (values, { setSubmitting }) => {

    }
})(SignUpTemplate);


export default SignUp
