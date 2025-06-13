import React, { useEffect, useState } from "react";
import "./App.css"; 
const ITEMS_PER_PAGE = 10;

function App() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("failed to fetch data");
      });
  }, []);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedEmployees = employees.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
  <div className="container">
    <h1>Employee Data Table</h1>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {paginatedEmployees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.role}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="pagination">
      <button onClick={goToPreviousPage} disabled={page === 1}>
        Previous
      </button>
      <button className="active">{page}</button>
      <button onClick={goToNextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  </div>
);
}

export default App;
