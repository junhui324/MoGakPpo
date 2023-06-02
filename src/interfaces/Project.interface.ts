interface Project {
  is_bookmarked: boolean;
  project_id: number;
  project_type: string;
  project_recruitment_status: string;
  project_title: string;
  project_summary: string;
  project_recruitment_roles: {
    roleList: string[];
  };
  project_required_stacks: {
    stackList: string[];
  };
  project_goal: string;
  project_participation_time: string;
  project_introduction: string;
  project_img: string | null;
  project_bookmark_count: number;
  project_comments_count: number;
  project_views_count: number;
  project_created_at: string;
  project_bookmark_users: { user_name: string; user_img: string }[];
  user_id: number;
  user_name: string;
  user_introduction: string;
  user_img: string;
}

export type TypeProject = Project;

export type TypeProjectList = Pick<
  Project,
  | 'project_id'
  | 'project_type'
  | 'project_recruitment_status'
  | 'project_title'
  | 'project_goal'
  | 'project_bookmark_count'
  | 'project_comments_count'
  | 'project_views_count'
  | 'project_created_at'
> &
  Partial<
    Pick<
      Project,
      | 'is_bookmarked'
      | 'project_required_stacks'
      | 'project_participation_time'
      | 'project_summary'
      | 'project_recruitment_roles'
    >
  >;

export type TypeProjectTitle = Pick<
  Project,
  | 'project_type'
  | 'project_recruitment_status'
  | 'project_title'
  | 'project_created_at'
  | 'project_comments_count'
  | 'project_views_count'
>;

export type TypeProjectBody = Pick<
  Project,
  | 'project_summary'
  | 'project_recruitment_roles'
  | 'project_required_stacks'
  | 'project_goal'
  | 'project_participation_time'
  | 'project_introduction'
>;

export type TypeProjectAuthor = Pick<
  Project,
  'user_id' | 'user_name' | 'user_introduction' | 'user_img'
>;

export type TypeProjectBookmarks = Pick<
  Project,
  'is_bookmarked' | 'project_bookmark_count' | 'project_bookmark_users' | 'project_type'
>;

export type TypeProjectModify = Pick<
  Project,
  'project_id' | 'user_id' | 'project_recruitment_status'
>;

export type TypeProjectPost = Pick<
  Project,
  | 'project_type'
  | 'project_title'
  | 'project_summary'
  | 'project_recruitment_roles'
  | 'project_required_stacks'
  | 'project_goal'
  | 'project_participation_time'
  | 'project_introduction'
>;

export type TypeUserPosts = TypeProjectList[];

// export type TypeStacks = Pick<Project, 'project_required_stacks'>;
