import { Outlet, Link } from "react-router-dom";

export default function Root() {
    const type = localStorage.getItem("type");

    return type === "user" ? (
        // user
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={`/dashboard`}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to={`/manage-order`}>Manage Order</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    ) : (
        // admin
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={`/dashboard`}>Dashboard</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}
