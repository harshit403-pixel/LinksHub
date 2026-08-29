# LinksHub

<div align="center">

### Your developer identity, links, projects, and knowledge — in one place.

**LinksHub** is an AI-powered developer portfolio and link-in-bio platform that combines  
profile links, GitHub integration, project showcasing, analytics, and an AI assistant for exploring a developer's public work.

<br />

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![LangChain](https://img.shields.io/badge/LangChain-RAG-1C3C3C?style=for-the-badge)](https://www.langchain.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-AI_Workflow-1C3C3C?style=for-the-badge)](https://www.langchain.com/langgraph)
[![Gemini](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

<br />

**[Live Demo](https://linkshub.onrender.com/) · [GitHub](https://github.com/harshit403-pixel/LinksHub) · [Demo Video](<ADD_VIDEO_URL>)**

</div>

---

## Table of Contents

- [What is LinksHub?](#what-is-linkshub)
- [Features](#features)
- [AI & RAG](#ai--rag)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Current Progress](#current-progress)
- [Current Limitation](#current-limitation)
- [Future Roadmap](#future-roadmap)
- [Vision](#vision)

---

## What is LinksHub?

Traditional link-in-bio platforms mainly provide links. LinksHub adds developer-focused portfolio and AI capabilities:

```text
Link in Bio
    +
Developer Portfolio
    +
GitHub Integration
    +
Project Knowledge
    +
AI Assistant
```

---

### ✦ Built for developers

| Profile | Links | Projects | AI |
|---|---|---|---|
| Public developer profiles | CRUD, analytics & Linktree import | GitHub-powered project library | RAG-powered project assistant |

---

## Architecture at a Glance

```text
                    ┌──────────────────────┐
                    │      LinksHub        │
                    │ Developer Identity   │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
          Profile            Links           GitHub
              │                │                │
              └────────────────┼────────────────┘
                               │
                          Projects
                               │
                        Project Knowledge
                               │
                  ┌────────────┴────────────┐
                  │                         │
          MongoDB Atlas              Gemini Embeddings
          Vector Search                     │
                  │                         │
                  └────────────┬────────────┘
                               │
                          LangGraph
                               │
                            Gemini
                               │
                        AI Assistant
```

---

## Features

## Authentication

- User registration and login
- JWT authentication
- HTTP-only cookie sessions
- Protected routes
- Logout
- Google OAuth
- Request validation
- Rate limiting

## Developer Profiles

Each developer gets a public profile containing:

- Username and display name
- Bio
- Profile picture
- Theme
- Links
- Featured projects
- AI Assistant
- Profile sharing
- QR code

Profile customization includes:

- Display name
- Bio
- Profile picture
- Lime, Blue, Purple and Rose themes

---

## AI Bio Generator

Developers can generate profile bios using Gemini.

Inputs:

- Profession
- Skills
- Tone

Supported tones:

- Professional
- Creative
- Minimal
- Funny

The developer receives multiple suggestions and can select one for their profile.

---

## Link Management

LinksHub provides complete link management:

- Create, edit and delete links
- Soft delete, restore and permanent delete
- Drag-and-drop reordering
- Bulk link import
- Duplicate URL detection
- Linktree import
- Automatic categories
- Automatic roles
- Favicon support
- Link preview metadata
- Click tracking
- Analytics

### Linktree Import

Developers can migrate their existing Linktree profile:

```text
Linktree URL
    ↓
Fetch and parse links
    ↓
Review detected links
    ↓
Select links
    ↓
Import into LinksHub
```

Duplicate URLs are automatically skipped.

### Link Categorization

Links can be automatically classified into categories such as:

```text
career
creator
social
contact
community
music
other
```

They can also receive roles such as:

```text
resume
portfolio
github
linkedin
youtube
instagram
discord
whatsapp
spotify
other
```

---

## Analytics

LinksHub tracks link performance through:

- Total clicks
- Average clicks
- Most clicked link
- Link ranking
- Performance over time
- Individual link analytics
- Click history

When a visitor opens a link:

```text
Visitor
   ↓
LinksHub redirect
   ↓
Record click
   ↓
Redirect to destination
```

---

## Profile Sharing

Developers can share their profile through:

- Profile URL
- Share modal
- Native Web Share API
- QR code

This makes profiles useful for resumes, social media, networking and events.

---

## GitHub Integration

Developers can connect their GitHub account through OAuth.

The integration supports:

- GitHub connect/disconnect
- Repository retrieval
- Repository selection
- Repository importing
- Manual repository URL import
- README retrieval

### Repository Import

```text
Connect GitHub
      ↓
Fetch repositories
      ↓
Select repository
      ↓
Import project
```

A repository can also be imported directly using its GitHub URL.

---

## AI Project Generation

When a repository is imported, Gemini generates structured project information such as:

```text
Summary
Technologies
Concepts
Tags
Questions
```

The project also stores information such as:

- Title
- Description
- GitHub URL
- Demo URL
- README
- Visibility

Projects can then appear in the developer's Featured Projects section.

---

## AI Project Assistant

The public profile contains an AI assistant that lets visitors ask questions about the developer's public projects.

Examples:

```text
What is this project about?

What technologies were used?

What is the primary goal of this project?

Which projects use React?

Tell me about this developer's AI projects.
```

The assistant returns an answer along with related projects when available.

---

## AI & RAG

LinksHub uses **Retrieval-Augmented Generation** so the AI answers from the developer's indexed project knowledge instead of relying only on general model knowledge.

Current flow:

```text
Visitor Question
       ↓
Gemini Embedding
       ↓
MongoDB Atlas Vector Search
       ↓
Relevant Project Knowledge
       ↓
LangGraph
       ↓
Gemini
       ↓
Grounded Answer
       +
Related Projects
```

## Knowledge Pipeline

Imported project information is split into chunks and stored with metadata:

```text
ownerId
projectId
title
visibility
chunkIndex
```

Current chunking:

```text
chunk size: 1200
overlap: 200
```

## MongoDB Atlas Vector Search

Vector data is stored in:

```text
knowledge_vectors
```

with the index:

```text
knowledge_vector_index
```

The current embedding setup uses:

```text
Model: gemini-embedding-001
Dimensions: 768
Similarity: cosine
```

The vector index must therefore use **768 dimensions**.

---

# LangChain and LangGraph

### LangChain

Used for:

- Text splitting
- Gemini embeddings
- MongoDB Atlas Vector Search
- Document retrieval

### LangGraph

The current AI workflow is:

```text
START
  ↓
retrieve
  ↓
generateAnswer
  ↓
END
```

The retrieve step:

1. Performs semantic search.
2. Retrieves relevant knowledge.
3. Filters by `ownerId`.
4. Filters to public knowledge.
5. Finds related project IDs.

The answer step passes the retrieved context to Gemini and instructs it not to invent project information.

---

# Multi-Developer Knowledge Isolation

Each developer has their own projects and knowledge.

```text
Developer A
 ├── Projects
 └── Knowledge

Developer B
 ├── Projects
 └── Knowledge

Developer C
 ├── Projects
 └── Knowledge
```

AI retrieval is scoped using:

```text
ownerId
visibility = public
```

So a visitor asking questions on Developer A's profile retrieves Developer A's public project knowledge.

`NaniKiKahaniyan` is only one example project; every developer can have their own projects.

---

## Frontend

The frontend is organized by features:

```text
Client/src/
├── app/
├── components/
│   └── ui/
├── features/
│   ├── ai/
│   ├── analytics/
│   ├── auth/
│   ├── github/
│   ├── knowledge/
│   ├── links/
│   └── profile/
├── Layouts/
├── App.jsx
└── main.jsx
```

Technology:

```text
React 19
Vite
Tailwind CSS
Motion
React Router
TanStack React Query
Axios
React Icons
Recharts
Sonner
QRCode
@hello-pangea/dnd
```

The UI includes responsive layouts, animations, modals, dropdowns, loading states, empty states and theme support.

---

## Backend

The backend follows a modular structure:

```text
Server/src/
├── config/
├── db/
├── middlewares/
├── models/
├── modules/
│   ├── ai/
│   ├── auth/
│   ├── github/
│   ├── knowledge/
│   └── links/
├── routes/
└── utils/
```

The main API groups are:

```text
/api/auth
/api/links
/api/ai
/api/knowledge
/api/github
```

Major backend responsibilities include authentication, profiles, links, imports, analytics, GitHub integration, project knowledge and AI search.

---

## Database

LinksHub uses MongoDB for application data.

Main models include:

```text
User
Link
Click
GithubConnection
Knowledge
```

MongoDB Atlas Vector Search is used for the AI knowledge vectors.

---

## Security

Current security measures include:

- Password hashing with bcrypt
- JWT authentication
- HTTP-only cookies
- Protected routes
- Request validation
- Rate limiting
- User ownership checks
- Public/private knowledge filtering
- OAuth integrations

---

## Environment Variables

Server configuration includes:

```env
PORT=3000

MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

FRONTEND_URL=http://localhost:5173
NODE_ENV=development

MONGODB_VECTOR_COLLECTION=knowledge_vectors
MONGODB_VECTOR_INDEX=knowledge_vector_index
```

Never commit `.env` files or API secrets.

---

## Running Locally

### Backend

```bash
cd Server
npm install
npm run dev
```

### Frontend

```bash
cd Client
npm install
npm run dev
```

### Production

From the root:

```bash
npm run build
npm start
```

---

## End-to-End Flow

### Developer

```text
Register / Login
      ↓
Customize Profile
      ↓
Create / Import Links
      ↓
Connect GitHub
      ↓
Import Repositories
      ↓
Generate Project Information
      ↓
Create Project Knowledge
      ↓
Generate Embeddings
      ↓
Store Vectors
      ↓
Publish Profile
```

### Visitor

```text
Open Profile
      ↓
Explore Links / Projects
      ↓
Ask AI Question
      ↓
Vector Search
      ↓
Retrieve Public Knowledge
      ↓
LangGraph
      ↓
Gemini
      ↓
Answer + Related Projects
```

---

## Current Progress

### Authentication

- [x] Registration
- [x] Login / Logout
- [x] JWT + HTTP-only cookies
- [x] Google OAuth
- [x] Protected routes

### Profiles

- [x] Public profiles
- [x] Profile customization
- [x] Profile pictures
- [x] Themes
- [x] AI bio generation
- [x] Sharing and QR codes

### Links

- [x] Full CRUD
- [x] Soft delete / restore
- [x] Reordering
- [x] Linktree import
- [x] Bulk import
- [x] Duplicate detection
- [x] Categories and roles
- [x] Preview metadata
- [x] Click tracking
- [x] Analytics

### GitHub / Projects

- [x] GitHub OAuth
- [x] Repository retrieval
- [x] Repository import
- [x] Manual repository import
- [x] AI project generation
- [x] Project library
- [x] Featured projects

### AI

- [x] Gemini
- [x] LangChain
- [x] LangGraph
- [x] RAG
- [x] Gemini embeddings
- [x] MongoDB Atlas Vector Search
- [x] Developer-specific knowledge isolation
- [x] Public project AI assistant

---

## Current Limitation

Repository importing currently performs several operations synchronously:

```text
GitHub
  ↓
README
  ↓
Gemini
  ↓
Project
  ↓
Knowledge chunks
  ↓
Embeddings
  ↓
Vector database
```

Because of this, importing multiple repositories can take some time.

The application is currently functional end-to-end; background processing is a natural next scalability improvement.

---

## Future Roadmap

The long-term goal is to turn LinksHub into a more intelligent developer identity platform.

Planned directions include:

- Background repository processing
- Automatic GitHub synchronization
- Smarter LangGraph agent workflows
- AI portfolio summaries
- AI resume and cover-letter generation
- Project health and link monitoring
- Advanced profile analytics
- Custom domains
- Personalized recruiter/client portfolio views
- More knowledge sources such as blogs, certificates and documents
- Semantic developer discovery
- Project comparison
- Team projects

---

## Vision

LinksHub is more than a Linktree alternative.

The goal is to make a developer's work **displayable, searchable and understandable**.

Instead of only clicking through links, a visitor can ask:

> What has this developer built?

> Which project demonstrates their React skills?

> Tell me about their AI projects.

> Which project should I look at first?

That is the direction LinksHub is designed to grow toward.

---



## Author

**Harshit Raghuwanshi**

GitHub:  
`https://github.com/harshit403-pixel`
