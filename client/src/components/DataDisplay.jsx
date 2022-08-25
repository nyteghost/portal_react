import "../styles/new.css";
import { protectedResources } from "./auth/authConfig";
import Table from "./tables/Table"


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



// export const AssetLocationData = (props) => {
//     console.log(props)
//     console.log(props.assetData)
//     console.log(props.assetData.data)
//     console.log(props.assetData.data[0])
//     const results = [];     
   
//     return (
//         <div>
//             {props.assetData.data.map((entry, index) => {
//             return (
//                 <div key={index}>
//                 <h2>Asset ID: {entry.assetid}</h2>
//                 <h2>Serial Number: {entry.serialnumber}</h2>
//                 <hr />
//                 </div>
//             );
//             })}
//             {results}
//         </div>
//         );
// }
// export const AssetLocationData = (props) => {
//     console.log(props)
//     console.log(props.assetData)
//     console.log(props.assetData.data)
//     console.log(props.assetData.data[0])
//     const results = [];     
   
//     return (
//         <div className="App">
//       <h1>Employee Table</h1>
//       <table>
//         <thead>
//         <tr>
//           <th>Name</th>
//           <th>Age</th>
//           <th>Gender</th>
//           <th>Designation</th>
//         </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Robert</td>
//             <td>23</td>
//             <td>Male</td>
//             <td>Full Stack(React + Java) Developer</td>
//           </tr>
//           <tr>
//             <td>Michal</td>
//             <td>24</td>
//             <td>Male</td>
//             <td>Full Stack Engineer</td>
//           </tr>
//           <tr>
//             <td>Morgan</td>
//             <td>24</td>
//             <td>Female</td>
//             <td>React Developer</td>
//           </tr>
//           <tr>
//             <td>Tom</td>
//             <td>26</td>
//             <td>Male</td>
//             <td>Front End Developer</td>
//           </tr>
//           <tr>
//             <td>Steve</td>
//             <td>27</td>
//             <td>Female</td>
//             <td>UI/UX Designer</td>
//           </tr>
//           </tbody>
//       </table>
//     </div>
//   );
// }

export const AssetLocationData = (props) => {
    // let y = JSON.stringify(props.assetData)
    // console.log(typeof(y))
    // console.log(y)
    let data = Array.from(props.assetData.data);
    console.log(data)
    DynamicTable(data)
}

function DynamicTable(TableData){
    // get table column
     const column = Object.keys(TableData[0]);
     // get table heading data
     const ThData =()=>{
        
         return column.map((data)=>{
             return <th key={data}>{data}</th>
         })
     }
    // get table row data
    const tdData =() =>{
       
         return TableData.map((data)=>{
           return(
               <tr>
                    {
                       column.map((v)=>{
                           return <td>{data[v]}</td>
                       })
                    }
               </tr>
           )
         })
    }
      return (
          <table className="table">
            <thead>
             <tr>{ThData()}</tr>
            </thead>
            <tbody>
            {tdData()}
            </tbody>
           </table>
      )
    }