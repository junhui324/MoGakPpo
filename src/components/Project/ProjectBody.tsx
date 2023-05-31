import React from 'react';

// 타입
import { TypeProjectBody } from '../../interfaces/Project.interface';

// 아이콘
import { RiComputerLine, RiCodeView } from 'react-icons/ri';
import { FiServer } from 'react-icons/fi';
import {
  TbBrandCss3,
  TbBrandHtml5,
  TbBrandJavascript,
  TbFlagFilled,
  TbClock,
} from 'react-icons/tb';

const LOGO_SIZE = 32;
const LOGO_DEFAULT_COLOR = '#D3D3D3';

// 역할 : 프론트엔드, 백엔드 로고
function RoleIcon({ role }: { role: string }) {
  // 스타일 정보
  const LOGO_COLOR = {
    FRONTEND: '#D291FF',
    BACKEND: '#FFDAA5',
  };

  switch (role) {
    case '프론트엔드':
      return <RiComputerLine size={LOGO_SIZE} color={LOGO_COLOR.FRONTEND} />;
    case '백엔드':
      return <FiServer size={LOGO_SIZE} color={LOGO_COLOR.BACKEND} />;
    default:
      return <></>;
  }
}

// 스택 : HTML, CSS, JS 로고
function StackIcon({ stack }: { stack: string }) {
  // 스타일 정보
  const LOGO_COLOR = {
    HTML: '#FFA382',
    CSS: '#9AC6E8',
    JS: '#FFF4A7',
  };

  switch (stack) {
    case 'HTML':
      return <TbBrandHtml5 size={LOGO_SIZE} color={LOGO_COLOR.HTML} />;
    case 'CSS':
      return <TbBrandCss3 size={LOGO_SIZE} color={LOGO_COLOR.CSS} />;
    case 'JavaScript':
      return <TbBrandJavascript size={LOGO_SIZE} color={LOGO_COLOR.JS} />;
    default:
      return <RiCodeView size={LOGO_SIZE} color={LOGO_DEFAULT_COLOR} />;
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
              <>
                <div>
                  <RoleIcon role={role} />
                </div>
                <div>{role}</div>
              </>
            );
          })}
        </div>
        <h3>필수 기술 스택</h3>
        <div>
          {bodyData.project_required_stacks.stackList.map((stack) => {
            return (
              <>
                <div>
                  <StackIcon stack={stack} />
                </div>
                <div>{stack}</div>
              </>
            );
          })}
        </div>
        <h3>목적</h3>
        <div>
          <div>
            <TbFlagFilled size={LOGO_SIZE} color={LOGO_DEFAULT_COLOR} />
          </div>
          <div>{bodyData.project_goal}</div>
        </div>
        <h3>참여 시간</h3>
        <div>
          <div>
            <TbClock size={LOGO_SIZE} color={LOGO_DEFAULT_COLOR} />
          </div>
          <div>{bodyData.project_participation_time}</div>
        </div>
        <h3>소개</h3>
        <div>{bodyData.project_introduction}</div>
      </div>
    );
  } else {
    return <></>;
  }
}
