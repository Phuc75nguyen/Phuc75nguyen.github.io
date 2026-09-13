// ⭐ MỌI THÔNG TIN CÁ NHÂN NẰM Ở ĐÂY — sửa nội dung thì sửa file này,
// không hardcode chuỗi hiển thị trong component (CLAUDE.md, nguyên tắc #4).

export const SITE = {
  title: 'Nguyễn Tấn Phúc',
  description:
    'Blog cá nhân và thư viện phân tích paper AI/ML của Nguyễn Tấn Phúc — Data Scientist / MLOps Engineer.',
  url: 'https://phuc75nguyen.github.io',
  lang: 'vi',
  locale: 'vi_VN',
};

export const AUTHOR = {
  name: 'Nguyễn Tấn Phúc',
  handle: '@Phuc75nguyen',
  role: 'Data Scientist · MLOps Engineer',
  tagline: 'Tôi đọc paper, dựng hệ thống, và thỉnh thoảng làm thơ.',
  location: 'Việt Nam',
  avatar: 'https://github.com/Phuc75nguyen.png',
  email: 'phuc75nguyen@gmail.com',
};

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Phuc75nguyen', icon: 'lucide:github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/phuc75nguyen', icon: 'lucide:linkedin' },
  { label: 'Facebook', href: 'https://facebook.com/phuc75nguyen', icon: 'lucide:facebook' },
] as const;

export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Papers', href: '/papers' },
  { label: 'Notes', href: '/notes' },
  { label: 'Essays', href: '/essays' },
  { label: 'Thơ', href: '/poems' },
  { label: 'About', href: '/about' },
];

export const PAGINATION = {
  notesPerPage: 12,
};

// Repo của chính website này — sidebar footer trỏ về đây (BLUEPRINT Mục 5.3, khối 7).
export const REPO_URL = 'https://github.com/Phuc75nguyen/Phuc75nguyen.github.io';

// Kho lưu trữ PDF gốc — repo riêng, tách khỏi repo website (BLUEPRINT Mục 3.3).
export const KNOWLEDGE_LIBRARY = {
  repo: 'https://github.com/Phuc75nguyen/AI-Knowledge-Library',
  raw: 'https://raw.githubusercontent.com/Phuc75nguyen/AI-Knowledge-Library/main',
};

/** Ghép đường dẫn localPdf trong frontmatter thành URL raw đầy đủ. */
export function knowledgeLibraryPdfUrl(localPdf: string): string {
  return `${KNOWLEDGE_LIBRARY.raw}/${localPdf}`;
}

export const SEO_DEFAULTS = {
  ogImage: '/og-default.png',
  twitterHandle: undefined as string | undefined,
};
