import { z } from 'zod';

export const UserRoleSchema = z.enum(['admin', 'editor']);

export const UserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email('Ugyldig e-postadresse'),
  name: z.string().min(1, 'Navn er påkrevd'),
  passwordHash: z.string().min(1),
  role: UserRoleSchema,
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const UserCreateSchema = z.object({
  email: z.string().email('Ugyldig e-postadresse'),
  name: z.string().min(1, 'Navn er påkrevd'),
  password: z.string().min(8, 'Passord må være minst 8 tegn'),
  role: UserRoleSchema,
});

export const UserUpdateSchema = z.object({
  email: z.string().email('Ugyldig e-postadresse').optional(),
  name: z.string().min(1, 'Navn er påkrevd').optional(),
  password: z.string().min(8, 'Passord må være minst 8 tegn').optional(),
  role: UserRoleSchema.optional(),
  isActive: z.boolean().optional(),
});

export const LoginCredentialsSchema = z.object({
  email: z.string().email('Ugyldig e-postadresse'),
  password: z.string().min(1, 'Passord er påkrevd'),
});

export type User = z.infer<typeof UserSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

// Safe user type without password hash for client-side use
export type SafeUser = Omit<User, 'passwordHash'>;
