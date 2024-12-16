import { defineField, defineType } from "sanity";

export const lesson = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Lesson Title",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "time",
      type: "string",
      title: "Time",
      description: "Specify the time of the lesson (e.g., 11am-1pm).",
    }),
    defineField({
      name: "applicants",
      type: "number",
      title: "Number of Applicants",
      validation: (Rule) => Rule.min(0).error("Applicants must be 0 or more."),
    }),
    defineField({
      name: "instructor",
      type: "reference",
      title: "Instructor",
      to: { type: "author" },
    }),
    defineField({
      name: "notes",
      type: "text",
      title: "Notes",
      description: "Optional notes about the lesson.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "time",
    },
  },
});
