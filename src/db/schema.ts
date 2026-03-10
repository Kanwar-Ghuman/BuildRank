import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Existing reviews table (landing page analyzer — side feature)
export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  userId: text("user_id").notNull(),
  url: text("url").notNull(),
  scorecard: text("scorecard").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Projects — the core of the platform
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  image: text("image"), // optional screenshot / logo URL
  tags: text("tags").notNull().default("[]"), // JSON array of tag strings
  ratingSum: integer("rating_sum").notNull().default(0),
  ratingCount: integer("rating_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Ratings — one per user per project (1-5 stars)
export const ratings = pgTable(
  "ratings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
    score: integer("score").notNull(), // 1-5
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("ratings_project_user_idx").on(t.projectId, t.userId)],
);
