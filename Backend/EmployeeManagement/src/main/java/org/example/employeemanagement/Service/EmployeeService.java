package org.example.employeemanagement.Service;

import org.example.employeemanagement.Dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long employeeId,EmployeeDto updatedemployee);
    EmployeeDto deleteEmployee(Long employeeId);
}
