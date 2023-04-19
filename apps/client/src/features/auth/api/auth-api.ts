import { AuthPayload, LoginCredentials } from '@douglasneuroinformatics/common';
import axios from 'axios';

export class AuthAPI {
  static async login(credentials: LoginCredentials): Promise<AuthPayload> {
    const response = await axios.post<AuthPayload>('/auth/login', credentials);
    return response.data;
  }
}
