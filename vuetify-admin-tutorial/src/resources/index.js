export default [
  {
    name: "posts",
    icon: "mdi-post",
    label: "title",
    include: { expand: ["user"] },
  },
  {
    name: "users",
    icon: "mdi-account",
    // routes: ["list"],
    label: "name",
  },
];
