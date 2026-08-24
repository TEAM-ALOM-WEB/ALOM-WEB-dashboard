# ALOM Admin Dashboard Project Guidelines (claude.md)

This document provides system instructions, architectural patterns, coding conventions, and project standards for developing the **ALOM Admin Dashboard** using **Next.js (App Router)**.

---

## 1. Project Overview & Objectives

- **Project Name:** ALOM Admin Dashboard (아롬 관리자 대시보드)
- **Target Application:** Management system for the official ALOM club platform ([alom-web-frontend.vercel.app](https://alom-web-frontend.vercel.app/))
- **Core Domains:**
  1. **Members (아롬인):** Member profiles, cohort (기수), role-based permissions, track/part classification (Frontend, Backend, Design, PM), portfolio links.
  2. **Projects (프로젝트):** Project showcase catalog, tech stack tags, member mapping, featured status toggles.
  3. **Recruitment (리크루팅):** Applicant pipeline, document screening, interview scoring, and automated member conversion.
  4. **Curriculum & Studies (스터디):** Study group tracks, weekly logs, and attendance tracking.
  5. **CMS & Announcements (콘텐츠/공지):** Landing page banners, popup alerts, activity blog posts.

---

## 2. Tech Stack & Dependencies

- **Framework:** Next.js 14+ (App Router, Server Components & Server Actions)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS, `clsx`, `tailwind-merge`
- **State Management:**
  - Client State: `zustand`
  - Server State & Data Fetching: TanStack Query (React Query) v5 or SWR / Server Actions with optimistic updates
- **UI Components & Icons:** Radix UI / shadcn/ui, Lucide React icons
- **Form & Validation:** `react-hook-form`, `zod`
- **Table Management:** `@tanstack/react-table`
- **Backend & Database:** Supabase (PostgreSQL, Auth, Storage) or Custom REST/GraphQL API with Axios

---

## 3. Directory Structure

Adopt a modular, scalable architecture inspired by Feature-Sliced / Domain-Driven structure:

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication route group (Login, Reset Password)
│   │   └── login/
│   ├── (dashboard)/              # Protected Dashboard route group
│   │   ├── layout.tsx            # Main layout with Sidebar, Header, Breadcrumbs
│   │   ├── page.tsx              # Overview / Summary Dashboard
│   │   ├── members/              # Member management pages
│   │   │   ├── page.tsx          # Member list table with filtering
│   │   │   └── [id]/             # Member detail & edit form
│   │   ├── projects/             # Project showcase catalog
│   │   ├── recruitment/          # Recruitment pipeline (Kanban/Table)
│   │   ├── studies/              # Study logs & groups
│   │   └── contents/             # Banner & notice CMS
│   ├── api/                      # Route Handlers (if needed)
│   └── layout.tsx                # Root layout (Fonts, Providers, Toaster)
├── components/
│   ├── common/                   # Reusable atomic UI (Buttons, Modals, Badges)
│   ├── layout/                   # Sidebar, Header, UserNav, Breadcrumbs
│   └── ui/                       # shadcn/ui primitives
├── features/                     # Domain-driven feature modules
│   ├── members/
│   │   ├── components/           # MemberTable, MemberForm, CohortFilter
│   │   ├── hooks/                # useMembers, useMemberMutations
│   │   ├── services/             # API request functions
│   │   └── types/                # Member-specific TypeScript interfaces
│   ├── projects/
│   └── recruitment/
├── hooks/                        # Global reusable custom hooks
├── lib/                          # Utility functions, Supabase client, Axios instance
│   ├── supabase/
│   ├── utils.ts
│   └── validations/              # Global zod schemas
├── store/                        # Global Zustand stores (e.g., authStore, sidebarStore)
└── types/                        # Shared global TypeScript types
```

---

## 4. Coding Standards & Conventions

### 4.1 TypeScript & Type Safety

- Always define explicit types and avoid using `any`.
- Leverage `zod` for request validation, form validation, and runtime environment variable validation.
- Separate domain models (`types/models.ts`) from API transfer types (`types/dto.ts`).

### 4.2 Next.js App Router Patterns

- **Default to Server Components:** Use Server Components by default for layout, initial data fetching, and SEO optimization.
- **Client Components (`'use client'`):** Mark components as client components only when requiring hooks (`useState`, `useEffect`, `useForm`), event handlers, or browser APIs.
- **Loading & Error Boundaries:** Always implement `loading.tsx` and `error.tsx` in route segments to provide feedback and fallback UI.

### 4.3 UI & Styling (Tailwind CSS)

- Use the `cn()` helper function (`clsx` + `tailwind-merge`) for dynamic class composition.
- Adhere to a unified color system and spacing scale.
- Keep tables clean, responsive, and equipped with empty states (`No data found`), pagination, and skeleton loaders.

### 4.4 Form Handling & Server Mutations

- Use `react-hook-form` paired with `@hookform/resolvers/zod` for all form submissions.
- Standardize mutation feedback using toast notifications (e.g., `sonner` or `react-hot-toast`).
- Implement optimistic updates where appropriate to maintain a smooth admin user experience.

---

## 5. Security & Permission Rules

1. **Role-Based Access Control (RBAC):**
   - `SUPER_ADMIN` (회장/대표 운영진): Full access to all modules, recruitment evaluation, and member role assignment.
   - `ADMIN` (운영진/파트장): Project, study, and content management. Read/comment access to recruitment.
   - `MEMBER` (일반 아롬인): Read-only or profile self-edit privileges.
2. **Middleware Protection:**
   - Enforce route guarding in `middleware.ts` to redirect unauthenticated or unauthorized users from `/dashboard/*` to `/login`.
3. **Sensitive Data Masking:**
   - Mask sensitive applicant information (contact numbers, email addresses) when viewed by unauthorized roles.

---

## 6. Development Workflow & Git Guidelines

- **Branching Strategy:**
  - `main`: Production release
  - `develop`: Active integration branch
  - `feature/[feature-name]`: New features (e.g., `feature/member-crud`)
  - `fix/[issue-name]`: Bug fixes
- **Commit Message Convention (Conventional Commits):**
  - `feat:` New feature
  - `fix:` Bug fix
  - `refactor:` Code refactoring without functionality changes
  - `style:` Formatting, UI styles
  - `docs:` Documentation updates
