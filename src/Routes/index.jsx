import { Switch, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import { useEffect, useState } from "react";

const Routes = () => {
    const [authenticate, setAuthenticate] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("KenzieHub:Token");
        if (token) {
            setAuthenticate(true);
        }
    }, [authenticate]);

    return (
        <>
            <Switch>
                <Route exact path={"/"}>
                    <Login authenticate={authenticate} setAuthenticate={setAuthenticate} />
                </Route>
                <Route exact path={"/Register"}>
                    <Register authenticate={authenticate} />
                </Route>
                <Route exact path={"/Home"}>
                    <Home authenticate={authenticate} setAuthenticate={setAuthenticate} />
                </Route>
            </Switch>
        </>
    );
};

export default Routes;
