import "./styles.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiKenzieHub from "../../Services";
import { toast } from "react-hot-toast";
import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../Images/Logo.svg";

function Login({ authenticate, setAuthenticate }) {
    const history = useHistory();

    const formSchema = yup.object().shape({
        email: yup.string().required("Digite seu email"),
        password: yup.string().required("Digite sua senha"),
    });

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const goRegister = () => {
        history.push("/register");
    };

    const onSubmitFunction = async (dataForm) => {
        await ApiKenzieHub.post("/sessions/", dataForm)
            .then((res) => {
                localStorage.setItem("KenzieHub:Token", res.data.token);
                localStorage.setItem("User:id", res.data.user.id);
                setAuthenticate(true);
                toast.success("Login realizado com sucesso");
                reset();
            })
            .catch((error) => {
                toast.error("Ops! Algo deu errado");
            });
    };

    if (authenticate === true) {
        history.push("/home");
    }

    return (
        <div className="container_login">
            <div className="header_login">
                <img src={Logo} alt="Logo Nu Kenzie" />
            </div>

            <section className="section_form_login">
                <form className="form_login" onSubmit={handleSubmit(onSubmitFunction)}>
                    <p className="p_login">Login</p>

                    <div className="div_inputs">
                        <p className="p_title">E-mail</p>
                        <input
                            className="input_form"
                            error={errors.email?.message}
                            {...register("email")}
                            variant="outlined"
                        />
                        {errors.email && <p className="error_login">{errors.email.message}</p>}

                        <p className="p_title">Senha</p>
                        <input
                            className="input_form"
                            error={errors.password?.message}
                            type="password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="error_login">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        className="button_general_login"
                        id="button_login"
                        type="submit"
                        variant="contained"
                    >
                        Entrar
                    </button>

                    <p className="p_not_acount">Ainda não possui uma conta?</p>

                    <button
                        className="button_general_login"
                        id="button_register"
                        onClick={goRegister}
                    >
                        Cadastre-se
                    </button>
                </form>
            </section>
        </div>
    );
}

export default Login;
