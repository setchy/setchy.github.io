import skillsJson from './skills.json';

export interface Skill {
  slug: string;
  name: string;
  url: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = skillsJson;
