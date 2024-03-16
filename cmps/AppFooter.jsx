const { Link } = ReactRouterDOM

export function AppFooter() {

    return <footer className="app-footer flex justify-center">
        <Link to="/">
            <h3 className="logo footer-logo flex wrap">AppSUS<i className="fa-solid fa-shield-dog"></i></h3>
            <p>Presented by
                <span>Yifaht Meir</span> & <span>Leanne Borowitz</span></p>
            <small className="footer-rights">@All Rights Reserved 2024 - AppSUS.com</small>
        </Link>

    </footer>
}