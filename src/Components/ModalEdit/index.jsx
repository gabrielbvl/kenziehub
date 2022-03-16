import "./styles.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ApiKenzieHub from "../../Services";
import { toast } from "react-hot-toast";

function ModalEdit({ setModalEdit, technology, setRefresh, refresh }) {
    const token = localStorage.getItem("KenzieHub:Token");

    const formSchema = yup.object().shape({
        status: yup.string().required("Coloque seu nivel de tecnologia"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const onSubmit = (dataForm) => {
        console.log(dataForm);
        ApiKenzieHub.put(`/users/techs/${technology.id}`, dataForm, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            setRefresh(!refresh);
            setModalEdit(false);
            toast.success("Tecnologia atualiza");
        });
    };

    const removeTechnology = (id) => {
        ApiKenzieHub.delete(`/users/techs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            setRefresh(!refresh);
            setModalEdit(false);
            toast.error("Tecnologia Deletada");
        });
    };
    return (
        <section className="container_modal_edit">
            <div className="header_modal_edit">
                <h3>Tecnologias Detalhes</h3>
                <button className="close_modal_edit" onClick={() => setModalEdit(false)}>
                    X
                </button>
            </div>
            <div className="general_modal_edit">
                <form className="form_modal_edit" onSubmit={handleSubmit(onSubmit)}>
                    <p className="p_modal_edit">Nome do projeto</p>
                    <input
                        type={"text"}
                        error={errors.title?.message}
                        value={technology.title}
                        className="input_modal_edit"
                    />

                    <p className="p_modal_edit">Status</p>
                    <select {...register("status")} defaultValue={technology.status}>
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </select>
                    <div className="buttons_modal_edit">
                        <button className="edit_modal_edit" onClick={onSubmit}>
                            Salvar alterações
                        </button>
                        <button
                            className="delete_modal_edit"
                            onClick={() => removeTechnology(technology.id)}
                        >
                            Excluir
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ModalEdit;
