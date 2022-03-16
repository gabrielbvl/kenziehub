import "./styles.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiKenzieHub from "../../Services";
import { toast } from "react-hot-toast";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../Images/Logo.svg";

function Register() {
    const history = useHistory();
    const [select, setSelect] = useState("");

    const formSchema = yup.object().shape({
        name: yup.string().required("Digite seu nome"),
        email: yup.string().required("Digite seu email"),
        bio: yup.string().required("Nos conte algo sobre você"),
        contact: yup.string().required("Nos dê uma forma de contato"),
        password: yup
            .string()
            .required("Digite sua senha")
            .min(6, "Sua senha deve ter no minimo 6 caracteres"),
        passwordConfirmed: yup
            .string()
            .oneOf([yup.ref("password")], "Senhas diferentes")
            .required("Confirme sua senha"),
        course_module: yup.string().required("Selecione seu módulo"),
    });

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const goBack = () => {
        history.push("/");
    };

    const onSubmitFunction = async (dataForm) => {
        delete dataForm.passwordConfirmed;
        console.log(dataForm);
        await ApiKenzieHub.post("/users", dataForm)
            .then((res) => {
                toast.success("Conta criada com sucesso");
                reset();
                history.push("/");
            })
            .catch((error) => {
                toast.error("Ops! E-mail já cadastrado");
            });
    };

    return (
        <div className="container_register">
            <div className="header_register">
                <img src={Logo} alt="Logo Nu Kenzie" />

                <button className="button_back" onClick={goBack}>
                    Voltar
                </button>
            </div>

            <section className="section_form_register">
                <p className="p_register">Crie sua conta</p>
                <p className="p_register_sub">Rápido e grátis, vamos nessa</p>

                <form className="form_register" onSubmit={handleSubmit(onSubmitFunction)}>
                    <div className="div_inputs_register">
                        <p className="p_title_register">Nome</p>
                        <input
                            placeholder="Digite aqui seu nome"
                            className="input_form_register"
                            error={errors.name?.message}
                            {...register("name")}
                        />
                        {errors.name && <p className="error_register">{errors.name.message}</p>}

                        <p className="p_title_register">E-mail</p>
                        <input
                            placeholder="Digite aqui seu e-mail"
                            className="input_form_register"
                            error={errors.email?.message}
                            {...register("email")}
                        />
                        {errors.email && <p className="error_register">{errors.email.message}</p>}

                        <p className="p_title_register">Biografia</p>
                        <input
                            placeholder="Conte um pouco sobre você"
                            className="input_form_register"
                            error={errors.bio?.message}
                            {...register("bio")}
                        />
                        {errors.bio && <p className="error_register">{errors.bio.message}</p>}

                        <p className="p_title_register">Contato</p>
                        <input
                            placeholder="Contato"
                            className="input_form_register"
                            error={errors.contact?.message}
                            {...register("contact")}
                        />
                        {errors.contact && (
                            <p className="error_register">{errors.contact.message}</p>
                        )}

                        <p className="p_title_register">Senha</p>
                        <input
                            placeholder="Digite sua senha"
                            className="input_form_register"
                            error={errors.password?.message}
                            type="password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="error_register">{errors.password.message}</p>
                        )}

                        <p className="p_title_register">Confirmar Senha</p>
                        <input
                            placeholder="Confirme sua senha"
                            className="input_form_register"
                            error={errors.passwordConfirmed?.message}
                            type="password"
                            {...register("passwordConfirmed")}
                        />
                        {errors.passwordConfirmed && (
                            <p className="error_register">{errors.passwordConfirmed.message}</p>
                        )}

                        <p className="p_title_register">Selecionar Módulo</p>
                        <select
                            className="Select"
                            defaultValue={select}
                            onChange={(e) => setSelect(e.target.value)}
                            {...register("course_module")}
                        >
                            <option value="Primeiro Módulo (Introdução ao FrontEnd)" selected>
                                Primeiro Módulo
                            </option>
                            <option value="Segundo Módulo (FrontEnd Avançado)">
                                Segundo Módulo
                            </option>
                            <option value="Terceiro Módulo (Introdução ao BackEnd)" selected>
                                Terceiro Módulo
                            </option>
                            <option value="Quarto Módulo (BackEnd Avançado)">Quarto Módulo</option>
                        </select>
                    </div>

                    <button className="button_register">Cadastrar</button>
                </form>
            </section>
        </div>
    );
}

export default Register;
