import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getToken, clearToken } from "./auth";

// Point to our API server on port 3050
// const API_BASE_URL = "http://localhost:3050";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "";

class ApiService {
  private client: AxiosInstance;

  constructor() {
    console.log(`DEBUG: ApiService constructor - API_BASE_URL: ${API_BASE_URL}`);
    this.client = axios.create({
      baseURL: "/", // Set baseURL to a relative path for Vite proxy to work
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false, // Ensure cookies are sent with requests
    });

    // Add request interceptor to include auth token
    this.client.interceptors.request.use(
      (config: any) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log(
            "Adding auth token to request:",
            token.substring(0, 10) + "..."
          );
        } else {
          console.warn("No auth token found for request to:", config.url);
        }
        return config;
      },
      (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle 401 errors
    this.client.interceptors.response.use(
      (response) => {
        console.log("API Response:", response.config.url, response.status);
        return response;
      },
      (error) => {
        console.error("API Error:", {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
        });

        if (error.response?.status === 401) {
          console.warn("Authentication required, redirecting to login");
          // Clear token and redirect to login on 401
          clearToken();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.client.post("/auth/login", { email, password });
    return response.data;
  }

  async register(userData: { email: string; password: string; role: string }) {
    const response = await this.client.post("/auth/register", userData);
    return response.data;
  }

  async getCurrentUser() {
    const response = await this.client.get("/auth/me");
    return response.data;
  }

  // Users endpoints
  async getUsers() {
    const response = await this.client.get("/api/users");
    return response.data.users;
  }

  async getUserById(id: string) {
    const response = await this.client.get(`/api/users/${id}`);
    return response.data;
  }

  async createUser(userData: any) {
    const response = await this.client.post("/api/users", userData);
    return response.data;
  }

  async updateUser(id: string, userData: any) {
    return this.updateRecord("users", id, userData);
  }

  // Expenses endpoints
  async getExpenses() {
    const response = await this.client.get("/api/expenses");
    return response.data.expenses;
  }

  async createExpense(expenseData: any) {
    const response = await this.client.post("/api/expenses", expenseData);
    return response.data;
  }

  async updateExpense(id: string, expenseData: any) {
    const response = await this.client.put(`/api/expenses/${id}`, expenseData);
    return response.data;
  }

  // Vendors endpoints
  async getVendors() {
    const response = await this.client.get("/api/vendors");
    return response.data.profiles;
  }

  async createVendor(vendorData: any) {
    const response = await this.client.post("/api/vendors", vendorData);
    return response.data;
  }

  // Blockchain endpoints
  async getBlockchainInfo() {
    const response = await this.client.get("/api/blockchain/info");
    return response.data;
  }

  // File upload
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await this.client.post("/api/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  // File endpoints
  async getFiles() {
    const response = await this.client.get("/api/files");
    return response.data.files;
  }

  async getFilesByBucket(bucketName: string) {
    const response = await this.client.get(`/api/files?bucket=${bucketName}`);
    return response.data.files;
  }

  async getBuckets() {
    const response = await this.client.get("/api/files/buckets");
    return response.data.buckets;
  }

  async deleteFile(id: string) {
    const response = await this.client.delete(`/api/files/${id}`);
    return response.data;
  }

  // DB inspection endpoints
  async getTables() {
    const response = await this.client.get("/api/db/tables");
    return response.data.tables;
  }

  async getTableData(tableName: string) {
    const response = await this.client.get(`/api/db/${tableName}`);
    return response.data.data;
  }

  async getTableSchema(tableName: string) {
    const response = await this.client.get(`/api/db/${tableName}/schema`);
    return response.data.schema;
  }

  async getDatabaseRelationships() {
    const response = await this.client.get("/api/db/relationships");
    return response.data.relationships;
  }

  // Generic CRUD operations
  async createRecord(table: string, data: any) {
    const response = await this.client.post(`/api/${table}`, data);
    return response.data;
  }

  async updateRecord(table: string, id: string, data: any) {
    const response = await this.client.put(`${API_BASE_URL}/api/${table}/${id}`, data);
    return response.data;
  }

  async deleteRecord(table: string, id: string) {
    const response = await this.client.delete(`/api/${table}/${id}`);
    return response.data;
  }

  async createFiles(fileData: any) {
    const response = await this.client.post("/api/files/upload", fileData);
    return response.data;
  }

  async deleteBucket(bucketName: string) {
    const response = await this.client.delete(
      `/api/files/bucket/${bucketName}`
    );
    return response.data;
  }

  async uploadFileToBucket(file: File, bucketName: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucketName);

    const response = await this.client.post("/api/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async createBucket(bucketName: string) {
    const response = await this.client.post("/api/files/bucket", {
      bucketName,
    });
    return response.data;
  }

  // New Dashboard APIs
  async getUserDashboardSummary() {
    const response = await this.client.get(`${API_BASE_URL}/api/dashboard/user-summary`);
    return response.data;
  }

  async getAdminDashboardSummary() {
    const response = await this.client.get(`${API_BASE_URL}/api/dashboard/admin-summary`);
    return response.data;
  }

  // New Expense Management APIs
  async approveExpense(id: string) {
    const response = await this.client.post(`${API_BASE_URL}/api/expenses/${id}/approve`);
    return response.data;
  }

  async rejectExpense(id: string) {
    const response = await this.client.post(`${API_BASE_URL}/api/expenses/${id}/reject`);
    return response.data;
  }

  async flagExpense(id: string) {
    const response = await this.client.post(`${API_BASE_URL}/api/expenses/${id}/flag`);
    return response.data;
  }

  // AI Service Token Generation
  async generateAiServiceToken() {
    const response = await this.client.post("/auth/service-token", {});
    return response.data;
  }


  // New Project Teams APIs
  async getProjectMembers(tripId: string) {
    const response = await this.client.get(`${API_BASE_URL}/api/trips/${tripId}/members`);
    return response.data.members;
  }

  async getTeamMemberExpenses(tripId: string, userId: string) {
    const response = await this.client.get(
      `${API_BASE_URL}/api/trips/${tripId}/members/${userId}/expenses`
    );
    return response.data.expenses;
  }

  // Vendor Management - status update (can use generic updateRecord for profiles)
  async updateVendorStatus(vendorProfileId: string, status: string) {
    return this.updateRecord("profiles", vendorProfileId, { status });
  }

async getUserIdByEmail(email: string): Promise<{ userId: string }> {
  try {
    const response = await this.client.get('/api/users', {
      params: { email: email }
    });

    // Assuming the backend returns an array of users
    const users = response.data.users || response.data;
    const user = Array.isArray(users) ? users.find(u => u.email === email) : null;

    if (!user) {
      throw new Error('User not found with this email');
    }

    return {
      userId: user.id
    };
  } catch (error) {
    console.error('Error fetching user ID by email:', error);
    throw new Error('User not found with this email');
  }
}


  async getUserReports() {
    const response = await this.client.get('${API_BASE_URL}/api/reports/user');
    return response.data;
  }

  async getAdminReports() {
    const response = await this.client.get('${API_BASE_URL}/api/reports/admin');
    return response.data;
  }

  // Trips Endpoints
  async getTrips() {
    const response = await this.client.get('${API_BASE_URL}/api/trips');
    return response.data.trips;
  }

  async createTrip(tripData: any) {
    const response = await this.client.post('https://good-polecat-enormously.ngrok-free.app/api/trips', tripData);
    return response.data;
  }

  async updateTrip(id: string, tripData: any) {
    const response = await this.client.put(`${API_BASE_URL}/api/trips/${id}`, tripData);
    return response.data;
  }

  async deleteTrip(id: string) {
    const response = await this.client.delete(`${API_BASE_URL}/api/trips/${id}`);
    return response.data;
  }

  // Trip Reports endpoints
  async getTripReports() {
    try {
      const response = await this.client.get(`${API_BASE_URL}/api/trip_reports`);
      console.log(response)
      // Check if response is HTML
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('text/html')) {
        throw new Error('Received HTML response instead of JSON');
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.headers['content-type']?.includes('text/html')) {
        console.error('Received HTML response from server');
        throw new Error('Invalid server response format');
      }
      this.handleError('Error fetching trip reports', error);
      throw error;
    }
  }

  async getTripReportById(id: string) {
    const response = await this.client.get(`${API_BASE_URL}/api/trip_reports/${id}`);
    return response.data; // Assuming it returns the report directly
  }

  async createTripReport(data: {
    trip_id: string;
    report_name: string;
    summary: string;
    status: string;
  }) {
    try {
      const response = await this.client.post(`${API_BASE_URL}/api/trip_reports`, data);
      return response.data;
    } catch (error) {
      this.handleError('Error creating trip report', error);
      throw error;
    }
  }

  async updateTripReport(id: string, updates: any) {
  const response = await this.client.patch(`${API_BASE_URL}/api/trip_reports/${id}`, updates); // Using PATCH for partial updates
  return response.data;}

  async deleteTripReport(id: number) {
    try {
      const response = await this.client.delete(`${API_BASE_URL}/api/trip_reports/${id}`);
      return response.data;
    } catch (error) {
      this.handleError('Error deleting trip report', error);
      throw error;
    }
  }



  // Add handleError method to handle errors
  private handleError(message: string, error: any) {
    console.error(message, error);
  }
}







const api = new ApiService();
export default api;
