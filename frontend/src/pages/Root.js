import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={`/`}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to={`/subjects`}>Subjects</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}
