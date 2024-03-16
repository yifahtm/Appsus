
const { Link, Outlet } = ReactRouterDOM

export function About() {
    return (
        <section>
            <h1>About Us</h1>
            <nav>
                <Link to="/about/team">Team</Link> |
                <Link to="/about/vision"> Vision</Link>
            </nav>
            <Outlet />
        </section>
    )


}
