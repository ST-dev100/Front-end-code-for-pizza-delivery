// services/api.js

const BASE_URL = "https://pizza-delivery-backend-red.vercel.app/"; // Replace with your base API URL
// const BASE_URL = "http://localhost:5000/"; // Replace with your base API URL

export const supersignUp = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}api/users/signup/super-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
  
      const result = await response.json();
      return result; // Return the result from the API
    } catch (error) {
      console.error("Error during signup:", error.message);
      throw error; // Rethrow the error to be handled by the calling function
    }
  };

export const signUp = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}api/users/signup/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const result = await response.json();
    return result; // Return the result from the API
  } catch (error) {
    console.error("Error during signup:", error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const login = async ({ email, password }) => {
    try {
      const response = await fetch(`${BASE_URL}api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      const result = await response.json();
      return result; // Return the result (e.g., token, user details)
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error; // Rethrow the error to be handled by the calling function
    }
  };

// Create Employee service
export const createEmployee = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create employee");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating employee:", error.message);
    throw error;
  }
};

// Get All Employees service
export const getAllEmployees = async () => {
  try {
    const response = await fetch(`${BASE_URL}api/employees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch employees");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    throw error;
  }
};

// Update Employee service
export const updateEmployee = async (id, data) => {
  try {
    const response = await fetch(`${BASE_URL}api/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", 

    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update employee");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating employee:", error.message);
    throw error;
  }
};

// Delete Employee service
export const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}api/employees/${id}`, {
      method: "DELETE",
      credentials: "include", 

    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete employee");
    }

    return true;
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    throw error;
  }
};
// Create Role service
export const createRole = async ({createdAt,...data}) => {
  console.log("data",data)
  try {
    const response = await fetch(`${BASE_URL}api/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Include cookies for authentication, if needed
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create role");
    }

    const result = await response.json();
    return result; // Return the created role data
  } catch (error) {
    console.error("Error creating role:", error.message);
    throw error;
  }
};

// Get All Roles service
export const getAllRoles = async () => {
  try {
    const response = await fetch(`${BASE_URL}api/roles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication, if needed
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch roles");
    }

    const result = await response.json();
    return result; // Return the list of roles
  } catch (error) {
    console.error("Error fetching roles:", error.message);
    throw error;
  }
};

// Get Role By UUID service
export const getRoleById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}api/roles/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication, if needed
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch role");
    }

    const result = await response.json();
    return result; // Return the role data
  } catch (error) {
    console.error("Error fetching role by ID:", error.message);
    throw error;
  }
};

// Update Role service
export const updateTheRole = async (id, data) => {
  try {
    const response = await fetch(`${BASE_URL}api/roles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Include cookies for authentication, if needed
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update role");
    }

    const result = await response.json();
    return result; // Return the updated role data
  } catch (error) {
    console.error("Error updating role:", error.message);
    throw error;
  }
};

// Delete Role service
export const deleteRole = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}api/roles/${id}`, {
      method: "DELETE",
      credentials: "include", // Include cookies for authentication, if needed
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete role");
    }

    return true; // Indicate successful deletion
  } catch (error) {
    console.error("Error deleting role:", error.message);
    throw error;
  }
};

// Update Role Active Status service
export const updateRoleActiveStatus = async (id, activeStatus) => {
  try {
    const response = await fetch(`${BASE_URL}api/roles/${id}/active`, {
      method: "PATCH", // Use PATCH since you're only updating the active status
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active: activeStatus.active }), // Send the active status
      credentials: "include", // Include cookies for authentication, if needed
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update role active status");
    }

    const result = await response.json();
    return result; // Return the updated role data
  } catch (error) {
    console.error("Error updating role active status:", error.message);
    throw error;
  }
};
// Create Pizza service
export const createPizza = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}api/pizzas/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Include credentials if needed
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create pizza");
    }

    const result = await response.json();
    return result; // Return the created pizza data
  } catch (error) {
    console.error("Error creating pizza:", error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

// Get All Pizzas service
export const getAllPizzas = async (searchParams = {}) => {
  try {
    // Construct the query string based on provided search parameters
    const queryString = new URLSearchParams(searchParams).toString();
    const url = `${BASE_URL}api/pizzas${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch pizzas");
    }

    const result = await response.json();
    return result; // Return the list of pizzas
  } catch (error) {
    console.error("Error fetching pizzas:", error.message);
    throw error;
  }
};


// Get Single Pizza service
export const getSinglePizza = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}api/pizzas/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials if needed
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch pizza");
    }

    const result = await response.json();
    return result; // Return the pizza data
  } catch (error) {
    console.error("Error fetching single pizza:", error.message);
    throw error;
  }
};
// Logout service
export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}api/users/logout`, {
      method: "POST", // Assuming POST for logout
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials if needed (e.g., for cookies or sessions)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log out");
    }

    return true; // Indicate successful logout
  } catch (error) {
    console.error("Error during logout:", error.message);
    throw error;
  }
};
export const createOrder = async (data) => {
  try {
      const response = await fetch(`${BASE_URL}api/orders`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include", 
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create order");
      }

      const result = await response.json();
      return result; // Return the created order data
  } catch (error) {
      console.error("Error creating order:", error.message);
      throw error;
  }
};

// Get All Orders service
export const getAllOrders = async () => {
  try {
      const response = await fetch(`${BASE_URL}api/orders`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          credentials: "include", 
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch orders");
      }

      const result = await response.json();
      return result; // Return the list of orders
  } catch (error) {
      console.error("Error fetching orders:", error.message);
      throw error;
  }
};

// Get Order By ID service
export const getOrderById = async (id) => {
  try {
      const response = await fetch(`${BASE_URL}api/orders/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          credentials: "include", 
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch order");
      }

      const result = await response.json();
      return result; // Return the order data
  } catch (error) {
      console.error("Error fetching order by ID:", error.message);
      throw error;
  }
};

// Update Order service
export const updateOrder = async (id, data) => {
  try {
      const response = await fetch(`${BASE_URL}api/orders/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include", 
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update order");
      }

      const result = await response.json();
      return result; // Return the updated order data
  } catch (error) {
      console.error("Error updating order:", error.message);
      throw error;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await fetch(`${BASE_URL}api/orders/order/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
      credentials: "include", // Include credentials if needed (for cookies or sessions)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update order status");
    }

    const result = await response.json();
    return result; // Return the updated order data
  } catch (error) {
    console.error("Error updating order status:", error.message);
    throw error;
  }
};

// Delete Order service
export const deleteOrder = async (id) => {
  try {
      const response = await fetch(`${BASE_URL}api/orders/${id}`, {
          method: "DELETE",
          credentials: "include", 
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete order");
      }

      return true; // Indicate successful deletion
  } catch (error) {
      console.error("Error deleting order:", error.message);
      throw error;
  }
};