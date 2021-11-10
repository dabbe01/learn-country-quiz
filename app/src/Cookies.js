import { Link } from "wouter";

export const Cookies = () => {
    return (
        <div className="cookies">
            <Link href="/">Go back</Link>
            <h1>Cookies</h1>
            <p>
                This site uses cookies to ensure you get the best experience on our website.
                By using this site you agree to the use of cookies.
            </p>
            <p>
                The following cookies are used:
            </p>
            <ul>
                <li>
                    <p>
                        <strong>__cfduid</strong>
                    </p>
                    <p>
                        Used to identify the user across sessions.
                    </p>
                </li>
                <li>
                    <p>
                        <strong>_ga</strong>
                    </p>
                    <p>
                        Used to track the usage of the website.
                    </p>
                </li>
                <li>
                    <p>
                        <strong>_gid</strong>
                    </p>
                    <p>
                        Used to track the usage of the website.
                    </p>
                </li>
                <li>
                    <p>
                        <strong>_gat</strong>
                    </p>
                    <p>
                        Used to track the usage of the website.
                    </p>
                </li>
            </ul>
        </div>
    );
}