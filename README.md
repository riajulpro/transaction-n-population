# API Endpoints

## Create Employee (POST Route)

- **Endpoint:** `/api/v1/employee/create`
- **Method:** POST
- **Payload:**
  ```json
  {
    "empId": "B2024dJ"
  }
  ```

## Delete Employee (DELETE Route)

- **Endpoint:** `/api/v1/employee/delete/:id`
- **Method:** DELETE

## Update Employee Data (PATCH Routes)

### Update Contact Information

- **Endpoint:** `/api/v1/contact/update/:empDocId`
- **Method:** PATCH
- **Payload:**
  ```json
  {
    "phone": "123-456-7890",
    "email": "example@domain.com"
  }
  ```

### Update Address Information

- **Endpoint:** `/api/v1/address/update/:empDocId`
- **Method:** PATCH
- **Payload:**
  ```json
  {
    "city": "Springfield",
    "area": "123 Main St",
    "state": "IL"
  }
  ```

### Update Personal Information

- **Endpoint:** `/api/v1/personal/update/:empDocId`
- **Method:** PATCH
- **Payload:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01"
  }
  ```
