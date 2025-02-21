import { useEffect, useState } from "react";
import { CreateEmployee, getEmployee, updateEmployee } from "../Service/Employeeservice";
import { useNavigate, useParams } from "react-router-dom";

const AddEmployee = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const [errors, setError] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    const pageTitle = () => {
        return (
            <h2 className="text-center mb-4">{id ? "Update Employee" : "Add Employee"}</h2>
        );
    };

    const saveEmployee = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstname, lastname, email };
            console.log("Employee Data:", employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                CreateEmployee(employee)
                    .then((response) => {
                        console.log("Saved Employee:", response.data);
                        navigate('/employees');
                    })
                    .catch((error) => console.error("Error:", error));
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { firstname: '', lastname: '', email: '' };

        if (!firstname.trim()) {
            errorsCopy.firstname = "First Name is required";
            valid = false;
        }

        if (!lastname.trim()) {
            errorsCopy.lastname = "Last Name is required";
            valid = false;
        }

        if (!email.trim()) {
            errorsCopy.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errorsCopy.email = "Invalid email format";
            valid = false;
        }

        setError(errorsCopy);
        return valid;
    };

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstname);
                setLastName(response.data.lastname);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card p-4 shadow-lg" style={{ width: "450px" }}>
                {pageTitle()}
                <div className="card-body">
                    <form onSubmit={saveEmployee}>
                        <div className="form-group mb-3">
                            <label className="form-label">First Name:</label>
                            <input
                                type="text"
                                placeholder="Enter First Name"
                                name="firstname"
                                value={firstname}
                                className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Last Name:</label>
                            <input
                                type="text"
                                placeholder="Enter Last Name"
                                name="lastname"
                                value={lastname}
                                className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <button className="btn btn-success w-100 mt-3" type="submit">
                            {id ? "Update Employee" : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
