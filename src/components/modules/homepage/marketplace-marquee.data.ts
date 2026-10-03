import type { LucideIcon } from "lucide-react";
import {
  Bug,
  Building2,
  Cctv,
  Droplets,
  Fuel,
  Hammer,
  PaintRoller,
  Snowflake,
  Sun,
  WashingMachine,
  Waves,
  Zap,
} from "lucide-react";

export type Vendor = {
  name: string;
  trade: string;
  area: string;
  rating: string;
  jobs: number;
  onTime: string;
  response: string;
  technicians: number;
  serviceAreas: string[];
  summary: string;
};

export type Service = {
  name: string;
  icon: LucideIcon;
  open: number;
};

export const vendors: Vendor[] = [
  {
    name: "Dhaka Cooling & HVAC",
    trade: "HVAC",
    area: "Gulshan",
    rating: "4.9",
    jobs: 412,
    onTime: "97%",
    response: "34 min",
    technicians: 18,
    serviceAreas: ["Gulshan", "Banani", "Baridhara"],
    summary:
      "Commercial and residential cooling contracts across northern Dhaka, including chiller maintenance and quarterly servicing schedules.",
  },
  {
    name: "Bengal Electrical Works",
    trade: "Electrical",
    area: "Banani",
    rating: "4.8",
    jobs: 356,
    onTime: "95%",
    response: "41 min",
    technicians: 22,
    serviceAreas: ["Banani", "Gulshan", "Dhanmondi"],
    summary:
      "Panel upgrades, load balancing, and fault rectification for retail and apartment blocks, with a standby crew for outages.",
  },
  {
    name: "Meghna Generator Care",
    trade: "Generator",
    area: "Uttara",
    rating: "4.7",
    jobs: 289,
    onTime: "93%",
    response: "52 min",
    technicians: 14,
    serviceAreas: ["Uttara", "Mirpur", "Pallabi"],
    summary:
      "Diesel and gas generator servicing with load-bank testing, covering factories and housing societies on scheduled maintenance plans.",
  },
  {
    name: "Riverline Plumbing Co.",
    trade: "Plumbing",
    area: "Dhanmondi",
    rating: "4.9",
    jobs: 331,
    onTime: "96%",
    response: "29 min",
    technicians: 16,
    serviceAreas: ["Dhanmondi", "Shyamoli", "Mohammadpur"],
    summary:
      "Emergency leak repair, concealed pipe work, and annual tank cleaning for multi-storey residential buildings.",
  },
  {
    name: "Apex Facilities Management",
    trade: "Facilities",
    area: "Banani",
    rating: "4.6",
    jobs: 198,
    onTime: "92%",
    response: "1 hr 10 min",
    technicians: 31,
    serviceAreas: ["Banani", "Gulshan", "Baridhara"],
    summary:
      "Single-point facilities contracts covering housekeeping, pest control, and preventive maintenance for office floors.",
  },
  {
    name: "Summit Lift & Elevator",
    trade: "Elevator",
    area: "Gulshan",
    rating: "4.8",
    jobs: 142,
    onTime: "98%",
    response: "46 min",
    technicians: 9,
    serviceAreas: ["Gulshan", "Banani", "Dhanmondi"],
    summary:
      "Annual maintenance contracts for passenger and goods lifts, with statutory inspection reports filed after every visit.",
  },
  {
    name: "GreenSolar Bangladesh",
    trade: "Solar",
    area: "Mirpur",
    rating: "4.7",
    jobs: 174,
    onTime: "94%",
    response: "2 hr 5 min",
    technicians: 12,
    serviceAreas: ["Mirpur", "Pallabi", "Uttara"],
    summary:
      "Rooftop and ground-mounted solar installation, string fault diagnostics, and inverter replacement for industrial sites.",
  },
  {
    name: "SecureLine Systems",
    trade: "Security",
    area: "Baridhara",
    rating: "4.9",
    jobs: 265,
    onTime: "97%",
    response: "38 min",
    technicians: 20,
    serviceAreas: ["Baridhara", "Gulshan", "Banani"],
    summary:
      "CCTV, access control, and intercom installation with monthly health checks on every camera in the contract.",
  },
  {
    name: "Techno Appliance Care",
    trade: "Appliance",
    area: "Uttara",
    rating: "4.5",
    jobs: 121,
    onTime: "91%",
    response: "1 hr 25 min",
    technicians: 8,
    serviceAreas: ["Uttara", "Mirpur", "Bashundhara"],
    summary:
      "In-home servicing for washing machines, refrigerators, and air units, carrying common spares on every visit.",
  },
  {
    name: "ShieldGuard Pest Control",
    trade: "Pest control",
    area: "Shyamoli",
    rating: "4.6",
    jobs: 96,
    onTime: "95%",
    response: "1 hr 40 min",
    technicians: 7,
    serviceAreas: ["Shyamoli", "Mohammadpur", "Dhanmondi"],
    summary:
      "Scheduled and emergency pest control for restaurants and apartments, with follow-up visits inside the guarantee window.",
  },
];

export const services: Service[] = [
  {
    name: "HVAC servicing",
    icon: Snowflake,
    open: 64,
  },
  {
    name: "Electrical repair",
    icon: Zap,
    open: 91,
  },
  {
    name: "Generator servicing",
    icon: Fuel,
    open: 37,
  },
  {
    name: "Plumbing & leak repair",
    icon: Droplets,
    open: 73,
  },
  {
    name: "Water treatment",
    icon: Waves,
    open: 22,
  },
  {
    name: "Elevator maintenance",
    icon: Building2,
    open: 18,
  },
  {
    name: "Solar installation",
    icon: Sun,
    open: 26,
  },
  {
    name: "CCTV & access control",
    icon: Cctv,
    open: 41,
  },
  {
    name: "Appliance repair",
    icon: WashingMachine,
    open: 33,
  },
  {
    name: "Pest control",
    icon: Bug,
    open: 15,
  },
  {
    name: "Painting & finishing",
    icon: PaintRoller,
    open: 29,
  },
  {
    name: "Carpentry & fit-out",
    icon: Hammer,
    open: 12,
  },
];
