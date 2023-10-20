import React, { useState } from 'react';
import { Button, Col, Form, Row, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator'

//Importando el servicio post 
import { PostLogin } from '../components/Nexos/Servicios/index';
import { useDispatch } from 'react-redux';
import { actionLogin } from '../redux/actions/authActions';

const SignIn = () => {
  const dispatch = useDispatch();
  const [err, setError] = useState("");
  //const [errorMessage, setErrorMessage] = useState('')
  const [errorEmailmessage, setErrorEmailMessage] = useState(" ")
  const [errorPassmessage, setErrorPassMessage] = useState(" ")
  const [check, setCheck] = useState(true)
  //const [message, setMessage] = useState('');

  const [data, setData] = useState({
    "email": "",
    "password": "",
    "source": "gestor"
  });
  // Expresion regular - valida que la contraseña cumpla con la documentacion (Un numero, una letra mayuscula y una minuscula, al menos 8 caracteres de longitud, )
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  function isValidEmail(email: any) {

    return /\S+@\S+\.\S+/.test(email);
  }

  const { email, password } = data;

  const changeHandler = (e: any) => {

    if (e.target.name === "email") {
      //si no es digitado el correo o esta vacio . saldra error si tambien se verifica que lo que se este verificando sea el campo correo o pass
      if (!isValidEmail(e.target.value) || e.target.value.lenght === 0) {
        validator.isEmail(e.target.value)
        setErrorEmailMessage("Correo Invalido o vacio")

      } else {
        setErrorEmailMessage("")
      }

      setData({ ...data, [e.target.name]: e.target.value })
      setError("");
    }

    if (e.target.name === 'password') {

      //Password solo numeros
      if (!passwordRegex.test(e.target.value) || e.target.value === "") {
        setErrorPassMessage("Password Debil o vacio")
      } else {
        setErrorPassMessage("")
      }

      setData({ ...data, [e.target.name]: e.target.value })
      setError("");

    }
    //Se evalua si el checkbox a sido clickeado y se actualiza el estado
    if (e.target.type === "checkbox") {
      setCheck(!e.target.checked)
    }
  }

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `${process.env.PUBLIC_URL}/inicio/`;
    navigate(path);
  }

  const Login = async (e: any) => {
    e.preventDefault()
    let Mapa = JSON.stringify(data)
    let datt = await PostLogin(Mapa)

    if (datt?.['success']) {
      dispatch(actionLogin(JSON.parse(datt.user)));
      routeChange()
    } else {
      let mensaje = (datt?.['success'] === false) ? datt?.['message'] : 'lo que sea'
      setError(mensaje)
    }
  }
  
  return (
    <React.Fragment>
      <div className="square-box"> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div>
      <div className="page bg-primary">
        <div className="page-single">
          <div className="container" style={{ marginTop: "89px" }} >
            <Row>
              <Col
                xl={5}
                lg={6}
                md={8}
                sm={8}
                xs={10}
                className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
              >
                <div className="card-sigin">
                  {/* <!-- Demo content--> */}
                  <div className="main-card-signin d-md-flex">
                    <div className="wd-100p">
                      <div className="text-center">
                        <Link to="#">
                          <img
                            src={require("../assets/img/brand/logo-nexos2.png")}
                            className="sign-favicon"
                            alt="logo"
                          />
                        </Link>
                      </div>
                      <div className="">
                        <div className="main-signup-header">
                          <div className='text-center'>
                            <h2>Nexos</h2>
                            <h6 className="font-weight-semibold mb-4 ">
                              Mensaje de bienvenida.
                            </h6>
                          </div>
                          <div className="panel panel-primary">
                            <div className=" tab-menu-heading mb-2 border-bottom-0">
                              <div className="tabs-menu1">
                                <div className='text-center text-primary'>
                                  {err && <Alert variant="danger">{err}</Alert>}
                                </div>
                                <Form >
                                  <Form.Group className="form-group">
                                    <Form.Label className=''>Email</Form.Label>{""}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="Enter your email"
                                      name="email"
                                      type='text'
                                      value={email}
                                      onChange={changeHandler}
                                      required
                                    />
                                    <span className="text-primary">{errorEmailmessage}</span>
                                  </Form.Group>

                                  <Form.Group className="form-group">
                                    <Form.Label>Password</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="Enter your password"
                                      name="password"
                                      type='password'
                                      value={password}
                                      onChange={changeHandler}
                                      autoComplete='current-password'
                                      required
                                    />
                                    <span className="text-primary">{errorPassmessage}</span>
                                  </Form.Group>
                                  <Button
                                    variant=""
                                    disabled={!validator.isEmail(email) || !passwordRegex.test(password) || check}
                                    type='submit'
                                    className="btn btn-primary btn-block"
                                    onClick={Login}
                                  >
                                    Sign In
                                  </Button>

                                  <div className="was-validated">
                                    <div className="form-check mb-3 mt-3">
                                      <input
                                        type="checkbox"
                                        name='terminos'
                                        className="form-check-input"
                                        id="validationFormCheck1"
                                        onChange={changeHandler}
                                        required
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="validationFormCheck1"
                                      >
                                        <div className="main-signin-footer">
                                          <p><a
                                            href='https://votacioneselectronicas.com.co/politica-de-privacidad/' target="_blank" rel="noreferrer">
                                            Terminos y condiciones</a></p>
                                        </div>
                                      </label>
                                      <div className="invalid-feedback">
                                        Aceptar los terminos y condiciones
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-4 d-flex text-center justify-content-center mb-2">
                                    <a className='btn btn-icon me-3'
                                      href='https://www.facebook.com/GRUPONEXOS/?locale=es_LA'
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <span className="btn-inner--icon">
                                        {" "}
                                        <i className="bx bxl-facebook tx-18 tx-prime"></i>{" "}
                                      </span>
                                    </a>
                                    <a
                                      href="https://twitter.com/nexosge?lang=es"
                                      target="_blank"
                                      rel="noreferrer"
                                      className="btn btn-icon me-3"

                                    >
                                      <span className="btn-inner--icon">
                                        {" "}
                                        <i className="bx bxl-twitter tx-18 tx-prime"></i>{" "}
                                      </span>
                                    </a>
                                    <a
                                      href="https://co.linkedin.com/in/grupo-empresarial-nexos"
                                      target="_blank"
                                      rel="noreferrer"
                                      className="btn btn-icon me-3"
                                    >
                                      <span className="btn-inner--icon">
                                        {" "}
                                        <i className="bx bxl-linkedin tx-18 tx-prime"></i>{" "}
                                      </span>
                                    </a>
                                    <a
                                      href="https://www.instagram.com/nexosge/?hl=es-la"
                                      target="_blank"
                                      rel="noreferrer"
                                      className="btn  btn-icon me-3"
                                      type="button"
                                    >
                                      <span className="btn-inner--icon">
                                        {" "}
                                        <i className="bx bxl-instagram tx-18 tx-prime"></i>{" "}
                                      </span>
                                    </a>
                                  </div>
                                  {/* <div className="main-signin-footer text-center mt-3">
                              <p><Link to="#" className="mb-3">Forgot password?</Link></p>
                               <p>Don't have an account ? <Link to={`${process.env.PUBLIC_URL}/authentication/signup`} className=""> Create an Account</Link></p>
                                </div> */}
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div >
      </div>
    </React.Fragment>
  );
}

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;
