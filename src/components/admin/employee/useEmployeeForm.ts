import { useState } from 'react';
import type { Employee, TimelineMilestone, RelatedHub } from '@/lib/schemas/employee.schema';

export interface EmployeeFormData {
  name: string;
  role: string;
  email: string;
  phone: string;
  office: string;
  description: string;
  longDescription: string;
  experience: string;
  specialties: string;
  education: string;
  languages: string;
  workingHours: string;
  clientTypes: string;
  achievements: string;
  image: string;
  isActive: boolean;
}

export interface UseEmployeeFormReturn {
  formData: EmployeeFormData;
  relatedHubs: RelatedHub[];
  timeline: TimelineMilestone[];
  handleChange: (name: keyof EmployeeFormData, value: string | boolean) => void;
  addRelatedHub: () => void;
  updateRelatedHub: (index: number, field: keyof RelatedHub, value: string) => void;
  removeRelatedHub: (index: number) => void;
  addTimelineMilestone: () => void;
  updateTimelineMilestone: (index: number, field: keyof TimelineMilestone, value: string | boolean) => void;
  removeTimelineMilestone: (index: number) => void;
  moveTimelineMilestone: (index: number, direction: 'up' | 'down') => void;
  getPayload: () => Record<string, unknown>;
}

export function useEmployeeForm(employee?: Employee): UseEmployeeFormReturn {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: employee?.name || '',
    role: employee?.role || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    office: employee?.office || 'karasjok',
    description: employee?.description || '',
    longDescription: employee?.longDescription || '',
    experience: employee?.experience || '',
    specialties: employee?.specialties?.join(', ') || '',
    education: employee?.education?.join(', ') || '',
    languages: employee?.languages?.join(', ') || '',
    workingHours: employee?.workingHours || 'Man-Fre: 08:00-16:00',
    clientTypes: employee?.clientTypes?.join(', ') || '',
    achievements: employee?.achievements?.join(', ') || '',
    image: employee?.image || '',
    isActive: employee?.isActive !== false,
  });

  const [relatedHubs, setRelatedHubs] = useState<RelatedHub[]>(
    employee?.relatedHubs || []
  );

  const [timeline, setTimeline] = useState<TimelineMilestone[]>(
    employee?.timeline || []
  );

  const handleChange = (name: keyof EmployeeFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Related Hubs handlers
  const addRelatedHub = () => {
    setRelatedHubs((prev) => [...prev, { title: '', link: '' }]);
  };

  const updateRelatedHub = (index: number, field: keyof RelatedHub, value: string) => {
    setRelatedHubs((prev) =>
      prev.map((hub, i) => (i === index ? { ...hub, [field]: value } : hub))
    );
  };

  const removeRelatedHub = (index: number) => {
    setRelatedHubs((prev) => prev.filter((_, i) => i !== index));
  };

  // Timeline handlers
  const addTimelineMilestone = () => {
    setTimeline((prev) => [
      ...prev,
      {
        year: new Date().getFullYear().toString(),
        title: '',
        description: '',
        icon: 'briefcase',
        highlight: false,
      },
    ]);
  };

  const updateTimelineMilestone = (
    index: number,
    field: keyof TimelineMilestone,
    value: string | boolean
  ) => {
    setTimeline((prev) =>
      prev.map((milestone, i) =>
        i === index ? { ...milestone, [field]: value } : milestone
      )
    );
  };

  const removeTimelineMilestone = (index: number) => {
    setTimeline((prev) => prev.filter((_, i) => i !== index));
  };

  const moveTimelineMilestone = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === timeline.length - 1)
    ) {
      return;
    }

    const newTimeline = [...timeline];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newTimeline[index], newTimeline[newIndex]] = [
      newTimeline[newIndex],
      newTimeline[index],
    ];
    setTimeline(newTimeline);
  };

  const getPayload = () => ({
    ...formData,
    specialties: formData.specialties
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    education: formData.education
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    languages: formData.languages
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    clientTypes: formData.clientTypes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    achievements: formData.achievements
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    relatedHubs: relatedHubs.filter((hub) => hub.title && hub.link),
    timeline: timeline.filter((m) => m.title && m.year),
  });

  return {
    formData,
    relatedHubs,
    timeline,
    handleChange,
    addRelatedHub,
    updateRelatedHub,
    removeRelatedHub,
    addTimelineMilestone,
    updateTimelineMilestone,
    removeTimelineMilestone,
    moveTimelineMilestone,
    getPayload,
  };
}
