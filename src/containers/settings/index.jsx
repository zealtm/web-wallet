import React from "react";
import HomeSettings from "./homeSettings";
import Security from "./security/security";

class Configuration extends React.Component {
    render() {
        return (
            <div>
                <Security/>
            </div>
        );
    }
}

export default Configuration;