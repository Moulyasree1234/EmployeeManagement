package org.example.employeemanagement.Controller;

import org.example.employeemanagement.Dto.EmployeeDto;
import org.example.employeemanagement.Service.EmployeeService;
import org.example.employeemanagement.Service.EmployeeServiceImplementation;
import org.example.employeemanagement.repository.Employeerepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final Employeerepository employeerepository;

    public EmployeeController(EmployeeService employeeService, Employeerepository employeerepository) {
        this.employeeService = employeeService;
        this.employeerepository = employeerepository;
    }

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")  // ✅ Fixed Syntax
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeID) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeID);
        return ResponseEntity.ok(employeeDto);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees()
    {
        List<EmployeeDto> employees=employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id")  Long employeeID,@RequestBody EmployeeDto updatedEmployee)
    {
        EmployeeDto employeedto = employeeService.updateEmployee(employeeID,updatedEmployee);
        return ResponseEntity.ok(employeedto);
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<String> DeleteEmployee(@PathVariable("id") Long employeeId)
    {
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee details deleted Succesfully");
    }
}
