export interface FloorUpdate {
  timestamp: string;
  chamber: string;
  update: string;
  congress: string;
  category: string;
  year: number;
  legislative_day: string;
  bill_ids: string[];
  roll_ids: string[];
  legislator_ids: string[];
}