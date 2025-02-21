package org.example.employeemanagement.repository;

import org.example.employeemanagement.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Employeerepository extends JpaRepository<Employee,Long> {

}
