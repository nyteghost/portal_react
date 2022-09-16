const dbValue = localStorage.getItem("database");


export default function Alert() {
    return (
        <div>
            {dbValue === "Please Select Database" ? alert('Please Select a Database'): null }
        </div>
    );
}