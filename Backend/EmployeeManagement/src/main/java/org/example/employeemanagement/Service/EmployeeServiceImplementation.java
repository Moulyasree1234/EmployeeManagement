package org.example.employeemanagement.Service;

import org.example.employeemanagement.Dto.EmployeeDto;
import org.example.employeemanagement.Entity.Employee;
import org.example.employeemanagement.Exception.ResourceNotFoundException;
import org.example.employeemanagement.Mapper.EmployeeMapper;
import org.example.employeemanagement.repository.Employeerepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public  class EmployeeServiceImplementation implements EmployeeService{

    private Employeerepository employeerepository;
    public EmployeeServiceImplementation(Employeerepository employeerepository) {
        this.employeerepository = employeerepository;
    }
  @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto)
  {
      Employee employee = EmployeeMapper.maptoEmployee(employeeDto);
      Employee savedEmployee=employeerepository.save(employee);

      return EmployeeMapper.mapToEmployeeDto(savedEmployee);
  }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee=employeerepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee is not exists with id:"+employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }
    @Override
    public List<EmployeeDto> getAllEmployees()
    {
        List<Employee> employees=employeerepository.findAll();
        return  employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());

    }

    @Override
    public EmployeeDto  updateEmployee(Long employeeId, EmployeeDto updatedemployee) {
        Employee employee=employeerepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee is not exists with id:"+employeeId));
        employee.setFirstname(updatedemployee.getFirstname());
        employee.setLastname(updatedemployee.getLastname());
        employee.setEmail(updatedemployee.getEmail());
        employeerepository.save(employee);
        return null;

    }
    public EmployeeDto deleteEmployee(Long employeeId){
        Employee employee=employeerepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee is not exists with id:"+employeeId));
        employeerepository.deleteById(employeeId);
        return null;
    }


}
