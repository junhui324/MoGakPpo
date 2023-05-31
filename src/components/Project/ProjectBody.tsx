import React from 'react';

import { TypeProjectBody } from '../../interfaces/Project.interface';

function RoleIcon({ role }: { role: string }) {
  switch (role) {
    case '프론트엔드':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          width="32"
          height="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke-width="0"></g>
          <g stroke-linecap="round" stroke-linejoin="round"></g>
          <g>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V15C22 16.6569 20.6569 18 19 18H13V19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19H11V18H5C3.34315 18 2 16.6569 2 15V6ZM5 5C4.44772 5 4 5.44772 4 6V15C4 15.5523 4.44772 16 5 16H19C19.5523 16 20 15.5523 20 15V6C20 5.44772 19.5523 5 19 5H5Z"
              fill="#998AF5"
            ></path>
          </g>
        </svg>
      );
    case '백엔드':
      return (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke-width="0"></g>
          <g stroke-linecap="round" stroke-linejoin="round"></g>
          <g>
            <path
              d="M7.5 6C7.5 6.82843 6.82843 7.5 6 7.5C5.17157 7.5 4.5 6.82843 4.5 6C4.5 5.17157 5.17157 4.5 6 4.5C6.82843 4.5 7.5 5.17157 7.5 6Z"
              fill="#F5DE8A"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 1C2.34315 1 1 2.34315 1 4V8C1 9.65685 2.34315 11 4 11H20C21.6569 11 23 9.65685 23 8V4C23 2.34315 21.6569 1 20 1H4ZM3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8V4Z"
              fill="#F5DE8A"
            ></path>
            <path
              d="M6 19.5C6.82843 19.5 7.5 18.8284 7.5 18C7.5 17.1716 6.82843 16.5 6 16.5C5.17157 16.5 4.5 17.1716 4.5 18C4.5 18.8284 5.17157 19.5 6 19.5Z"
              fill="#F5DE8A"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 13C2.34315 13 1 14.3431 1 16V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V16C23 14.3431 21.6569 13 20 13H4ZM3 16C3 15.4477 3.44772 15 4 15H20C20.5523 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V16Z"
              fill="#F5DE8A"
            ></path>
          </g>
        </svg>
      );
    default:
      return <></>;
  }
}

function StackIcon({ stack }: { stack: string }) {
  switch (stack) {
    case 'HTML':
      return <></>;
    case 'CSS':
      return <></>;
    case 'JavaScript':
      return <></>;
    default:
      return <></>;
  }
}

export default function ProjectBody({ bodyData }: { bodyData: TypeProjectBody | null }) {
  if (bodyData) {
    return (
      <div>
        <h3>요약</h3>
        <div>{bodyData.project_summary}</div>
        <h3>모집역할</h3>
        <div>
          {bodyData.project_recruitment_roles.roleList.map((role) => {
            return (
              <div>
                <RoleIcon role={role} />
                <div>{role}</div>
              </div>
            );
          })}
        </div>
        <h3>필수 기술 스택</h3>
        <div>
          {bodyData.project_required_stacks.stackList.map((stack) => {
            return (
              <div>
                <StackIcon stack={stack} />
                <div>{stack}</div>
              </div>
            );
          })}
        </div>
        <h3>목적</h3>
        <div>{'로고 + 목적'}</div>
        <h3>참여 시간</h3>
        <div>{'로고 + 시간'}</div>
        <h3>소개</h3>
        <div>{'소개 내용'}</div>
      </div>
    );
  } else {
    return <></>;
  }
}
