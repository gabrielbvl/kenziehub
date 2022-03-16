import "./styles.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiKenzieHub from "../../Services";
import { toast } from "react-hot-toast";
import React from "react";

function ModalAdd({ setModalAdd, setRefresh, refresh }) {
    const token = localStorage.getItem("KenzieHub:Token");
    const schema = yup.object().shape({
        title: yup.string().required("Campo Obrigatório"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (dataForm) => {
        if (dataForm === "") {
            return toast.error("Preencha todos os campos");
        }

        ApiKenzieHub.post(
            "/users/techs",
            { title: dataForm.title, status: dataForm.status },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((res) => {
                setRefresh(!refresh);
                setModalAdd(false);
                toast.success("Nova tecnologia adicionada");
            })
            .catch((error) => toast.error("Ops algo deu errado"));
    };
    return (
        <section className="container_modal_add">
            <div className="header_modal_add">
                <h3>Cadastrar Tecnologias</h3>
                <button className="close_modal_add" onClick={() => setModalAdd(false)}>
                    X
                </button>
            </div>
            <div className="general_modal_add">
                <form className="form_modal_add" onSubmit={handleSubmit(onSubmit)}>
                    <p className="p_modal_add">Nome</p>
                    <input
                        className="input_modal_add"
                        error={errors.title?.message}
                        {...register("title")}
                    />
                    {errors.title && <p className="error">{errors.title.message}</p>}

                    <p className="p_modal_add">Selecionar status</p>
                    <select {...register("status")}>
                        <option value="Iniciante" selected>
                            Iniciante
                        </option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado" selected>
                            Avançado
                        </option>
                    </select>
                    <button className="add_modal_add"> Cadastrar Tecnologia </button>
                </form>
            </div>
        </section>
    );
}

export default ModalAdd;
