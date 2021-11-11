import { Link } from "wouter";

export const Cookies = () => {
    return (
        <div className="wrapper">

            <Link href="/">Go back</Link>
            <div className="cookies">
                <ul>
                    <h1>Cookies</h1>
                    <p>
                        This site uses cookies to ensure you get the best experience on our website.<br />
                        By using this site you agree to the use of cookies.
                    </p>
                    <p>
                        The following cookies are used:
                    </p>
                    <li>
                        <p>
                            <strong>CookieConsent</strong>
                        </p>
                        <p>
                            Used to identify if the user has accepted the use of cookies.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>__cfduid</strong>
                        </p>
                        <p>
                            Used to identify the user across sessions. (Google Analytics)
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>_ga</strong>
                        </p>
                        <p>
                            Used to track the usage of the website. (Google Analytics)
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>_gid</strong>
                        </p>
                        <p>
                            Used to track the usage of the website. (Google Analytics)
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>_gat</strong>
                        </p>
                        <p>
                            Used to track the usage of the website. (Google Analytics)
                        </p>
                    </li>
                </ul>
                <ul>
                    <h1>Sub processors</h1>
                    <li>
                        <p>
                            <strong>The Flag Game</strong>
                        </p>
                        <p>
                            Swe
                        </p>
                        <p>
                            Cookie consent
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Google, Inc</strong>
                        </p>
                        <p>
                            USA
                        </p>
                        <p>
                            Site analytics (web) and interactions
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
}