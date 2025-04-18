import axios from 'axios';

// Define interfaces for each type of data
interface Color {
  id: number;
  name: string;
  code: string;
  updated_at: string;
  created_at: string;
}

interface Size {
  id: number;
  size_name: string;
  description: string;
  updated_at: string;
  created_at: string;
}

interface Style {
  id: number;
  style_name: string;
  description: string;
  updated_at: string;
  created_at: string;
}

interface Operation {
  id: number;
  operation_name: string;
  machine_type: string;
  updated_at: string;
  created_at: string;
}

interface Defect {
  id: number;
  defect_name: string;
  description: string;
  updated_at: string;
  created_at: string;
}

// Define a base API instance
const api = axios.create({
  baseURL: 'https://your-api-url.com', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fetch data for each setting
export const fetchColors = async (): Promise<Color[]> => {
  const response = await api.get('/api/colors');
  return response.data;
};

export const fetchSizes = async (): Promise<Size[]> => {
  const response = await api.get('/api/sizes');
  return response.data;
};

export const fetchStyles = async (): Promise<Style[]> => {
  const response = await api.get('/api/styles');
  return response.data;
};

export const fetchOperations = async (): Promise<Operation[]> => {
  const response = await api.get('/api/operations');
  return response.data;
};

export const fetchDefects = async (): Promise<Defect[]> => {
  const response = await api.get('/api/defects');
  return response.data;
};
