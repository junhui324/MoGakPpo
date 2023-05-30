interface Comment {
  comment_id: number;
  commenter_name: string;
  commenter_img: string;
  comment_content: string;
  comment_created_at: string;
}

interface Project {
  project_id: number;
  author_id: number;
  author_name: string;
  author_introduction: string;
  author_img: string;
  project_type: string;
  project_recruitment_status: string;
  project_title: string;
  project_summary: string;
  project_recruitment_roles: string[];
  project_required_stacks: string[];
  project_goal: string;
  project_participation_time: string;
  project_introduction: string;
  project_bookmarks: number;
  project_views: number;
  project_created_at: string;
  project_comments: Array<Comment>;
  user_info: Array<{ user_name: string; user_img: string }>;
}

export type TypeProject = Project;

export type TypeProjectTitle = Pick<
  Project,
  | 'project_type'
  | 'project_recruitment_status'
  | 'project_title'
  | 'project_created_at'
  | 'project_comments'
  | 'project_views'
>;
