// Site-wide constants and the fixed blog taxonomy.

export const SITE = {
  name: 'Youssef OUSSAID',
  title: 'Youssef OUSSAID — DevOps & Systems Engineer',
  description:
    'DevOps & Systems Engineer with 9 years of experience. Azure Cloud, Kubernetes, CI/CD and infrastructure automation — plus a learning log on RHCSA, Kubernetes, Azure, IaC, configuration management and observability.',
  url: 'https://youssef.oussaid.net',
  email: 'oussaid-youssef@outlook.fr',
  github: 'https://github.com/Youssaid-tech',
  linkedin: 'https://linkedin.com/in/youssef-oussaid-95121b135',
};

export type CategoryId =
  | 'rhcsa'
  | 'kubernetes'
  | 'azure'
  | 'iac'
  | 'configuration-management'
  | 'monitoring-observability';

export interface Category {
  id: CategoryId;
  name: string;
  tag: string; // short mono label
  description: string;
  icon: string; // emoji glyph used as a lightweight icon
}

// Order here drives the order shown on the blog hub.
export const CATEGORIES: Category[] = [
  {
    id: 'rhcsa',
    name: 'RHCSA',
    tag: 'rhcsa',
    description:
      'Red Hat system administration — users, storage, SELinux, systemd, networking and the road to certification.',
    icon: '🎩',
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    tag: 'k8s',
    description:
      'Workloads, scheduling, networking, storage and operating clusters in production.',
    icon: '☸',
  },
  {
    id: 'azure',
    name: 'Azure',
    tag: 'azure',
    description:
      'Azure cloud services, networking, identity, governance and the AZ-104 / AZ-400 paths.',
    icon: '☁',
  },
  {
    id: 'iac',
    name: 'Infrastructure as Code',
    tag: 'iac',
    description:
      'Terraform, Bicep and friends — declarative, versioned, reproducible infrastructure.',
    icon: '⌗',
  },
  {
    id: 'configuration-management',
    name: 'Configuration Management',
    tag: 'config-mgmt',
    description:
      'Ansible and the discipline of keeping fleets consistent, idempotent and auditable.',
    icon: '⚙',
  },
  {
    id: 'monitoring-observability',
    name: 'Monitoring & Observability',
    tag: 'observability',
    description:
      'Metrics, logs and traces — Prometheus, Grafana, alerting and making systems explain themselves.',
    icon: '📈',
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;
