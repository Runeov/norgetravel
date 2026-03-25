import { z } from 'zod';

export const TimelineMilestoneSchema = z.object({
  year: z.string().min(1, 'År er påkrevd'),
  title: z.string().min(1, 'Tittel er påkrevd'),
  description: z.string(),
  icon: z.enum(['briefcase', 'graduation', 'award', 'star']),
  highlight: z.boolean().optional(),
});

export const RelatedHubSchema = z.object({
  title: z.string().min(1, 'Tittel er påkrevd'),
  link: z.string().min(1, 'Lenke er påkrevd'),
});

export const EmployeeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Navn er påkrevd'),
  role: z.string().min(1, 'Rolle er påkrevd'),
  email: z.string().email('Ugyldig e-postadresse'),
  phone: z.string().min(1, 'Telefon er påkrevd'),
  office: z.string().min(1, 'Kontor er påkrevd'),
  description: z.string().min(1, 'Beskrivelse er påkrevd'),
  longDescription: z.string(),
  experience: z.string(),
  specialties: z.array(z.string()),
  education: z.array(z.string()),
  languages: z.array(z.string()),
  workingHours: z.string(),
  achievements: z.array(z.string()),
  clientTypes: z.array(z.string()),
  image: z.string().optional(),
  relatedHubs: z.array(RelatedHubSchema).optional(),
  timeline: z.array(TimelineMilestoneSchema).optional(),
  isActive: z.boolean(),
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const EmployeeCreateSchema = EmployeeSchema.omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

export const EmployeeUpdateSchema = EmployeeCreateSchema.partial();

export type Employee = z.infer<typeof EmployeeSchema>;
export type EmployeeCreate = z.infer<typeof EmployeeCreateSchema>;
export type EmployeeUpdate = z.infer<typeof EmployeeUpdateSchema>;
export type TimelineMilestone = z.infer<typeof TimelineMilestoneSchema>;
export type RelatedHub = z.infer<typeof RelatedHubSchema>;
