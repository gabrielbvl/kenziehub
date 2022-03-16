import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ModalAdd from "../../Components/ModalAdd";
import ModalEdit from "../../Components/ModalEdit";
import ApiKenzieHub from "../../Services";
import { toast } from "react-hot-toast";
import Logo from "../../Images/Logo.svg";
import "./styles.css";

function Home({ authenticate, setAuthenticate }) {
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [technology, setTechnology] = useState([]);
    const [techs, setTechs] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [infoUser, setInfoUser] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("User:id");
        ApiKenzieHub.get(`/users/${userId}`).then((res) => {
            setTechnology(res.data.techs);
            setInfoUser(res.data);
        });
    }, [refresh]);

    const exit = () => {
        setAuthenticate(false);
        localStorage.clear();
        toast.error("Usuário deslogado");
    };

    const openModalAdd = () => {
        setModalAdd(true);
    };

    const openModalEdit = (id) => {
        setTechs(technology.find((item) => item.id === id));
        setModalEdit(true);
        setRefresh(!refresh);
    };

    if (!authenticate) {
        return <Redirect to="/" />;
    }

    return (
        <section className="container_home">
            <div className="header_home">
                <img src={Logo} alt="Logo Nu Kenzie" />
                <button onClick={exit}>Sair</button>
            </div>

            <div className="separation"></div>

            <div className="user_infos">
                <h1>Olá, {infoUser.name}</h1>
                <h3>{infoUser.course_module}</h3>
            </div>

            <div className="separation"></div>
            <div className="title_techs">
                <p>Tecnologias</p>
                <button className="button_add_tech" onClick={openModalAdd}>
                    +
                </button>
            </div>
            <div className="container_list_techs">
                {technology.map((item) => (
                    <div className="list_techs" onClick={() => openModalEdit(item.id)}>
                        <span className="title_tech">{item.title}</span>
                        <span className="title_status">{item.status}</span>
                    </div>
                ))}
            </div>

            {!modalAdd ? (
                <></>
            ) : (
                <ModalAdd setModalAdd={setModalAdd} refresh={refresh} setRefresh={setRefresh} />
            )}
            {!modalEdit ? (
                <></>
            ) : (
                <ModalEdit
                    setModalEdit={setModalEdit}
                    technology={techs}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
        </section>
    );
}

export default Home;
