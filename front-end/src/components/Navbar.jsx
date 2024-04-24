
const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#3B3B54"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/homepage">HATIO - ToDo List</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                   
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
