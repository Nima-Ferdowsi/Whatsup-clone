import React, { useEffect,useRef ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../Rx/action/user";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet';
import SignUpBtn from'../../utils/login/signup'
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { server } from "../../config/config.json";
import { isFormValid } from '../../utils/login/formvalid';

function LoginContainer(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const email = useSelector((state) => state.email);
  const pass = useSelector((state) => state.pass);



  const login = () => {
    if (!email || !pass) {
      toast.error("who are you ?! you have to fill the fields first  ");
    } else {
      setLoading(true);

      fetch(`${server}/login`, {
        method: "Post",
        body: JSON.stringify({ email, pass }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          setLoading(false);

          if (data.status === 200) {
            toast.success("Welcome");
            localStorage.setItem("user", JSON.stringify(data));
            props.history.replace("/");
          }
          if (data.status === 404) {
            toast.error("UserName or password are inccorect!");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("There is error from the server sorry!");
          setLoading(false);
        });
    }
  };


  useEffect(() => {
    dispatch(reset("first"));
    dispatch(reset("last"));
    dispatch(reset("pass"));
    dispatch(reset("email"));
  }, []);

  return (
    <div className="text-center mt-4">
      <Helmet>
        <title>{props.name}</title>
        <link rel="stylesheet" href="/css/Login.css" />
        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>
      </Helmet>
      <div className="form-signin">
        <img
          className="mb-2"
          src="/img/icon.png"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please {props.name}</h1>
        {props.children}
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        {
          props.name == "Login" ? (
            <button
              className="btn btn-lg btn-primary btn-block"
              disabled={!isFormValid([email, pass])}
              onClick={login}
            >
              {loading ? <div class="spinner"></div> : null}
              Sign in
            </button>
          ): (null)
        }

        {props.name == "Signup" ? (<SignUpBtn />) :( null)}

        <div>
     {/*      {
           props.name == "Signup" ? (
              <GoogleBtn
                firstRef={firstRef}
                lastRef={lastRef}
                emailRef={emailRef}
              />
            ) : (null)
          } */}

          <Link
            to={props.name == "Signup" ? ("/login") : ("/signup")}
            className="sign_login_link mt-3 text-danger"
          >
            I Have An Account?
          </Link>
        </div>
        <p className="mt-3 mb-3 text-muted">&copy; 2020-2025</p>
      </div>
    </div>
  );
}

export default withRouter(LoginContainer);
