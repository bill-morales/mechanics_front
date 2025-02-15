import { format } from "date-fns";

export const formatDateFromString = (dateInput?: string): string => {
    // 2025-02-15T00:23:12.558948-05:00 -> 2025-02-15 00:23:12
    if (!dateInput) return '---'; 
    return format(new Date(dateInput), 'dd-MM-yyyy HH:mm');
}
