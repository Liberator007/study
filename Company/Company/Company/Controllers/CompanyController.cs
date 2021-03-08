using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Models;

namespace Company.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {

        private readonly IConfiguration configuration;

        public CompanyController(IConfiguration config)
        {
            this.configuration = config;
        }

        // For Employee-------------------------------------------------------------------------------

        // Получение списка компаний
        [Route("getListCompany")]
        [HttpGet]
        public IEnumerable<Models.Company> GetListCompany()
        {
            string connectionString = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = new SqlCommand("SELECT * FROM company", connection);

            List<Models.Company> listCompany = new List<Models.Company>();
            

            SqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    Models.Company company = new Models.Company();
                    company.Id = (int)reader["id"];
                    company.Name = (string)reader["name"];
                    company.Size = (int)reader["size"];
                    company.FormIncorporation = (string)reader["form_incorporation"];
                    listCompany.Add(company);
                }
            }

            reader.Close();
            connection.Close();

            return listCompany;
        }

        // Добавление компании
        [Route("addCompany")]
        [HttpPost]
        public ActionResult<Models.Company> AddCompany([FromBody] Models.Company company)
        {
            if (ModelState.IsValid)
            {
                string connectionString = configuration.GetConnectionString("DefaultConnectionString");
                SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();
                string sqlExpression = "INSERT INTO company (name, size, form_incorporation) VALUES ('" + company.Name + "', " + company.Size + ", '" + company.FormIncorporation + "')";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
                connection.Close();

                return Ok();
            }
            return BadRequest();
        }

        // Редактиррование компании
        [Route("editCompany")]
        [HttpPut]
        public ActionResult<Models.Company> EditCompany([FromBody] Models.Company company)
        {
            if (ModelState.IsValid)
            {
                string connectionString = configuration.GetConnectionString("DefaultConnectionString");
                SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();
                string sqlExpression = "UPDATE company SET name='" + company.Name + "', size=" + company.Size + ", form_incorporation='" + company.FormIncorporation + "' WHERE id=" + company.Id;
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
                connection.Close();

                return Ok();
            }
            return BadRequest();
        }


        // Удаление компании
        [Route("deleteCompany")]
        [HttpDelete]
        public ActionResult<Models.Company> DeleteCompany([FromQuery] int id)
        {
            if (ModelState.IsValid)
            {
                string connectionString = configuration.GetConnectionString("DefaultConnectionString");
                SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();
                string sqlExpression = "DELETE FROM employee  WHERE company_id=" + id;
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
                sqlExpression = "DELETE FROM company  WHERE id=" + id;
                command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
                connection.Close();

                return Ok();
            }
            return BadRequest();
        }

        // For Employee-------------------------------------------------------------------------------
        // Получение списка работников
        [Route("getListEmployee")]
        [HttpGet]
        public IEnumerable<Employee> GetListEmployee()
        {
            string connectionString = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = new SqlCommand("SELECT * FROM employee", connection);

            List<Employee> listEmployee = new List<Employee>();

            SqlDataReader reader = command.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    Employee employee = new Employee();
                    employee.Id = (int)reader[0];
                    employee.Surname = (string)reader[1];
                    employee.Name = (string)reader[2];
                    employee.MiddleName = (string)reader[3];
                    employee.EmploymentDate = (string)reader[4];
                    employee.Position = (string)reader[5];
                    employee.CompanyId = (int)reader[6];
                    listEmployee.Add(employee);
                }
            }

            reader.Close();
            connection.Close();

            return listEmployee;
        }

        // Добавление работника
        [Route("addEmployee")]
        [HttpPost]
        public ActionResult<Employee> AddEmployee([FromBody] Employee employee)
        {
            if (ModelState.IsValid)
            {
                string connectionString = configuration.GetConnectionString("DefaultConnectionString");
                SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();

                string sqlExpression = "INSERT INTO employee (surname, name, middle_name, employment_date, position, company_id) VALUES " + 
                    "('" + employee.Surname + "', '" + employee.Name + "', '" + employee.MiddleName + "', '" + employee.EmploymentDate.ToString() + "', '" + employee.Position + "', " + employee.CompanyId + ")";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
                connection.Close();

                return Ok();
            }
            return BadRequest();
        }

        // Редактиррование работника
        [Route("editEmployee")]
        [HttpPut]
        public ActionResult<Employee> EditEmployee([FromBody] Employee employee)
        {
            if (ModelState.IsValid)
            {
                string connectionString = configuration.GetConnectionString("DefaultConnectionString");
                SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();
                string sqlExpression = "UPDATE employee SET surname='" + employee.Surname + "', name='" + employee.Name + "', middle_name='" + employee.MiddleName +
                    "', employment_date='" + employee.EmploymentDate + "', position='" + employee.Position + "', company_id=" + employee.CompanyId + " WHERE id=" + employee.Id;
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
                connection.Close();

                return Ok();
            }
            return BadRequest();
        }


        // Удаление работника
        [Route("deleteEmployee")]
        [HttpDelete]
        public ActionResult<Employee> DeleteEmployee([FromQuery] int id)
        {
            if (ModelState.IsValid)
            {
                string connectionString = configuration.GetConnectionString("DefaultConnectionString");
                SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();
                string sqlExpression = "DELETE FROM employee  WHERE id=" + id;
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
                connection.Close();

                return Ok();
            }
            return BadRequest();
        }
    }
}
