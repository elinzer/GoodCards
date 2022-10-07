import './Footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-container'>
                <span>
                    <div className="devTitle">Contact the Developer</div>
                    <div className="dev-links">
                        <a href="https://github.com/elinzer" target="_blank">
                            <i className="fab fa-github fa-2xl" />
                        </a>
                        <a href="https://www.linkedin.com/in/elinzer/" target="_blank">
                            <i className="fab fa-linkedin fa-2xl" />
                        </a>
                    </div>
                </span>
                <span>
          <div className="devTitle">GoodCards Github</div>
          <a href="https://github.com/elinzer/GoodCards" id="repo" target="_blank">
            <i className="fab fa-github fa-2xl" />
          </a>
        </span>
            </div>
        </div>
    )
}

export default Footer;
