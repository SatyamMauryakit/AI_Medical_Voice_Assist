import {text,json, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer()
});
export const SessionChatTable = pgTable("SessionChatTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar().notNull(),
  notes: text(),
  selectedDoctor: json(),
  conversation:json(),
  report:json(),
  createdBy: varchar().notNull().references(()=>usersTable.email),
 createdOn: varchar(),
  
})