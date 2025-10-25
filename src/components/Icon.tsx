import React from 'react';
import { 
  Home, 
  Car, 
  Globe, 
  Clock, 
  Languages,
  Trophy,
  Plane,
  Laptop,
  Palette,
  Code,
  Database,
  GitBranch,
  TestTube,
  Bug,
  FileText,
  Zap,
  Shield,
  Rocket,
  CheckCircle,
  Star,
  Heart,
  Coffee,
  Book,
  Camera,
  Music,
  Gamepad2,
  Dumbbell,
  Utensils,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Menu,
  Search,
  Filter,
  Settings,
  User,
  Users,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  Lightbulb,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  Bell,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Download,
  Upload,
  Share,
  Copy,
  Edit,
  Trash2,
  Plus,
  Minus,
  Save,
  RefreshCw,
  Play,
  Pause,
  SquareStop,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Info,
  AlertCircle,
  AlertTriangle,
  Check,
  X as XIcon,
  Loader,
  Loader2,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh
} from 'lucide-react';

// DevIcons imports
import { 
  SiTypescript,
  SiAngular,
  SiReact,
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiSpring,
  SiDocker,
  SiGit,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiNextdotjs,
  SiVuedotjs,
  SiSvelte,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiLess,
  SiWebpack,
  SiVite,
  SiNpm,
  SiYarn,
  SiPnpm,
  SiLinux,
  SiUbuntu,
  SiMacos,
  SiIntellijidea,
  SiAndroidstudio,
  SiXcode,
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobexd,
  SiSketch,
  SiInvision,
  SiJira,
  SiConfluence,
  SiSlack,
  SiDiscord,
  SiZoom,
  SiGooglemeet,
  SiTrello,
  SiAsana,
  SiNotion,
  SiObsidian,
  SiMarkdown,
  SiJson,
  SiXml,
  SiYaml,
  SiToml,
  SiDotenv,
  SiGitlab,
  SiBitbucket,
  SiJenkins,
  SiTravisci,
  SiCircleci,
  SiGithubactions,
  SiGooglecloud,
  SiHeroku,
  SiVercel,
  SiNetlify,
  SiFirebase,
  SiSupabase,
  SiPlanetscale,
  SiRailway,
  SiRender,
  SiDigitalocean,
  SiCloudflare,
  SiFastly,
  SiAkamai,
  SiKeycdn,
  SiStackpath
} from 'react-icons/si';

import {
  DiJava,
} from 'react-icons/di';

interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  // Navigation & UI
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'menu': Menu,
  'x': XIcon,
  'check': Check,
  'plus': Plus,
  'minus': Minus,
  'search': Search,
  'filter': Filter,
  'settings': Settings,
  'refresh': RefreshCw,
  'external-link': ExternalLink,
  
  // Location & Travel
  'home': Home,
  'car': Car,
  'globe': Globe,
  'plane': Plane,
  'map-pin': MapPin,
  'clock': Clock,
  'languages': Languages,
  
  // Professional & Skills
  'briefcase': Briefcase,
  'graduation-cap': GraduationCap,
  'award': Award,
  'trophy': Trophy,
  'target': Target,
  'lightbulb': Lightbulb,
  'trending-up': TrendingUp,
  'bar-chart': BarChart3,
  'pie-chart': PieChart,
  'user': User,
  'users': Users,
  
  // Tech & Development
  'laptop': Laptop,
  'code': Code,
  'database': Database,
  'git-branch': GitBranch,
  'test-tube': TestTube,
  'bug': Bug,
  'file-text': FileText,
  'zap': Zap,
  'shield': Shield,
  'rocket': Rocket,
  'monitor': Monitor,
  'smartphone': Smartphone,
  'tablet': Tablet,
  
  // Hobbies & Lifestyle
  'palette': Palette,
  'camera': Camera,
  'music': Music,
  'gamepad': Gamepad2,
  'dumbbell': Dumbbell,
  'utensils': Utensils,
  'book': Book,
  'coffee': Coffee,
  'heart': Heart,
  'star': Star,
  
  // Status & Actions
  'check-circle': CheckCircle,
  'info': Info,
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  'loader': Loader,
  'loader-2': Loader2,
  'save': Save,
  'edit': Edit,
  'trash': Trash2,
  'copy': Copy,
  'download': Download,
  'upload': Upload,
  'share': Share,
  'play': Play,
  'pause': Pause,
  'stop': SquareStop,
  'volume': Volume2,
  'volume-off': VolumeX,
  'maximize': Maximize,
  'minimize': Minimize,
  
  // Communication
  'phone': Phone,
  'mail': Mail,
  'linkedin': Linkedin,
  'github': Github,
  'twitter': Twitter,
  'instagram': Instagram,
  
  // System & Device
  'sun': Sun,
  'moon': Moon,
  'wifi': Wifi,
  'wifi-off': WifiOff,
  'battery': Battery,
  'battery-low': BatteryLow,
  'signal': Signal,
  'signal-zero': SignalZero,
  'signal-low': SignalLow,
  'signal-medium': SignalMedium,
  'signal-high': SignalHigh,
  'lock': Lock,
  'unlock': Unlock,
  'eye': Eye,
  'eye-off': EyeOff,
  'bell': Bell,
  'calendar': Calendar,
  
  // DevIcons - Technologies
  'java': DiJava,
  'typescript': SiTypescript,
  'angular': SiAngular,
  'react': SiReact,
  'javascript': SiJavascript,
  'python': SiPython,
  'html': SiHtml5,
  'css': SiCss3,
  'spring': SiSpring,
  'docker': SiDocker,
  'git': SiGit,
  'mysql': SiMysql,
  'postgresql': SiPostgresql,
  'mongodb': SiMongodb,
  'nodejs': SiNodedotjs,
  'express': SiExpress,
  'nextjs': SiNextdotjs,
  'vue': SiVuedotjs,
  'svelte': SiSvelte,
  'tailwind': SiTailwindcss,
  'bootstrap': SiBootstrap,
  'sass': SiSass,
  'less': SiLess,
  'webpack': SiWebpack,
  'vite': SiVite,
  'npm': SiNpm,
  'yarn': SiYarn,
  'pnpm': SiPnpm,
  
  // DevIcons - Operating Systems
  'linux': SiLinux,
  'ubuntu': SiUbuntu,
  'macos': SiMacos,
  'windows': Monitor, // Fallback to generic monitor icon
  
  // DevIcons - IDEs & Editors
  'vscode': Code, // Fallback to generic code icon
  'intellij': SiIntellijidea,
  'eclipse': Code, // Fallback to generic code icon
  'android-studio': SiAndroidstudio,
  'xcode': SiXcode,
  
  // DevIcons - Design Tools
  'figma': SiFigma,
  'photoshop': SiAdobephotoshop,
  'illustrator': SiAdobeillustrator,
  'xd': SiAdobexd,
  'sketch': SiSketch,
  'invision': SiInvision,
  'zeplin': Palette, // Fallback to generic palette icon
  
  // DevIcons - Project Management
  'jira': SiJira,
  'confluence': SiConfluence,
  'slack': SiSlack,
  'discord': SiDiscord,
  'teams': Users, // Fallback to generic users icon
  'zoom': SiZoom,
  'meet': SiGooglemeet,
  'trello': SiTrello,
  'asana': SiAsana,
  'notion': SiNotion,
  'obsidian': SiObsidian,
  
  // DevIcons - File Formats
  'markdown': SiMarkdown,
  'json': SiJson,
  'xml': SiXml,
  'yaml': SiYaml,
  'toml': SiToml,
  'ini': FileText, // Fallback to generic file icon
  'env': FileText, // Fallback to generic file icon
  'dotenv': SiDotenv,
  
  // DevIcons - Version Control
  'gitlab': SiGitlab,
  'bitbucket': SiBitbucket,
  
  // DevIcons - CI/CD
  'jenkins': SiJenkins,
  'travis': SiTravisci,
  'circleci': SiCircleci,
  'github-actions': SiGithubactions,
  'azure-devops': RefreshCw, // Fallback to generic refresh icon
  'aws': Globe, // Fallback to generic globe icon
  'gcp': SiGooglecloud,
  'azure': RefreshCw, // Fallback to generic refresh icon
  
  // DevIcons - Cloud Providers
  'heroku': SiHeroku,
  'vercel': SiVercel,
  'netlify': SiNetlify,
  'firebase': SiFirebase,
  'supabase': SiSupabase,
  'planetscale': SiPlanetscale,
  'railway': SiRailway,
  'render': SiRender,
  'digitalocean': SiDigitalocean,
  'linode': Database, // Fallback to generic database icon
  'vultr': Database, // Fallback to generic database icon
  
  // DevIcons - CDN & Performance
  'cloudflare': SiCloudflare,
  'fastly': SiFastly,
  'akamai': SiAkamai,
  'maxcdn': Zap, // Fallback to generic zap icon
  'keycdn': SiKeycdn,
  'bunnycdn': Zap, // Fallback to generic zap icon
  'stackpath': SiStackpath,
  'incapsula': Shield, // Fallback to generic shield icon
  'sucuri': Shield // Fallback to generic shield icon
};

export default function Icon({ name, size = 20, className = '', style = {}, color }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return (
    <IconComponent 
      size={size} 
      className={className}
      style={{ color, ...style }}
    />
  );
}