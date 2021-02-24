import React, { useContext } from 'react'
import { Box, Grid, makeStyles, Paper, TextField, Typography, Button } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { withFormik } from "formik";
import * as Yup from 'yup';
import {login} from '../../Api Calls/Api'
import { useStore } from '../../Context/store_context';


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
            textDecoration: 'none',

        },

    }
))

function SignInTemplate(props) {
   const { values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setSubmitting,
    handleReset } = props;


    
    const classes = useStyle()
    const {state ,methods} = useStore()
  const customhandleSubmit =()=>{
      handleSubmit()
        if(!errors.username && touched.username && !errors.password)
        {
            login(values).then(
        res => {
            if(res.status === 200)
            {
                methods.signIn(values.username)
                setSubmitting(false)
                handleReset()
                localStorage.setItem('access_token' , res.data.access)
                localStorage.setItem('user' , values.username)
            }
        }
    )
        }
  }
    return (
        state.user ? <Redirect to="/checkout"></Redirect> :
        <Grid container spacing={0} direction="column" alignItems="center" justify="center"
            style={{ minHeight: '60vh' }}
        >
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
                        <Button  variant="contained" color="primary" onClick={customhandleSubmit} disabled={isSubmitting} >
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
        .min(3, "Password must contain at least 8 characters")
        .required("Enter your password"),
    }),
  
    handleSubmit: (values,{ setSubmitting }) => {
        
      console.log(values);

    }
  })(SignInTemplate);



export default SignIn
