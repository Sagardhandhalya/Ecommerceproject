import React, { useContext, useState } from 'react'
import { Box, Grid, makeStyles, Paper, TextField, Typography, Button, Snackbar } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { withFormik } from "formik";
import * as Yup from 'yup';
import { login } from '../../Api Calls/Api'
import { useStore } from '../../Context/store_context';
import MuiAlert from '@material-ui/lab/Alert';

const useStyle = makeStyles((theme) => (
    {
        mainHight: {
            height: '100vh'
        },
        textinput: {
            marginBottom: '25px',
            minWidth: '300px'
        },
        btn: {

            display: 'flex',
            justifyContent: 'center',
            marginBottom: '15px'
        },
        atag: {
            color: "#7089f5",

            textDecoration: 'none'

        },

    }
))

function SignInTemplate(props) {
    const { values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setSubmitting,
        handleReset } = props;
    const classes = useStyle()
    const { state, methods } = useStore()

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
    const customhandleSubmit = () => {

        if (Object.keys(errors).length === 0) {
            console.log('hi..');
            login(values).then(
                (res) => {

                    methods.signIn(values.username)
                    handleReset()
                    localStorage.setItem('access_token', res.data.access)
                    localStorage.setItem('user', values.username)

                }
            ).catch((res) => {

                setresponse({
                    status: 'error',
                    Text: "User name Or password Incorrect !!"
                })
                setOpen(true)

            })
        }
        handleSubmit()
    }
    return (
        state.user ? <Redirect to="/checkout"></Redirect> :
            <Grid container spacing={0} direction="column" alignItems="center" justify="center"
                style={{ minHeight: '60vh' }}
            >

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={response.status}>
                        {response.Text}
                    </Alert>
                </Snackbar>
                <Grid container item xs={3} justify="center" >

                    <Box p={5} boxShadow={3} display="flex" justifyContent="center" flexDirection="column">
                        <form >
                            <TextField xs={6}
                                required
                                className={classes.textinput}
                                label="User name"
                                name="username"
                                variant="standard"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.username ? errors.username : ""}
                                error={touched.username && Boolean(errors.username)}
                            />


                            <TextField xs={6}
                                required
                                className={classes.textinput}
                                label="Passsword"
                                name="password"
                                variant="standard"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.password ? errors.password : ""}
                                error={touched.password && Boolean(errors.password)}
                            />

                            <div className={classes.btn}>
                                <Button variant="contained" color="primary" onClick={customhandleSubmit} >
                                    Login
                        </Button>
                            </div>

                            <Typography align="center">
                                Do not have account ? <Link className={classes.atag} to="/signup">Create Account</Link>
                            </Typography>

                        </form>


                    </Box>

                </Grid>

            </Grid>
    )
}

const SignIn = withFormik({

    mapPropsToValues: ({
        username,
        password
    }) => {
        return {

            username: username || "",
            password: password || ""
        };
    },

    validationSchema: Yup.object().shape({

        username: Yup.string()
            .required("Email is required"),

        password: Yup.string()
            .min(8, "Password must contain at least 8 characters")
            .required("Enter your password"),
    }),

    handleSubmit: (values, { setSubmitting }) => {



    }
})(SignInTemplate);



export default SignIn
