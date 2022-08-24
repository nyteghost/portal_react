import "../styles/new.css";
import { protectedResources } from "./auth/authConfig";

export const ProfileData = (props) => {
    const tableRows = Object.entries(props.graphData).map((entry, index) => {
        return (<tr key={index}>
            <td><b>{entry[0]}: </b></td>
            <td>{entry[1]}</td>
        </tr>)
    });

    return (
        <>
        <div className="data-area-div">
            <p>Calling <strong>Microsoft Graph API</strong>...</p>
            <ul>
                <li><strong>resource:</strong> <mark>User</mark> object</li>
                <li><strong>endpoint:</strong> <mark>https://graph.microsoft.com/v1.0/me</mark></li>
                <li><strong>scope:</strong> <mark>user.read</mark></li>
            </ul>
            <p>Contents of the <strong>response</strong> is below:</p>
        </div>
        <div className="data-area-div">
            <table>
                <thead>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
        </>
    );
}

export const HelloData = (props) => {
    const tableRows = Object.entries(props.helloData).map((entry, index) => {
        return (<tr key={index}>
            <td><b>{entry[0]}: </b></td>
            <td>{entry[1]}</td>
        </tr>)
    });

    return (
        <>
        <div className="data-area-div">
            <p>Calling <strong>custom protected web API</strong>...</p>
            <ul>
                <li><strong>endpoint:</strong> <mark>{protectedResources.apiHello.endpoint}</mark></li>
                <li><strong>scope:</strong> <mark>{protectedResources.apiHello.scopes[0]}</mark></li>
            </ul>
            <p>Contents of the <strong>response</strong> is below:</p>
        </div>
        <div className="data-area-div">
            <table>
                <thead>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
        </>
    );
}

// export const AssetLocationData = (props) => {
//     const tableRows = Object.entries(props.assetData).map(([entry, index]) => {

//         console.log(index[0])
//         return (
//             <tr key={index[0]}>
//             <td><b>{entry[0]}: </b></td>
//             <td>{entry[1]}</td>
//             </tr>
//         )
//     });

//     return (
//         <>
//         <div className="data-area-div">
//             <p>Calling <strong>custom protected web API</strong>...</p>
//             <ul>
//                 <li><strong>endpoint:</strong> <mark>{protectedResources.apiHello.endpoint}</mark></li>
//                 <li><strong>scope:</strong> <mark>{protectedResources.apiHello.scopes[0]}</mark></li>
//             </ul>
//             <p>Contents of the <strong>response</strong> is below:</p>
//         </div>
//         <div className="data-area-div">
//             <table>
//                 <thead>
//                 </thead>
//                 <tbody>
//                     {tableRows}
//                 </tbody>
//             </table>
//         </div>
//         </>
//     );
// }

export const AssetLocationData = (props) => {
    const results = [];     
   
    return (
        <div>
            {props.assetData.data.map((entry, index) => {
            return (
                <div key={index}>
                <h2>name: {entry.assetid}</h2>
                <h2>country: {entry.serialnumber}</h2>
    
                <hr />
                </div>
            );
            })}
            {results}
        </div>
        );
}