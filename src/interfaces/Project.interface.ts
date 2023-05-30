interface Project {
  project_id: number;
  user_id: number;
  project_category: string;
  project_type: string;
  project_recruitment_status: string;
  project_title: string;
  project_summary: string;
  project_recruitment_roles: string[];
  project_required_stacks: string[];
  project_goal: string;
  project_participation_time: string;
  project_introduction: string;
  project_likes: number;
  project_views: number;
  project_created_at: string;
}

export type TypeProjectList = Pick<
  Project,
  | 'project_id'
  | 'user_id'
  | 'project_category'
  | 'project_type'
  | 'project_recruitment_status'
  | 'project_title'
  | 'project_summary'
  | 'project_recruitment_roles'
  | 'project_required_stacks'
  | 'project_goal'
  | 'project_participation_time'
  | 'project_likes'
  | 'project_created_at'
>;
