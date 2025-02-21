import { useEffect, useState } from 'react';
import { ListEmployees, deleteEmployee } from '../Service/Employeeservice';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        ListEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
            });
    };

    const addEmployee = () => {
        navigate('/add-employee');
    };

    const updateEmployee = (id) => {
        navigate(`/edit-employee/${id}`);
    };

    const removeEmployee = (id) => {
        console.log(id);
        deleteEmployee(id)
            .then(() => {
                getAllEmployees();
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="container" style={{ minHeight: "80vh" }}>
            <h2 className="text-center mt-4 mb-4">Employee List</h2>

            {/* Centering the Add Employee Button */}
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
            </div>

            {/* Employee Table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstname}</td>
                                    <td>{employee.lastname}</td>
                                    <td>{employee.email}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{ marginLeft: '10px' }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">No employees found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
