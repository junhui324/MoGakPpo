import React from 'react';
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
import {
  MdOutlineDesignServices,
  MdOutlineIntegrationInstructions,
  MdEmojiPeople,
} from 'react-icons/md';

//상수
import { PROJECT_RECRUITMENT_ROLES } from '../../constants/project';
const LOGO_SIZE: number = 24;
const LOGO_DEFAULT_COLOR: string = '#D3D3D3';

// 역할 : 프론트엔드, 백엔드 로고
export function RoleIcon({ role }: { role: string }) {
  // 스타일 정보
  const LOGO_COLOR: { [key: string]: string } = {
    FRONTEND: '#D291FF',
    BACKEND: '#FFDAA5',
    DESIGN: '#FFB6C1',
    PM: '#87CEEB',
  };

  switch (role) {
    case PROJECT_RECRUITMENT_ROLES.FRONT:
      return <RiComputerLine size={LOGO_SIZE} color={LOGO_COLOR.FRONTEND} />;
    case PROJECT_RECRUITMENT_ROLES.BACK:
      return <FiServer size={LOGO_SIZE} color={LOGO_COLOR.BACKEND} />;
    case PROJECT_RECRUITMENT_ROLES.DESIGN:
      return <MdOutlineDesignServices size={LOGO_SIZE} color={LOGO_COLOR.DESIGN} />;
    case PROJECT_RECRUITMENT_ROLES.PM:
      return <MdOutlineIntegrationInstructions size={LOGO_SIZE} color={LOGO_COLOR.PM} />;
    default:
      return <MdEmojiPeople size={LOGO_SIZE} color={LOGO_DEFAULT_COLOR} />;
  }
}

// 스택 : HTML, CSS, JS 로고
export function StackIcon({ stack }: { stack: string }) {
  // 스타일 정보
  const LOGO_COLOR: { [key: string]: string } = {
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

export function TargetIcon() {
  return <TbFlagFilled size={LOGO_SIZE} color={LOGO_DEFAULT_COLOR} />;
}

export function ClockIcon() {
  return <TbClock size={LOGO_SIZE} color={LOGO_DEFAULT_COLOR} />;
}
