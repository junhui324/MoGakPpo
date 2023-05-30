interface Project {
  project_id: number;
  project_type: string;
  project_recruitment_status: string;
  project_title: string;
  project_summary: string;
  project_recruitment_roles: string[];
  project_required_stacks: string[];
  project_goal: string;
  project_participation_time: string;
  project_introduction: string;
  project_bookmark_count: number;
  project_comments_count: number;
  project_views_count: number;
  project_created_at: string;
}

export type TypeProjectList = Pick<
  Project,
  | 'project_id'
  | 'project_type'
  | 'project_recruitment_status'
  | 'project_title'
  | 'project_summary'
  | 'project_goal'
  | 'project_bookmark_count'
  | 'project_comments_count'
  | 'project_views_count'
  | 'project_created_at'
  | 'project_recruitment_roles'
> &
  Pick<Project, 'project_required_stacks' | 'project_participation_time'>;
